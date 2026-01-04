"use client"

import { motion } from "framer-motion"
import { ArrowRight, Code, Zap, Shield, BarChart3, Database, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden geometric-background"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Mohit Saini • Data Analyst
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance"
          >
            Turning{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Data into Insights
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            I’m a Data Analyst skilled in SQL, Python, Power BI, and data visualization. 
            I analyze complex datasets, build interactive dashboards, and deliver 
            actionable insights that support data-driven business decisions.
          </motion.p>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-sm md:text-base text-muted-foreground"
          >
            📧 <span className="font-medium text-foreground">mrsaini3012@gmail.com</span> &nbsp; | &nbsp;
            📞 <span className="font-medium text-foreground">7901939675</span>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center justify-center gap-8 pt-8"
          >
            {[
              { icon: Database, label: "SQL & Data" },
              { icon: TrendingUp, label: "Analytics" },
              { icon: BarChart3, label: "Dashboards" },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
