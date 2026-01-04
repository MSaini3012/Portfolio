"use client"

import React, { useState } from 'react'
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Heart, 
  Coffee, 
  Globe, 
  Send,
  CheckCircle2,
  Mail,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Zap,
  Shield,
  Target
} from 'lucide-react'
import { toast } from "sonner"

const CareerPage = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
    resume: null as File | null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast.success('Application submitted successfully! We\'ll get back to you soon.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        message: '',
        resume: null
      })
      setIsSubmitting(false)
    }, 1500)
  }

  const benefits = [
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description: "Career development and learning opportunities"
    },
    {
      icon: Coffee,
      title: "Flexible Work",
      description: "Remote work options and flexible schedules"
    },
    {
      icon: Users,
      title: "Great Team",
      description: "Collaborative and supportive work environment"
    },
  ]

  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "We push boundaries and embrace new technologies"
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We maintain the highest ethical standards"
    },
    {
      icon: Zap,
      title: "Excellence",
      description: "We strive for excellence in everything we do"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of teamwork"
    }
  ]

  return (
    <div className="min-h-screen bg-background" ref={ref}>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Briefcase className="w-4 h-4 mr-2" />
              Join Our Team
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              Build Your Career with <span className="text-primary">5fox</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Join a team of passionate innovators creating cutting-edge software solutions. 
              Shape the future of technology while growing your career.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-200 dark:border-orange-800">
              <CardContent className="p-8 text-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
                    <Briefcase className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    No Current Openings
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    While we don't have any open positions at the moment, we're always looking for exceptional talent. 
                    Submit your information below and we'll reach out when the right opportunity arises.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>We typically hire new team members quarterly</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Why Choose <span className="text-primary">5fox</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe in creating an environment where innovation thrives and careers flourish
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Our <span className="text-primary">Values</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                className="text-center space-y-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Future Opportunities Form */}
      {/* <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Join Our <span className="text-primary">Talent Pool</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Be the first to know about new opportunities. Submit your details and we'll reach out when we have a role that matches your skills.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Interested Position</Label>
                      <select
                        id="position"
                        title='Interested Position'
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="">Select a role</option>
                        <option value="frontend-developer">Frontend Developer</option>
                        <option value="backend-developer">Backend Developer</option>
                        <option value="fullstack-developer">Full Stack Developer</option>
                        <option value="mobile-developer">Mobile Developer</option>
                        <option value="ui-ux-designer">UI/UX Designer</option>
                        <option value="product-manager">Product Manager</option>
                        <option value="devops-engineer">DevOps Engineer</option>
                        <option value="qa-engineer">QA Engineer</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <select
                      id="experience"
                      title='Years of Experience'
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">Select experience level</option>
                      <option value="0-1">0-1 years (Entry Level)</option>
                      <option value="1-3">1-3 years (Junior)</option>
                      <option value="3-5">3-5 years (Mid Level)</option>
                      <option value="5-8">5-8 years (Senior)</option>
                      <option value="8+">8+ years (Lead/Principal)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about yourself</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your background, skills, and what you're looking for in your next role..."
                      rows={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume/CV</Label>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      Accepted formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Application
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section> */}

      {/* Contact Info */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      Have Questions?
                    </h3>
                    <p className="text-muted-foreground">
                      We'd love to hear from you. Get in touch with our HR team.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>5foxdevelopers@gmail.com</span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
                      We're an equal opportunity employer
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CareerPage
