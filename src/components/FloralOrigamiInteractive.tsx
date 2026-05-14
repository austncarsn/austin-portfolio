import { FlipPhone } from "./FlipPhone";
import { PinballMachine } from "./PinballMachine";

export function FloralOrigamiInteractive() {
  return (
    <div
      className="w-full rounded-[32px] border border-white/10 bg-[#080815]/80 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]"
      style={{ backdropFilter: "blur(24px)" }}
    >
      <div className="mb-6 rounded-3xl border border-white/10 bg-[#090919] p-5 text-center shadow-[0_0_40px_rgba(0,0,0,0.14)]">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
          Interactive preview
        </p>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
          Floral Origami Interactive
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          A responsive, neon-styled React interaction built around a
          stage-driven press counter and reactive motion.
        </p>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-start justify-center gap-6">
          <PinballMachine neon="#ff2d55" />
          <FlipPhone color="#00e5ff" />
        </div>
      </div>
    </div>
  );
}
