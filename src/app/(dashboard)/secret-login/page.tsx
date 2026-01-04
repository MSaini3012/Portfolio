// src/components/secret-login.tsx
"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, Lock, Shield, AlertCircle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where, addDoc, Timestamp } from "firebase/firestore"

// Validation schema
const loginSchema = z.object({
  password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
})

type LoginFormData = z.infer<typeof loginSchema>

const SecretLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const router = useRouter()

  // Check if already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated')
    const loginTime = localStorage.getItem('admin_login_time')
    
    if (isAuthenticated === 'true' && loginTime) {
      // Check if login is still valid (24 hours)
      const loginTimestamp = new Date(loginTime)
      const now = new Date()
      const hoursDifference = (now.getTime() - loginTimestamp.getTime()) / (1000 * 3600)
      
      if (hoursDifference < 24) {
        router.push('/dashboard')
      } else {
        // Clear expired session
        localStorage.removeItem('admin_authenticated')
        localStorage.removeItem('admin_login_time')
        localStorage.removeItem('admin_user_id')
      }
    }
  }, [router])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setLoginStatus('idle')

    try {
      // Query Firebase collection to verify password
      const secretLoginRef = collection(db, "secret-login")
      const q = query(secretLoginRef, where("password", "==", data.password))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        // Password found in database
        const loginDoc = querySnapshot.docs[0]
        const loginData = loginDoc.data()
        
        setLoginStatus('success')
        
        // Store authentication in localStorage
        const loginTime = new Date().toISOString()
        const sessionId = `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        
        localStorage.setItem('admin_authenticated', 'true')
        localStorage.setItem('admin_login_time', loginTime)
        localStorage.setItem('admin_session_id', sessionId)
        localStorage.setItem('admin_user_id', loginDoc.id)
        
        // Log successful login to Firebase (optional)
        // try {
        //   await addDoc(collection(db, "admin-login-logs"), {
        //     documentId: loginDoc.id,
        //     loginTime: Timestamp.now(),
        //     sessionId: sessionId,
        //     userAgent: navigator.userAgent,
        //     ipAddress: 'client-side', // You can get real IP with a service
        //     success: true
        //   })
        // } catch (logError) {
        //   console.warn('Failed to log login attempt:', logError)
        // }
        
        toast.success("Access granted! Redirecting to dashboard...")
        
        // Redirect after short delay
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      } else {
        throw new Error('Invalid password')
      }
    } catch (error) {
      console.error('Login error:', error)
      setLoginStatus('error')
      
      // Log failed login attempt
      // try {
      //   await addDoc(collection(db, "admin-login-logs"), {
      //     password: data.password.substring(0, 3) + '***', // Partial password for security
      //     loginTime: Timestamp.now(),
      //     userAgent: navigator.userAgent,
      //     success: false,
      //     error: error instanceof Error ? error.message : 'Unknown error'
      //   })
      // } catch (logError) {
      //   console.warn('Failed to log failed attempt:', logError)
      // }
      
      toast.error("Invalid password. Access denied.")
      reset()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
            >
              {loginStatus === 'success' ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : loginStatus === 'error' ? (
                <AlertCircle className="w-8 h-8 text-red-600" />
              ) : (
                <Shield className="w-8 h-8 text-primary" />
              )}
            </motion.div>
            
            <div>
              <CardTitle className="text-2xl font-bold">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {loginStatus === 'success' ? 'Access Granted' : 'Secure Access'}
                </motion.span>
              </CardTitle>
              <motion.p
                className="text-muted-foreground mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {loginStatus === 'success' 
                  ? 'Redirecting to dashboard...' 
                  : 'Enter the secret password to continue'
                }
              </motion.p>
            </div>
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              {loginStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-green-700 font-medium">
                    Authentication successful!
                  </p>
                  <p className="text-green-600 text-sm mt-2">
                    Session expires in 24 hours
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  noValidate
                >
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Secret Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="abc@"
                        className={`pr-12 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        aria-describedby={errors.password ? "password-error" : undefined}
                        aria-invalid={errors.password ? "true" : "false"}
                        disabled={isSubmitting}
                        autoComplete="current-password"
                        autoFocus
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isSubmitting}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    
                    <AnimatePresence>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          id="password-error"
                          role="alert"
                          className="text-sm text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" />
                          {errors.password.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || isLoading}
                    className="w-full font-medium"
                  >
                    {isSubmitting || isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Access Dashboard
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      Authorized personnel only • Firebase secured
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Session auto-expires after 24 hours
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Additional Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground">
            <Lock className="w-3 h-3" />
            5fox Administrative Access
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SecretLogin
