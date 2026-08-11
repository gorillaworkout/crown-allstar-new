'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  DIVISIONS,
  EXPERIENCE,
  HEARD_FROM,
  POSITIONS,
  ageAt,
  divisionBlocker,
  normalizeWhatsapp,
  type Division,
  type Gender,
  type WindowState,
} from '@/lib/recruitment';

const CITIES = [
  'Bandung', 'Cimahi', 'Kab. Bandung', 'Kab. Bandung Barat', 'Sumedang', 'Garut',
  'Tasikmalaya', 'Cianjur', 'Bogor', 'Depok', 'Bekasi', 'Jakarta', 'Tangerang',
  'Karawang', 'Purwakarta', 'Subang', 'Cirebon', 'Lainnya',
];

const DRAFT_KEY = 'crown-a18-draft';

type Form = {
  fullName: string; birthDate: string; gender: Gender | ''; whatsapp: string;
  instagram: string; domicileCity: string; domicileDetail: string; schoolOrCampus: string;
  division: Division | ''; previousTeam: string; isBeginner: boolean; position: string[];
  experienceYears: string; heightCm: string; weightKg: string; motivation: string;
  emergencyName: string; emergencyPhone: string; parentApproval: boolean;
  commitmentAgree: boolean; howDidYouHear: string; website: string;
};

const EMPTY: Form = {
  fullName: '', birthDate: '', gender: '', whatsapp: '', instagram: '', domicileCity: '',
  domicileDetail: '', schoolOrCampus: '', division: '', previousTeam: '', isBeginner: false,
  position: [], experienceYears: EXPERIENCE[0], heightCm: '', weightKg: '', motivation: '',
  emergencyName: '', emergencyPhone: '', parentApproval: false, commitmentAgree: false,
  howDidYouHear: '', website: '',
};

const STEPS = ['DATA DIRI', 'CHEERLEADING', 'KOMITMEN'];

// ── Shared field chrome. Square corners + hairline borders to match the site. ──
const inputCls =
  'w-full bg-white/[0.03] border border-white/12 px-4 py-3 text-[15px] text-white ' +
  'placeholder:text-white/25 outline-none transition-colors focus:border-[hsl(0_85%_58%)] ' +
  'focus:bg-white/[0.05]';
const labelCls = 'block mb-2 text-[10px] font-medium tracking-[0.22em] text-white/45';

function Field({
  label, htmlFor, required, error, hint, children,
}: {
  label: string; htmlFor: string; required?: boolean; error?: string; hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelCls}>
        {label} {required && <span className="text-[hsl(0_85%_58%)]">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-[12px] text-white/35">{hint}</p>}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-[12px] text-[hsl(0_85%_62%)]">
          {error}
        </p>
      )}
    </div>
  );
}

