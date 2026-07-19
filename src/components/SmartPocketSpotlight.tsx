import { motion, useReducedMotion } from 'motion/react';
import { Award, ExternalLink, Github, Smartphone, Sparkles } from 'lucide-react';

type SmartPocketSpotlightProps = {
  linkedInUrl: string;
};

const awards = ['Gold Award', 'Best of the Best Award'];
const tech = ['Flutter', 'Dart', 'Firebase Firestore', 'Firebase Auth', 'Provider'];

export default function SmartPocketSpotlight({ linkedInUrl }: SmartPocketSpotlightProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-amber-400/25 bg-gradient-to-br from-amber-400/[0.08] via-slate-900/85 to-indigo-950/70 p-1 shadow-2xl shadow-amber-950/10"
    >
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative grid gap-8 rounded-[22px] border border-white/[0.05] bg-[#0b0b15]/75 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">
              <Smartphone size={13} /> Featured FYP
            </span>
            <span className="text-xs font-mono text-slate-500">Mar 2025 – Jun 2026</span>
          </div>

          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-amber-400">Multi-Modal Personal Finance</p>
          <h3 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">Smart Pocket</h3>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            A personal financial management app designed for people who stop tracking because budgeting feels too complicated or time-consuming. Its multi-mode approach lets users choose between <strong className="text-white">Lazy Mode</strong> for speed and <strong className="text-white">Detailed Mode</strong> for deeper control.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400">
            Built through research, design, development, testing, and continuous refinement to make long-term financial awareness easier to sustain.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tech.map((item) => (
              <span key={item} className="rounded-md border border-slate-700/70 bg-slate-800/60 px-2.5 py-1 text-[11px] font-mono text-slate-300">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://github.com/yixun06/SMART-POCKET"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            >
              <Github size={16} /> Source Code
            </a>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-bold text-amber-200 transition hover:bg-amber-400/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <ExternalLink size={16} /> View LinkedIn Post
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="rounded-2xl border border-amber-400/20 bg-black/20 p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
                <Sparkles size={21} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-400">FYP Exhibition</p>
                <p className="mt-1 text-xs text-slate-400">Session 2025/2026 · Semester II</p>
              </div>
            </div>

            <div className="space-y-3">
              {awards.map((award, index) => (
                <motion.div
                  key={award}
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + index * 0.12 }}
                  className="flex items-center gap-4 rounded-xl border border-amber-400/15 bg-amber-400/[0.07] p-4"
                >
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-amber-300/30 bg-amber-400/10">
                    <Award className="text-amber-300" size={19} />
                  </div>
                  <div>
                    <p className="font-black text-white">{award}</p>
                    <p className="mt-0.5 text-xs text-slate-400">Awarded to Smart Pocket</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
