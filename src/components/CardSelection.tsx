import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { UserData, TarotCard } from './TarotApp';
import { TAROT_CARDS } from '../data/tarotCards';
import tarotCardBack from '@/assets/tarot-card-back.png';
import { Sparkles, Eye } from 'lucide-react';

interface CardSelectionProps {
  userData: UserData;
  onCardsSelected: (cards: TarotCard[]) => void;
}

const CardSelection = ({ userData, onCardsSelected }: CardSelectionProps) => {
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [animatingCards, setAnimatingCards] = useState<Set<number>>(new Set());
  const [showRevealButton, setShowRevealButton] = useState(false);

  const handleCardClick = (card: TarotCard) => {
    if (selectedCards.length >= 3 || selectedCards.find(c => c.id === card.id)) return;

    setAnimatingCards(prev => new Set(prev).add(card.id));
    
    setTimeout(() => {
      setSelectedCards(prev => [...prev, card]);
      setAnimatingCards(prev => {
        const newSet = new Set(prev);
        newSet.delete(card.id);
        return newSet;
      });
    }, 400);
  };

  useEffect(() => {
    if (selectedCards.length === 3) {
      setTimeout(() => setShowRevealButton(true), 1000);
    }
  }, [selectedCards.length]);

  const isSelected = (cardId: number) => selectedCards.some(c => c.id === cardId);
  const isAnimating = (cardId: number) => animatingCards.has(cardId);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 fade-in-up">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome, {userData.name}
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Born under the sign of {userData.zodiacSign}
          </p>
          <p className="text-lg text-foreground">
            Choose 3 cards that call to your spirit ({selectedCards.length}/3)
          </p>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-13 gap-2 mb-8">
          {TAROT_CARDS.map((card, index) => {
            const selected = isSelected(card.id);
            const animating = isAnimating(card.id);
            const shouldHide = selectedCards.length === 3 && !selected;
            
            return (
              <div
                key={card.id}
                className={`
                  relative cursor-pointer transition-all duration-700 slide-in-mystical
                  ${shouldHide ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}
                  ${selected ? 'transform scale-110 z-10' : 'hover:scale-105'}
                  ${animating ? 'animate-card-flip' : ''}
                `}
                style={{ animationDelay: `${index * 0.02}s` }}
                onClick={() => handleCardClick(card)}
              >
                <div className="aspect-[2/3] relative">
                  <img
                    src={tarotCardBack}
                    alt="Tarot Card"
                    className={`
                      w-full h-full object-cover rounded-lg border-2 transition-all duration-300
                      ${selected 
                        ? 'border-primary shadow-2xl mystical-glow' 
                        : 'border-border hover:border-accent shadow-lg'
                      }
                    `}
                  />
                  {selected && (
                    <div className="absolute inset-0 bg-primary/20 rounded-lg animate-pulse-glow" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {showRevealButton && (
          <div className="text-center fade-in-up">
            <Button
              onClick={() => onCardsSelected(selectedCards)}
              className="magic-button text-primary-foreground font-bold py-4 px-8 text-lg flex items-center gap-3 mystical-glow"
            >
              <Eye className="w-6 h-6" />
              Reveal Your Destiny
              <Sparkles className="w-6 h-6 animate-sparkle" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export { CardSelection };