import './fonts.scss';

export default function DevelopersLayout({ children }) {
    return <div className="dev-grid font-dev-sans bg-dev-bg text-dev-ink">{children}</div>;
}
