import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserData } from './TarotApp';
import { Sparkles, Moon, Stars } from 'lucide-react';

interface UserFormProps {
  onSubmit: (data: UserData) => void;
}

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const UserForm = ({ onSubmit }: UserFormProps) => {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    dateOfBirth: '',
    zodiacSign: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.dateOfBirth && formData.zodiacSign) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md mystical-glow tarot-card fade-in-up">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Moon className="w-12 h-12 text-primary animate-float" />
              <Stars className="w-6 h-6 text-accent absolute -top-2 -right-2 animate-sparkle" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Mystical Tarot Reading
          </CardTitle>
          <p className="text-muted-foreground">
            Enter your details to unlock the secrets of the cards
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your mystical name..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-border bg-card"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob" className="text-foreground font-medium">
                Date of Birth
              </Label>
              <Input
                id="dob"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="border-border bg-card"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zodiac" className="text-foreground font-medium">
                Zodiac Sign
              </Label>
              <Select 
                value={formData.zodiacSign} 
                onValueChange={(value) => setFormData({ ...formData, zodiacSign: value })}
              >
                <SelectTrigger className="border-border bg-card">
                  <SelectValue placeholder="Choose your celestial sign..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {zodiacSigns.map((sign) => (
                    <SelectItem key={sign} value={sign} className="text-foreground">
                      {sign}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full magic-button text-primary-foreground font-bold py-3 flex items-center gap-2"
              disabled={!formData.name || !formData.dateOfBirth || !formData.zodiacSign}
            >
              <Sparkles className="w-5 h-5" />
              Enter the Mystical Realm
              <Sparkles className="w-5 h-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export { UserForm };