"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    interest: "general",
    experience: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, experience: value }))
    if (errors.experience) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.experience
        return newErrors
      })
    }
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, interest: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    if (!formData.experience) newErrors.experience = "Please select your experience level"

    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Format message for WhatsApp
    const message = `*New Contact from CROWN ALLSTAR Website*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Subject: ${formData.subject}
Interest: ${formData.interest}
Experience: ${formData.experience}

Message:
${formData.message}`

    // Format phone number (remove any non-digit characters)
    const phoneNumber = "087700600208".replace(/\D/g, "")

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")

    // Show success message
    toast({
      title: "Message Ready to Send!",
      description: "You'll be redirected to WhatsApp to complete your message.",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      interest: "general",
      experience: "",
    })
  }

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
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground"
            >
              Have questions or want to join our team? We'd love to hear from you!
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Our Location</h3>
                    <p className="text-muted-foreground">123 Cheer Avenue, Jakarta, Indonesia</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">(123) 456-7890</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@crownallstar.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-card p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a
                    href="#"
                    className="bg-card p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    href="#"
                    className="bg-card p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a
                    href="#"
                    className="bg-card p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Youtube className="h-5 w-5" />
                    <span className="sr-only">YouTube</span>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <form onSubmit={handleSubmit} className="bg-card p-6 rounded-lg shadow-sm border border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      Subject <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={errors.subject ? "border-red-500" : ""}
                    />
                    {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <Label>I'm interested in:</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="general"
                        name="interest"
                        value="general"
                        checked={formData.interest === "general"}
                        onChange={() => handleRadioChange("general")}
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor="general" className="font-normal">
                        General Information
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="joining"
                        name="interest"
                        value="joining"
                        checked={formData.interest === "joining"}
                        onChange={() => handleRadioChange("joining")}
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor="joining" className="font-normal">
                        Joining the Team
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="training"
                        name="interest"
                        value="training"
                        checked={formData.interest === "training"}
                        onChange={() => handleRadioChange("training")}
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor="training" className="font-normal">
                        Training Programs
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="other"
                        name="interest"
                        value="other"
                        checked={formData.interest === "other"}
                        onChange={() => handleRadioChange("other")}
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor="other" className="font-normal">
                        Other
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="experience">
                    Your Experience Level <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="experience"
                    className={`w-full rounded-md border ${
                      errors.experience ? "border-red-500" : "border-input"
                    } bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                    value={formData.experience}
                    onChange={(e) => handleSelectChange(e.target.value)}
                  >
                    <option value="" disabled>
                      Select your experience level
                    </option>
                    <option value="beginner">Beginner - No experience</option>
                    <option value="intermediate">Intermediate - Some experience</option>
                    <option value="advanced">Advanced - Experienced cheerleader</option>
                    <option value="professional">Professional - Competitive experience</option>
                  </select>
                  {errors.experience && <p className="text-sm text-red-500">{errors.experience}</p>}
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                </div>
                <Button type="submit" className="w-full mt-6" size="lg">
                  Send Message via WhatsApp
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
