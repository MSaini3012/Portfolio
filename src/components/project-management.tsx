"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Plus,
  Edit,
  Trash2,
  Search,
  ExternalLink,
  Github,
  CheckCircle2,
  Clock,
  X,
  Save,
  FolderOpen
} from 'lucide-react'
import { toast } from "sonner"
import { db } from "@/lib/firebase"
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  serverTimestamp
} from "firebase/firestore"

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  category: string
  link?: string
  github?: string
  isCompleted: boolean
  isOngoing: boolean
  createdAt: any
}

const categories = [
  "Web Development", 
  "App Development", 
  "Android Development", 
  "iOS Development", 
  "Data Analytics", 
  "Aritificial Intelligence",
  "Generative AI",
  "Frontend Development",
]

export function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    category: 'Web Development',
    link: '',
    github: '',
    isCompleted: false,
    isOngoing: false
  })

  // Load projects from Firebase
  const loadProjects = async () => {
    try {
      setLoading(true)
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      
      const loadedProjects: Project[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Project))
      
      setProjects(loadedProjects)
    } catch (error) {
      console.error('Error loading projects:', error)
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Title and description are required')
      return
    }

    try {
      const projectData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        createdAt: serverTimestamp()
      }

      if (editingProject) {
        // Update existing project
        await updateDoc(doc(db, "projects", editingProject.id), projectData)
        toast.success('Project updated successfully')
      } else {
        // Add new project
        await addDoc(collection(db, "projects"), projectData)
        toast.success('Project added successfully')
      }

      resetForm()
      setShowModal(false)
      loadProjects()
    } catch (error) {
      console.error('Error saving project:', error)
      toast.error('Failed to save project')
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      tags: '',
      category: 'Web Development',
      link: '',
      github: '',
      isCompleted: false,
      isOngoing: false
    })
    setEditingProject(null)
  }

  // Handle edit
  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      tags: project.tags.join(', '),
      category: project.category,
      link: project.link || '',
      github: project.github || '',
      isCompleted: project.isCompleted,
      isOngoing: project.isOngoing
    })
    setEditingProject(project)
    setShowModal(true)
  }

  // Handle delete
  const handleDelete = async (projectId: string, projectTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${projectTitle}"?`)) {
      return
    }

    try {
      await deleteDoc(doc(db, "projects", projectId))
      toast.success('Project deleted successfully')
      loadProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      toast.error('Failed to delete project')
    }
  }

  // Handle modal close
  const handleModalClose = () => {
    setShowModal(false)
    resetForm()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects Management</h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects - add, edit, and organize your work
          </p>
        </div>
        
        <Button onClick={() => setShowModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Project
        </Button>
      </div>

      {/* Search and Stats */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <FolderOpen className="w-4 h-4" />
                <span>{filteredProjects.length} projects</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>{projects.filter(p => p.isCompleted).length} completed</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-orange-600" />
                <span>{projects.filter(p => p.isOngoing).length} ongoing</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      {loading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Project Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold text-foreground">
                                {project.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                {project.isCompleted && (
                                  <Badge variant="outline" className="text-green-600 border-green-600/20 bg-green-600/10">
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    Completed
                                  </Badge>
                                )}
                                {project.isOngoing && (
                                  <Badge variant="outline" className="text-orange-600 border-orange-600/20 bg-orange-600/10">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Ongoing
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {project.category}
                            </Badge>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            {project.link && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(project.link, '_blank')}
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            )}
                            {project.github && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(project.github, '_blank')}
                              >
                                <Github className="w-3 h-3" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(project)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(project.id, project.title)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {project.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredProjects.length === 0 && !loading && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-12 text-center">
                <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by adding your first project.'}
                </p>
                {!searchTerm && (
                  <Button onClick={() => setShowModal(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Your First Project
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Add/Edit Project Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={handleModalClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50"
            >
              <Card className="bg-card border-border shadow-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {editingProject ? 'Edit Project' : 'Add New Project'}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleModalClose}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Project Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter project title"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        title='Category'
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe your project"
                        rows={4}
                        required
                      />
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <Label htmlFor="tags">Technologies/Tags</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        placeholder="React, Node.js, MongoDB (comma separated)"
                      />
                      <p className="text-xs text-muted-foreground">
                        Separate tags with commas
                      </p>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="link">Live Demo URL</Label>
                        <Input
                          id="link"
                          value={formData.link}
                          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                          placeholder="https://example.com"
                          type="url"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub URL</Label>
                        <Input
                          id="github"
                          value={formData.github}
                          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                          placeholder="https://github.com/username/repo"
                          type="url"
                        />
                      </div>
                    </div>

                    {/* Status Switches */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="completed">Completed</Label>
                          <p className="text-xs text-muted-foreground">
                            Mark as completed project
                          </p>
                        </div>
                        <Switch
                          id="completed"
                          checked={formData.isCompleted}
                          onCheckedChange={(checked) => setFormData({ ...formData, isCompleted: checked })}
                           className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-200 border border-border"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="ongoing">Ongoing</Label>
                          <p className="text-xs text-muted-foreground">
                            Mark as work in progress
                          </p>
                        </div>
                        <Switch
                          id="ongoing"
                          checked={formData.isOngoing}
                          onCheckedChange={(checked) => setFormData({ ...formData, isOngoing: checked })}
                           className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-200 border border-border"

                        />
                      </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-3 pt-6">
                      <Button type="submit" className="flex-1 gap-2">
                        <Save className="w-4 h-4" />
                        {editingProject ? 'Update Project' : 'Add Project'}
                      </Button>
                      <Button type="button" variant="outline" onClick={handleModalClose}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
