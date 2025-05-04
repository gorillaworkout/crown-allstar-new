"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// Testimonial data
const testimonials = [
  {
    quote:
      "Joining CROWN ALLSTAR was the best decision I've made. The team spirit and coaching are unmatched. I've grown not just as a cheerleader but as a person.",
    name: "Sarah Johnson",
    role: "Team Captain",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "SJ",
  },
  {
    quote:
      "The discipline and skills I've learned here have transformed not just my cheerleading, but my entire life. The coaches push you to be your best self every day.",
    name: "Michael Chen",
    role: "Senior Member",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "MC",
  },
  {
    quote:
      "From a beginner to competing internationally, CROWN ALLSTAR has been my second family throughout the journey. I couldn't imagine my life without this team.",
    name: "Ayu Pratiwi",
    role: "Junior Team Member",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "AP",
  },
  {
    quote:
      "The friendships I've made at CROWN ALLSTAR will last a lifetime. We train hard, but we also have so much fun together. It's the perfect balance.",
    name: "David Rodriguez",
    role: "Elite Squad Member",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "DR",
  },
  {
    quote:
      "As a parent, I've seen my daughter grow in confidence and skill since joining CROWN ALLSTAR. The coaches are professional and truly care about each athlete.",
    name: "Linda Wijaya",
    role: "Parent",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "LW",
  },
  {
    quote:
      "The technical training at CROWN ALLSTAR is world-class. I've improved more in one year here than in my previous five years of cheerleading.",
    name: "Budi Santoso",
    role: "Competition Team",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "BS",
  },
  {
    quote:
      "CROWN ALLSTAR taught me that with hard work and dedication, anything is possible. We've overcome so many challenges together as a team.",
    name: "Siti Rahma",
    role: "3-Year Member",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "SR",
  },
  {
    quote:
      "The international competitions we've participated in have broadened my horizons and given me experiences I'll never forget. CROWN ALLSTAR is more than just cheerleading.",
    name: "Reza Pratama",
    role: "Senior Team Member",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "RP",
  },
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  // Handle next testimonial
  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  // Handle previous testimonial
  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Jump to a specific testimonial
  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || isHovering) return

    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, autoplay, isHovering])

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
      },
    }),
  }

  // Get current testimonial
  const testimonial = testimonials[currentIndex]

  // Get visible testimonials for the small carousel
  const getVisibleIndices = () => {
    const indices = []
    const totalTestimonials = testimonials.length

    // Always include current index
    indices.push(currentIndex)

    // Add 2 before and 2 after (wrapping around if needed)
    for (let i = 1; i <= 2; i++) {
      indices.push((currentIndex + i) % totalTestimonials)
      indices.push((currentIndex - i + totalTestimonials) % totalTestimonials)
    }

    // Sort and remove duplicates
    return [...new Set(indices)].sort((a, b) => a - b)
  }

  const visibleIndices = getVisibleIndices()

  return (
    <div className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      {/* Main testimonial display */}
      <div className="relative overflow-hidden rounded-xl bg-card border border-border shadow-sm mb-12">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback className="text-lg">{testimonial.initials}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-center">{testimonial.name}</h3>
                <p className="text-muted-foreground text-center">{testimonial.role}</p>
              </div>

              <div className="md:w-2/3">
                <Quote className="h-10 w-10 text-primary/20 mb-4" />
                <p className="text-lg md:text-xl italic mb-6">{testimonial.quote}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToTestimonial(index)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? "bg-primary w-6"
                            : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setAutoplay(!autoplay)}
                      aria-label={autoplay ? "Pause autoplay" : "Start autoplay"}
                    >
                      {autoplay ? (
                        <span className="h-3 w-3 bg-primary rounded-sm" />
                      ) : (
                        <motion.div
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                          className="h-0 w-0 border-l-[8px] border-l-primary border-y-[6px] border-y-transparent ml-0.5"
                        />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
          onClick={prevTestimonial}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
          onClick={nextTestimonial}
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Small carousel of other testimonials */}
      <div className="flex justify-center gap-4 overflow-x-auto pb-4 px-4 -mx-4">
        {visibleIndices.map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.6, y: 20 }}
            animate={{
              opacity: index === currentIndex ? 0.4 : 1,
              y: index === currentIndex ? 10 : 0,
              scale: index === currentIndex ? 0.95 : 1,
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className={`flex-shrink-0 cursor-pointer rounded-lg bg-card border border-border p-4 shadow-sm w-64 ${
              index === currentIndex ? "pointer-events-none" : ""
            }`}
            onClick={() => goToTestimonial(index)}
          >
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={testimonials[index].avatar || "/placeholder.svg"} alt={testimonials[index].name} />
                <AvatarFallback>{testimonials[index].initials}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium text-sm line-clamp-1">{testimonials[index].name}</h4>
                <p className="text-xs text-muted-foreground">{testimonials[index].role}</p>
              </div>
            </div>
            <p className="text-sm line-clamp-2">{testimonials[index].quote}</p>
          </motion.div>
        ))}
      </div>

      {/* Floating animation elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5 dark:bg-primary/10"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  )
}
