import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, BarChart3, Settings, Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // In a real app, you'd check if the user has admin privileges
  // For now, we'll allow all authenticated users to access admin
  
  // Mock admin statistics
  const adminStats = {
    totalUsers: 1250,
    totalPrompts: 156,
    activeUsers: 890,
    premiumUsers: 45,
    newUsersToday: 12,
    promptsAddedToday: 8
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage users, prompts, and platform settings
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                +{adminStats.newUsersToday} today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Prompts</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalPrompts}</div>
              <p className="text-xs text-muted-foreground">
                +{adminStats.promptsAddedToday} today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                Last 30 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.premiumUsers}</div>
              <p className="text-xs text-muted-foreground">
                {((adminStats.premiumUsers / adminStats.totalUsers) * 100).toFixed(1)}% conversion
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Admin Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>User Management</span>
              </CardTitle>
              <CardDescription>
                Manage user accounts, permissions, and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Button asChild className="w-full justify-start">
                  <Link href="/admin/users">
                    <Users className="h-4 w-4 mr-2" />
                    View All Users
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link href="/admin/users/premium">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Premium Users
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link href="/admin/users/analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    User Analytics
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Prompt Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Prompt Management</span>
              </CardTitle>
              <CardDescription>
                Create, edit, and organize AI prompts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Button asChild className="w-full justify-start">
                  <Link href="/admin/prompts">
                    <BookOpen className="h-4 w-4 mr-2" />
                    All Prompts
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link href="/admin/prompts/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Prompt
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link href="/admin/prompts/categories">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Categories
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest user registrations and prompt submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">New user registered: john.doe@example.com</span>
                </div>
                <span className="text-xs text-gray-500">2 minutes ago</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Prompt submitted: &ldquo;Advanced SEO Strategy&rdquo;</span>
                </div>
                <span className="text-xs text-gray-500">15 minutes ago</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">User upgraded to premium: jane.smith@example.com</span>
                </div>
                <span className="text-xs text-gray-500">1 hour ago</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Prompt edited: &ldquo;Content Marketing Guide&rdquo;</span>
                </div>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
