"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Shield, Cloud, Smartphone, Database, Cog, ArrowRight, CheckCircle,Zap,Layers,Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3 } from "lucide-react"


const services = [
  {
    icon: BarChart3,
    title: "Data Analysis & Insights",
    description:
      "Analyzing complex datasets to uncover trends, patterns, and actionable business insights.",
    features: [
      "Exploratory Data Analysis (EDA)",
      "Data Cleaning & Preparation",
      "Trend & Pattern Analysis",
      "Insight Generation",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Database,
    title: "SQL & Data Querying",
    description:
      "Extracting, transforming, and analyzing data efficiently using optimized SQL queries.",
    features: [
      "Joins, CTEs & Subqueries",
      "Window Functions",
      "Performance Optimization",
      "Relational Databases",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Layers,
    title: "Dashboard & Data Visualization",
    description:
      "Designing interactive dashboards that communicate insights clearly to stakeholders.",
    features: [
      "Power BI & Tableau",
      "Interactive Reports",
      "KPI & Metric Tracking",
      "Business Storytelling",
    ],
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Cog,
    title: "Python for Data Analytics",
    description:
      "Using Python to automate analysis, manipulate datasets, and perform statistical analysis.",
    features: [
      "Pandas & NumPy",
      "Data Transformation",
      "Automation Scripts",
      "Statistical Analysis",
    ],
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: Cloud,
    title: "Data Reporting & Business Support",
    description:
      "Providing data-backed reports and insights to support data-driven decision making.",
    features: [
      "Business Reports",
      "Ad-hoc Analysis",
      "Stakeholder Communication",
      "Insight Presentation",
    ],
    color: "from-orange-500 to-red-500",
  },
]

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            My Expertise
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
            What I <span className="text-primary">Do Best</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            I specialize in building modern, scalable, and real-time web applications using a wide range of technologies —
            from frontend to backend to deployment.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300 overflow-hidden">
                <CardHeader className="space-y-4">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} p-0.5`}>
                      <div className="w-full h-full bg-card rounded-lg flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <motion.div
                      className={`absolute inset-0 w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>

                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 + featureIndex * 0.05 + 0.3, duration: 0.4 }}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold"
          >
            Get Custom Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div> */}
      </div>
    </section>
  )
}
