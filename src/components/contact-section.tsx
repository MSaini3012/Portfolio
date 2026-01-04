"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Mail, Phone, MapPin, Send, Clock, Users, CheckCircle, AlertCircle, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { db } from "@/lib/firebase"
import app from "@/lib/firebase"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { initializeAppCheck, ReCaptchaV3Provider, getToken } from "firebase/app-check"

// Enhanced Zod validation schema with phone field
const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),
  company: z.string().optional(),
  subject: z.string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
  contactMethod: z.enum(["email", "phone", "both"], {
    message: "Please select a preferred contact method",
  }),
})

type ContactFormData = z.infer<typeof contactFormSchema>



const contactMethods = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "both", label: "Both" },
]

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | 'app-check-failed' | null>(null)
  const [appCheckInitialized, setAppCheckInitialized] = useState(false)
  const [appCheckError, setAppCheckError] = useState<string | null>(null)
  const dbRef = collection(db, "contacts")

  // Initialize App Check properly
  useEffect(() => {
    const initAppCheck = async () => {
      try {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
        
        if (!siteKey) {
          console.warn('reCAPTCHA site key not found in environment variables')
          setAppCheckError('reCAPTCHA not configured')
          return
        }

        // Check if we're in development
        const isDevelopment = process.env.NODE_ENV === 'development'
        
        if (isDevelopment) {
          // Enable debug mode for development
          (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true
          console.log('App Check debug mode enabled for development')
        }

        const appCheck = initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(siteKey),
          isTokenAutoRefreshEnabled: true,
        })

        // Test getting a token to verify it's working
        const token = await getToken(appCheck)
        if (token) {
          setAppCheckInitialized(true)
          console.log('App Check initialized successfully')
        } else {
          throw new Error('Failed to get App Check token')
        }

      } catch (error: any) {
        console.error('App Check initialization failed:', error)
        setAppCheckError(error.message)
        
        // Don't block form submission in development
        if (process.env.NODE_ENV === 'development') {
          setAppCheckInitialized(true)
        }
      }
    }

    // Only initialize on client side
    if (typeof window !== 'undefined') {
      initAppCheck()
    }
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    },
  })

  const messageLength = watch("message")?.length || 0

  // Phone number formatting function
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters except +
    const cleaned = value.replace(/[^\d+]/g, '')
    
    // If it starts with +91 (India), format as +91 XXXXX XXXXX
    if (cleaned.startsWith('+91')) {
      const number = cleaned.substring(3)
      if (number.length <= 5) {
        return `+91 ${number}`
      } else if (number.length <= 10) {
        return `+91 ${number.slice(0, 5)} ${number.slice(5)}`
      }
      return `+91 ${number.slice(0, 5)} ${number.slice(5, 10)}`
    }
    
    // If it starts with just +, keep it as is
    if (cleaned.startsWith('+')) {
      return cleaned
    }
    
    // If it's an Indian number without country code, add +91
    if (cleaned.length === 10 && !cleaned.startsWith('+')) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
    }
    
    return cleaned
  }

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitStatus(null)

      // Format phone number before submission
      const formattedPhone = formatPhoneNumber(data.phone)

      // Add document with App Check status
      const response = await addDoc(dbRef, {
        name: data.name,
        email: data.email,
        phone: formattedPhone,
        company: data.company || "",
        subject: data.subject,
        message: data.message,
        contactMethod: data.contactMethod,
        timestamp: Timestamp.now(),
        appCheckInitialized: appCheckInitialized,
        appCheckError: appCheckError,
        userAgent: navigator.userAgent,
        url: window.location.href,
      })

      if (response.id) {
        setIsSubmitted(true)
        setSubmitStatus('success')
        reset()
        toast.success("Message sent successfully! We'll get back to you soon.")
        
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error: any) {
      console.error('Form submission error:', error)
      
      if (error.code === 'failed-precondition') {
        setSubmitStatus('app-check-failed')
        toast.error("Security verification failed. Please refresh the page and try again.")
      } else {
        setSubmitStatus('error')
        toast.error("Failed to send message. Please try again.")
      }
    } finally {
      setTimeout(() => {
        setSubmitStatus(null)
      }, 10000)
    }
  }

  return (
    <section id="contact" className="py-12 bg-muted/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      Message Sent Successfully!
                    </>
                  ) : (
                    <>
                      <span>Send us a message</span>
                      {appCheckInitialized ? (
                        <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full">
                          <Shield className="h-3 w-3 text-green-600" />
                          <span className="text-xs text-green-700 font-medium">Protected</span>
                        </div>
                      ) : appCheckError ? (
                        <div className="flex items-center space-x-1 bg-red-50 px-2 py-1 rounded-full">
                          <AlertCircle className="h-3 w-3 text-red-600" />
                          <span className="text-xs text-red-700 font-medium">Security Issue</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
                          <Clock className="h-3 w-3 text-yellow-600" />
                          <span className="text-xs text-yellow-700 font-medium">Initializing</span>
                        </div>
                      )}
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* App Check Error Display */}
                {appCheckError && (
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-yellow-800 font-medium">Security Notice</p>
                        <p className="text-yellow-700 text-sm">{appCheckError}</p>
                        <p className="text-yellow-700 text-xs mt-1">
                          Form will still work, but security features may be limited.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <p className="text-red-800">Failed to send message. Please try again.</p>
                  </div>
                )}

                {submitStatus === 'app-check-failed' && (
                  <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <p className="text-orange-800">Security verification failed. Please refresh the page and try again.</p>
                  </div>
                )}

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Thank you for reaching out!</p>
                    <p className="text-muted-foreground">
                      We've received your message and will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    {/* Name and Email Row */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          {...register("name")}
                          placeholder="John Doe"
                          className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          aria-invalid={errors.name ? "true" : "false"}
                          disabled={isSubmitting}
                        />
                        {errors.name && (
                          <p id="name-error" role="alert" className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          placeholder="john@example.com"
                          className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          aria-invalid={errors.email ? "true" : "false"}
                          disabled={isSubmitting}
                        />
                        {errors.email && (
                          <p id="email-error" role="alert" className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone Number Field */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number *
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          {...register("phone")}
                          placeholder="+91 98765 43210"
                          className={`pl-10 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          aria-invalid={errors.phone ? "true" : "false"}
                          disabled={isSubmitting}
                          onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value)
                            e.target.value = formatted
                            register("phone").onChange(e)
                          }}
                        />
                      </div>
                      {errors.phone && (
                        <p id="phone-error" role="alert" className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.phone.message}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Include country code (e.g., +91 for India, +1 for US)
                      </p>
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-medium">
                        Company (Optional)
                      </Label>
                      <Input
                        id="company"
                        {...register("company")}
                        placeholder="Your Company Name"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        {...register("subject")}
                        placeholder="What can we help you with?"
                        className={errors.subject ? "border-red-500 focus-visible:ring-red-500" : ""}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        aria-invalid={errors.subject ? "true" : "false"}
                        disabled={isSubmitting}
                      />
                      {errors.subject && (
                        <p id="subject-error" role="alert" className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Preferred Contact Method */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Preferred Contact Method *</Label>
                      <div className="flex gap-6">
                        {contactMethods.map((method) => (
                          <div key={method.value} className="flex items-center space-x-2">
                            <input
                              {...register("contactMethod")}
                              type="radio"
                              value={method.value}
                              id={`contact-${method.value}`}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                              disabled={isSubmitting}
                            />
                            <Label 
                              htmlFor={`contact-${method.value}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {method.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {errors.contactMethod && (
                        <p role="alert" className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.contactMethod.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium flex justify-between">
                        <span>Message *</span>
                        <span className={`text-xs ${messageLength > 900 ? 'text-red-600' : 'text-muted-foreground'}`}>
                          {messageLength}/1000
                        </span>
                      </Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="Tell us about your project, requirements, or any questions you have..."
                        rows={6}
                        className={errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        aria-invalid={errors.message ? "true" : "false"}
                        disabled={isSubmitting}
                      />
                      {errors.message && (
                        <p id="message-error" role="alert" className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || !isValid}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    {/* App Check Status Notice */}
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        {appCheckInitialized 
                          ? "This form is protected by Firebase App Check with reCAPTCHA v3"
                          : "Security protection is initializing..."
                        }
                      </p>
                    </div>

                    {/* Form Footer */}
                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to our{" "}
                      <a href="/privacy-policy" className="text-primary hover:underline">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="/privacy-policy" className="text-primary hover:underline">
                        Terms of Service
                      </a>
                      .
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>


        </div>
      </div>
    </section>
  )
}
