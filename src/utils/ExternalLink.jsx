import Link from 'next/link'
import React from 'react'

const ExternalLink = ({ 
  href, 
  target = "_blank", 
  children, 
  appSlugName, 
  doFollowArray 
}) => {
  const determineRel = () => {
    if (doFollowArray && Array.isArray(doFollowArray) && appSlugName) {
      const isDoFollow = doFollowArray.some(item => item.appslugname === appSlugName);
      return isDoFollow ? "noopener" : "noopener nofollow";
    }
    
    return "noopener nofollow";
  };

  return (
    <Link href={href} target={target} rel={determineRel()}>
      {children}
    </Link>
  )
}

export default ExternalLink
