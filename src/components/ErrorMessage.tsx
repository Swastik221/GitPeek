import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Alert className="max-w-md mx-auto bg-github-danger/10 border-github-danger/20 text-github-danger animate-fade-in">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="ml-2">
        {message}
      </AlertDescription>
    </Alert>
  );
}