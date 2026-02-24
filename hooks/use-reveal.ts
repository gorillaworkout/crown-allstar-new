"use client"

import { useEffect } from "react"

export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    )

    // Observe ALL reveal elements on the page
    const items = document.querySelectorAll(".reveal")
    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])
}
