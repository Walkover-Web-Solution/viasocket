import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getLinkAttributes, isExternalUrl } from '@/utils/linkUtils';

/**
 * SmartLink component that automatically handles rel attributes based on dofollow configuration
 * Defaults all links to nofollow, only makes specific links dofollow based on database config
 */
const SmartLink = ({ 
    href, 
    children, 
    className = '', 
    target = null,
    rel = '',
    onClick = null,
    ...otherProps 
}) => {
    const [linkAttributes, setLinkAttributes] = useState({
        href,
        rel: isExternalUrl(href) ? 'nofollow noopener noreferrer' : 'nofollow',
        target: target || (isExternalUrl(href) ? '_blank' : undefined)
    });

    useEffect(() => {
        const updateLinkAttributes = async () => {
            try {
                const attributes = await getLinkAttributes(href, null, {
                    target,
                    additionalRel: rel
                });
                setLinkAttributes(attributes);
            } catch (error) {
                console.error('Error updating link attributes:', error);
                // Fallback to nofollow for safety
                setLinkAttributes({
                    href,
                    rel: isExternalUrl(href) ? 'nofollow noopener noreferrer' : 'nofollow',
                    target: target || (isExternalUrl(href) ? '_blank' : undefined)
                });
            }
        };

        if (href) {
            updateLinkAttributes();
        }
    }, [href, target, rel]);

    // Handle internal links with Next.js Link
    if (!isExternalUrl(href)) {
        return (
            <Link href={linkAttributes.href} legacyBehavior>
                <a 
                    className={className}
                    rel={linkAttributes.rel || undefined}
                    target={linkAttributes.target}
                    onClick={onClick}
                    {...otherProps}
                >
                    {children}
                </a>
            </Link>
        );
    }

    // Handle external links with regular anchor tag
    return (
        <a
            href={linkAttributes.href}
            className={className}
            rel={linkAttributes.rel}
            target={linkAttributes.target}
            onClick={onClick}
            {...otherProps}
        >
            {children}
        </a>
    );
};

/**
 * SmartAnchor component for cases where you need just an anchor tag
 * without Next.js Link wrapper
 */
export const SmartAnchor = ({ 
    href, 
    children, 
    className = '', 
    target = null,
    rel = '',
    onClick = null,
    ...otherProps 
}) => {
    const [linkAttributes, setLinkAttributes] = useState({
        href,
        rel: isExternalUrl(href) ? 'nofollow noopener noreferrer' : 'nofollow',
        target: target || (isExternalUrl(href) ? '_blank' : undefined)
    });

    useEffect(() => {
        const updateLinkAttributes = async () => {
            try {
                const attributes = await getLinkAttributes(href, null, {
                    target,
                    additionalRel: rel
                });
                setLinkAttributes(attributes);
            } catch (error) {
                console.error('Error updating link attributes:', error);
                // Fallback to nofollow for safety
                setLinkAttributes({
                    href,
                    rel: isExternalUrl(href) ? 'nofollow noopener noreferrer' : 'nofollow',
                    target: target || (isExternalUrl(href) ? '_blank' : undefined)
                });
            }
        };

        if (href) {
            updateLinkAttributes();
        }
    }, [href, target, rel]);

    return (
        <a
            href={linkAttributes.href}
            className={className}
            rel={linkAttributes.rel}
            target={linkAttributes.target}
            onClick={onClick}
            {...otherProps}
        >
            {children}
        </a>
    );
};

export default SmartLink;
