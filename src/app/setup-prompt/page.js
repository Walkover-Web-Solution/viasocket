import SetupPrompt from './SetupPrompt';

export const runtime = 'edge';

// Static shell. org, project, name and for are read in the browser so this
// response never contains them and can stay out of the index.
export const metadata = {
    title: 'Setup prompt · viaSocket',
    // Crawlers must be allowed to fetch this URL (no robots.txt Disallow) and
    // then drop it. noarchive keeps copies out of search caches.
    robots: {
        index: false,
        follow: false,
        noarchive: true,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default function SetupPromptPage() {
    return <SetupPrompt />;
}
