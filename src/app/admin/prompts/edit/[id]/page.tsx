"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Save,
  Eye,
  Plus,
  X,
  Crown,
  Trash2
} from "lucide-react";
import Link from "next/link";
import { SimpleRichTextEditor } from "@/components/SimpleRichTextEditor";
import { categories, samplePrompts } from "@/data/prompts";
import { notFound } from 'next/navigation';

interface EditPromptPageProps {
  params: {
    id: string;
  };
}

export default function EditPromptPage({ params }: EditPromptPageProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [isPremium, setIsPremium] = useState(false)
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner')
  const [type, setType] = useState<'ChatGPT' | 'Claude' | 'Midjourney' | 'DALL-E' | 'Stable Diffusion' | 'Universal'>('Universal')
  const [loading, setLoading] = useState(true)

  // Find the prompt to edit
  const prompt = samplePrompts.find(p => p.id === params.id);

  useEffect(() => {
    if (!prompt) {
      notFound();
      return;
    }

    // Load existing prompt data
    setTitle(prompt.title);
    setDescription(prompt.description);
    setContent(prompt.content);
    setCategory(prompt.category);
    setTags(prompt.tags);
    setIsPremium(prompt.isPremium);
    setDifficulty(prompt.difficulty);
    setType(prompt.type);
    setLoading(false);
  }, [prompt]);

  if (!prompt) {
    notFound();
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSave = () => {
    // In a real app, you would update the database
    console.log('Updating prompt:', {
      id: params.id,
      title,
      description,
      content,
      category,
      tags,
      isPremium,
      difficulty,
      type
    })
    // Show success message and redirect
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this prompt? This action cannot be undone.')) {
      // In a real app, you would delete from database
      console.log('Deleting prompt:', params.id)
      // Redirect to prompts list
    }
  }

  const handlePreview = () => {
    // Open preview modal or new tab
    console.log('Preview prompt')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/admin/prompts">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Prompts
                </Link>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" onClick={handleDelete} className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Update Prompt
              </Button>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Prompt</h1>
          <p className="mt-2 text-gray-600">
            Modify your AI prompt with rich text editing capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Essential details about your prompt
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a descriptive title for your prompt..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Briefly describe what this prompt does and how to use it..."
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Prompt Content */}
            <Card>
              <CardHeader>
                <CardTitle>Prompt Content</CardTitle>
                <CardDescription>
                  Edit your prompt with rich formatting, links, and images
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleRichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Write your detailed prompt here. You can use Markdown formatting for rich text..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">AI Model Type</Label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value as typeof type)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Universal">Universal</option>
                    <option value="ChatGPT">ChatGPT</option>
                    <option value="Claude">Claude</option>
                    <option value="Midjourney">Midjourney</option>
                    <option value="DALL-E">DALL-E</option>
                    <option value="Stable Diffusion">Stable Diffusion</option>
                  </select>
                </div>

                {/* Difficulty */}
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDifficulty(e.target.value as typeof difficulty)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                {/* Premium Toggle */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="premium"
                    checked={isPremium}
                    onChange={(e) => setIsPremium(e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <Label htmlFor="premium" className="flex items-center">
                    <Crown className="h-4 w-4 mr-1 text-purple-600" />
                    Premium Prompt
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Add tags to help users find your prompt
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button variant="outline" size="sm" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="pr-1">
                        {tag}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-1 hover:bg-transparent"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">{title || 'Untitled Prompt'}</h3>
                  <p className="text-sm text-gray-600">{description || 'No description'}</p>
                  <div className="flex flex-wrap gap-1">
                    {category && (
                      <Badge variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {difficulty}
                    </Badge>
                    {isPremium && (
                      <Badge className="text-xs bg-purple-100 text-purple-800">
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
