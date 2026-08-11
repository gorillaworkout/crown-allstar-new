import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import RedMoon from '@/components/recruitment/red-moon';
import Countdown from '@/components/recruitment/countdown';
import RecruitmentForm from '@/components/recruitment/recruitment-form';
import { DIVISIONS, windowState } from '@/lib/recruitment';

export const metadata: Metadata = {
  title: { absolute: 'Open Recruitment Angkatan 18 | Crown Allstar Cheerleading' },
  description:
    'Crown Allstar membuka pendaftaran Angkatan 18, 13-21 Agustus 2026. Gratis, tanpa pengalaman diperbolehkan. Divisi All Girl, C4, dan Premier.',
  openGraph: {
    title: 'Open Recruitment Crown Allstar Angkatan 18',
    description: '13-21 Agustus 2026. Gratis. Tanpa pengalaman diperbolehkan.',
  },
};

// Rendered per-request so the open/closed state is never cached wrong.
export const dynamic = 'force-dynamic';

const TIMELINE = [
  { date: '13 AGU', label: 'Pendaftaran dibuka', done: false },
  { date: '21 AGU', label: 'Pendaftaran ditutup', done: false },
  { date: 'TBA', label: 'Audisi & seleksi', done: false },
  { date: 'TBA', label: 'Pengumuman hasil', done: false },
];

const REQUIREMENTS = [
  {
    n: '01',
    title: 'TANPA PENGALAMAN DIPERBOLEHKAN',
    body: 'Belum pernah cheerleading sama sekali? Tetap boleh mendaftar. Kami melatih dari dasar.',
  },
  {
    n: '02',
    title: 'DISETUJUI ORANG TUA',
    body: 'Pendaftaran wajib diketahui dan disetujui orang tua atau wali.',
  },
  {
    n: '03',
    title: 'SIAP BERKOMITMEN',
    body: 'Bersedia mengikuti jadwal latihan serta rangkaian program Crown secara konsisten.',
  },
];

const FAQ = [
  {
    q: 'Boleh daftar kalau belum pernah cheerleading?',
    a: 'Boleh. Tanpa pengalaman diperbolehkan — ini salah satu syarat resmi Angkatan 18. Banyak atlet Crown mulai dari nol.',
  },
  {
    q: 'Berapa biaya pendaftarannya?',
    a: 'Gratis. Tidak ada biaya pendaftaran untuk Angkatan 18.',
  },
  {
    q: 'Umur minimum berapa?',
    a: 'Tergantung divisi. All Girl dan C4 minimum 13 tahun. Premier minimum 15 tahun.',
  },
  {
    q: 'Di mana dan kapan latihannya?',
    a: 'Lokasi dan jadwal latihan akan diinformasikan menyusul (TBA). Yang penting kamu siap berkomitmen saat jadwal ditetapkan.',
  },
  {
    q: 'Laki-laki boleh ikut?',
    a: 'Boleh, di divisi C4 (13+) dan Premier (15+). Divisi All Girl khusus perempuan.',
  },
  {
    q: 'Kalau saya di luar Bandung?',
    a: 'Tetap boleh mendaftar. Cantumkan domisili kamu di formulir supaya kami bisa mempertimbangkan jarak dan kesiapan latihan.',
  },
];

