"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Award,
  Layers,
  Rocket,
  BarChart3,
  Database,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  { icon: Award, value: "6+", label: "Analytics Projects" },
  { icon: BarChart3, value: "10+", label: "Tools & Technologies" },
  { icon: Layers, value: "2", label: "Industry Dashboards" },
]

const features = [
  {
    icon: BarChart3,
    title: "Data Analysis & Insights",
    desc: "Performing data cleaning, exploratory data analysis, and trend identification to extract meaningful insights.",
  },
  {
    icon: Database,
    title: "SQL & Data Querying",
    desc: "Writing optimized SQL queries using joins, subqueries, and window functions to analyze structured datasets.",
  },
  {
    icon: Rocket,
    title: "Dashboard & Reporting",
    desc: "Designing interactive Power BI dashboards with DAX measures for KPI tracking and business storytelling.",
  },
]

export function IntroSection() {
  const ref = useRef(null)
  const statsRef = useRef(null)
  const featuresRef = useRef(null)

  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" })
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.6 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20" ref={ref}>
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
                <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
                About Me
              </Badge>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight">
                Passionate About{" "}
                <span className="text-primary">
                  Turning Data into Actionable Insights
                </span>
              </h2>

              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I’m a Data Analyst with hands-on experience in SQL, Python, and business
                  intelligence tools like Power BI. I specialize in transforming raw data
                  into meaningful insights that support data-driven decision making.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  From building interactive dashboards and defining KPIs to performing
                  exploratory data analysis and writing optimized queries, I focus on
                  delivering insights that create real business impact.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Features */}
          <motion.div
            ref={featuresRef}
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 10 }}
              >
                <Card className="p-6 hover:border-primary/30 transition-all duration-300 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary text-primary-foreground rounded-xl">
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          variants={containerVariants}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statsVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="p-6 hover:border-primary/30 transition-all duration-300 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-0 text-center">
                  <div className="mb-4 inline-block">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <stat.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
