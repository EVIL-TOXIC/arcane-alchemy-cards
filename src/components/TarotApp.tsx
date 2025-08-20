import { useState } from 'react';
import { UserForm } from './UserForm';
import { CardSelection } from './CardSelection';
import { CardReveal } from './CardReveal';
import { MysticalBackground } from './MysticalBackground';

export type UserData = {
  name: string;
  dateOfBirth: string;
  zodiacSign: string;
};

export type TarotCard = {
  id: number;
  name: string;
  meaning: string;
  description: string;
  image?: string;
};

export type AppStage = 'form' | 'selection' | 'reveal';

const TarotApp = () => {
  const [stage, setStage] = useState<AppStage>('form');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);

  const handleUserSubmit = (data: UserData) => {
    setUserData(data);
    setStage('selection');
  };

  const handleCardsSelected = (cards: TarotCard[]) => {
    setSelectedCards(cards);
    setStage('reveal');
  };

  const handleReset = () => {
    setStage('form');
    setUserData(null);
    setSelectedCards([]);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MysticalBackground />
      
      <div className="relative z-10">
        {stage === 'form' && (
          <UserForm onSubmit={handleUserSubmit} />
        )}
        
        {stage === 'selection' && userData && (
          <CardSelection 
            userData={userData} 
            onCardsSelected={handleCardsSelected}
          />
        )}
        
        {stage === 'reveal' && (
          <CardReveal 
            selectedCards={selectedCards}
            userData={userData!}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default TarotApp;