export default function RecruitmentPage() {
  const ws = windowState();

  return (
    <div className="redmoon bg-[#0a0a0a]">
      <Header />

      {/* ══ HERO — type as image, moon as the only ornament ══ */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-16 pt-32 sm:px-10 lg:px-16">
        <RedMoon />

        {/* Vertical rail, matching the site's magazine gutter device */}
        <span className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 text-[10px] tracking-[0.3em] text-white/20 [writing-mode:vertical-lr] lg:block">
          CROWN ALLSTAR · EST. 2008 · BANDUNG
        </span>

        <div className="relative mx-auto w-full max-w-6xl">
          <p className="inline-block border border-[hsl(0_85%_58%)]/25 px-5 py-2 text-[11px] font-medium tracking-[0.3em] text-[hsl(0_85%_62%)]">
            OPEN RECRUITMENT
          </p>

          <h1 className="font-display mt-7 text-[clamp(3.5rem,12vw,8.5rem)] leading-[0.82] tracking-tight text-white">
            ANGKATAN
            <br />
            <span className="text-[hsl(0_85%_58%)]">18</span>
          </h1>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_auto] lg:items-start lg:gap-16">
            <div>
              <p className="max-w-lg text-[17px] leading-relaxed text-white/55">
                Enam belas kali juara nasional ICANC. Pernah mewakili Indonesia di ICU World
                Championship, Florida. Sekarang kami mencari angkatan berikutnya.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] tracking-[0.2em]">
                <span className="bg-[hsl(0_72%_45%)] px-3.5 py-2 font-medium text-white">GRATIS</span>
                <span className="border border-white/15 px-3.5 py-2 text-white/60">
                  TANPA PENGALAMAN OK
                </span>
                <span className="border border-white/15 px-3.5 py-2 text-white/60">
                  13—21 AGUSTUS
                </span>
              </div>

              <a
                href="#daftar"
                className="mt-9 inline-block bg-white px-10 py-4 text-[11px] font-medium tracking-[0.2em] text-black transition-colors hover:bg-[hsl(0_85%_58%)] hover:text-white"
              >
                {ws === 'open' ? 'DAFTAR SEKARANG' : 'LIHAT PERSYARATAN'}
              </a>
            </div>

            <div className="lg:justify-self-end lg:border-l lg:border-white/10 lg:pl-10">
              <Countdown initialState={ws} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ MARQUEE — the site's existing rhythm break ══ */}
      <div className="overflow-hidden border-y border-[hsl(0_85%_58%)]/20 bg-[hsl(0_72%_45%)] py-3.5">
        <div className="marquee-track flex whitespace-nowrap">
          {[0, 1].map((k) => (
            <span key={k} className="flex shrink-0 items-center">
              {Array.from({ length: 6 }, (_, i) => (
                <span
                  key={i}
                  className="mx-5 text-[12px] font-medium tracking-[0.28em] text-white/90"
                >
                  ALL GIRL · C4 · PREMIER · ANGKATAN 18 · PENDAFTARAN GRATIS ·
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ══ DIVISIONS — asymmetric editorial rows, not equal-weight cards ══ */}
      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-white/35">PILIH JALURMU</p>
              <h2 className="font-display mt-3 text-[clamp(2.25rem,6vw,4.5rem)] leading-none text-white">
                TIGA DIVISI
              </h2>
            </div>
            <span className="moon-line" />
          </div>

          <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {DIVISIONS.map((d, i) => (
              <div
                key={d.id}
                className="grid gap-4 py-9 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-10"
              >
                <span className="text-[11px] tabular-nums tracking-[0.2em] text-white/25">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-none text-white">
                    {d.name}
                  </h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/50">
                    {d.blurb}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="font-display text-[2rem] leading-none text-[hsl(0_85%_58%)]">
                    {d.minAge}+
                  </p>
                  <p className="mt-1.5 text-[10px] tracking-[0.2em] text-white/40">
                    {d.genders.length === 1 ? 'PEREMPUAN' : 'PEREMPUAN & LAKI-LAKI'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REQUIREMENTS — numbered list, gold-standard hierarchy via scale ══ */}
      <section className="diagonal-stripe border-y border-white/10 px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] tracking-[0.3em] text-white/35">YANG KAMI CARI</p>
          <h2 className="font-display mt-3 max-w-2xl text-[clamp(2rem,5.5vw,4rem)] leading-[0.95] text-white">
            TIGA SYARAT.
            <br />
            <span className="text-white/30">TIDAK ADA YANG KEEMPAT.</span>
          </h2>

          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-3">
            {REQUIREMENTS.map((r) => (
              <div key={r.n} className="bg-[#0a0a0a] p-7">
                <span className="font-display text-[2.5rem] leading-none text-[hsl(0_85%_58%)]/35">
                  {r.n}
                </span>
                <h3 className="mt-4 text-[13px] font-medium leading-snug tracking-[0.12em] text-white">
                  {r.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/45">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIMELINE — horizontal rail ══ */}
      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] tracking-[0.3em] text-white/35">ALUR SELEKSI</p>
          <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-4">
            {TIMELINE.map((t, i) => (
              <div key={i} className="bg-[#0a0a0a] px-6 py-8">
                <p
                  className={`font-display text-[1.75rem] leading-none ${
                    t.date === 'TBA' ? 'text-white/25' : 'text-[hsl(0_85%_58%)]'
                  }`}
                >
                  {t.date}
                </p>
                <p className="mt-2.5 text-[13px] text-white/55">{t.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-white/35">
            Lokasi dan jadwal latihan akan diinformasikan menyusul.
          </p>
        </div>
      </section>

      {/* ══ FORM ══ */}
      <section id="daftar" className="scroll-mt-24 px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="text-[10px] tracking-[0.3em] text-white/35">FORMULIR PENDAFTARAN</p>
            <h2 className="font-display mt-3 text-[clamp(2.25rem,6vw,4rem)] leading-none text-white">
              DAFTAR SEKARANG
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/50">
              Tiga langkah, sekitar dua menit. Isian kamu tersimpan otomatis kalau halaman
              tertutup.
            </p>
          </div>
          <RecruitmentForm windowState={ws} />
        </div>
      </section>

      {/* ══ FAQ — native details, no JS needed ══ */}
      <section className="border-t border-white/10 px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-[clamp(1.75rem,4.5vw,2.75rem)] leading-none text-white">
            PERTANYAAN UMUM
          </h2>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {FAQ.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15px] font-medium text-white/85 transition-colors hover:text-white">
                  {item.q}
                  <span className="shrink-0 text-[hsl(0_85%_58%)] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-5 pr-8 text-[14px] leading-relaxed text-white/50">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section className="border-t border-white/10 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-8">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-white/35">MASIH RAGU?</p>
            <p className="font-display mt-3 text-[clamp(1.5rem,4vw,2.5rem)] leading-none text-white">
              TANYA LANGSUNG
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/6281324420183"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/15 px-7 py-3.5 text-[11px] tracking-[0.2em] text-white/70 transition-colors hover:border-[hsl(0_85%_58%)] hover:text-white"
            >
              WHATSAPP
            </a>
            <a
              href="https://instagram.com/crownallstar"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/15 px-7 py-3.5 text-[11px] tracking-[0.2em] text-white/70 transition-colors hover:border-[hsl(0_85%_58%)] hover:text-white"
            >
              INSTAGRAM
            </a>
            <Link
              href="/about"
              className="border border-white/15 px-7 py-3.5 text-[11px] tracking-[0.2em] text-white/70 transition-colors hover:border-[hsl(0_85%_58%)] hover:text-white"
            >
              TENTANG CROWN
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
