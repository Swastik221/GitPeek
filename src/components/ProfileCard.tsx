import { MapPin, Link, Calendar, Users, GitFork, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

interface ProfileCardProps {
  profile: GitHubProfile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-card border-github-border shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <img
              src={profile.avatar_url}
              alt={`${profile.login}'s avatar`}
              className="w-24 h-24 rounded-full border-2 border-github-border shadow-card hover:shadow-glow transition-all duration-300"
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="mb-3">
              <h2 className="text-2xl font-bold text-github-text mb-1">
                {profile.name || profile.login}
              </h2>
              <p className="text-github-muted text-sm">@{profile.login}</p>
            </div>

            {profile.bio && (
              <p className="text-github-text mb-4 leading-relaxed">{profile.bio}</p>
            )}

            <div className="flex flex-wrap gap-3 text-sm text-github-muted mb-4 justify-center md:justify-start">
              {profile.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.blog && (
                <div className="flex items-center gap-1">
                  <Link className="h-4 w-4" />
                  <a
                    href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {profile.blog}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {formatDate(profile.created_at)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Badge variant="secondary" className="bg-github-accent/10 text-github-accent border-github-accent/20">
                <Users className="h-3 w-3 mr-1" />
                {profile.followers} followers
              </Badge>
              <Badge variant="secondary" className="bg-github-accent/10 text-github-accent border-github-accent/20">
                <Users className="h-3 w-3 mr-1" />
                {profile.following} following
              </Badge>
              <Badge variant="secondary" className="bg-github-accent/10 text-github-accent border-github-accent/20">
                <GitFork className="h-3 w-3 mr-1" />
                {profile.public_repos} repositories
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}