export default function RecruitmentForm({ windowState: ws }: { windowState: WindowState }) {
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setF((prev) => ({ ...prev, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  // Restore draft so an accidental refresh doesn't wipe a half-filled form.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) setF({ ...EMPTY, ...JSON.parse(raw) });
    } catch { /* ignore malformed draft */ }
  }, []);

  useEffect(() => {
    if (done) return;
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...f, website: '' })); } catch {}
  }, [f, done]);

  const age = useMemo(() => (f.birthDate ? ageAt(f.birthDate) : -1), [f.birthDate]);

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (f.fullName.trim().length < 3) e.fullName = 'Nama lengkap minimal 3 karakter.';
      if (!f.birthDate) e.birthDate = 'Tanggal lahir wajib diisi.';
      else if (age < 13) e.birthDate = `Umur kamu ${age} tahun. Minimum pendaftaran 13 tahun.`;
      if (!f.gender) e.gender = 'Pilih jenis kelamin.';
      if (!normalizeWhatsapp(f.whatsapp)) e.whatsapp = 'Nomor tidak valid. Contoh: 081234567890';
      if (!f.domicileCity) e.domicileCity = 'Pilih domisili.';
    }
    if (s === 1) {
      if (!f.division) e.division = 'Pilih divisi.';
      else {
        const b = divisionBlocker(f.division, f.gender, age);
        if (b) e.division = b;
      }
      if (!f.isBeginner && !f.previousTeam.trim()) {
        e.previousTeam = 'Isi tim sebelumnya, atau centang "belum pernah".';
      }
      if (f.position.length === 0) e.position = 'Pilih minimal satu posisi.';
    }
    if (s === 2) {
      if (!f.emergencyName.trim()) e.emergencyName = 'Nama kontak darurat wajib diisi.';
      if (!normalizeWhatsapp(f.emergencyPhone)) e.emergencyPhone = 'Nomor tidak valid.';
      if (!f.parentApproval) e.parentApproval = 'Persetujuan orang tua wajib dicentang.';
      if (!f.commitmentAgree) e.commitmentAgree = 'Kesediaan komitmen wajib dicentang.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep((s) => Math.min(2, s + 1)); };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    if (!validateStep(2)) return;
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch('/api/recruitment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...f,
          heightCm: f.heightCm ? Number(f.heightCm) : null,
          weightKg: f.weightKg ? Number(f.weightKg) : null,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setServerError(data.message || 'Pendaftaran gagal. Coba lagi.');
        return;
      }
      setDone(data.regNumber);
      try { localStorage.removeItem(DRAFT_KEY); } catch {}
    } catch {
      setServerError('Koneksi bermasalah. Periksa internet dan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success ────────────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="border border-[hsl(0_85%_58%)]/25 bg-[hsl(0_72%_45%)]/[0.06] p-8 sm:p-12 text-center">
        <p className="text-[10px] tracking-[0.3em] text-white/45">PENDAFTARAN DITERIMA</p>
        <p className="font-display mt-5 text-[clamp(2.5rem,7vw,4.5rem)] leading-none text-white">
          {done}
        </p>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/55">
          Simpan nomor ini. Tim Crown akan menghubungi kamu lewat WhatsApp untuk info audisi.
          Jadwal dan lokasi latihan akan diinformasikan menyusul.
        </p>
        <a
          href="https://instagram.com/crownallstar"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block border border-white/20 px-8 py-3.5 text-[11px] font-medium tracking-[0.2em] text-white transition-colors hover:border-[hsl(0_85%_58%)] hover:text-[hsl(0_85%_62%)]"
        >
          IKUTI @CROWNALLSTAR
        </a>
      </div>
    );
  }

  // ── Closed / not yet open ──────────────────────────────────────────────────
  if (ws !== 'open') {
    return (
      <div className="border border-white/12 p-8 sm:p-12 text-center">
        <p className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-tight text-white">
          {ws === 'before' ? 'PENDAFTARAN BELUM DIBUKA' : 'PENDAFTARAN SUDAH DITUTUP'}
        </p>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/50">
          {ws === 'before'
            ? 'Formulir akan aktif otomatis pada 13 Agustus 2026. Siapkan data kamu dari sekarang.'
            : 'Pendaftaran Angkatan 18 ditutup 21 Agustus 2026. Ikuti Instagram kami untuk kesempatan berikutnya.'}
        </p>
      </div>
    );
  }

  return (
    <div className="border border-white/12 bg-white/[0.015]">
      {/* Step rail */}
      <div className="flex border-b border-white/12">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={`flex-1 px-3 py-4 text-center text-[9px] font-medium tracking-[0.2em] transition-colors sm:text-[10px] ${
              i === step
                ? 'bg-[hsl(0_72%_45%)]/12 text-[hsl(0_85%_62%)]'
                : i < step
                  ? 'text-white/45'
                  : 'text-white/20'
            }`}
            aria-current={i === step ? 'step' : undefined}
          >
            <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
            <span className="ml-2 hidden sm:inline">{s}</span>
          </div>
        ))}
      </div>

      <div className="p-6 sm:p-10">
        {/* Honeypot — hidden from humans and screen readers alike. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={f.website}
          onChange={(e) => set('website', e.target.value)}
          className="absolute h-0 w-0 overflow-hidden opacity-0"
        />

        {/* ── STEP 1 ── */}
        {step === 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="NAMA LENGKAP" htmlFor="fullName" required error={errors.fullName}>
                <input
                  id="fullName" className={inputCls} value={f.fullName} autoComplete="name"
                  onChange={(e) => set('fullName', e.target.value)}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  placeholder="Nama sesuai identitas"
                />
              </Field>
            </div>

            <Field
              label="TANGGAL LAHIR" htmlFor="birthDate" required error={errors.birthDate}
              hint={age >= 0 ? `Umur kamu ${age} tahun` : 'Umur dihitung otomatis'}
            >
              <input
                id="birthDate" type="date" className={inputCls} value={f.birthDate}
                max="2015-12-31" min="1970-01-01"
                onChange={(e) => set('birthDate', e.target.value)}
                aria-invalid={!!errors.birthDate}
                aria-describedby={errors.birthDate ? 'birthDate-error' : undefined}
              />
            </Field>

            <Field label="JENIS KELAMIN" htmlFor="gender-perempuan" required error={errors.gender}>
              <div className="flex gap-3" role="radiogroup" aria-label="Jenis kelamin">
                {(['perempuan', 'laki-laki'] as Gender[]).map((g) => (
                  <button
                    key={g} type="button" role="radio" aria-checked={f.gender === g}
                    id={`gender-${g}`} onClick={() => set('gender', g)}
                    className={`flex-1 border px-4 py-3 text-[13px] tracking-[0.1em] transition-colors ${
                      f.gender === g
                        ? 'border-[hsl(0_85%_58%)] bg-[hsl(0_72%_45%)]/12 text-white'
                        : 'border-white/12 text-white/45 hover:border-white/25'
                    }`}
                  >
                    {g === 'perempuan' ? 'PEREMPUAN' : 'LAKI-LAKI'}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="NOMOR WHATSAPP" htmlFor="whatsapp" required error={errors.whatsapp}
              hint="Dipakai untuk info audisi">
              <input
                id="whatsapp" type="tel" inputMode="tel" className={inputCls} value={f.whatsapp}
                onChange={(e) => set('whatsapp', e.target.value)} placeholder="08xxxxxxxxxx"
                aria-invalid={!!errors.whatsapp}
                aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined}
              />
            </Field>

            <Field label="INSTAGRAM" htmlFor="instagram">
              <input
                id="instagram" className={inputCls} value={f.instagram}
                onChange={(e) => set('instagram', e.target.value)} placeholder="@username"
              />
            </Field>

            <Field label="DOMISILI" htmlFor="domicileCity" required error={errors.domicileCity}>
              <select
                id="domicileCity" className={inputCls} value={f.domicileCity}
                onChange={(e) => set('domicileCity', e.target.value)}
                aria-invalid={!!errors.domicileCity}
                aria-describedby={errors.domicileCity ? 'domicileCity-error' : undefined}
              >
                <option value="">Pilih kota</option>
                {CITIES.map((c) => (
                  <option key={c} value={c} className="bg-[#0a0a0a]">{c}</option>
                ))}
              </select>
            </Field>

            <Field label="KECAMATAN / DETAIL" htmlFor="domicileDetail">
              <input
                id="domicileDetail" className={inputCls} value={f.domicileDetail}
                onChange={(e) => set('domicileDetail', e.target.value)} placeholder="Opsional"
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="SEKOLAH / KAMPUS" htmlFor="schoolOrCampus">
                <input
                  id="schoolOrCampus" className={inputCls} value={f.schoolOrCampus}
                  onChange={(e) => set('schoolOrCampus', e.target.value)} placeholder="Opsional"
                />
              </Field>
            </div>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 1 && (
          <div className="grid gap-6">
            <Field label="PILIH DIVISI" htmlFor="division-c4" required error={errors.division}>
              <div className="grid gap-3" role="radiogroup" aria-label="Divisi">
                {DIVISIONS.map((d) => {
                  const blocker = divisionBlocker(d.id, f.gender, age);
                  const locked = !!blocker;
                  return (
                    <button
                      key={d.id} type="button" role="radio" id={`division-${d.id}`}
                      aria-checked={f.division === d.id} disabled={locked}
                      onClick={() => !locked && set('division', d.id)}
                      className={`border p-5 text-left transition-colors ${
                        locked
                          ? 'cursor-not-allowed border-white/8 opacity-45'
                          : f.division === d.id
                            ? 'border-[hsl(0_85%_58%)] bg-[hsl(0_72%_45%)]/10'
                            : 'border-white/12 hover:border-white/30'
                      }`}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-display text-[1.6rem] leading-none text-white">
                          {d.name}
                        </span>
                        <span className="text-[10px] tracking-[0.2em] text-white/40">
                          {d.genders.length === 1 ? 'PUTRI' : 'PUTRI & PUTRA'} · {d.minAge}+
                        </span>
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-white/45">{d.blurb}</p>
                      {/* Say why it's locked instead of hiding the option. */}
                      {locked && (
                        <p className="mt-2.5 text-[12px] text-[hsl(0_85%_62%)]/80">{blocker}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="TIM CHEERS SEBELUMNYA" htmlFor="previousTeam" required={!f.isBeginner}
              error={errors.previousTeam}>
              <input
                id="previousTeam" className={inputCls} value={f.previousTeam}
                disabled={f.isBeginner}
                onChange={(e) => set('previousTeam', e.target.value)}
                placeholder={f.isBeginner ? 'Belum pernah — tidak perlu diisi' : 'Nama tim / sekolah'}
                aria-invalid={!!errors.previousTeam}
                aria-describedby={errors.previousTeam ? 'previousTeam-error' : undefined}
              />
              <label className="mt-3 flex cursor-pointer items-center gap-2.5 text-[13px] text-white/60">
                <input
                  type="checkbox" checked={f.isBeginner}
                  onChange={(e) => {
                    set('isBeginner', e.target.checked);
                    if (e.target.checked) {
                      set('previousTeam', '');
                      set('experienceYears', EXPERIENCE[0]);
                    }
                  }}
                  className="h-4 w-4 accent-[hsl(0_72%_45%)]"
                />
                Belum pernah ikut tim cheers — saya pemula
              </label>
            </Field>

            <Field label="POSISI YANG DIMINATI" htmlFor="pos-Base" required error={errors.position}
              hint="Bisa pilih lebih dari satu">
              <div className="flex flex-wrap gap-2.5">
                {POSITIONS.map((p) => {
                  const on = f.position.includes(p);
                  return (
                    <button
                      key={p} type="button" id={`pos-${p}`} aria-pressed={on}
                      onClick={() =>
                        set('position', on ? f.position.filter((x) => x !== p) : [...f.position, p])
                      }
                      className={`border px-4 py-2.5 text-[12px] tracking-[0.1em] transition-colors ${
                        on
                          ? 'border-[hsl(0_85%_58%)] bg-[hsl(0_72%_45%)]/12 text-white'
                          : 'border-white/12 text-white/45 hover:border-white/30'
                      }`}
                    >
                      {p.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </Field>

            <div className="grid gap-6 sm:grid-cols-3">
              <Field label="PENGALAMAN" htmlFor="experienceYears">
                <select
                  id="experienceYears" className={inputCls} value={f.experienceYears}
                  onChange={(e) => set('experienceYears', e.target.value)}
                >
                  {EXPERIENCE.map((x) => (
                    <option key={x} value={x} className="bg-[#0a0a0a]">{x}</option>
                  ))}
                </select>
              </Field>
              <Field label="TINGGI (CM)" htmlFor="heightCm">
                <input
                  id="heightCm" type="number" inputMode="numeric" min={100} max={220}
                  className={inputCls} value={f.heightCm}
                  onChange={(e) => set('heightCm', e.target.value)} placeholder="Opsional"
                />
              </Field>
              <Field label="BERAT (KG)" htmlFor="weightKg">
                <input
                  id="weightKg" type="number" inputMode="numeric" min={25} max={150}
                  className={inputCls} value={f.weightKg}
                  onChange={(e) => set('weightKg', e.target.value)} placeholder="Opsional"
                />
              </Field>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 2 && (
          <div className="grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="NAMA KONTAK DARURAT" htmlFor="emergencyName" required
                error={errors.emergencyName} hint="Orang tua atau wali">
                <input
                  id="emergencyName" className={inputCls} value={f.emergencyName}
                  onChange={(e) => set('emergencyName', e.target.value)}
                  aria-invalid={!!errors.emergencyName}
                  aria-describedby={errors.emergencyName ? 'emergencyName-error' : undefined}
                />
              </Field>
              <Field label="NOMOR KONTAK DARURAT" htmlFor="emergencyPhone" required
                error={errors.emergencyPhone}>
                <input
                  id="emergencyPhone" type="tel" inputMode="tel" className={inputCls}
                  value={f.emergencyPhone} placeholder="08xxxxxxxxxx"
                  onChange={(e) => set('emergencyPhone', e.target.value)}
                  aria-invalid={!!errors.emergencyPhone}
                  aria-describedby={errors.emergencyPhone ? 'emergencyPhone-error' : undefined}
                />
              </Field>
            </div>

            <Field label="KENAPA MAU GABUNG CROWN?" htmlFor="motivation"
              hint={`${f.motivation.length}/500 — opsional`}>
              <textarea
                id="motivation" rows={4} maxLength={500} className={`${inputCls} resize-none`}
                value={f.motivation} onChange={(e) => set('motivation', e.target.value)}
                placeholder="Ceritakan singkat"
              />
            </Field>

            <Field label="TAHU DARI MANA?" htmlFor="howDidYouHear">
              <select
                id="howDidYouHear" className={inputCls} value={f.howDidYouHear}
                onChange={(e) => set('howDidYouHear', e.target.value)}
              >
                <option value="">Pilih</option>
                {HEARD_FROM.map((x) => (
                  <option key={x} value={x} className="bg-[#0a0a0a]">{x}</option>
                ))}
              </select>
            </Field>

            <div className="border-t border-white/12 pt-6">
              <p className={labelCls}>PERSETUJUAN <span className="text-[hsl(0_85%_58%)]">*</span></p>
              <div className="grid gap-3.5">
                <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-white/65">
                  <input
                    type="checkbox" checked={f.parentApproval}
                    onChange={(e) => set('parentApproval', e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(0_72%_45%)]"
                    aria-invalid={!!errors.parentApproval}
                  />
                  Pendaftaran ini sudah disetujui orang tua / wali saya.
                </label>
                {errors.parentApproval && (
                  <p role="alert" className="text-[12px] text-[hsl(0_85%_62%)]">
                    {errors.parentApproval}
                  </p>
                )}
                <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-white/65">
                  <input
                    type="checkbox" checked={f.commitmentAgree}
                    onChange={(e) => set('commitmentAgree', e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(0_72%_45%)]"
                    aria-invalid={!!errors.commitmentAgree}
                  />
                  Saya siap berkomitmen dengan jadwal latihan serta rangkaian program Crown.
                </label>
                {errors.commitmentAgree && (
                  <p role="alert" className="text-[12px] text-[hsl(0_85%_62%)]">
                    {errors.commitmentAgree}
                  </p>
                )}
              </div>
            </div>

            {serverError && (
              <p role="alert" className="border border-[hsl(0_85%_58%)]/30 bg-[hsl(0_72%_45%)]/10 px-4 py-3 text-[13px] text-[hsl(0_85%_68%)]">
                {serverError}
              </p>
            )}
          </div>
        )}

        {/* Nav */}
        <div className="mt-9 flex items-center justify-between gap-4 border-t border-white/12 pt-7">
          <button
            type="button" onClick={back} disabled={step === 0}
            className="px-2 text-[11px] font-medium tracking-[0.2em] text-white/40 transition-colors hover:text-white disabled:invisible"
          >
            ← KEMBALI
          </button>
          {step < 2 ? (
            <button
              type="button" onClick={next}
              className="bg-[hsl(0_72%_45%)] px-9 py-4 text-[11px] font-medium tracking-[0.2em] text-white transition-colors hover:bg-[hsl(0_85%_52%)]"
            >
              LANJUT →
            </button>
          ) : (
            <button
              type="button" onClick={submit} disabled={submitting}
              className="bg-[hsl(0_72%_45%)] px-9 py-4 text-[11px] font-medium tracking-[0.2em] text-white transition-colors hover:bg-[hsl(0_85%_52%)] disabled:opacity-50"
            >
              {submitting ? 'MENGIRIM…' : 'KIRIM PENDAFTARAN'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
