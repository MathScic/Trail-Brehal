"use client";

export default function Dots({
  count,
  active,
  onSelect,
  ariaLabelPrefix = "Aller au slide",
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
  ariaLabelPrefix?: string;
}) {
  return (
    <div
      className="mt-6 flex items-center justify-center gap-3"
      role="tablist"
      aria-label="Navigation des slides"
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-label={`${ariaLabelPrefix} ${i + 1}`}
          aria-current={active === i ? "true" : undefined}
          onClick={() => onSelect(i)}
          className={`h-4 w-4 rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
            active === i ? "bg-white" : "bg-white/50 hover:bg-white/70"
          }`}
        >
          <span className="sr-only">
            {active === i ? `Slide ${i + 1} actif` : `Aller au slide ${i + 1}`}
          </span>
        </button>
      ))}
    </div>
  );
}
