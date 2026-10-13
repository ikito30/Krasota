import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionProps, type MotionValue } from 'framer-motion';
import Hls from 'hls.js';
import { Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4';
const MISSION_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4';
const SOLUTION_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4';
const CTA_HLS = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8';

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const fadeUp = (delay: number): MotionProps => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

function Mark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center rounded-full border-2 border-foreground/60 ${className}`} aria-hidden="true">
      <span className="h-[42%] w-[42%] rounded-full border border-foreground/70" />
    </span>
  );
}

function Navbar() {
  const links = [
    ['Home', '#home'],
    ['How It Works', '#how-it-works'],
    ['Philosophy', '#philosophy'],
    ['Use Cases', '#use-cases'],
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 py-4 md:px-28">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-5" aria-label="Main navigation">
        <a href="#home" className="flex shrink-0 items-center gap-2.5" aria-label="Mindloop home">
          <Mark />
          <span className="text-lg font-bold tracking-tight">Mindloop</span>
        </a>
        <div className="hidden items-center gap-3 text-sm text-muted-foreground lg:flex">
          {links.map(([label, href], index) => (
            <span className="flex items-center gap-3" key={label}>
              {index > 0 && <span aria-hidden="true" className="text-white/35">•</span>}
              <a href={href} className="transition-colors hover:text-foreground">{label}</a>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white/75 transition-colors hover:text-white"><Instagram size={17} /></a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white/75 transition-colors hover:text-white"><Linkedin size={17} /></a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter" className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white/75 transition-colors hover:text-white"><Twitter size={17} /></a>
        </div>
      </nav>
    </header>
  );
}

function SubscribeForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="w-full max-w-lg">
      <form onSubmit={onSubmit} className={`liquid-glass flex w-full items-center gap-2 rounded-full p-2 ${compact ? 'mx-auto' : ''}`}>
        <Input
          type="email"
          value={email}
          onChange={(event) => { setEmail(event.target.value); setSubmitted(false); }}
          required
          aria-label="Email address"
          placeholder="Enter your email address"
          className="min-w-0 flex-1 rounded-full pl-4"
        />
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="shrink-0">
          <Button type="submit" className="h-12 rounded-full px-6 text-[11px] font-semibold tracking-[1.4px] sm:px-8">SUBSCRIBE</Button>
        </motion.div>
      </form>
      <p aria-live="polite" className="mt-3 min-h-5 text-center text-xs text-white/65">
        {submitted ? 'You’re on the list. Watch your inbox for the next Mindloop.' : 'No noise. Just thoughtful ideas, delivered.'}
      </p>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-[780px] h-screen items-center justify-center overflow-hidden px-5 pb-20 pt-28 md:px-8 md:pt-32">
      <video className="video-monochrome absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-64 bg-gradient-to-t from-background to-transparent" />
      <motion.div {...fadeUp(0.08)} className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <div className="mb-8 flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <div className="flex -space-x-2">
            <img src={publicAsset('assets/avatar-1.svg')} alt="" className="h-8 w-8 rounded-full border-2 border-background object-cover" />
            <img src={publicAsset('assets/avatar-2.svg')} alt="" className="h-8 w-8 rounded-full border-2 border-background object-cover" />
            <img src={publicAsset('assets/avatar-3.svg')} alt="" className="h-8 w-8 rounded-full border-2 border-background object-cover" />
          </div>
          <span>7,000+ people already subscribed</span>
        </div>
        <h1 className="max-w-5xl text-5xl font-medium leading-[0.98] tracking-[-2px] sm:text-6xl md:text-7xl lg:text-8xl">
          Get <span className="serif-italic">Inspired</span> with Us
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-7 text-hero-subtitle sm:text-lg">
          Join our feed for meaningful updates, news around technology and a shared journey toward depth and direction.
        </p>
        <div className="mt-9 w-full max-w-lg">
          <SubscribeForm compact />
        </div>
      </motion.div>
    </section>
  );
}

const platforms = [
  {
    name: 'ChatGPT',
    icon: publicAsset('assets/icon-chatgpt.svg'),
    description: 'People are asking better questions. Make sure your ideas are part of the conversation.',
  },
  {
    name: 'Perplexity',
    icon: publicAsset('assets/icon-perplexity.svg'),
    description: 'Answer engines are reshaping discovery. Give curious minds something worth finding.',
  },
  {
    name: 'Google AI',
    icon: publicAsset('assets/icon-google.svg'),
    description: 'Search is becoming a conversation. Build content that earns attention and trust.',
  },
];

function SearchChanged() {
  return (
    <section id="how-it-works" className="px-5 pb-9 pt-36 sm:px-8 md:px-12 md:pb-9 md:pt-52">
      <motion.div {...fadeUp(0)} className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-medium leading-[1.02] tracking-[-1.8px] sm:text-5xl md:text-7xl lg:text-8xl">
          Search has <span className="serif-italic">changed.</span><br className="hidden sm:block" /> Have you?
        </h2>
        <p className="mx-auto mb-16 mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:mb-24 sm:text-lg">
          Discovery is moving beyond links and lists. People now ask, explore, and expect meaningful answers.
        </p>
      </motion.div>
      <div className="mx-auto mb-16 grid max-w-5xl gap-12 sm:grid-cols-2 md:mb-20 md:grid-cols-3 md:gap-8">
        {platforms.map((platform, index) => (
          <motion.article {...fadeUp(0.12 * index)} key={platform.name} className="flex flex-col items-center text-center">
            <div className="mb-7 flex h-[180px] w-[180px] items-center justify-center sm:h-[200px] sm:w-[200px]">
              <img src={platform.icon} alt={`${platform.name} icon`} className="h-full w-full object-contain" />
            </div>
            <h3 className="text-base font-semibold">{platform.name}</h3>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{platform.description}</p>
          </motion.article>
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground">If you don&apos;t answer the questions, someone else will.</p>
    </section>
  );
}

function RevealWord({
  word,
  index,
  total,
  progress,
  highlighted,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  highlighted: boolean;
}) {
  const start = index / total;
  const end = Math.min(1, (index + 1.3) / total);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return <motion.span style={{ opacity }} className={highlighted ? 'text-foreground' : 'text-hero-subtitle'}>{word}</motion.span>;
}

function RevealParagraph({
  text,
  highlights,
  progress,
  startIndex,
  total,
  className,
}: {
  text: string;
  highlights: string[];
  progress: MotionValue<number>;
  startIndex: number;
  total: number;
  className: string;
}) {
  const words = useMemo(() => text.split(/\s+/), [text]);
  return (
    <p className={className}>
      {words.map((word, index) => (
        <span key={`${startIndex}-${index}`}>
          <RevealWord word={word} index={startIndex + index} total={total} progress={progress} highlighted={highlights.includes(word.replace(/[.,—]/g, ''))} />{' '}
        </span>
      ))}
    </p>
  );
}

function Mission() {
  const missionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: missionRef, offset: ['start 0.8', 'end 0.35'] });
  const first = "We're building a space where curiosity meets clarity — where readers find depth, writers find reach, and every newsletter becomes a conversation worth having.";
  const second = 'A platform where content, community, and insight flow together — with less noise, less friction, and more meaning for everyone involved.';
  const firstWords = first.split(/\s+/).length;
  const totalWords = firstWords + second.split(/\s+/).length;

  return (
    <section id="philosophy" ref={missionRef} className="px-5 pb-32 pt-8 sm:px-8 md:pb-44 md:pt-0">
      <motion.div {...fadeUp(0)} className="mx-auto mb-20 max-w-[800px]">
        <video className="video-monochrome aspect-square w-full rounded-2xl object-cover" autoPlay muted loop playsInline preload="metadata" aria-label="Abstract monochrome motion film">
          <source src={MISSION_VIDEO} type="video/mp4" />
        </video>
      </motion.div>
      <div className="mx-auto max-w-5xl">
        <RevealParagraph
          text={first}
          highlights={['curiosity', 'meets', 'clarity']}
          progress={scrollYProgress}
          startIndex={0}
          total={totalWords}
          className="text-2xl font-medium leading-[1.22] tracking-[-1px] sm:text-3xl md:text-4xl lg:text-5xl"
        />
        <RevealParagraph
          text={second}
          highlights={[]}
          progress={scrollYProgress}
          startIndex={firstWords}
          total={totalWords}
          className="mt-10 text-xl font-medium leading-[1.3] tracking-[-0.5px] sm:text-2xl lg:text-3xl"
        />
      </div>
    </section>
  );
}

const features = [
  { title: 'Curated Feed', description: 'A thoughtful stream of ideas selected for relevance, depth, and the questions you care about.' },
  { title: 'Writer Tools', description: 'Create, publish, and understand what resonates with tools designed to keep the work flowing.' },
  { title: 'Community', description: 'Turn passive reading into a real exchange between people who are curious about the same things.' },
  { title: 'Distribution', description: 'Help good ideas travel further with a clear path from first discovery to lasting readership.' },
];

function Solution() {
  return (
    <section id="use-cases" className="border-t border-border/30 px-5 py-32 sm:px-8 md:px-12 md:py-44">
      <div className="mx-auto max-w-6xl">
        <motion.p {...fadeUp(0)} className="text-xs font-medium uppercase tracking-[3px] text-muted-foreground">Solution</motion.p>
        <motion.h2 {...fadeUp(0.08)} className="mt-5 max-w-4xl text-4xl font-medium leading-[1.06] tracking-[-1.5px] sm:text-5xl md:text-6xl">
          The platform for <span className="serif-italic">meaningful</span> content
        </motion.h2>
        <motion.div {...fadeUp(0.14)} className="mt-12 overflow-hidden rounded-2xl">
          <video className="video-monochrome aspect-[3/1] w-full object-cover" autoPlay muted loop playsInline preload="metadata" aria-label="Mindloop content platform film">
            <source src={SOLUTION_VIDEO} type="video/mp4" />
          </video>
        </motion.div>
        <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-4">
          {features.map((feature, index) => (
            <motion.article {...fadeUp(index * 0.08)} key={feature.title}>
              <h3 className="text-base font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | undefined;
    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(CTA_HLS);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        void video.play().catch(() => undefined);
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = CTA_HLS;
      void video.play().catch(() => undefined);
    }

    return () => hls?.destroy();
  }, []);

  return (
    <section className="relative isolate overflow-hidden border-t border-border/30 px-5 py-32 sm:px-8 md:py-44">
      <video ref={videoRef} className="video-monochrome absolute inset-0 -z-20 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-background/55" />
      <motion.div {...fadeUp(0)} className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Mark className="h-10 w-10 border-2" />
        <h2 className="mt-7 text-5xl font-medium tracking-[-1.8px] sm:text-6xl md:text-7xl"><span className="serif-italic">Start</span> Your Journey</h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">Make space for ideas that stay with you. Read with intention, write with purpose, and find your people.</p>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button asChild size="lg" className="rounded-lg"><a href="#home">Subscribe Now</a></Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button asChild variant="outline" size="lg" className="liquid-glass rounded-lg border-0"><a href="mailto:write@mindloop.example">Start Writing <ArrowUpRight size={15} className="ml-2" /></a></Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer" className="flex flex-col gap-5 px-5 py-10 text-sm text-muted-foreground sm:px-8 md:flex-row md:items-center md:justify-between md:px-28 md:py-12">
      <p>© 2026 Mindloop. All rights reserved.</p>
      <nav className="flex flex-wrap items-center gap-6" aria-label="Footer navigation">
        <a href="mailto:privacy@mindloop.example" className="transition-colors hover:text-foreground">Privacy</a>
        <a href="mailto:legal@mindloop.example" className="transition-colors hover:text-foreground">Terms</a>
        <a href="mailto:hello@mindloop.example" className="transition-colors hover:text-foreground">Contact</a>
      </nav>
    </footer>
  );
}

export default function App() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <Navbar />
      <Hero />
      <SearchChanged />
      <Mission />
      <Solution />
      <CtaVideo />
      <Footer />
    </main>
  );
}
