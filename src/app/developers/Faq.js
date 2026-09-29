'use client';

import { Plus } from 'lucide-react';
import { H2, Label, Scene } from './Heading';
import { useReveal, revealClass } from './useReveal';

const DEFAULT_FAQS = [
    ['What exactly is the action layer?', 'The action layer sits between your AI and the software your users already use. It gives your AI access to actions across 2,300+ apps and handles the authentication, data mapping, execution, and monitoring behind those actions.'],
    ['Does my AI need to understand every API?', "No. Your AI works with actions and capabilities instead of having to understand every app's API, authentication flow, or implementation details. viaSocket handles the underlying complexity."],
    ['Do I have to build the integrations myself?', 'No. You can build integrations yourself, but then you also own authentication, permissions, mappings, failures, retries, API changes, monitoring, and maintenance. viaSocket handles this infrastructure for you.'],
    ['How does authentication work?', 'viaSocket manages the connection between your users and the apps they use. Your product can let users securely connect their accounts without you having to build and maintain the authentication infrastructure for every integration.'],
    ['Can every customer connect their own accounts?', 'Yes. The action layer is built for multi-tenant products, so each of your customers can have their own app connections, credentials, permissions, and data.'],
    ['Can I control how the action layer looks in my product?', 'Yes. You can use your own branding and customize the UI so the experience fits into your product rather than feeling like a separate tool.'],
    ['What happens when an action fails?', "Execution doesn't stop at simply calling an API. viaSocket provides monitoring and the infrastructure needed to track execution, debug failures, and manage what happened."],
    ['How many apps can my AI work with?', 'viaSocket currently supports actions across 2,300+ apps. You can give your AI access to the apps your customers already use without building each integration from scratch.'],
    ['Is this only for AI agents?', 'The action layer is designed for AI products and agents that need to take real actions in external software. It can also support products where actions, triggers, and workflows need to interact with those applications.'],
    ['How long does it take to add the action layer?', "You can get started in under 15 minutes. The implementation can be added to your product using the provided setup prompt and then customized to your product's needs."],
];

function FaqItem({ q, a }) {
    const [ref, visible] = useReveal();
    return (
        <details ref={ref} className={`border-b border-dev-line group ${revealClass(visible)}`}>
            <summary className="list-none cursor-pointer flex justify-between items-center gap-5 py-5 font-semibold text-[17px] tracking-[-0.01em] text-dev-ink [&::-webkit-details-marker]:hidden">
                {q}
                <Plus size={20} className="shrink-0 text-dev-ink-3 transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="m-0 mb-[22px] text-dev-ink-2 text-[15.5px] leading-[1.55] max-w-[64ch]">{a}</p>
        </details>
    );
}

export default function Faq({ items = DEFAULT_FAQS, title = 'Questions, answered.' }) {
    return (
        <Scene id="faq">
            <Label>FAQ</Label>
            <H2>{title}</H2>
            <div className="grid max-w-[760px] border-t border-dev-line">
                {items.map(([q, a]) => (
                    <FaqItem key={q} q={q} a={a} />
                ))}
            </div>
        </Scene>
    );
}
