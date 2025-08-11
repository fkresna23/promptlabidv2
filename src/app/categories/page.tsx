import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, ChevronRight } from "lucide-react";
import Link from "next/link";
import { categories, samplePrompts } from "@/data/prompts";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover expertly crafted AI prompts organized by your specific needs. 
              From sales and marketing to productivity and education.
            </p>
            
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search categories or prompts..."
                  className="pl-12 pr-4 h-12 text-base"
                />
              </div>
              <Button variant="outline" className="h-12 px-6" size="default">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => {
              // Get prompts for this category
              const categoryPrompts = samplePrompts.filter(
                prompt => prompt.category === category.name
              );
              
              return (
                <Card key={category.id} className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-l-4 border-l-transparent hover:border-l-purple-500">
                  <CardHeader className="text-center pb-4">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl flex items-center justify-center group-hover:from-purple-100 group-hover:to-blue-100 transition-all duration-300 group-hover:scale-110">
                        <span className="text-4xl">{category.icon}</span>
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-center group-hover:text-purple-600 transition-colors">
                          {category.name}
                        </CardTitle>
                        <CardDescription className="text-center font-medium">
                          {category.count} prompts available
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                    
                    {/* Preview badges for prompt types in this category */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {categoryPrompts.slice(0, 2).map((prompt) => (
                        <Badge 
                          key={prompt.id} 
                          variant={prompt.isPremium ? "premium" : "free"}
                          className="text-xs"
                        >
                          {prompt.isPremium ? "Premium" : "Free"}
                        </Badge>
                      ))}
                      {categoryPrompts.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{categoryPrompts.length - 2} more
                        </Badge>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full group-hover:bg-purple-600 transition-colors" 
                      asChild
                    >
                      <Link href={`/category/${category.name.toLowerCase()}`} className="flex items-center justify-center space-x-2">
                        <span>Explore {category.name}</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Prompts by Category */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Prompts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get a preview of our most popular prompts across different categories
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {samplePrompts.slice(0, 4).map((prompt) => (
              <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {prompt.category}
                        </Badge>
                        {prompt.isPremium ? (
                          <Badge variant="premium">Premium</Badge>
                        ) : (
                          <Badge variant="free">Free</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg mb-2">{prompt.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {prompt.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <span>👍</span>
                        <span>{prompt.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>📋</span>
                        <span>{prompt.uses}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {prompt.difficulty}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      View Prompt
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Ready to access our complete library of AI prompts?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="premium" asChild>
                <Link href="/upgrade">Get Premium Access</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
