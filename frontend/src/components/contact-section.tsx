'use client'

import { useState } from 'react'
import {
  Send,
  Linkedin,
  Github,
  Instagram,
  Mail,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/',
    icon: Linkedin,
    color: 'hover:text-blue-400',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/',
    icon: Github,
    color: 'hover:text-foreground',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/',
    icon: Instagram,
    color: 'hover:text-pink-400',
  },
]

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: '', email: '', message: '' })

    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-20 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-accent/5 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {"Let's"} <span className="text-accent">Collaborate</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? {"I'd"} love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-semibold text-foreground">
                Get in Touch
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {"I'm"} always open to discussing new projects, creative ideas, or opportunities
                to be part of your vision. Whether {"it's"} development, design, or photography,
                let&apos;s create something amazing together.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <a
                href="mailto:hello@earthen.dev"
                className="flex items-center gap-4 glass rounded-xl p-4 hover:border-accent/30 transition-colors group"
              >
                <div className="p-3 rounded-lg bg-secondary/50 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium">hello@earthen.dev</p>
                </div>
                <ArrowUpRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:text-accent transition-colors" />
              </a>

              <div className="flex items-center gap-4 glass rounded-xl p-4">
                <div className="p-3 rounded-lg bg-secondary/50 text-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground font-medium">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Follow Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'p-3 glass rounded-xl text-muted-foreground transition-all duration-300',
                        'hover:scale-105',
                        social.color
                      )}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className={cn(
                    'w-full px-4 py-3 rounded-xl',
                    'bg-secondary/50 border border-border',
                    'text-foreground placeholder:text-muted-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
                    'transition-all duration-300'
                  )}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className={cn(
                    'w-full px-4 py-3 rounded-xl',
                    'bg-secondary/50 border border-border',
                    'text-foreground placeholder:text-muted-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
                    'transition-all duration-300'
                  )}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  rows={5}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl resize-none',
                    'bg-secondary/50 border border-border',
                    'text-foreground placeholder:text-muted-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
                    'transition-all duration-300'
                  )}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={cn(
                  'w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl',
                  'font-medium transition-all duration-300',
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : 'bg-accent text-accent-foreground hover:bg-accent/90',
                  'disabled:cursor-not-allowed'
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
