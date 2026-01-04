"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Target, Zap } from "lucide-react"

export function MottoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
       staggerChildren: 0.1,
      },
    },
  }

  const MotionButton = motion(Button);

  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl" />
      
      {/* Floating Icons */}
      <motion.div variants={floatingVariants} animate="animate" className="absolute top-20 right-20">
        <Sparkles className="w-8 h-8 text-primary/30" />
      </motion.div>
      <motion.div variants={floatingVariants} animate="animate" className="absolute bottom-32 left-20" style={{ animationDelay: '1s' }}>
        <Target className="w-6 h-6 text-accent/40" />
      </motion.div>
      <motion.div variants={floatingVariants} animate="animate" className="absolute top-40 left-1/4" style={{ animationDelay: '0.5s' }}>
        <Zap className="w-7 h-7 text-primary/25" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center space-y-8"
        >
          {/* Company Badge */}
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 px-6 py-3 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              5fox Technology Solutions
            </Badge>
          </motion.div>

          {/* Main Motto */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-foreground">Innovation</span>{" "}
              <span className="text-primary relative">
                Beyond
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>{" "}
              <span className="text-foreground">Boundaries</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We transform ambitious ideas into digital reality, crafting solutions that push the boundaries 
              of what's possible in technology and business innovation.
            </p>
          </motion.div>

          {/* Value Props */}
          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto"
          >
            {[
              {
                icon: Target,
                title: "Precision Focused",
                description: "Every solution tailored to your exact business needs and objectives"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Rapid development cycles without compromising on quality or security"
              },
              {
                icon: Sparkles,
                title: "Future Ready",
                description: "Cutting-edge technologies that scale and adapt with your growth"
              }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group h-full">
                    <CardContent className="p-0 text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

 
        </motion.div>
      </div>
    </section>
  )
}
