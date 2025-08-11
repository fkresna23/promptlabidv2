import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Copy,
  MoreHorizontal
} from "lucide-react";
import Link from "next/link";
import { samplePrompts } from "@/data/prompts";

export default async function PromptsManagementPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Mock statistics
  const totalPrompts = samplePrompts.length;
  const publishedPrompts = samplePrompts.filter(p => p.isPremium === false).length;
  const premiumPrompts = samplePrompts.filter(p => p.isPremium === true).length;
  const draftPrompts = 5; // Mock draft count

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/admin">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Admin
                </Link>
              </Button>
            </div>
            <Button asChild>
              <Link href="/admin/prompts/create">
                <Plus className="h-4 w-4 mr-2" />
                Create New Prompt
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Prompt Management</h1>
          <p className="mt-2 text-gray-600">
            Create, edit, and organize AI prompts for your users
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Prompts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPrompts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{publishedPrompts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{premiumPrompts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{draftPrompts}</div>
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
                  placeholder="Search prompts by title, category, or description..."
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

        {/* Prompts Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Prompts</CardTitle>
            <CardDescription>
              Manage and organize your AI prompt library
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {samplePrompts.map((prompt) => (
                <div key={prompt.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900 truncate">{prompt.title}</h3>
                      <Badge variant="secondary" className="shrink-0">
                        {prompt.category}
                      </Badge>
                      {prompt.isPremium ? (
                        <Badge className="bg-purple-100 text-purple-800 shrink-0">
                          Premium
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="shrink-0">
                          Free
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {prompt.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{prompt.tags.length} tags</span>
                      <span>{prompt.uses} uses</span>
                      <span>{prompt.likes} likes</span>
                      <span>Created: {prompt.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/prompts/edit/${prompt.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
