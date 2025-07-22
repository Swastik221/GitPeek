import { GitFork, Star, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
}

interface RepositoryGridProps {
  repositories: Repository[];
}

const languageColors: { [key: string]: string } = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  Java: '#007396',
  'C++': '#00599c',
  'C#': '#239120',
  Go: '#00add8',
  Rust: '#000000',
  Swift: '#fa7343',
  Kotlin: '#7f52ff',
  Ruby: '#cc342d',
  PHP: '#777bb4',
  HTML: '#e34c26',
  CSS: '#1572b6',
  Shell: '#89e051',
  Dart: '#0175c2',
  Scala: '#dc322f',
  R: '#198ce7',
  Lua: '#2c2d72',
  Perl: '#39457e',
};

export function RepositoryGrid({ repositories }: RepositoryGridProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h3 className="text-xl font-semibold text-github-text mb-6 text-center">
        Public Repositories ({repositories.length})
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repositories.map((repo, index) => (
          <Card
            key={repo.id}
            className="bg-gradient-card border-github-border hover:border-github-accent/50 transition-all duration-300 hover:shadow-card group animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg text-github-text group-hover:text-github-accent transition-colors line-clamp-1">
                  {repo.name}
                </CardTitle>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-github-muted hover:text-github-accent transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {repo.description && (
                <p className="text-github-muted text-sm mb-4 line-clamp-2 leading-relaxed">
                  {repo.description}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-github-muted">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    <span>{repo.forks_count}</span>
                  </div>
                </div>
                
                {repo.language && (
                  <Badge 
                    variant="secondary" 
                    className="bg-github-border/50 text-github-text border-none text-xs"
                  >
                    <div
                      className="w-2 h-2 rounded-full mr-1"
                      style={{
                        backgroundColor: languageColors[repo.language] || '#6b7280'
                      }}
                    />
                    {repo.language}
                  </Badge>
                )}
              </div>
              
              <div className="mt-3 pt-3 border-t border-github-border">
                <p className="text-xs text-github-muted">
                  Updated {formatDate(repo.updated_at)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}