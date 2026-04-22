import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-0 py-14">
      <div className="container-x">
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4">
            <Image
              src="/assets/coreupteam-horizontal-branco-cor.png"
              alt="CoreUP Team"
              width={200}
              height={40}
              className="h-7 w-auto md:h-9"
            />
            <p className="max-w-xs text-sm text-fg-1">
              Consultoria online de musculação e estilo de vida para quem vive sentado.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex items-center gap-3">
              <Link
                href="https://tiktok.com"
                target="_blank"
                rel="noopener"
                aria-label="TikTok"
                className="flex size-10 items-center justify-center rounded-full border border-line bg-bg-1 text-fg-1 transition hover:border-accent/40 hover:text-accent"
              >
                {/* TODO: trocar pelo @ real */}
                <TikTokIcon className="size-4" />
              </Link>
              <Link
                href="mailto:contato@coreupteam.com"
                aria-label="Email"
                className="flex size-10 items-center justify-center rounded-full border border-line bg-bg-1 text-fg-1 transition hover:border-accent/40 hover:text-accent"
              >
                {/* TODO: trocar pelo email real */}
                <Mail className="size-4" />
              </Link>
            </div>
            <Link
              href="#diagnostico"
              className="text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              Quero meu diagnóstico →
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 text-xs text-fg-2 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} CoreUP Team. Todos os direitos reservados.</span>
          <span>Core é o núcleo. Up é levantar. Team é porque você não faz isso sozinho.</span>
        </div>
      </div>
    </footer>
  );
}
