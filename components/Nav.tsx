import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/Button";

export function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-bg-0/70 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" aria-label="CoreUP Team · página inicial" className="flex items-center">
          <Image
            src="/assets/coreupteam-horizontal-branco-cor.png"
            alt="CoreUP Team"
            width={160}
            height={32}
            priority
            className="h-4 w-auto"
          />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#sistema" className="text-sm text-fg-1 transition hover:text-fg-0">
            O sistema
          </Link>
          <Link href="#app" className="text-sm text-fg-1 transition hover:text-fg-0">
            App exclusivo
          </Link>
          <Link href="#processo" className="text-sm text-fg-1 transition hover:text-fg-0">
            Como funciona
          </Link>
          <Link href="#faq" className="text-sm text-fg-1 transition hover:text-fg-0">
            FAQ
          </Link>
        </nav>
        <Button href="#diagnostico" size="md">
          Quero meu diagnóstico
        </Button>
      </div>
    </header>
  );
}
