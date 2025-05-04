"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Award, Heart, Shield, Target, Trophy, Medal } from "lucide-react"

export default function AboutPage() {
  const philosophyRef = useRef(null)
  const teamRef = useRef(null)
  const awardsRef = useRef(null)

  const philosophyInView = useInView(philosophyRef, { once: true, amount: 0.3 })
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 })
  const awardsInView = useInView(awardsRef, { once: true, amount: 0.3 })

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
              About CROWN ALLSTAR
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground"
            >
              Founded in 2008, CROWN ALLSTAR has grown to become Indonesia's premier cheerleading team with a legacy of
              excellence, teamwork, and championship victories.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24 bg-muted" ref={philosophyRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={philosophyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
              <p className="text-muted-foreground mb-6">
                At CROWN ALLSTAR, we believe that cheerleading is more than just a sport—it's a way of life that
                instills discipline, teamwork, and perseverance. Our philosophy centers around three core principles:
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: <Target className="h-6 w-6 text-primary" />,
                    title: "Excellence",
                    description:
                      "We strive for excellence in every aspect of our performance, training, and competition.",
                  },
                  {
                    icon: <Heart className="h-6 w-6 text-primary" />,
                    title: "Unity",
                    description:
                      "We believe in the power of teamwork and supporting each other through every challenge.",
                  },
                  {
                    icon: <Shield className="h-6 w-6 text-primary" />,
                    title: "Resilience",
                    description: "We embrace challenges as opportunities to grow stronger and more determined.",
                  },
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="mr-4 mt-1">{value.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={philosophyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="CROWN ALLSTAR Philosophy"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-background" ref={teamRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Our success is built on the dedication and talent of our coaches and team members.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "David Wilson",
                role: "Head Coach",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Maria Rodriguez",
                role: "Choreographer",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Budi Santoso",
                role: "Team Captain",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Lina Wijaya",
                role: "Assistant Coach",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="relative h-64">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="/placeholder.svg?height=400&width=1200"
              alt="CROWN ALLSTAR Full Team"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 md:py-24 bg-muted" ref={awardsRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={awardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Our Achievements
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={awardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              A legacy of excellence and championship victories.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "National Championships",
                count: "12",
                years: "2010-2023",
                icon: <Award className="h-10 w-10 text-primary" />,
              },
              {
                title: "Asian Championships",
                count: "5",
                years: "2015, 2017, 2019, 2021, 2023",
                icon: <Trophy className="h-10 w-10 text-primary" />,
              },
              {
                title: "World Championships",
                count: "3",
                years: "2018, 2020, 2022",
                icon: <Medal className="h-10 w-10 text-primary" />,
              },
            ].map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={awardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-card rounded-lg p-6 shadow-sm border border-border text-center"
              >
                <div className="flex justify-center mb-4">{award.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                <div className="text-4xl font-bold text-primary mb-2">{award.count}</div>
                <p className="text-muted-foreground">{award.years}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
