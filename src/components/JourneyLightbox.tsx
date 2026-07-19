import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';

export type JourneyItem = {
  image: string;
  date: string;
  stage: string;
  title: string;
  description: string;
  alt: string;
  objectPosition?: string;
};

type JourneyLightboxProps = {
  item: JourneyItem | null;
  onClose: () => void;
};

export default function JourneyLightbox({ item, onClose }: JourneyLightboxProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-amber-400/25 bg-[#0d0d17] shadow-2xl shadow-black/60"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.22 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-black/65 p-2 text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Close journey photo"
            >
              <X size={20} />
            </button>

            <img
              src={item.image}
              alt={item.alt}
              className="max-h-[72vh] w-full bg-black/30 object-contain"
            />

            <div className="border-t border-white/10 p-5 sm:p-6">
              <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">
                <span>{item.stage}</span>
                <span aria-hidden="true" className="text-slate-600">/</span>
                <span className="text-slate-400">{item.date}</span>
              </div>
              <h3 className="text-xl font-black text-white sm:text-2xl">{item.title}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">{item.description}</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
