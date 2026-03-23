export default function FeatureChips({ chips = [] }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {chips.map((chip) => (
        <div
          key={chip.label}
          className="relative flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold overflow-hidden"
          style={chip.ai ? {
            background: "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(99,102,241,0.1) 50%, rgba(59,130,246,0.08) 100%)",
            border: "1px solid rgba(168,85,247,0.3)",
            color: "#7c3aed",
            boxShadow: "0 2px 12px rgba(168,85,247,0.12), inset 0 1px 0 rgba(255,255,255,0.5)",
          } : {
            background: `linear-gradient(135deg, ${chip.color}18 0%, ${chip.color}10 100%)`,
            border: `1px solid ${chip.color}40`,
            color: chip.color,
            boxShadow: `0 2px 12px ${chip.color}10, inset 0 1px 0 rgba(255,255,255,0.5)`,
          }}
        >
          {/* Glass shimmer highlight */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background: chip.ai
                ? "linear-gradient(90deg, transparent 10%, rgba(168,85,247,0.3) 50%, transparent 90%)"
                : `linear-gradient(90deg, transparent 10%, ${chip.color}28 50%, transparent 90%)`,
            }}
          />
          <span style={chip.ai ? {
            color: "#8b5cf6",
          } : {
            color: chip.color,
            opacity: 0.85,
          }}>
            {chip.icon}
          </span>
          {chip.label}
        </div>
      ))}
    </div>
  );
}