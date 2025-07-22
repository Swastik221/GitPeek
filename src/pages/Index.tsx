import { useState, useEffect } from 'react';
import { Github } from 'lucide-react';
import { SearchInput } from '@/components/SearchInput';
import { ProfileCard } from '@/components/ProfileCard';
import { RepositoryGrid } from '@/components/RepositoryGrid';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';

interface GitHubProfile {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  blog: string | null;
  created_at: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

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

const Index = () => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubData = async (username: string) => {
    setLoading(true);
    setError(null);
    setProfile(null);
    setRepositories([]);

    try {
      // Fetch profile
      const profileResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!profileResponse.ok) {
        if (profileResponse.status === 404) {
          throw new Error('User not found. Please check the username and try again.');
        }
        throw new Error('Failed to fetch profile. Please try again later.');
      }
      
      const profileData = await profileResponse.json();
      setProfile(profileData);

      // Fetch repositories
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`
      );
      if (!reposResponse.ok) {
        throw new Error('Failed to fetch repositories.');
      }
      
      const reposData = await reposResponse.json();
      setRepositories(reposData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-github-bg text-github-text">
      {/* Header */}
      <header className="border-b border-github-border bg-github-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Github className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              GitHub Profile Viewer
            </h1>
          </div>
          
          <SearchInput onSearch={fetchGitHubData} loading={loading} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} />}
        
        {!loading && !error && !profile && (
          <div className="text-center py-16">
            <Github className="h-16 w-16 text-github-muted mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-github-text mb-2">
              Discover GitHub Profiles
            </h2>
            <p className="text-github-muted max-w-md mx-auto leading-relaxed">
              Enter a GitHub username above to view their profile, repositories, and contribution statistics.
            </p>
          </div>
        )}

        {profile && !loading && (
          <div className="space-y-8">
            <ProfileCard profile={profile} />
            
            {repositories.length > 0 && (
              <RepositoryGrid repositories={repositories} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-github-border bg-github-card/30 py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-github-muted text-sm">
            Built with React, TypeScript, and the GitHub API
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;