import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserData, TarotCard } from './TarotApp';
import { RotateCcw, Sparkles, Heart, Brain, Coins } from 'lucide-react';
import crystalBall from '@/assets/crystal-ball.png';

interface CardRevealProps {
  selectedCards: TarotCard[];
  userData: UserData;
  onReset: () => void;
}

const cardPositions = [
  { title: 'Past', icon: Heart, description: 'What influences your journey' },
  { title: 'Present', icon: Brain, description: 'Your current state of being' },
  { title: 'Future', icon: Coins, description: 'What awaits on your path' }
];

const CardReveal = ({ selectedCards, userData, onReset }: CardRevealProps) => {
  const [revealedCards, setRevealedCards] = useState<boolean[]>([false, false, false]);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const revealCard = (index: number) => {
    setRevealedCards(prev => {
      const newRevealed = [...prev];
      newRevealed[index] = true;
      return newRevealed;
    });
  };

  const revealAllCards = () => {
    selectedCards.forEach((_, index) => {
      setTimeout(() => revealCard(index), index * 500);
    });
  };

  if (showIntro) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center fade-in-up">
          <div className="mb-8 floating-sparkles">
            <img 
              src={crystalBall} 
              alt="Crystal Ball" 
              className="w-32 h-32 mx-auto mystical-glow"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            The Cards Have Chosen...
          </h1>
          <p className="text-xl text-muted-foreground">
            Prepare to unveil your destiny, {userData.name}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 fade-in-up">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your Mystical Reading
          </h1>
          <p className="text-lg text-muted-foreground">
            Born {userData.dateOfBirth} under {userData.zodiacSign}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {selectedCards.map((card, index) => {
            const position = cardPositions[index];
            const Icon = position.icon;
            const isRevealed = revealedCards[index];
            
            return (
              <div key={card.id} className="fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <Card className="tarot-card mystical-glow h-full">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-2">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary">{position.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{position.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    {!isRevealed ? (
                      <div className="text-center">
                        <div 
                          className="aspect-[2/3] bg-gradient-to-br from-card to-muted rounded-lg border-2 border-border cursor-pointer hover:border-primary transition-all duration-300 flex items-center justify-center mb-4 card-hover"
                          onClick={() => revealCard(index)}
                        >
                          <Sparkles className="w-12 h-12 text-primary animate-sparkle" />
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => revealCard(index)}
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          Reveal Card
                        </Button>
                      </div>
                    ) : (
                      <div className="animate-fadeInUp">
                        <div className="aspect-[2/3] bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border-2 border-primary p-4 mb-4 flex items-center justify-center mystical-glow">
                          <div className="text-center">
                            <h3 className="text-2xl font-bold text-primary mb-2">{card.name}</h3>
                            <p className="text-accent font-medium">{card.meaning}</p>
                          </div>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="text-center space-y-4">
          {!revealedCards.every(Boolean) && (
            <Button
              onClick={revealAllCards}
              className="magic-button text-primary-foreground font-bold py-3 px-6 flex items-center gap-2 mystical-glow"
            >
              <Sparkles className="w-5 h-5" />
              Reveal All Cards
            </Button>
          )}
          
          <div>
            <Button
              variant="outline"
              onClick={onReset}
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              New Reading
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CardReveal };