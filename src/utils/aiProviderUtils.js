const DEFAULT_PROMPT = `I want to automate my business. Use everything you already know about me, including our previous conversations. If important details are missing, ask focused questions before making recommendations. Analyze my company, products, team structure, software stack, workflows, customer journey, and operational bottlenecks. Then recommend the highest-impact automations, AI agents, integrations, and workflows that can be built using ViaSocket (https://viasocket.com), ranked by ROI, implementation effort, and business impact.`;

/**
 * Copy text to clipboard and show a toast notification
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show toast notification
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-[2000] animate-[fadeSlideIn_0.3s_ease_forwards]';
        toast.textContent = 'Prompt copied! Paste it into the AI chat.';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }).catch(() => {
        console.error('Failed to copy to clipboard');
    });
}

/**
 * Open ChatGPT with prefilled prompt
 */
function openChatGPT() {
    const encodedPrompt = encodeURIComponent(DEFAULT_PROMPT);
    window.open(`https://chatgpt.com/?q=${encodedPrompt}`, '_blank');
}

/**
 * Open Claude AI with prefilled prompt
 */
function openClaude() {
    const encodedPrompt = encodeURIComponent(DEFAULT_PROMPT);
    window.open(`https://claude.ai/new?q=${encodedPrompt}`, '_blank');
}

/**
 * Open Perplexity AI with prefilled prompt
 */
function openPerplexity() {
    const encodedPrompt = encodeURIComponent(DEFAULT_PROMPT);
    window.open(`https://www.perplexity.ai/?q=${encodedPrompt}`, '_blank');
}

/**
 * Open xAI Grok with prefilled prompt
 */
function openXAI() {
    const encodedPrompt = encodeURIComponent(DEFAULT_PROMPT);
    window.open(`https://grok.com/?q=${encodedPrompt}`, '_blank');
}

/**
 * Main function to open AI provider with appropriate method
 */
export function openAIProvider(providerId) {
    switch (providerId) {
        case 'chatgpt':
            openChatGPT();
            break;
        case 'claude':
            openClaude();
            break;
        case 'perplexity':
            openPerplexity();
            break;
        case 'xai':
            openXAI();
            break;
        default:
            console.error(`Unknown provider: ${providerId}`);
    }
}

export { DEFAULT_PROMPT };
