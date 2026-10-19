import Link from 'next/link'
import React from 'react'

// An app's outbound link is dofollow only when the app is in the dofollow table
// (getDoFollowStatus, managed in the database); every other app's link is nofollow.
export const relForApp = (appSlugName, doFollowArray) => {
  if (doFollowArray && Array.isArray(doFollowArray) && appSlugName) {
    const isDoFollow = doFollowArray.some(item => item.appslugname === appSlugName);
    return isDoFollow ? "noopener" : "noopener nofollow";
  }
  return "noopener nofollow";
};

// The app's website as the integration pages link to it: https, utm_source=viasocket, and
// magicalapi.com's own integration page.
export const appWebsiteUrl = (domain) => {
  if (!domain) return null;
  let baseUrl = domain.startsWith('https') ? domain : 'https://' + domain;
  if (baseUrl.includes('magicalapi.com')) {
    baseUrl = baseUrl.replace(/\/$/, '') + '/integrations/viasocket/';
  }
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}utm_source=viasocket`;
};

const ExternalLink = ({ 
  href, 
  target = "_blank", 
  children, 
  appSlugName, 
  doFollowArray 
}) => {
  return (
    <Link href={href} target={target} rel={relForApp(appSlugName, doFollowArray)}>
      {children}
    </Link>
  )
}

export default ExternalLink
