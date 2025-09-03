import { AddGameForm } from '@/components/admin/add-game-form';
import { Bot } from 'lucide-react';

export default function AddGamePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter mb-2">Add a New Game</h1>
        <p className="text-muted-foreground flex items-center justify-center gap-2">
          Fill out the form below. Use our AI assistant to help you with tagging! <Bot className="h-4 w-4" />
        </p>
      </div>
      <AddGameForm />
    </div>
  );
}
