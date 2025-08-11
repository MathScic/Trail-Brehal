"use client";

export default function Dots({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          aria-label={`Aller au slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`h-2 w-2 rounded-full transition ${
            active === i ? "bg-white" : "bg-white/50 hover:bg-white/70"
          }`}
        />
      ))}
    </div>
  );
}
