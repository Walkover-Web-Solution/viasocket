export default function generateIntegrationFAQ(appOne, appTwo) {
    return [
        {
            que: `How do I connect ${appOne} and ${appTwo}?`,
            ans: `Sign up for a free viaSocket account, then authorize both your ${appOne} and ${appTwo} accounts. From there, pick a trigger in one app and an action in the other. Your first workflow can be live in under five minutes.`,
        },
        {
            que: `Does this integration work in real time?`,
            ans: `Yes. viaSocket uses instant triggers where available, so data moves between ${appOne} and ${appTwo} as soon as the event happens. Scheduled polling triggers run at a maximum interval of 15 minutes.`,
        },
        {
            que: `Can I control which data gets sent from ${appOne} to ${appTwo}?`,
            ans: `Yes. You can map specific fields, apply filters to skip records that do not match your conditions, and transform values before they reach ${appTwo}. No coding required.`,
        },
        {
            que: `Can the integration run in both directions?`,
            ans: `Yes. You can set up a workflow where ${appOne} triggers actions in ${appTwo}, and a separate workflow where ${appTwo} triggers actions in ${appOne}. Both run independently and in real time.`,
        },
        {
            que: `What happens if a step in the workflow fails?`,
            ans: `viaSocket logs every run so you can see exactly what succeeded and what failed. Failed tasks can be retried from the dashboard without re-configuring the workflow.`,
        },
        {
            que: `Is viaSocket free to use?`,
            ans: `Yes, there is a free plan that covers basic workflows between ${appOne} and ${appTwo}. Paid plans unlock higher task limits, faster polling, and advanced features like multi-step workflows and conditional logic.`,
        },
        {
            que: `Do I need to know how to code to set this up?`,
            ans: `No. The entire ${appOne} and ${appTwo} integration is built through a visual, point-and-click interface. Code blocks are available if you want them, but they are never required.`,
        },
    ];
}
