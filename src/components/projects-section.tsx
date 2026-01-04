"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ExternalLink, Github, ArrowRight, Clock, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"

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
  "All",
  // "Web Development",
  // "App Development",
  // "Generative AI",
  // // "Dashboards",
  // // "Real-Time Apps",
  // // "EdTech",
  // "Frontend Development",
]

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("All")
  const [showAll, setShowAll] = useState(false)
  const [projects, setProjects] = useState<Project[]>([{
  id: "spotify-top50",
  title: "Spotify Top 50 Analysis Dashboard",
  description:
    "Power BI dashboard analyzing Spotify Top 50 global songs using DAX measures, trends, artist performance, and ranking insights. Includes a modern Figma-based dashboard layout.",
  tags: ["Power BI", "DAX", "Data Analytics", "Figma"],
  category: "All",
  github: "https://github.com/MSaini3012/Spotify_Top50.git",
  isCompleted: true,
  isOngoing: false,
  createdAt: null,
},
{
  id: "blinkit-data",
  title: "BlinkIT Sales Data Analysis",
  description:
    "Comprehensive Power BI analysis of BlinkIT sales data using advanced DAX measures to track KPIs, sales trends, outlet performance, and business insights.",
  tags: ["Power BI", "DAX", "Business Analytics"],
  category: "All",
  github: "https://github.com/MSaini3012/BlinkIT_Data.git",
  isCompleted: true,
  isOngoing: false,
  createdAt: null,
},
])
  const [loading, setLoading] = useState(false)


  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  const displayedProjects = filteredProjects
  const hasMoreProjects = filteredProjects.length > 6



  return (
    <section id="projects" className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            My Work
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Explore my portfolio to see the projects I’ve built, showcasing my skills in crafting modern, scalable, and user-focused web applications.
          </p>

        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setActiveCategory(category)
                setShowAll(false)
              }}
              className={`transition-all duration-300 ${activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {loading ? (
          /* Loading Skeleton */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300 overflow-hidden">
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {project.category}
                          </Badge>
                          <div className="flex items-center gap-2">
                            {/* Status Indicators */}
                            {project.isCompleted && (
                              <div className="flex items-center text-xs text-green-600">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                <span>Completed</span>
                              </div>
                            )}
                            {project.isOngoing && (
                              <div className="flex items-center text-xs text-orange-600">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>Ongoing</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-2 pt-2">
                        {project.link && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            asChild
                          >
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        {project.github && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            asChild
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-3 w-3 mr-2" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Show More Button */}
            {hasMoreProjects && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-center mt-12"
              >
                <Button
                  onClick={() => setShowAll(!showAll)}
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300"
                >
                  {showAll ? 'Show Less Projects' : 'Show More Projects'}
                  <ArrowRight className={`ml-2 h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
                </Button>
              </motion.div>
            )}
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-12"
        >
          <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">
                  Have a project idea you'd like to discuss?
                </h3>
                <p className="text-muted-foreground">
                  I'm always excited to collaborate on innovative and impactful projects.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
