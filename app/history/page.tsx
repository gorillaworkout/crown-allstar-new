"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

export default function HistoryPage() {
  const timelineRef = useRef(null)
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.1 })

  const timelineEvents = [
    {
      year: "2008",
      title: "Foundation",
      description:
        "CROWN ALLSTAR was founded by a group of passionate cheerleaders with a vision to create Indonesia's premier cheerleading team.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      year: "2010",
      title: "First National Championship",
      description:
        "The team won its first national championship, establishing CROWN ALLSTAR as a force to be reckoned with in Indonesian cheerleading.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      year: "2013",
      title: "International Debut",
      description:
        "CROWN ALLSTAR made its international debut at the Asian Cheerleading Championship, placing in the top 5.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      year: "2015",
      title: "Asian Champions",
      description:
        "The team won its first Asian Championship title, bringing international recognition to Indonesian cheerleading.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      year: "2018",
      title: "World Championship",
      description: "CROWN ALLSTAR achieved its greatest milestone yet, winning the World Cheerleading Championship.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      year: "2020",
      title: "Virtual Competitions",
      description:
        "Despite global challenges, the team adapted to virtual competitions and continued its winning streak.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      year: "2023",
      title: "15th Anniversary",
      description:
        "CROWN ALLSTAR celebrated 15 years of excellence with a special anniversary showcase and documentary.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 md:pt-32">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Our Journey
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground"
            >
              From humble beginnings to international recognition, explore the history of CROWN ALLSTAR.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24" ref={timelineRef}>
        <div className="container mx-auto px-4">
          <div className="timeline-container">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="timeline-item"
              >
                <div className="timeline-dot"></div>
                <div className="bg-card rounded-lg overflow-hidden shadow-sm border border-border">
                  <div className="relative h-48 md:h-64">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    <div className="absolute top-0 left-0 bg-primary text-primary-foreground py-1 px-3 rounded-br-lg font-bold">
                      {event.year}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Legacy Continues</h2>
              <p className="text-muted-foreground mb-6">
                As we look to the future, CROWN ALLSTAR remains committed to pushing the boundaries of cheerleading
                excellence. Our legacy is not just about the championships we've won, but about the lives we've
                transformed and the community we've built.
              </p>
              <p className="text-muted-foreground">
                Each generation of CROWN ALLSTAR members contributes to our rich history and helps shape our future. We
                honor our past while constantly evolving and innovating to remain at the forefront of competitive
                cheerleading.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="CROWN ALLSTAR Legacy"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
