import React from 'react';

const FloatingAppIcons = ({ density = 'medium', size = 'medium', blur = 'medium', opacity = 0.6 }) => {
    const [currentApps, setCurrentApps] = React.useState([]);
    const [currentGroup, setCurrentGroup] = React.useState(0);
    
    // All available apps to choose from
    const allApps = [
        { name: 'Gmail', icon: 'https://img.icons8.com/color/48/gmail.png' },
        { name: 'Slack', icon: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg' },
        { name: 'Google Sheets', icon: 'https://img.icons8.com/color/48/google-sheets.png' },
        { name: 'LinkedIn', icon: 'https://img.icons8.com/color/48/linkedin.png' },
        { name: 'Google Drive', icon: 'https://img.icons8.com/color/48/google-drive.png' },
        { name: 'HubSpot', icon: 'https://stuff.thingsofbrand.com/hubspot.com/images/img61728fea98_hubspot.jpg' },
        { name: 'Shopify', icon: 'https://ecomstart.io/wp-content/uploads/2024/03/shopify.svg' },
        { name: 'Zendesk', icon: 'https://stuff.thingsofbrand.com/zendesk.com/images/img8_zendesk-sell.png' },
        { name: 'Airtable', icon: 'https://stuff.thingsofbrand.com/airtable.com/images/img6da0d45803_airtable.jpg' },
        { name: 'Trello', icon: 'https://img.icons8.com/color/48/trello.png' },
        { name: 'Notion', icon: 'https://img.icons8.com/color/48/notion--v1.png' },
        { name: 'Zoom', icon: 'https://img.icons8.com/color/48/zoom.png' },
        { name: 'Microsoft Teams', icon: 'https://img.icons8.com/color/48/microsoft-teams.png' },
        { name: 'Asana', icon: 'https://img.icons8.com/color/48/asana.png' },
        { name: 'Dropbox', icon: 'https://img.icons8.com/color/48/dropbox.png' },
        { name: 'WhatsApp', icon: 'https://img.icons8.com/color/48/whatsapp--v1.png' },
        { name: 'Telegram', icon: 'https://img.icons8.com/color/48/telegram-app--v1.png' },
        { name: 'Discord', icon: 'https://img.icons8.com/color/48/discord-logo.png' },
        { name: 'Mailchimp', icon: 'https://img.icons8.com/color/48/mailchimp.png' },
        { name: 'Stripe', icon: 'https://img.icons8.com/color/48/stripe.png' },
        { name: 'PayPal', icon: 'https://img.icons8.com/color/48/paypal.png' },
        { name: 'Salesforce', icon: 'https://img.icons8.com/color/48/salesforce.png' },
        { name: 'Jira', icon: 'https://img.icons8.com/color/48/jira.png' },
        { name: 'GitHub', icon: 'https://img.icons8.com/color/48/github--v1.png' },
        { name: 'GitLab', icon: 'https://img.icons8.com/color/48/gitlab.png' },
    ];

    // Function to get current group of 10 apps
    const getCurrentApps = (groupIndex) => {
        const startIndex = (groupIndex * 10) % allApps.length;
        const apps = [];
        for (let i = 0; i < 10; i++) {
            apps.push(allApps[(startIndex + i) % allApps.length]);
        }
        return apps;
    };

    // Set apps on component mount - only first 10 apps, no cycling
    React.useEffect(() => {
        setCurrentApps(getCurrentApps(0)); // Only show first 10 apps
    }, []);

    // Configuration based on props
    const densityConfig = {
        low: 15,
        medium: 25,
        high: 40,
    };

    const sizeConfig = {
        small: '24px',
        medium: '32px',
        large: '40px',
    };

    const blurConfig = {
        none: 'blur-0',
        minor: 'blur-[1px]',
        light: 'blur-sm',
        medium: 'blur-md',
        heavy: 'blur-lg',
    };

    const numberOfIcons = densityConfig[density] || densityConfig.medium;

    // Fixed positions for right side - 10 apps with better distribution
    const rightSidePositions = [
        { x: 92, y: 5 },
        { x: 95, y: 15 },
        { x: 93, y: 25 },
        { x: 96, y: 35 },
        { x: 92, y: 45 },
        { x: 95, y: 55 },
        { x: 93, y: 65 },
        { x: 96, y: 75 },
        { x: 92, y: 85 },
        { x: 95, y: 95 },
    ];

    // Use the current group of 10 apps
    const rightSideApps = currentApps;

    return (
        <div className="floating-app-icons-container">
            {/* Render only right side apps */}
            {rightSideApps.map((app, index) => {
                const position = rightSidePositions[index];
                const iconSize = sizeConfig[size];
                return (
                    <div
                        key={`${currentGroup}-${index}`}
                        className={`floating-app-icon ${blurConfig[blur]}`}
                        style={{
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                            width: iconSize,
                            height: iconSize,
                        }}
                    >
                        <img
                            src={app.icon}
                            alt={app.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                borderRadius: '8px',
                            }}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default FloatingAppIcons;
