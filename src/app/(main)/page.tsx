"use client"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { IntroSection } from "@/components/intro-section"
import { ServicesSection } from "@/components/services-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section" 
import { MottoSection } from "@/components/moto-section"
import { PricingPage } from "@/components/pricing-section"

export default function HomePage() {
  return (
    <main className="min-h-screen w-full" style={{ width: '100%', overflowX: 'hidden' }}>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <SkillsSection />
      {/* <MottoSection/> */}
      <ProjectsSection />
      {/* <PricingPage/> */}
        {/* <ContactSection /> */}
    </main>
  )
}
