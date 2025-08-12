import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Crown, ThumbsUp, Copy, Zap, Shield, Users } from "lucide-react";
import Link from "next/link";
import { getHomePageData } from "@/lib/homepage-data";

export default async function Home() {
  const { categories, featuredPrompts, stats } = await getHomePageData()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Premium AI Prompts for{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Every Creator
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover curated, high-quality prompts for ChatGPT, Claude, Midjourney, and more. 
              Boost your productivity with our freemium library of tested prompts.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search prompts for sales, education, SEO, productivity..."
                className="pl-12 pr-4 h-14 text-lg"
              />
              <Button className="absolute right-2 top-2 h-10" variant="premium">
                Search
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="premium" className="h-12 px-8" asChild>
                <Link href="/upgrade" className="flex items-center space-x-2">
                  <Crown className="h-5 w-5" />
                  <span>Get Premium Access</span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                <Link href="/categories">Explore Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose PromptLab?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of creators who trust our curated collection of AI prompts
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">Copy-paste ready prompts that work immediately with any AI tool</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Tested</h3>
              <p className="text-gray-600">Every prompt is tested and refined by AI specialists</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-600">Curated by a community of creators and professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-gray-600">Find the perfect prompts for your specific needs</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full">
                  <CardHeader className="text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-blue-50 rounded-full flex items-center justify-center group-hover:from-purple-100 group-hover:to-blue-100 transition-colors">
                        <span className="text-3xl">{category.icon || '📝'}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg text-center group-hover:text-purple-600 transition-colors">{category.name}</CardTitle>
                        <CardDescription className="text-center">{category.promptsCount} prompts</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Prompts Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Prompts</h2>
            <p className="text-gray-600">Popular and trending prompts from our community</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPrompts.slice(0, 4).map((prompt) => (
              <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">{prompt.title}</CardTitle>
                        {prompt.isPremium && <Badge variant="premium">Premium</Badge>}
                        {!prompt.isPremium && <Badge variant="free">Free</Badge>}
                      </div>
                      <CardDescription className="line-clamp-2">
                        {prompt.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{prompt.likesCount}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Copy className="h-4 w-4" />
                        <span>{prompt.usesCount}</span>
                      </div>
                      <Badge variant="outline">{prompt.difficulty}</Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{prompt.category.name}</Badge>
                      <Badge variant="outline">{prompt.type}</Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      View Prompt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/categories">Explore All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Supercharge Your AI Workflow?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators using PromptLab to get better results from AI tools
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="h-12 px-8" asChild>
              <Link href="/register">Start Free Today</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 border-white text-white hover:bg-white hover:text-purple-600" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
