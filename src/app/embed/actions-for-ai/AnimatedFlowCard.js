import { User, Mail, LayoutGrid, CheckCircle2 } from "lucide-react";

const executedActions = [
  {
    icon: <User className="w-3.5 h-3.5 text-orange-500" />,
    app: "HubSpot",
    action: "Contact created",
    detail: "Sarah Chen — VP Ops, Acme Corp",
  },
  {
    icon: <Mail className="w-3.5 h-3.5 text-red-500" />,
    app: "Gmail",
    action: "Email sent",
    detail: '"Welcome to the enterprise plan" — delivered',
  },
  {
    icon: <LayoutGrid className="w-3.5 h-3.5 text-green-500" />,
    app: "Notion",
    action: "Record updated",
    detail: "Deal stage set to Qualified",
  },
];

const actionAnimationClasses = [
  "animate-flowAction1",
  "animate-flowAction2",
  "animate-flowAction3",
];

export default function AnimatedFlowCard() {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100 bg-white">
      {/* INPUT */}
      <div className="px-6 py-5">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-2">Input</p>
        <p className="text-sm font-semibold text-gray-900 mb-1">New lead from website form</p>
        <p className="text-xs text-blue-600">
          Acme Corp · enterprise plan · submitted by Sarah Chen, VP Ops
        </p>
      </div>

      {/* AGENT DECISION */}
      <div className="px-6 py-5 min-h-[80px]">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-2">Agent Decision</p>

        {/* Loading dots */}
        <div className="flex gap-1 mt-1 animate-flowDecisionDots">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse [animation-delay:300ms]" />
        </div>

        {/* Decision text */}
        <div className="flex items-center gap-2 animate-flowDecisionText">
          <span className="text-sm font-semibold text-gray-900">Three actions selected</span>
          <CheckCircle2 className="w-4 h-4 text-green-500 animate-flowCheckmark" />
        </div>
      </div>

      {/* EXECUTED */}
      <div className="px-6 py-5 min-h-[160px]">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-3">Executed</p>

        {/* Loading dots */}
        <div className="flex gap-1 mt-1 animate-flowExecutedDots">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-200 delay-0" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-200 delay-150" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-200 delay-300" />
        </div>

        {/* Action items */}
        <div className="space-y-3">
          {executedActions.map((a, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 opacity-0 ${actionAnimationClasses[i]}`}
            >
              <div className="w-6 h-6 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                {a.icon}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">
                  <span className="text-gray-400 font-normal">{a.app} · </span>
                  {a.action}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{a.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
