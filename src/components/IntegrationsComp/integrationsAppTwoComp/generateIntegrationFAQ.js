export default function generateIntegrationFAQ(appOne, appTwo) {
  return [
    {
      que: `How do I start an integration between ${appOne} and ${appTwo}?`,
      ans: `To start, connect both your ${appOne} and ${appTwo} accounts to viaSocket. Once connected, you can set up a workflow where an event in ${appOne} triggers actions in ${appTwo} (or vice versa).`
    },
    {
      que: `Can we customize how data from ${appOne} is recorded in ${appTwo}?`,
      ans: `Absolutely. You can customize how ${appOne} data is recorded in ${appTwo}. This includes choosing which data fields go into which fields of ${appTwo}, setting up custom formats, and filtering out unwanted information.`
    },
    {
      que: `How often does the data sync between ${appOne} and ${appTwo}?`,
      ans: `The data sync between ${appOne} and ${appTwo} typically happens in real-time through instant triggers. And a maximum of 15 minutes in case of a scheduled trigger.`
    },
    {
      que: `Can I filter or transform data before sending it from ${appOne} to ${appTwo}?`,
      ans: `Yes, viaSocket allows you to add custom logic or use built-in filters to modify data according to your needs.`
    },
    {
      que: `Is it possible to add conditions to the integration between ${appOne} and ${appTwo}?`,
      ans: `Yes, you can set conditional logic to control the flow of data between ${appOne} and ${appTwo}. For instance, you can specify that data should only be sent if certain conditions are met, or you can create if/else statements to manage different outcomes.`
    }
  ];
}
