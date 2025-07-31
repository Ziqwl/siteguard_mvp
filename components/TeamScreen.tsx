import { DashboardLayout } from './DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { UserPlus, Users, Crown, Shield, User, Search, Mail, MoreHorizontal } from 'lucide-react';
import { AppScreen } from '../App';
import { useState } from 'react';

interface TeamScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  currentScreen: AppScreen;
}

const mockTeamMembers = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'admin',
    avatar: null,
    status: 'active',
    lastSeen: 'Online now',
    joinedDate: 'Jan 2024'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    role: 'editor',
    avatar: null,
    status: 'active',
    lastSeen: '2 hours ago',
    joinedDate: 'Feb 2024'
  },
  {
    id: 3,
    name: 'Mike Rodriguez',
    email: 'mike@example.com',
    role: 'viewer',
    avatar: null,
    status: 'inactive',
    lastSeen: '3 days ago',
    joinedDate: 'Mar 2024'
  },
  {
    id: 4,
    name: 'Emma Wilson',
    email: 'emma@example.com',
    role: 'editor',
    avatar: null,
    status: 'active',
    lastSeen: '1 hour ago',
    joinedDate: 'Mar 2024'
  }
];

export function TeamScreen({ onNavigate, onToggleTheme, isDarkMode, currentScreen }: TeamScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = mockTeamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4" />;
      case 'editor':
        return <Shield className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'editor':
        return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
      default:
        return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'
      : 'bg-gray-400/10 text-gray-400 border-gray-400/20';
  };

  const teamStats = {
    total: mockTeamMembers.length,
    active: mockTeamMembers.filter(m => m.status === 'active').length,
    admins: mockTeamMembers.filter(m => m.role === 'admin').length,
    editors: mockTeamMembers.filter(m => m.role === 'editor').length
  };

  return (
    <DashboardLayout
      title="Team"
      description="Manage team members and their permissions"
      currentScreen={currentScreen}
      onNavigate={onNavigate}
      onToggleTheme={onToggleTheme}
      isDarkMode={isDarkMode}
    >
      <div className="space-y-8 md:space-y-12 w-full max-w-4xl mx-auto">
        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <Card className="glass border-white/10 animate-scale-in rounded-[var(--radius)] md:rounded-[var(--radius-mobile)]">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{teamStats.total}</div>
              <p className="text-sm text-gray-300 font-medium">Team Members</p>
            </CardContent>
          </Card>
          
          <Card className="card" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400">{teamStats.active}</div>
              <p className="text-sm text-gray-300 font-medium">Active</p>
            </CardContent>
          </Card>
          
          <Card className="card" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{teamStats.admins}</div>
              <p className="text-sm text-gray-300 font-medium">Admins</p>
            </CardContent>
          </Card>
          
          <Card className="card" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{teamStats.editors}</div>
              <p className="text-sm text-gray-300 font-medium">Editors</p>
            </CardContent>
          </Card>
        </div>

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          
          <Button className="btn-primary">
            <UserPlus className="h-4 w-4" />
            Invite Member
          </Button>
        </div>

        {/* Team Members */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {filteredMembers.map((member, index) => (
            <Card key={member.id} className="glass border-white/10 hover:border-white/20 transition-all duration-300 animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || undefined} />
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <h4 className="font-medium text-white">{member.name}</h4>
                      <div className="flex items-center gap-1 text-sm text-gray-300">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={`${getRoleColor(member.role)} capitalize`}>
                          {getRoleIcon(member.role)}
                          <span className="ml-1">{member.role}</span>
                        </Badge>
                        <Badge className={`${getStatusColor(member.status)} capitalize`}>
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <div className="text-sm text-gray-300">{member.lastSeen}</div>
                    <div className="text-xs text-gray-500">Joined {member.joinedDate}</div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Invite Section */}
        <Card className="glass border-white/10 animate-slide-in-up" style={{ animationDelay: '500ms' }}>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Invite New Member
            </CardTitle>
            <CardDescription className="text-white/60">
              Send an invitation to add a new team member
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <Input
                placeholder="Email address"
                className="glass border-white/20 text-white placeholder:text-white/50"
              />
              <select className="glass border-white/20 text-white bg-transparent rounded-md px-3 py-2">
                <option value="viewer" className="bg-background">Viewer</option>
                <option value="editor" className="bg-background">Editor</option>
                <option value="admin" className="bg-background">Admin</option>
              </select>
              <Button className="btn-primary">
                Send Invitation
              </Button>
            </div>
          </CardContent>
        </Card>

        {filteredMembers.length === 0 && (
          <Card className="glass border-white/10">
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-white/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No team members found</h3>
              <p className="text-white/60">Try adjusting your search terms.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}