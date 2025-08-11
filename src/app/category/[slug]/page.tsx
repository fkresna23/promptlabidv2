import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowLeft, Crown, Copy, ThumbsUp, Clock, User } from "lucide-react";
import Link from "next/link";
import { categories, samplePrompts } from "@/data/prompts";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  
  // Find the category
  const category = categories.find(
    cat => cat.name.toLowerCase() === params.slug.toLowerCase()
  );
  
  if (!category) {
    notFound();
  }
  
  // Get prompts for this category
  const categoryPrompts = samplePrompts.filter(
    prompt => prompt.category.toLowerCase() === categoryName.toLowerCase()
  );
  
  // Get related categories (exclude current)
  const relatedCategories = categories.filter(
    cat => cat.id !== category.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>→</span>
            <Link href="/categories" className="hover:text-gray-700">Categories</Link>
            <span>→</span>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </div>
          
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl flex items-center justify-center">
                  <span className="text-4xl">{category.icon}</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
                  <p className="text-lg text-gray-600">{category.count} prompts available</p>
                </div>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl">
                {category.description}
              </p>
            </div>
            
            <Button variant="outline" asChild className="ml-4">
              <Link href="/categories" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Categories</span>
              </Link>
            </Button>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder={`Search ${category.name.toLowerCase()} prompts...`}
                className="pl-12 pr-4 h-12 text-base"
              />
            </div>
            <Button variant="outline" className="h-12 px-6">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Prompts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {category.name} Prompts
            </h2>
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Sort by: Most Popular</option>
                <option>Sort by: Newest</option>
                <option>Sort by: Most Used</option>
                <option>Sort by: Difficulty</option>
              </select>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {categoryPrompts.map((prompt) => (
              <Card key={prompt.id} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-transparent hover:border-l-purple-500">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        {prompt.isPremium ? (
                          <Badge variant="premium" className="flex items-center space-x-1">
                            <Crown className="h-3 w-3" />
                            <span>Premium</span>
                          </Badge>
                        ) : (
                          <Badge variant="free">Free</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {prompt.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {prompt.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-2 leading-tight">
                        {prompt.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {prompt.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  {/* Prompt Stats */}
                  <div className="flex items-center justify-between py-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{prompt.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Copy className="h-4 w-4" />
                        <span>{prompt.uses}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{prompt.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{prompt.updatedAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {prompt.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                      {prompt.isPremium ? (
                        <Button size="sm" variant="premium">
                          Unlock with Premium
                        </Button>
                      ) : (
                        <Button size="sm">
                          Use Prompt
                        </Button>
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More or Empty State */}
          {categoryPrompts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">{category.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Coming Soon!
              </h3>
              <p className="text-gray-600 mb-6">
                We&apos;re working on adding more {category.name.toLowerCase()} prompts. 
                Check back soon for new content!
              </p>
              <Button asChild>
                <Link href="/categories">Explore Other Categories</Link>
              </Button>
            </div>
          ) : (
            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                Load More Prompts
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Related Categories
            </h2>
            <p className="text-gray-600">
              Discover prompts in other categories that might interest you
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8">
            {relatedCategories.map((relatedCategory) => (
              <Card key={relatedCategory.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl flex items-center justify-center group-hover:from-purple-100 group-hover:to-blue-100 transition-colors">
                      <span className="text-3xl">{relatedCategory.icon}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg text-center group-hover:text-purple-600 transition-colors">
                        {relatedCategory.name}
                      </CardTitle>
                      <CardDescription className="text-center">
                        {relatedCategory.count} prompts
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    {relatedCategory.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/category/${relatedCategory.name.toLowerCase()}`}>
                      Explore
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
