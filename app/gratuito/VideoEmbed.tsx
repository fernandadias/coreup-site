type Props = { youtubeId: string; title?: string };

export function VideoEmbed({ youtubeId, title = "Vídeo de apresentação" }: Props) {
  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`;
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-bg-1">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
