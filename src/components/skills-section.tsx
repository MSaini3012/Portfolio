"use client"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code2,
  Smartphone,
  Server,
  Layers,
  BookOpen,
  Globe,
} from "lucide-react"

// You'll need to install react-icons: npm install react-icons
import {
  SiPython,
  SiPandas,
  SiNumpy,
  SiTableau,
  SiJupyter,
  SiGoogleanalytics,
} from "react-icons/si";

import { BarChart3, Database } from "lucide-react";

import {
  SiOpenai,
  SiHuggingface,
  SiNotion,
} from "react-icons/si";

import {
  Bot,
  Sparkles,
  Brain,
  Wand2,
} from "lucide-react";


const skillCategories = [
{
  title: "Data Analytics",
  description: "Data-driven insights through analysis, visualization, and reporting",
  icon: BarChart3,
  skills: [
    { name: "Python", icon: SiPython, lightColor: "#3776AB", darkColor: "#3776AB" },
    { name: "Pandas", icon: SiPandas, lightColor: "#150458", darkColor: "#EAEAEA" },
    { name: "NumPy", icon: SiNumpy, lightColor: "#013243", darkColor: "#4FC3F7" },
    { name: "Power BI", icon: BarChart3, lightColor: "#F2C811", darkColor: "#F2C811" },
    { name: "Tableau", icon: SiTableau, lightColor: "#E97627", darkColor: "#E97627" },
    { name: "SQL", icon: Database, lightColor: "#336791", darkColor: "#336791" },
    { name: "Jupyter Notebook", icon: SiJupyter, lightColor: "#F37626", darkColor: "#F37626" },
    { name: "Google Analytics", icon: SiGoogleanalytics, lightColor: "#E37400", darkColor: "#E37400" },
  ],
},
{
  title: "AI Tools & Assistants",
  description: "AI-powered tools that enhance productivity, coding, and analysis",
  icon: Brain,
  skills: [
    {
      name: "ChatGPT",
      icon: SiOpenai,
      lightColor: "#10A37F",
      darkColor: "#10A37F",
    },
    {
      name: "Claude AI",
      icon: Bot,
      lightColor: "#6B7280",
      darkColor: "#E5E7EB",
    },
    {
      name: "GitHub Copilot",
      icon: Wand2,
      lightColor: "#000000",
      darkColor: "#FFFFFF",
    },
    {
      name: "Hugging Face",
      icon: SiHuggingface,
      lightColor: "#FFD21E",
      darkColor: "#FFD21E",
    },
    {
      name: "Notion AI",
      icon: SiNotion,
      lightColor: "#000000",
      darkColor: "#FFFFFF",
    },
    {
      name: "Prompt Engineering",
      icon: Sparkles,
      lightColor: "#A855F7",
      darkColor: "#C084FC",
    },
  ],
},


];


export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  }

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  }

  return (
    <section id="skills" className="py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-20"
        >
          <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 px-4 py-2">
            <Layers className="w-4 h-4 mr-2" />
            My Tech Stack
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-balance leading-tight">
            Technologies I <span className="text-primary">Work With</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            I'm passionate about building modern, scalable, and user-focused applications using the latest web technologies.
            Here's a glimpse of the tools and frameworks I use to bring ideas to life.
          </p>
        </motion.div>


        {/* Skills Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon
            return (
              <motion.div key={category.title} variants={categoryVariants}>
                <Card className="p-8 h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 group overflow-hidden relative">
                  {/* Consistent Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardContent className="p-0 relative z-10">
                    {/* Category Header */}
                    <div className="flex items-start space-x-4 mb-8">
                      <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-300">
                        <CategoryIcon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {category.skills.map((skill, skillIndex) => {
                        const SkillIcon = skill.icon
                        return (
                          <motion.div
                            key={skill.name}
                            variants={skillVariants}
                            whileHover={{
                              scale: 1.05,
                              y: -5,
                              transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="group/skill"
                          >
                            <Card className="p-4 bg-background/80 backdrop-blur-sm border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-pointer">
                              <CardContent className="p-0 text-center space-y-3">
                                <div className="flex justify-center">
                                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover/skill:bg-primary/20 group-hover/skill:scale-110 transition-all duration-300">
                                    <SkillIcon
                                      className="w-6 h-6 transition-transform duration-300 dark:hidden"
                                      style={{ color: skill.lightColor }}
                                    />
                                    <SkillIcon
                                      className="w-6 h-6 transition-transform duration-300 hidden dark:block"
                                      style={{ color: skill.darkColor }}
                                    />
                                  </div>
                                </div>
                                <h4 className="text-sm font-semibold text-foreground group-hover/skill:text-primary transition-colors duration-300">
                                  {skill.name}
                                </h4>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
