const phrases = [
  "Pra quem treina em academia",
  "Pra quem treina no parque",
  "Pra quem foca em corrida",
  "Pra quem treina em casa",
  "Pra quem treina na academia do condomínio",
  "Pra quem já é intermediário",
  "Pra quem treina há muito tempo",
  "Pra quem nunca treinou",
  "Pra quem não sabe por onde começar",
];

export function Marquee() {
  const items = [...phrases, ...phrases];

  return (
    <div className="relative overflow-hidden border-y border-accent/80 bg-accent py-4 text-bg-0">
      <div
        className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap motion-reduce:animate-none"
        aria-hidden
      >
        {items.map((p, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="font-display text-xl font-semibold tracking-tight md:text-2xl">
              {p}
            </span>
            <span className="inline-block size-1.5 rounded-full bg-bg-0/70" />
          </div>
        ))}
      </div>
      <span className="sr-only">{phrases.join(", ")}</span>
    </div>
  );
}
