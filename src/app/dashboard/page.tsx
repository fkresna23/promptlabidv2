import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, BookOpen, Heart, Download, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import { samplePrompts } from "@/data/prompts";

export default async function DashboardPage() {
  // Check if Clerk is configured
  const isClerkConfigured = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('your_clerk_publishable_key_here');

  let userId = null;
  if (isClerkConfigured) {
    const authResult = await auth();
    userId = authResult.userId;
    
    if (!userId) {
      redirect('/sign-in')
    }
  }

  // Mock user data - in a real app, this would come from your database
  const userStats = {
    totalPrompts: 156,
    favoritePrompts: 23,
    promptsUsed: 89,
    isPremium: false,
    joinDate: "January 2024"
  };

  const recentPrompts = samplePrompts.slice(0, 3);
  const favoritePrompts = samplePrompts.slice(2, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back to your Dashboard
          </h1>
          <p className="text-gray-600">
            Track your prompts, manage favorites, and explore new AI tools
          </p>
        </div>

        {/* Premium Upgrade Banner */}
        {!userStats.isPremium && (
          <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Crown className="h-8 w-8 text-purple-600" />
                  <div>
                    <CardTitle className="text-xl text-purple-900">
                      Upgrade to Premium
                    </CardTitle>
                    <CardDescription className="text-purple-700">
                      Unlock unlimited access to all premium prompts and exclusive features
                    </CardDescription>
                  </div>
                </div>
                <Button variant="premium" asChild>
                  <Link href="/upgrade">
                    Upgrade Now
                  </Link>
                </Button>
              </div>
            </CardHeader>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Prompts</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalPrompts}</div>
              <p className="text-xs text-muted-foreground">
                Available in your library
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorites</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.favoritePrompts}</div>
              <p className="text-xs text-muted-foreground">
                Saved for quick access
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Used This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.promptsUsed}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Member Since</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.joinDate}</div>
              <p className="text-xs text-muted-foreground">
                Thank you for being with us!
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Prompts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recently Used Prompts</span>
              </CardTitle>
              <CardDescription>
                Your most recently accessed prompts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPrompts.map((prompt) => (
                <div key={prompt.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-sm">{prompt.title}</h4>
                      {prompt.isPremium ? (
                        <Badge variant="premium" className="text-xs">Premium</Badge>
                      ) : (
                        <Badge variant="free" className="text-xs">Free</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-1">
                      {prompt.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {prompt.category} • Used 2 hours ago
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Use Again
                  </Button>
                </div>
              ))}
              <div className="text-center pt-4">
                <Button variant="outline" asChild>
                  <Link href="/categories">Browse More Prompts</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Favorite Prompts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Favorite Prompts</span>
              </CardTitle>
              <CardDescription>
                Your saved prompts for quick access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {favoritePrompts.map((prompt) => (
                <div key={prompt.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-sm">{prompt.title}</h4>
                      {prompt.isPremium ? (
                        <Badge variant="premium" className="text-xs">Premium</Badge>
                      ) : (
                        <Badge variant="free" className="text-xs">Free</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-1">
                      {prompt.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {prompt.category} • {prompt.likes} likes
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Use
                    </Button>
                  </div>
                </div>
              ))}
              <div className="text-center pt-4">
                <Button variant="outline" asChild>
                  <Link href="/favorites">View All Favorites</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to help you get the most out of PromptLab
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                <Link href="/categories">
                  <BookOpen className="h-6 w-6" />
                  <span>Browse Categories</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                <Link href="/favorites">
                  <Heart className="h-6 w-6" />
                  <span>My Favorites</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                <Link href="/upgrade">
                  <Crown className="h-6 w-6" />
                  <span>Upgrade Plan</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                <Link href="/settings">
                  <Download className="h-6 w-6" />
                  <span>Export Data</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
