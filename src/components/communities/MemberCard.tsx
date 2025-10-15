import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { GradientAvatar } from '@/components/ui/gradient-avatar';
import { MoreVertical, Shield, UserCog, UserMinus } from 'lucide-react';
import { format } from 'date-fns';
import { useCommunityRole, formatCommunityRole, getCommunityRoleBadgeVariant, CommunityRole } from '@/hooks/useCommunityRole';
interface MemberCardProps {
  member: {
    id: string;
    user_id: string;
    username: string;
    avatar_url: string | null;
    joined_at: string;
  };
  communityId: string;
  currentUserRole?: CommunityRole | null;
  isCurrentUser?: boolean;
  onPromote?: (userId: string) => void;
  onDemote?: (userId: string) => void;
  onRemove?: (userId: string) => void;
}
export function MemberCard({
  member,
  communityId,
  currentUserRole,
  isCurrentUser = false,
  onPromote,
  onDemote,
  onRemove
}: MemberCardProps) {
  const {
    role: memberCommunityRole
  } = useCommunityRole(member.user_id, communityId);
  const canManage = (currentUserRole === 'owner' || currentUserRole === 'moderator') && !isCurrentUser;
  return <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Avatar className="h-12 w-12 border-2 border-gray-100">
          <AvatarImage src={member.avatar_url || undefined} />
          <AvatarFallback className="relative overflow-hidden">
            <GradientAvatar seed={member.user_id} className="absolute inset-0" />
            <span className="relative z-10 text-white font-semibold">
              {member.username.charAt(0).toUpperCase()}
            </span>
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {member.username}
            </h4>
            {memberCommunityRole && <Badge variant={getCommunityRoleBadgeVariant(memberCommunityRole)} className="text-xs">
                {formatCommunityRole(memberCommunityRole)}
              </Badge>}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Joined {format(new Date(member.joined_at), 'MMM d, yyyy')}
          </p>
        </div>
      </div>

      {canManage && <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {memberCommunityRole === 'member' && currentUserRole === 'owner' && <DropdownMenuItem onClick={() => onPromote?.(member.user_id)}>
                <Shield className="h-4 w-4 mr-2" />
                Promote to Moderator
              </DropdownMenuItem>}
            {memberCommunityRole === 'moderator' && currentUserRole === 'owner' && <DropdownMenuItem onClick={() => onDemote?.(member.user_id)}>
                <UserMinus className="h-4 w-4 mr-2" />
                Demote to Member
              </DropdownMenuItem>}
            <DropdownMenuItem onClick={() => onRemove?.(member.user_id)} className="text-destructive focus:text-destructive">
              <UserMinus className="h-4 w-4 mr-2" />
              Remove Member
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>}
    </div>;
}