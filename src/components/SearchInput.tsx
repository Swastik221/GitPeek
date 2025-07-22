import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchInputProps {
  onSearch: (username: string) => void;
  loading: boolean;
}

export function SearchInput({ onSearch, loading }: SearchInputProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  const clearInput = () => {
    setUsername('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-github-muted transition-colors group-focus-within:text-primary" />
        <Input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          className="pl-10 pr-10 h-12 bg-github-card border-github-border text-github-text placeholder:text-github-muted focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
        />
        {username && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearInput}
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 hover:bg-github-border"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </form>
  );
}