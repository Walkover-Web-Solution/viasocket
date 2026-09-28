import './fonts.scss';

export default function DocsLayout({ children }) {
    return <div className="font-docs-sans bg-docs-bg text-docs-ink text-[16px] leading-[1.65]">{children}</div>;
}
