"use client"

import React, { useState, useEffect, JSX } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Card, 
  CardContent 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Users, 
  Globe, 
  Clock,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Scale,
  CreditCard,
  UserCheck,
  AlertTriangle,
  Gavel
} from 'lucide-react'

const LegalDocuments = () => {
  const [activeSection, setActiveSection] = useState<string>('introduction')
  const [acceptedPolicy, setAcceptedPolicy] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  const privacySections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: <Shield className="w-5 h-5" />,
      content: "5fox is committed to protecting the privacy and security of our clients' and website visitors' personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our software development services."
    },
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: <Eye className="w-5 h-5" />,
      content: "We collect contact details, project requirements, technical documentation, payment information, communication records, IP addresses, website usage data, cookies, and system logs to provide our services effectively."
    },
    {
      id: "information-usage",
      title: "How We Use Your Information",
      icon: <Users className="w-5 h-5" />,
      content: "We use collected information to develop custom software solutions, communicate project progress, process payments, provide technical support, improve our services, and comply with legal obligations."
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: <Globe className="w-5 h-5" />,
      content: "We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers, legal authorities when required, or business partners with your explicit consent."
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: <Lock className="w-5 h-5" />,
      content: "We implement industry-standard security measures including encryption, secure development practices, access controls, regular security audits, and confidentiality agreements with all team members."
    },
    {
      id: "project-protection",
      title: "Client Project Protection",
      icon: <FileText className="w-5 h-5" />,
      content: "All client code, ideas, and intellectual property remain confidential. We implement strict access controls, secure storage with backups, non-disclosure agreements, and secure deletion policies."
    },
    {
      id: "user-rights",
      title: "Your Rights",
      icon: <CheckCircle2 className="w-5 h-5" />,
      content: "You have the right to access, correct, or delete your personal information, opt-out of marketing communications, receive a copy of your data, and lodge complaints with data protection authorities."
    },
    {
      id: "data-retention",
      title: "Data Retention",
      icon: <Clock className="w-5 h-5" />,
      content: "We retain personal information only as long as necessary for the purposes outlined in this policy or as required by law. Project-related data is retained according to our service agreements."
    }
  ]

  const termsSections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: <FileText className="w-5 h-5" />,
      content: "By accessing and using 5fox services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."
    },
    {
      id: "services-description",
      title: "Description of Services",
      icon: <Users className="w-5 h-5" />,
      content: "5fox provides custom software development services, web applications, mobile applications, system integration, technical consulting, and ongoing maintenance and support. Our services are tailored to transform your ideas into functional software solutions."
    },
    {
      id: "user-eligibility",
      title: "User Eligibility & Responsibilities",
      icon: <UserCheck className="w-5 h-5" />,
      content: "You must be at least 18 years old or have legal capacity to enter contracts. You are responsible for providing accurate information, maintaining account security, using services lawfully, and complying with all applicable regulations."
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      icon: <Scale className="w-5 h-5" />,
      content: "Upon full payment, clients retain ownership of custom-developed deliverables. 5fox retains rights to general methodologies, tools, and frameworks. Third-party components remain subject to their respective licenses."
    },
    {
      id: "payment-terms",
      title: "Payment & Billing Terms",
      icon: <CreditCard className="w-5 h-5" />,
      content: "Projects require signed agreements with defined scope, timeline, and payment terms. Payment schedules may include upfront deposits, milestone payments, or monthly retainers. Late payments may incur charges and service suspension."
    },
    {
      id: "service-limitations",
      title: "Service Limitations",
      icon: <AlertTriangle className="w-5 h-5" />,
      content: "Services are provided 'as-is' without warranties. We do not guarantee uninterrupted service, specific performance metrics, or compatibility with all third-party systems. Liability is limited to the total project value."
    },
    {
      id: "termination",
      title: "Termination & Cancellation",
      icon: <Clock className="w-5 h-5" />,
      content: "Either party may terminate agreements with written notice as specified in individual contracts. Upon termination, clients receive deliverables for completed and paid work. Confidentiality obligations survive termination."
    },
    {
      id: "dispute-resolution",
      title: "Dispute Resolution",
      icon: <Gavel className="w-5 h-5" />,
      content: "Disputes will be resolved through negotiation, mediation, or arbitration in Amritsar, Punjab, India. These terms are governed by Indian law. Changes to terms will be communicated with 30 days notice."
    }
  ]

  interface Section {
    id: string;
    title: string;
    icon: JSX.Element;
    content: string;
  }

  const NavigationItem = ({ section, isActive, onClick }: { section: Section; isActive: boolean; onClick: (id: string) => void }) => (
    <motion.button
      onClick={() => onClick(section.id)}
      className={`w-full text-left p-4 rounded-lg transition-all duration-300 group ${
        isActive 
          ? 'bg-accent/20 backdrop-blur-sm border border-accent/30' 
          : 'hover:bg-muted/50 border border-transparent'
      }`}
      whileHover={{ x: 8 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg transition-all duration-300 ${
          isActive 
            ? 'bg-primary/20 text-primary' 
            : 'bg-muted text-muted-foreground group-hover:text-foreground'
        }`}>
          {section.icon}
        </div>
        <span className={`font-medium transition-colors duration-300 ${
          isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
        }`}>
          {section.title}
        </span>
        {isActive && (
          <motion.div
            className="ml-auto"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4 text-primary" />
          </motion.div>
        )}
      </div>
    </motion.button>
  )

  const ContentSection = ({ section, isActive }: { section: Section, isActive: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3, 
        y: isActive ? 0 : 20,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`${isActive ? 'block' : 'hidden'}`}
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-300">
        <CardContent className="p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                {React.cloneElement(section.icon, { 
                  className: "w-6 h-6 text-primary" 
                })}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  {section.title}
                </h2>
                <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
              </div>
            </div>
            
            <motion.p 
              className="text-muted-foreground leading-relaxed text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {section.content}
            </motion.p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const TabContent = ({ sections, activeSection, setActiveSection, documentType }: {
    sections: Section[], 
    activeSection: string, 
    setActiveSection: (id: string) => void,
    documentType: string
  }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Navigation Sidebar */}
      <motion.div 
        className="lg:col-span-1"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="sticky top-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            {documentType} Sections
          </h3>
          <div className="space-y-2">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
              >
                <NavigationItem
                  section={section}
                  isActive={activeSection === section.id}
                  onClick={setActiveSection}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content Area */}
      <motion.div 
        className="lg:col-span-2"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className="space-y-6">
          {sections.map((section) => (
            <ContentSection
              key={section.id}
              section={section}
              isActive={activeSection === section.id}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Animation */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center py-20 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Scale className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium text-sm">5fox Legal Documents</span>
          </motion.div>
          
          <motion.h1 
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Legal Information
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Our commitment to transparency includes clear privacy policies and terms of service 
            to protect both our clients and our business relationships.
          </motion.p>
          
          <motion.div
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Badge variant="outline" className="border-border/20 text-muted-foreground bg-accent/5">
              Last Updated: September 27, 2025
            </Badge>
          </motion.div>
        </motion.div>

        {/* Main Content with Tabs */}
        <div className="max-w-7xl mx-auto px-4 pb-20">
          <Tabs defaultValue="privacy" className="w-full">
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50 backdrop-blur-sm">
                <TabsTrigger value="privacy" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </TabsTrigger>
                <TabsTrigger value="terms" className="flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  Terms of Service
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <TabsContent value="privacy">
              <TabContent 
                sections={privacySections} 
                activeSection={activeSection} 
                setActiveSection={setActiveSection}
                documentType="Privacy Policy"
              />
            </TabsContent>

            <TabsContent value="terms">
              <TabContent 
                sections={termsSections} 
                activeSection={activeSection} 
                setActiveSection={setActiveSection}
                documentType="Terms of Service"
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Contact Section */}
        <motion.div 
          className="max-w-4xl mx-auto px-4 pb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Get in Touch</h3>
                <p className="text-muted-foreground">For legal questions or clarifications</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Mail, label: "Email", value: "5foxdevelopers@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+91 84375 16789" },
                  { icon: MapPin, label: "Address", value: "Amritsar, Punjab, India" }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    className="text-center p-6 bg-accent/5 rounded-xl border border-border/20 hover:border-border/40 transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                  >
                    <contact.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <h4 className="font-semibold text-foreground mb-1">{contact.label}</h4>
                    <p className="text-muted-foreground text-sm">{contact.value}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dual Acceptance Section */}
        <motion.div 
          className="max-w-4xl mx-auto px-4 pb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Privacy Policy Acceptance */}
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6 text-center">
                <motion.div
                  animate={acceptedPolicy ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {acceptedPolicy ? (
                    <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  ) : (
                    <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  )}
                </motion.div>
                
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Privacy Policy
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {acceptedPolicy 
                    ? "✓ Privacy Policy Acknowledged"
                    : "Acknowledge our privacy practices"
                  }
                </p>
                
                {!acceptedPolicy && (
                  <Button 
                    onClick={() => setAcceptedPolicy(true)}
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Accept Privacy Policy
                    </motion.button>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Terms of Service Acceptance */}
            <Card className="bg-gradient-to-r from-secondary/10 to-secondary/5 backdrop-blur-sm border-secondary/20">
              <CardContent className="p-6 text-center">
                <motion.div
                  animate={acceptedTerms ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {acceptedTerms ? (
                    <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  ) : (
                    <Scale className="w-12 h-12 text-primary mx-auto mb-4" />
                  )}
                </motion.div>
                
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Terms of Service
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {acceptedTerms 
                    ? "✓ Terms of Service Agreed"
                    : "Agree to our service terms"
                  }
                </p>
                
                {!acceptedTerms && (
                  <Button 
                    onClick={() => setAcceptedTerms(true)}
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Accept Terms of Service
                    </motion.button>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center pb-12 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <p className="text-muted-foreground/60 text-sm">
            © 2025 5fox Software Solutions. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default LegalDocuments
