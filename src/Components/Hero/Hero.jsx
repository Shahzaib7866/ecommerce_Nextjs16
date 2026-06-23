'use client'

import React, { useState, useEffect, useCallback } from 'react'
import './Hero.css'
import Link from 'next/link'
import ImageWithLoader from '../ImageWithLoader';
import { getImageUrl } from '../../constants/cloudinary'


const slides = [
  {
    id: 0,
    badge: "NEW ARRIVALS ONLY",
    line1: "new",
    line2: "collections",
    line3: "for everyone",
    showHandIcon: true,
    btnText: "Latest Collection",
    btnLink: "/",
    image: getImageUrl("/hero_image.png"),
    bg: "linear-gradient(135deg, #fde1ff 0%, #e1ffea44 100%)",
    accent: "#ff4141",
    tag: "ALL",
  },
  {
    id: 1,
    badge: "MEN'S EDITION",
    line1: "style",
    line2: "redefined",
    line3: "for men",
    showHandIcon: false,
    btnText: "Shop Men",
    btnLink: "/men",
    image: getImageUrl("/men_removebg.png"),
    bg: "linear-gradient(135deg, #dde8ff 0%, #eaf0ff 100%)",
    accent: "#2563eb",
    tag: "MEN",
  },
  {
    id: 2,
    badge: "WOMEN'S COLLECTION",
    line1: "grace",
    line2: "meets",
    line3: "fashion",
    showHandIcon: false,
    btnText: "Shop Women",
    btnLink: "/women",
    image: getImageUrl("/hero_image.png"),
    bg: "linear-gradient(135deg, #ffe1f0 0%, #fff0fb 100%)",
    accent: "#db2777",
    tag: "WOMEN",
  },
]

const AUTO_PLAY_INTERVAL = 4500

const Hero = () => {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState('next')

  const goTo = useCallback((index, dir = 'next') => {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 420)
  }, [animating])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 'next')
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, 'prev')
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, AUTO_PLAY_INTERVAL)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <div className='hero-carousel' style={{ background: slide.bg }}>

      <div className={`hero-slide ${animating ? `exit-${direction}` : 'enter'}`}>
        <div className="hero-left">
          <span className="hero-badge" style={{ color: slide.accent }}>
            {slide.badge}
          </span>

          <div className="hero-heading-group">
            {slide.showHandIcon ? (
              <div className="hero-hand-icon">
                <p>{slide.line1}</p>
<img src={getImageUrl("/hand_icon.png")} alt="Hand Icon" />
              </div>
            ) : (
              <p>{slide.line1}</p>
            )}
            <p>{slide.line2}</p>
            <p>{slide.line3}</p>
          </div>

          <Link href={slide.btnLink} style={{ textDecoration: 'none' }}>
            <div className="hero-latest-btn" style={{ background: slide.accent }}>
              <span>{slide.btnText}</span>
              <img src={getImageUrl("/arrow.png")} alt="Arrow" />
            </div>
          </Link>
        </div>

        <div className="hero-right">
          <img src={slide.image} alt={slide.badge} />
        </div>
      </div>

      {/* Arrow Controls */}
      <button className="carousel-arrow carousel-arrow-left" onClick={prev} aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <button className="carousel-arrow carousel-arrow-right" onClick={next} aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="carousel-dots">
        {slides.map((s, i) => (
          <button
            key={s.id}
            className={`carousel-dot ${i === current ? 'active' : ''}`}
            style={i === current ? { background: slide.accent, width: '28px' } : {}}
            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="carousel-progress">
        <div
          key={current}
          className="carousel-progress-bar"
          style={{ background: slide.accent }}
        />
      </div>

    </div>
  )
}

export default Hero