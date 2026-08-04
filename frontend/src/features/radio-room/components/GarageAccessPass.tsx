import React, { useState, useId } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Zod Form Schema Definition
const garageAccessSchema = z.object({
  driverName: z.string().min(2, 'Driver Name must be at least 2 characters.'),
  emailAddress: z.string().email('Please enter a valid email address.'),
  company: z.string().optional(),
  missionBrief: z.string().min(10, 'Mission Brief must be at least 10 characters.'),
  estimatedTimeline: z.string().min(1, 'Please select an estimated timeline.'),
  budget: z.string().optional(),
})

export type GarageAccessFormData = z.infer<typeof garageAccessSchema>

export const GarageAccessPass: React.FC = () => {
  const [passId] = useState<string>(() => {
    const randomSeq = Math.floor(100 + Math.random() * 900)
    return `PG-2026-${randomSeq}`
  })

  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string | null>(null)

  // Accessibility IDs
  const driverNameId = useId()
  const emailAddressId = useId()
  const companyId = useId()
  const missionBriefId = useId()
  const estimatedTimelineId = useId()
  const budgetId = useId()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GarageAccessFormData>({
    resolver: zodResolver(garageAccessSchema),
    defaultValues: {
      driverName: '',
      emailAddress: '',
      company: '',
      missionBrief: '',
      estimatedTimeline: '',
      budget: '',
    },
  })

  const onSubmit = async (data: GarageAccessFormData) => {
    setIsSubmitting(true)
    setServerError(null)

    try {
      const response = await fetch('/api/request-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          passId,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to transmit garage access request.')
      }

      setIsSuccess(true)
      // Flip back to FRONT side to show the confirmed VIP Access Credential status
      setTimeout(() => {
        setIsFlipped(false)
      }, 600)
    } catch (err: unknown) {
      console.error('Garage Access Pass Transmission Error:', err)
      const errorMsg = err instanceof Error ? err.message : 'Transmission failed. Please try again.'
      setServerError(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPass = () => {
    reset()
    setIsSuccess(false)
    setServerError(null)
    setIsFlipped(false)
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center pt-8 font-mono select-none sm:pt-12">
      {/* ═══════════════════════════════════════════════════════════════
          FEATURE 1: PHYSICAL LANYARD & NECK RIBBON ASSEMBLY
          ═══════════════════════════════════════════════════════════════ */}
      <div className="animate-lanyard-sway relative flex flex-col items-center">
        {/* Woven Fabric Neck Ribbon hanging down */}
        <div className="relative flex justify-center">
          <div className="h-12 w-10 border-x border-zinc-700/60 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black shadow-lg sm:h-16 sm:w-12">
            {/* Subtle Stitched Ribbon Texture Lines */}
            <div className="h-full w-full border-x border-dashed border-zinc-400 opacity-20" />
          </div>
        </div>

        {/* Metallic Clip & Carabiner Ring */}
        <div className="relative z-20 -mt-1 flex flex-col items-center">
          {/* Metal Ring */}
          <div className="h-4 w-4 rounded-full border-2 border-zinc-400 bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-800 shadow-md" />
          {/* Metal Carabiner Clip latch */}
          <div className="h-5 w-3 rounded-xs border border-zinc-500 bg-gradient-to-b from-zinc-400 to-zinc-700 shadow-lg" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            FEATURE 7: REALISTIC 3D PERSPECTIVE FLIP CONTAINER
            ═══════════════════════════════════════════════════════════════ */}
        <div className="relative -mt-2.5 w-full max-w-xl" style={{ perspective: '1400px' }}>
          <div
            className="relative w-full transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* ═══════════════════════════════════════════════════════════════
                CREDENTIAL FRONT FACE (isFlipped = false)
                ═══════════════════════════════════════════════════════════════ */}
            <div
              className="relative w-full rounded-xl border border-border-subtle bg-bg-surface p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10 sm:p-8 md:p-10"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {/* Carbon Fiber Background Texture */}
              <div
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl opacity-[0.04]"
                style={{
                  backgroundImage: `radial-gradient(#ffffff 0.75px, transparent 0.75px), radial-gradient(#ffffff 0.75px, #111111 0.75px)`,
                  backgroundSize: '12px 12px',
                  backgroundPosition: '0 0, 6px 6px',
                }}
              />

              {/* Reinforced Credential Punch Hole Slot */}
              <div className="absolute top-0 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <div className="h-3 w-14 rounded-full border border-border-subtle bg-black shadow-inner ring-1 ring-zinc-800" />
              </div>

              {/* Technical Corner Crosshairs */}
              <div className="pointer-events-none absolute top-3 left-3 font-mono text-[9px] text-text-muted sm:top-4 sm:left-4">
                +
              </div>
              <div className="pointer-events-none absolute top-3 right-3 font-mono text-[9px] text-text-muted sm:top-4 sm:right-4">
                +
              </div>

              {/* Holographic Security Foil Strip */}
              <div className="mb-6 h-1.5 w-full rounded-full bg-gradient-to-r from-accent-red/40 via-purple-500/30 to-amber-500/20 opacity-70 blur-[0.5px]" />

              {/* Header */}
              <div className="flex flex-col gap-5 border-b border-border-subtle pb-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-xs font-medium tracking-[0.2em] text-text-secondary uppercase">
                      SAHIB NARULA
                    </span>
                    <h3 className="font-orbitron text-xl font-bold tracking-wider text-text-primary sm:text-2xl">
                      Garage Access Pass
                    </h3>
                  </div>

                  {/* Pass ID Badge */}
                  <div className="flex items-center gap-2 rounded border border-border-subtle bg-black/80 px-3 py-1.5 backdrop-blur-xs">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isSuccess ? 'animate-pulse bg-emerald-400' : 'animate-pulse bg-accent-red'
                      }`}
                    />
                    <span className="font-mono text-xs font-semibold tracking-widest text-text-primary">
                      {passId}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[9px] tracking-widest text-text-secondary uppercase">
                  <span>CLASSIFICATION :: CONFIDENTIAL</span>
                  <span>DIVISION :: SOFTWARE & AI LABS</span>
                </div>
              </div>

              {/* FEATURE 10: SUCCESS STATE ON FRONT FACE */}
              {isSuccess ? (
                <div className="my-8 flex flex-col items-center justify-center gap-5 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h4 className="font-sans text-lg font-extrabold tracking-tight text-white sm:text-xl">
                      ✔ ACCESS REQUEST RECEIVED
                    </h4>
                    <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase">
                      Garage Transmission Delivered
                    </span>
                  </div>

                  <div className="flex max-w-sm flex-col gap-2 rounded border border-zinc-800/90 bg-zinc-900/80 p-4 text-xs leading-relaxed text-zinc-400">
                    <p>Your request has entered the engineering queue.</p>
                    <p>I'll review it personally and get back to you shortly.</p>
                    <p className="font-semibold text-zinc-200">See you at the next build. 🏁</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetPass}
                    className="mt-2 cursor-pointer rounded border border-zinc-700/80 bg-zinc-900 px-6 py-2.5 text-[10px] font-bold tracking-widest text-zinc-200 uppercase transition-all hover:border-zinc-500 hover:text-white"
                  >
                    GARAGE ACCESS GRANTED
                  </button>
                </div>
              ) : (
                /* FEATURE 4: SECURITY DETAILS & CREDENTIAL GRAPHICS */
                <div className="my-6 flex flex-col gap-6">
                  {/* VIP Access Badge */}
                  <div className="flex items-center justify-between rounded border border-zinc-800/80 bg-zinc-900/60 p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                        CREDENTIAL TYPE
                      </span>
                      <span className="font-sans text-sm font-bold text-white">
                        VIP ENGINEERING ACCESS
                      </span>
                    </div>
                    <div className="rounded border border-zinc-700/60 bg-black/60 px-2.5 py-1 text-[9px] font-bold tracking-wider text-emerald-400">
                      LEVEL 01
                    </div>
                  </div>

                  {/* Security Grid Table */}
                  <div className="grid grid-cols-2 gap-4 text-[10px]">
                    <div className="flex flex-col gap-0.5 border-b border-zinc-800/60 pb-2">
                      <span className="text-zinc-500 uppercase">ISSUE DATE</span>
                      <span className="font-bold text-zinc-300">2026.07.26</span>
                    </div>
                    <div className="flex flex-col gap-0.5 border-b border-zinc-800/60 pb-2">
                      <span className="text-zinc-500 uppercase">VALID DURING</span>
                      <span className="font-bold text-zinc-300">SEASON 2026</span>
                    </div>
                    <div className="flex flex-col gap-0.5 border-b border-zinc-800/60 pb-2">
                      <span className="text-zinc-500 uppercase">ISSUED BY</span>
                      <span className="font-bold text-zinc-300">SAHIB NARULA</span>
                    </div>
                    <div className="flex flex-col gap-0.5 border-b border-zinc-800/60 pb-2">
                      <span className="text-zinc-500 uppercase">NFC PROTOCOL</span>
                      <span className="font-bold text-emerald-400">ACTIVE [NFC]</span>
                    </div>
                  </div>

                  {/* QR & Barcode Illustration */}
                  <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4">
                    {/* Simulated Barcode */}
                    <div className="flex h-8 items-center gap-1 opacity-70">
                      {[3, 1, 4, 2, 5, 2, 1, 4, 3, 2, 6, 2, 4, 1, 3, 5, 2].map((w, i) => (
                        <div key={i} className="h-full bg-zinc-400" style={{ width: `${w}px` }} />
                      ))}
                    </div>

                    {/* Security Microprint */}
                    <span className="text-[7px] tracking-widest text-zinc-600 uppercase">
                      VALIDATED // PROJECT GARAGE
                    </span>

                    {/* Simulated QR Code SVG */}
                    <div className="h-9 w-9 rounded border border-zinc-700 bg-zinc-900 p-1">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-full w-full text-zinc-300"
                      >
                        <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm8-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 3h2v3h-2v-3zm-4-3h3v2h-3v-2zm3 3h2v2h-2v-2zm-3-5h2v2h-2v-2zm4-1h3v2h-3v-2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* FEATURE 8: FRONT BUTTON COPY */}
              {!isSuccess && (
                <div className="mt-4 border-t border-zinc-800/80 pt-5">
                  <button
                    type="button"
                    onClick={() => setIsFlipped(true)}
                    className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-zinc-700/80 bg-zinc-900 py-3.5 text-xs font-bold tracking-widest text-white uppercase transition-all hover:border-zinc-400 hover:bg-zinc-800"
                  >
                    <span>INSPECT CREDENTIAL</span>
                    <span className="text-[9px] transition-transform group-hover:translate-x-1">
                      ❯
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                CREDENTIAL BACK FACE (isFlipped = true)
                The Form structured into clear visual hierarchy sections
                ═══════════════════════════════════════════════════════════════ */}
            <div
              className="absolute top-0 left-0 w-full rounded-xl border border-zinc-700/80 bg-[#080808] p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10 sm:p-8 md:p-10"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              {/* Carbon Fiber Background Texture */}
              <div
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl opacity-[0.04]"
                style={{
                  backgroundImage: `radial-gradient(#ffffff 0.75px, transparent 0.75px), radial-gradient(#ffffff 0.75px, #080808 0.75px)`,
                  backgroundSize: '128px 128px',
                  backgroundPosition: '0 0, 6px 6px',
                }}
              />

              {/* Credential Slot Cutout */}
              <div className="absolute top-0 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <div className="h-3 w-14 rounded-full border border-zinc-600/80 bg-black shadow-inner ring-1 ring-zinc-800" />
              </div>

              {/* Form Header */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                    CREDENTIAL BACK // ACCESS SPECIFICATION
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  className="cursor-pointer rounded border border-zinc-800 bg-black px-2.5 py-1 text-[9px] font-bold tracking-wider text-zinc-400 transition-colors hover:text-white"
                >
                  ❮ FRONT
                </button>
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  FEATURE 5: BETTER INFORMATION HIERARCHY SECTIONS
                  ═══════════════════════════════════════════════════════════════ */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative z-10 mt-5 flex flex-col gap-6 text-xs"
                noValidate
              >
                {serverError && (
                  <div className="rounded border border-red-500/30 bg-red-500/10 p-3 text-[11px] text-red-400">
                    {serverError}
                  </div>
                )}

                {/* ── SECTION 01: IDENTIFICATION ── */}
                <div className="flex flex-col gap-3">
                  <span className="border-b border-zinc-800/60 pb-1 text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
                    01 // IDENTIFICATION
                  </span>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Driver Name */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={driverNameId}
                        className="flex items-center justify-between text-[10px] font-bold tracking-wider text-zinc-400 uppercase"
                      >
                        <span>Driver Name</span>
                        <span className="text-red-400">*</span>
                      </label>
                      <input
                        id={driverNameId}
                        type="text"
                        placeholder="e.g. Lewis Hamilton"
                        {...register('driverName')}
                        className={`rounded border bg-zinc-900/80 px-3.5 py-2 text-xs text-white placeholder-zinc-600 transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none ${
                          errors.driverName
                            ? 'border-red-500/60'
                            : 'border-zinc-800 hover:border-zinc-700'
                        }`}
                      />
                      {errors.driverName && (
                        <span className="text-[10px] text-red-400">
                          {errors.driverName.message}
                        </span>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={emailAddressId}
                        className="flex items-center justify-between text-[10px] font-bold tracking-wider text-zinc-400 uppercase"
                      >
                        <span>Email Address</span>
                        <span className="text-red-400">*</span>
                      </label>
                      <input
                        id={emailAddressId}
                        type="email"
                        placeholder="driver@paddock.com"
                        {...register('emailAddress')}
                        className={`rounded border bg-zinc-900/80 px-3.5 py-2 text-xs text-white placeholder-zinc-600 transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none ${
                          errors.emailAddress
                            ? 'border-red-500/60'
                            : 'border-zinc-800 hover:border-zinc-700'
                        }`}
                      />
                      {errors.emailAddress && (
                        <span className="text-[10px] text-red-400">
                          {errors.emailAddress.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── SECTION 02: PROJECT DETAILS ── */}
                <div className="flex flex-col gap-3">
                  <span className="border-b border-zinc-800/60 pb-1 text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
                    02 // PROJECT DETAILS
                  </span>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {/* Company */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={companyId}
                        className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase"
                      >
                        <span>Company</span>
                      </label>
                      <input
                        id={companyId}
                        type="text"
                        placeholder="e.g. Apex Systems"
                        {...register('company')}
                        className="rounded border border-zinc-800 bg-zinc-900/80 px-3.5 py-2 text-xs text-white placeholder-zinc-600 transition-colors hover:border-zinc-700 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
                      />
                    </div>

                    {/* Estimated Timeline */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={estimatedTimelineId}
                        className="flex items-center justify-between text-[10px] font-bold tracking-wider text-zinc-400 uppercase"
                      >
                        <span>Timeline</span>
                        <span className="text-red-400">*</span>
                      </label>
                      <select
                        id={estimatedTimelineId}
                        {...register('estimatedTimeline')}
                        className={`rounded border bg-zinc-900/80 px-3.5 py-2 text-xs text-white transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none ${
                          errors.estimatedTimeline
                            ? 'border-red-500/60'
                            : 'border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <option value="" disabled>
                          Select Timeline
                        </option>
                        <option value="IMMEDIATE (0-30 DAYS)">IMMEDIATE (0-30 DAYS)</option>
                        <option value="NEXT QUARTER (1-3 MONTHS)">NEXT QUARTER (1-3 MONTHS)</option>
                        <option value="LONG-TERM (3+ MONTHS)">LONG-TERM (3+ MONTHS)</option>
                        <option value="DISCOVERY / EXPLORATION">DISCOVERY / EXPLORATION</option>
                      </select>
                      {errors.estimatedTimeline && (
                        <span className="text-[10px] text-red-400">
                          {errors.estimatedTimeline.message}
                        </span>
                      )}
                    </div>

                    {/* Budget */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={budgetId}
                        className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase"
                      >
                        <span>Budget</span>
                      </label>
                      <select
                        id={budgetId}
                        {...register('budget')}
                        className="rounded border border-zinc-800 bg-zinc-900/80 px-3.5 py-2 text-xs text-white transition-colors hover:border-zinc-700 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
                      >
                        <option value="">Range (Optional)</option>
                        <option value="< $10K">&lt; $10K</option>
                        <option value="$10K - $25K">$10K - $25K</option>
                        <option value="$25K - $50K">$25K - $50K</option>
                        <option value="$50K+">$50K+</option>
                        <option value="UNDISCLOSED">UNDISCLOSED</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* ── SECTION 03: MISSION BRIEF ── */}
                <div className="flex flex-col gap-2">
                  <span className="border-b border-zinc-800/60 pb-1 text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
                    03 // MISSION BRIEF
                  </span>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={missionBriefId}
                      className="flex items-center justify-between text-[10px] font-bold tracking-wider text-zinc-400 uppercase"
                    >
                      <span>Engineering Requirements & Objectives</span>
                      <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id={missionBriefId}
                      rows={3}
                      placeholder="Describe technical targets, architecture requirements, or product goals..."
                      {...register('missionBrief')}
                      className={`rounded border bg-zinc-900/80 p-3 text-xs text-white placeholder-zinc-600 transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none ${
                        errors.missionBrief
                          ? 'border-red-500/60'
                          : 'border-zinc-800 hover:border-zinc-700'
                      }`}
                    />
                    {errors.missionBrief && (
                      <span className="text-[10px] text-red-400">
                        {errors.missionBrief.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* ── SECTION 04: REQUEST ACCESS & SUBMIT ── */}
                <div className="mt-2 border-t border-zinc-800/80 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-zinc-700/80 bg-zinc-900 py-3.5 font-mono text-xs font-bold tracking-widest text-white uppercase transition-all hover:border-zinc-400 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>TRANSMITTING TELEMETRY...</span>
                      </div>
                    ) : (
                      <>
                        <span>TRANSMIT ACCESS REQUEST</span>
                        <span className="text-[9px] transition-transform group-hover:translate-x-1">
                          ❯
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
