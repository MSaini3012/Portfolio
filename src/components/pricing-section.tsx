"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Check, 
  X, 
  ArrowRight, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  Clock,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown,
  ChevronUp
} from "lucide-react"

const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small businesses and startups",
    price: "$2,999",
    period: "per project",
    popular: false,
    features: {
      included: [
        "Responsive Web Application",
        "Up to 5 pages/screens",
        "Basic SEO optimization",
        "Mobile-first design",
        "Content Management System",
        "Basic analytics integration",
        "3 months free support",
        "SSL certificate setup",
      ],
      excluded: [
      ]
    },
    buttonText: "Get Started",
    buttonVariant: "outline"
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for growing businesses with complex needs",
    price: "$7,999",
    period: "per project",
    popular: true,
    features: {
      included: [
        "Everything in Starter",
        "Custom API development",
        "Payment gateway integration",
        "Advanced animations & UI/UX",
        "Database design & optimization",
        "User authentication system",

      ],
      excluded: [
      ]
    },
    buttonText: "Start Project",
    buttonVariant: "default"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: "Custom",
    period: "based on requirements",
    popular: false,
    features: {
      included: [
        "Everything in Professional",
        "Multi-tenant architecture",
        "Advanced AI/ML integration",
        "Custom DevOps pipeline",
        "Scalable cloud infrastructure",
        "Advanced security & compliance",
        "24/7 priority support",
        "Dedicated project manager",
        "Code review & documentation",
        "Performance monitoring",
        "Disaster recovery setup",
        "Staff training & workshops"
      ],
      excluded: []
    },
    buttonText: "Contact Sales",
    buttonVariant: "outline"
  }
]


export function PricingPage() {
  const ref = useRef(null)
  const faqRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" })
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden" ref={ref}>
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 mb-16"
          >
            <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Transparent Pricing
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Choose Your <span className="text-primary">Perfect Plan</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              From startups to enterprises, we have the right solution for your business needs. 
              All plans include our commitment to quality, security, and innovation.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid lg:grid-cols-3 gap-8 mb-20"
          >
            {pricingPlans.map((plan, index) => (
              <motion.div key={plan.id} variants={itemVariants}>
                <Card className={`h-full relative overflow-hidden transition-all duration-300 ${
                  plan.popular 
                    ? 'border-primary/50 bg-primary/5 scale-105' 
                    : 'border-border/50 hover:border-primary/30'
                } bg-card/50 backdrop-blur-sm`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8 pt-8">
                    <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                    <p className="text-muted-foreground mb-4">{plan.description}</p>
                    <div className="space-y-1">
                      <div className="text-4xl font-bold text-primary">{plan.price}</div>
                      <div className="text-sm text-muted-foreground">{plan.period}</div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <Button 
                      variant={plan.buttonVariant as "default" | "outline"}
                      className="w-full mb-6 h-12 text-lg font-semibold"
                      size="lg"
                    >
                      {plan.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">What's included:</h4>
                      <ul className="space-y-3">
                        {plan.features.included.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {plan.features.excluded.length > 0 && (
                        <>
                          <Separator className="my-4" />
                          <ul className="space-y-3">
                            {plan.features.excluded.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                                <span className="text-sm text-muted-foreground line-through">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </div>
  )
}
