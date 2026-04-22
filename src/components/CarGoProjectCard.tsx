import { Car, ExternalLink, Github, ServerCog } from 'lucide-react';
import { useState } from 'react';

type CarGoProjectCardProps = {
  githubUrl?: string;
  liveDemoUrl?: string;
};

export default function CarGoProjectCard({
  githubUrl = 'https://github.com/yixun06/CARGO_WEBSITE',
  liveDemoUrl = 'http://cargo.runasp.net/',
}: CarGoProjectCardProps) {
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  const techStack = ['ASP.NET', 'C#', 'SQL Server', 'Entity Framework', 'Razor'];
  const screenshots = [
    'https://raw.githubusercontent.com/yixun06/CARGO_WEBSITE/main/docs/screenshots/booking-page.png',
    'https://raw.githubusercontent.com/yixun06/CARGO_WEBSITE/main/docs/screenshots/home-cars.png',
    'https://raw.githubusercontent.com/yixun06/CARGO_WEBSITE/main/docs/screenshots/contact-page.png',
    'https://raw.githubusercontent.com/yixun06/CARGO_WEBSITE/main/docs/screenshots/user-profile.png',
    'https://raw.githubusercontent.com/yixun06/CARGO_WEBSITE/main/docs/screenshots/admin-order-list.png',
    'https://raw.githubusercontent.com/yixun06/CARGO_WEBSITE/main/docs/screenshots/admin-manage-message.png',
  ];

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-sky-900/10 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40">
      <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-300">
        <ServerCog size={14} />
        Production Deployed
      </div>

      <h3 className="text-2xl font-bold tracking-tight text-white">CarGo - Car Rental Management System</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">
        CarGo is a full-stack car rental platform that supports customer booking workflows and administrative fleet operations in a single system.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        The solution is engineered with ASP.NET and SQL Server, with live deployment on Monster ASP.NET Hosting to validate production readiness.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400"
        >
          <Github size={16} />
          GitHub
        </a>

        <a
          href={liveDemoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-slate-500 hover:bg-slate-800"
        >
          <ExternalLink size={16} />
          Live Demo
        </a>
      </div>

      <p className="mt-4 rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2 text-xs text-slate-300">
        Deployment target: Monster ASP.NET Hosting | Local development: Visual Studio + SQL Server.
      </p>

      <div className="mt-5">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Screenshots</h4>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {screenshots.map((shot, index) => (
            <button
              key={shot}
              type="button"
              onClick={() => setSelectedScreenshot(shot)}
              className="relative overflow-hidden rounded-lg border border-slate-700 bg-slate-800/50 transition-all hover:border-sky-500/50"
            >
              <img
                src={shot}
                alt={`CarGo screenshot ${index + 1}`}
                className="h-24 w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 right-4 text-slate-700 transition-colors group-hover:text-sky-400/40">
        <Car size={54} strokeWidth={1.5} />
      </div>

      {selectedScreenshot && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4"
          onClick={() => setSelectedScreenshot(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-[90vh] max-w-5xl overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
            <img src={selectedScreenshot} alt="CarGo screenshot preview" className="max-h-[90vh] w-full object-contain" />
          </div>
        </div>
      )}
    </article>
  );
}
