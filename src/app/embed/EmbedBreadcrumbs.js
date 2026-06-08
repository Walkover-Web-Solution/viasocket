import Breadcrumb from '@/components/breadcrumb/breadcrumb';

export default function EmbedBreadcrumbs({ currentPage }) {
    return (
        <div className="container py-4">
            <Breadcrumb parent="Embed" parentLink="/embed" child1={currentPage} />
        </div>
    );
}
