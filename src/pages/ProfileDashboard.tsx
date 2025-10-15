import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { safeFetch } from '@/utils/safeFetch';
import { Header } from '@/components/layout/Header';
import { ProfileSummaryCard } from '@/components/profile/ProfileSummaryCard';
import { ProfileStatsCard } from '@/components/profile/ProfileStatsCard';
import { MembershipsList } from '@/components/profile/MembershipsList';
import { MutualCommunitiesList } from '@/components/profile/MutualCommunitiesList';
import { FollowButton } from '@/components/profile/FollowButton';
import { ActivityTabs } from '@/components/profile/ActivityTabs';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useParams } from 'react-router-dom';
interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
}
interface ProfileStats {
  posts_count: number;
  comments_count: number;
  communities_count: number;
}
export default function ProfileDashboard() {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const {
    userId
  } = useParams<{
    userId: string;
  }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Determine which user profile to fetch
  const profileUserId = userId || user?.id;
  const isOwnProfile = user?.id === profileUserId;
  useEffect(() => {
    if (!profileUserId) {
      navigate('/');
      return;
    }
    fetchProfileData();
  }, [profileUserId, navigate]);
  const fetchProfileData = async () => {
    if (!profileUserId) return;
    setLoading(true);
    setError(null);
    try {
      // Fetch user profile - only show email if viewing own profile
      const selectFields = isOwnProfile ? 'id, username, email, avatar_url, created_at' : 'id, username, avatar_url, created_at';
      const profileQuery = supabase.from('users_local').select(selectFields).eq('id', profileUserId).maybeSingle();
      const [profileData, profileError] = await safeFetch(profileQuery);
      if (profileError || !profileData) {
        setError('Failed to load profile');
        setLoading(false);
        return;
      }
      setProfile(profileData as UserProfile);

      // Fetch stats in parallel
      const [postsResult, commentsResult, membershipsResult] = await Promise.all([safeFetch(supabase.from('posts').select('id', {
        count: 'exact',
        head: true
      }).eq('created_by', profileUserId)), safeFetch(supabase.from('comments').select('id', {
        count: 'exact',
        head: true
      }).eq('created_by', profileUserId)), safeFetch(supabase.from('memberships').select('id', {
        count: 'exact',
        head: true
      }).eq('user_id', profileUserId))]);
      setStats({
        posts_count: postsResult[0]?.length ?? 0,
        comments_count: commentsResult[0]?.length ?? 0,
        communities_count: membershipsResult[0]?.length ?? 0
      });
      setLoading(false);
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };
  if (loading) {
    return <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="p-4 lg:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <Skeleton className="h-12 w-64" />
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-96 w-full" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </main>
      </div>;
  }
  if (error || !profile) {
    return <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden p-6">
              <div className="border border-yellow-200 bg-yellow-50 text-yellow-800 p-3 rounded-md text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error || 'Failed to load profile'}</span>
                </div>
                <Button variant="secondary" size="sm" onClick={fetchProfileData}>
                  Retry
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-4 lg:p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="animate-fade-in">
            <Link to="/communities" className="inline-flex items-center gap-2 text-sm text-gray-700 font-medium hover:text-brand-blue mb-2 transition-colors duration-150 ease-in-out">
              <ChevronLeft className="h-4 w-4" />
              Back to Communities
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
              {isOwnProfile ? 'Profile Dashboard' : `${profile.username}'s Profile`}
            </h1>
            <p className="text-sm text-gray-700 leading-relaxed">
              {isOwnProfile ? 'View and manage your Communities activity' : 'View member activity and profile'}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Profile & Activity */}
            <div className="lg:col-span-2 space-y-6">
              <ProfileSummaryCard profile={profile} onUpdate={fetchProfileData} isOwnProfile={isOwnProfile} followButton={!isOwnProfile && user ? <FollowButton currentUserId={user.id} targetUserId={profileUserId} /> : undefined} />
              <ActivityTabs userId={profileUserId} />
            </div>

            {/* Right Column - Stats & Memberships / Mutual Communities */}
            <div className="space-y-6">
              {isOwnProfile ? <>
                  <ProfileStatsCard stats={stats} />
                  <MembershipsList userId={profileUserId} />
                </> : user && <MutualCommunitiesList viewerId={user.id} profileUserId={profileUserId} />}
            </div>
          </div>
        </div>
      </main>
    </div>;
}