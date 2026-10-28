import SetupPrompt from './SetupPrompt';

export const runtime = 'edge';

// Static shell. org, project, name and for are read in the browser so this
// response never contains them and can stay out of the index.
export const metadata = {
    title: 'Setup prompt · viaSocket',
    robots: 'noindex',
};

export default function SetupPromptPage() {
    return <SetupPrompt />;
}
