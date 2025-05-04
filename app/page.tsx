"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Star, Trophy, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel"

export default function Home() {
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  const testimonialsRef = useRef(null)

  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 })
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 })

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 hero-gradient text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              REACH FOR THE STARS
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8"
            >
              Indonesia's Premier Championship Cheerleading Team
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button size="lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white" asChild>
                <Link href="/contact">Join Our Team</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative h-64 md:h-96"
        >
          <Image
            src="/placeholder.svg?height=400&width=1920"
            alt="CROWN ALLSTAR Team"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CROWN ALLSTAR?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are dedicated to excellence in cheerleading, fostering teamwork, discipline, and athletic achievement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Trophy className="h-10 w-10 text-primary" />,
                title: "Championship Legacy",
                description: "Multiple national and international championship wins with a tradition of excellence.",
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Expert Coaching",
                description: "Trained by world-class coaches with decades of experience in competitive cheerleading.",
              },
              {
                icon: <Star className="h-10 w-10 text-primary" />,
                title: "All-Inclusive Environment",
                description: "A supportive community that welcomes cheerleaders of all skill levels and backgrounds.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-muted" ref={statsRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "15+", label: "Years of Excellence" },
              { value: "50+", label: "Championship Titles" },
              { value: "200+", label: "Team Members" },
              { value: "20+", label: "Countries Visited" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background" ref={testimonialsRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Team Members Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from the people who make CROWN ALLSTAR special.
            </p>
          </div>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the CROWN ALLSTAR Family?</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Take the first step towards becoming a champion cheerleader today.
            </p>
            <Button size="lg" variant="secondary" className="group" asChild>
              <Link href="/contact">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
