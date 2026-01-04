"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const quickLinks = [
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mohit-saini-38a728399/",
    label: "LinkedIn",
    color: "hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30",
  },
  {
    icon: Github,
    href: "https://github.com/MSaini3012",
    label: "GitHub",
    color: "hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-900/30",
  },
];

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1 space-y-6"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-foreground">
                  Mohit Saini
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-sm">
                Data Analyst passionate about transforming raw data into
                actionable insights using SQL, Python, and Power BI to support
                data-driven decision making.
              </p>

              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <a
                    href="mailto:mrsaini3012@gmail.com"
                    className="hover:text-primary transition-colors duration-300 break-all"
                  >
                    mrsaini3012@gmail.com
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a
                    href="tel:+917901939675"
                    className="hover:text-primary transition-colors duration-300"
                  >
                    +91 79019 39675
                  </a>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Amritsar, Punjab, India</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.6 }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                Connect with Me
              </h3>

              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="py-8 border-t border-border/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Mohit Saini. All rights reserved.
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="h-9 w-9 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
