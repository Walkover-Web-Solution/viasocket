'use client';

import { Shield, Globe, Eye, CheckCircle } from 'lucide-react';

export default function FinalCTA() {
  const features = [
    {
      id: 1,
      icon: CheckCircle,
      bgColor: '#A8200D',
      title: 'Fair usage',
      description: 'Pay only for what you use. No overages, no waste.',
    },
    {
      id: 2,
      icon: Globe,
      bgColor: '#5B21B6',
      title: 'PPP pricing',
      description: 'Fair prices for every region worldwide.',
    },
    {
      id: 3,
      icon: Shield,
      bgColor: '#B45309',
      title: 'Enterprise security',
      description: 'Your data is protected with industry-leading security.',
    },
    {
      id: 4,
      icon: Eye,
      bgColor: '#1D4ED8',
      title: 'Transparent always',
      description: 'Clear pricing. No hidden fees. No surprises.',
    },
  ];

  return (
    <div className="bg-black p-12" style={{ backgroundImage: 'radial-gradient(ellipse at top, rgba(168, 32, 13, 0.35), transparent 70%)' }}>
      <div className="container p-12 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20 items-center">
        <div>
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold leading-tight mb-4 sm:mb-5 md:mb-6 lg:mb-7">
            Sign up free and start your first workflow, no credit card required.
          </h2>
          <button onClick={() => (window.location.href = '/signup')} className="btn btn-accent w-fit">
            View your personalised plan →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.id} className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-200 hover:bg-white/10 hover:-translate-y-1">
                <span className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl text-white mb-3 sm:mb-4" style={{ background: feature.bgColor }}>
                  <IconComponent size={18} className="sm:w-5 sm:h-5" />
                </span>
                <h3 className="text-white text-sm sm:text-base font-bold mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-white/55 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
