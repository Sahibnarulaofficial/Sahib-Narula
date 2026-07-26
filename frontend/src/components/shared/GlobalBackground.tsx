import React, { useState, useEffect, useRef } from 'react'

/**
 * GlobalBackground — Continuous engineering telemetry environment
 *
 * Spans the entire website as one living system that never restarts.
 * Fixed-position layers that persist through scrolling.
 *
 * Layer 1: Noise texture
 * Layer 2: Engineering blueprint grid (slow drift + parallax)
 * Layer 3: Telemetry system (readouts + indicators)
 * Layer 4: Ambient glow (parallax)
 * Layer 5: Global scanline animations
 */

export const GlobalBackground: React.FC = () => {
  const [systemReady, setSystemReady] = useState(false)
  const [gridReady, setGridReady] = useState(false)
  const [telemetryReady, setTelemetryReady] = useState(false)
  const [scanlineReady, setScanlineReady] = useState(false)

  const [telemetry, setTelemetry] = useState({
    rpm: 9810,
    temp: 72,
    latency: 12,
    load: 43,
    timeStr: '10:42:31',
  })

  const mousePosRef = useRef({ x: 0, y: 0 })
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 })

  // ─── Boot Timeline (runs once, never restarts) ───
  useEffect(() => {
    const timers = [
      setTimeout(() => setGridReady(true), 1000),
      setTimeout(() => setTelemetryReady(true), 3000),
      setTimeout(() => setScanlineReady(true), 4000),
      setTimeout(() => setSystemReady(true), 5000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // ─── Live Telemetry Oscillation ───
  useEffect(() => {
    if (!systemReady) return
    const timer = setInterval(() => {
      const now = new Date()
      setTelemetry({
        rpm: 9805 + Math.floor(Math.random() * 16),
        temp: 71 + Math.floor(Math.random() * 3),
        latency: 11 + Math.floor(Math.random() * 3),
        load: 42 + Math.floor(Math.random() * 4),
        timeStr: now.toTimeString().split(' ')[0],
      })
    }, 2400)
    return () => clearInterval(timer)
  }, [systemReady])

  // ─── Mouse Parallax (rAF, heavily dampened) ───
  useEffect(() => {
    let raf: number
    let cx = 0
    let cy = 0
    const onMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    const tick = () => {
      cx += (mousePosRef.current.x - cx) * 0.035
      cy += (mousePosRef.current.y - cy) * 0.035
      setSmoothMouse({ x: cx, y: cy })
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const gridTx = `translate3d(${smoothMouse.x * 2}px, ${smoothMouse.y * 2}px, 0)`
  const glowTx = `translate3d(${smoothMouse.x * 6}px, ${smoothMouse.y * 6}px, 0)`
  const telTx = `translate3d(${smoothMouse.x * 4}px, ${smoothMouse.y * 4}px, 0)`

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 select-none"
      style={{
        background:
          'radial-gradient(ellipse 100% 70% at 50% 0%, rgba(180, 25, 30, 0.22) 0%, rgba(120, 15, 20, 0.08) 50%, transparent 80%), linear-gradient(160deg, #050203 0%, #0a0304 45%, #0d0203 100%)',
      }}
      aria-hidden="true"
    >
      {/* ═══════════════════════════════════════
          LAYER 1: NOISE TEXTURE
          ═══════════════════════════════════════ */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* ═══════════════════════════════════════
          LAYER 2: ENGINEERING BLUEPRINT GRID
          Continuous, never restarts, drifts slowly
          ═══════════════════════════════════════ */}
      <div
        className="absolute inset-0 transition-opacity duration-[2000ms]"
        style={{ opacity: gridReady ? 1 : 0, transform: gridTx, willChange: 'transform' }}
      >
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px),
              linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 60px 60px, 20px 20px, 20px 20px',
            animation: 'gridDrift 25s ease-in-out infinite alternate',
          }}
        />

        {/* Engineering coordinate annotations — fixed to viewport */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-5 left-4 font-mono text-[7px] tracking-[0.2em] text-zinc-400 sm:left-6">
            ZONE-A // X:45.2 Y:108.7
          </div>
          <div className="absolute top-5 right-5 font-mono text-[7px] tracking-[0.2em] text-zinc-400">
            MONOCOQUE_REF :: V4.2
          </div>
          <div className="absolute bottom-5 left-4 font-mono text-[7px] tracking-[0.2em] text-zinc-400 sm:left-6">
            LATENCY :: 12ms
          </div>
          <div className="absolute right-5 bottom-5 font-mono text-[7px] tracking-[0.2em] text-zinc-400">
            PORT :: 9810
          </div>
          <div className="absolute top-1/2 left-4 font-mono text-[6px] tracking-[0.2em] text-zinc-500 sm:left-6">
            CH-01
          </div>
          <div className="absolute top-[25%] right-[42%] font-mono text-[6px] tracking-[0.2em] text-zinc-500">
            REF :: 0.000
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          LAYER 3: TELEMETRY SYSTEM
          Fixed readouts, always visible once booted
          ═══════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-10 hidden font-mono text-[9px] tracking-widest transition-opacity duration-[2000ms] sm:block"
        style={{ opacity: telemetryReady ? 1 : 0, transform: telTx, willChange: 'transform' }}
      >
        {/* LEFT — telemetry values */}
        <div className="absolute top-[22%] left-4 flex flex-col gap-1 opacity-[0.08] sm:left-6">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="h-1 w-1 animate-pulse rounded-full bg-[#B8B8B8]" />
            <span className="font-bold">TELEMETRY</span>
          </div>
          <div className="mt-1 flex flex-col gap-0.5 text-zinc-500">
            <div className="flex justify-between gap-5">
              <span>RPM</span>
              <span className="font-semibold text-[#B8B8B8]">{telemetry.rpm}</span>
            </div>
            <div className="flex justify-between gap-5">
              <span>TEMP</span>
              <span className="text-zinc-300">{telemetry.temp}°C</span>
            </div>
            <div className="flex justify-between gap-5">
              <span>LATENCY</span>
              <span className="text-zinc-300">{telemetry.latency}ms</span>
            </div>
            <div className="flex justify-between gap-5">
              <span>LOAD</span>
              <span className="text-zinc-300">{telemetry.load}%</span>
            </div>
          </div>
        </div>

        {/* CENTER TOP — system status */}
        <div className="absolute top-5 left-1/2 flex -translate-x-1/2 items-center gap-5 opacity-[0.07]">
          <div className="flex items-center gap-1.5 font-bold text-zinc-400">
            <span className="h-1 w-1 rounded-full bg-[#B8B8B8]" />
            <span>SYS_STATUS</span>
          </div>
          <div className="flex items-center gap-3 text-[8px] text-zinc-500">
            <span>
              PROJECTS: <strong className="font-normal text-zinc-300">ACTIVE</strong>
            </span>
            <span>
              AI CORE: <strong className="font-normal text-[#F5F5F5]">ONLINE</strong>
            </span>
            <span>
              BUILD: <strong className="font-normal text-zinc-300">SUCCESS</strong>
            </span>
            <span>
              SEC: <strong className="font-normal text-zinc-300">VERIFIED</strong>
            </span>
          </div>
        </div>

        {/* RIGHT BOTTOM — garage feed */}
        <div className="absolute right-4 bottom-6 flex flex-col gap-0.5 opacity-[0.07] md:right-6 lg:right-10">
          <div className="flex items-center gap-2 font-bold text-zinc-400">
            <span>GARAGE FEED</span>
            <span className="text-[7px] text-[#B8B8B8]">LIVE</span>
          </div>
          <div className="flex flex-col gap-0.5 text-zinc-500">
            <span>BUILD v1.4.0</span>
            <span className="text-zinc-400">{telemetry.timeStr}</span>
            <span className="font-semibold text-[#B8B8B8]">STATUS ONLINE</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          LAYER 4: AMBIENT GLOW (parallax)
          ═══════════════════════════════════════ */}
      <div
        className="absolute inset-0 transition-opacity duration-[2000ms]"
        style={{ opacity: telemetryReady ? 1 : 0, transform: glowTx, willChange: 'transform' }}
      >
        <div className="absolute top-1/2 right-[12%] h-[500px] w-[400px] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.015)_40%,transparent_70%)] blur-3xl" />
        <div className="absolute top-[30%] left-[3%] h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_70%)] blur-2xl" />
        {/* Deep Red Center/Top Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.09)_0%,rgba(150,15,20,0.03)_50%,transparent_75%)] blur-3xl" />
        {/* Subtle Red Bottom-Right Accent Glow */}
        <div className="absolute right-[5%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(180,25,30,0.07)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* ═══════════════════════════════════════
          LAYER 5: GLOBAL SCANLINE
          Continuous, never restarts
          ═══════════════════════════════════════ */}
      <div
        className="absolute inset-0 overflow-hidden transition-opacity duration-[1500ms]"
        style={{ opacity: scanlineReady ? 1 : 0 }}
      >
        <div className="animate-scanline absolute top-0 right-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-[0.06]" />
      </div>
    </div>
  )
}
