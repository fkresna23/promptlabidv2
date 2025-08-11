import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Calendar, 
  Crown,
  Ban,
  UserCheck
} from "lucide-react";
import Link from "next/link";

// Mock user data - in a real app, this would come from your database
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/api/placeholder/40/40",
    status: "active",
    isPremium: true,
    joinDate: "2024-01-15",
    lastLogin: "2024-08-10",
    promptsCreated: 12,
    promptsUsed: 89
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "/api/placeholder/40/40",
    status: "active",
    isPremium: false,
    joinDate: "2024-02-20",
    lastLogin: "2024-08-11",
    promptsCreated: 5,
    promptsUsed: 34
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    avatar: "/api/placeholder/40/40",
    status: "suspended",
    isPremium: false,
    joinDate: "2024-03-10",
    lastLogin: "2024-08-05",
    promptsCreated: 0,
    promptsUsed: 12
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    avatar: "/api/placeholder/40/40",
    status: "active",
    isPremium: true,
    joinDate: "2024-01-30",
    lastLogin: "2024-08-11",
    promptsCreated: 25,
    promptsUsed: 156
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@example.com",
    avatar: "/api/placeholder/40/40",
    status: "active",
    isPremium: false,
    joinDate: "2024-04-05",
    lastLogin: "2024-08-09",
    promptsCreated: 3,
    promptsUsed: 45
  }
];

export default async function UsersManagementPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(user => user.status === 'active').length;
  const premiumUsers = mockUsers.filter(user => user.isPremium).length;
  const suspendedUsers = mockUsers.filter(user => user.status === 'suspended').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" asChild>
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-2 text-gray-600">
            Manage user accounts, permissions, and activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{premiumUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{suspendedUsers}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users by name or email..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              Complete list of all registered users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">{user.name}</h3>
                        {user.isPremium && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                        <Badge 
                          variant={user.status === 'active' ? 'default' : 'destructive'}
                          className={user.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {user.status === 'active' ? 'Active' : 'Suspended'}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {user.email}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Joined {user.joinDate}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span>{user.promptsCreated} prompts created</span>
                        <span>{user.promptsUsed} prompts used</span>
                        <span>Last login: {user.lastLogin}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {user.status === 'active' ? (
                      <Button variant="outline" size="sm">
                        <Ban className="h-4 w-4 mr-1" />
                        Suspend
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <UserCheck className="h-4 w-4 mr-1" />
                        Activate
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
