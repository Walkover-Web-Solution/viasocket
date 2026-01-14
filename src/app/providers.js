'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import HeadComp from '@/components/headComp/headComp'
import ChatWidget from '@/components/chat-widget/chat-wdget'
import { getUtmSource } from '@/utils/handleUtmSource'

export default function AppProvider({ children }) {
  const pathname = usePathname()
  const [showSkeleton, setShowSkeleton] = useState(false)

  // Convert pathname to match old router logic
  const pathArray = pathname.split('/').filter(Boolean)
  const rawpathArray = [pathname]
  
  var showNavbar = false
  if (
    !pathname.includes('/integrations/') &&
    !pathname.includes('/signup') &&
    !pathname.includes('/login')
  ) {
    showNavbar = true
  }

  useEffect(() => {
    const handleLinkClick = (event) => {
      let target = event.target

      while (target && target.tagName !== 'A') {
        target = target.parentElement
      }

      if (
        target &&
        target.tagName === 'A' &&
        target.href &&
        !target.href.includes('#') &&
        target.target !== '_blank'
      ) {
        const targetUrl = new URL(target.href)

        if (targetUrl.origin === window.location.origin) {
          event.preventDefault()
          setShowSkeleton(true)
          // In App Router, navigation is handled differently
          // You might want to use router.push from next/navigation here
          window.location.href = targetUrl.pathname + targetUrl.search + targetUrl.hash
        }
      }
    }

    const handlePopState = () => {
      setShowSkeleton(false)
    }

    document.addEventListener('click', handleLinkClick)
    window.addEventListener('popstate', handlePopState)

    return () => {
      document.removeEventListener('click', handleLinkClick)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    getUtmSource()
  }, [])

  // Generate canonical URL logic
  const pathSegments = pathname.split('/')
  const isPaginated = pathSegments.includes('page')

  let canonicalUrl = `https://viasocket.com${pathname}`
  if (isPaginated) {
    if (pathname.startsWith('/mcp')) {
      if (pathSegments.includes('category')) {
        canonicalUrl = `https://viasocket.com/mcp/category/${pathSegments[3]}`
      } else {
        canonicalUrl = `https://viasocket.com/mcp/${pathSegments[2]}`
      }
    } else if (pathname.startsWith('/integrations')) {
      if (pathSegments.includes('category')) {
        canonicalUrl = `https://viasocket.com/integrations/category/${pathSegments[3]}`
      } else {
        canonicalUrl = `https://viasocket.com/integrations/${pathSegments[2]}`
      }
    }
  }

  useEffect(() => {
    const helloConfig = {
      widgetToken: 'a13cc',
      show_close_button: true,
      hide_launcher: true,
      urlsToOpenInIFrame: [
        'https://viasocket.com/faq',
        'https://viasocket.com/discovery',
        'https://viasocket.com/blog',
        'https://viasocket.com/community',
      ],
    };

    const script = document.createElement('script');
    script.src = 'https://blacksea.msg91.com/chat-widget.js';
    script.onload = () => initChatWidget(helloConfig, 50);

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <HeadComp canonicalUrl={canonicalUrl} />
      <ChatWidget />
      {showSkeleton ? (
        <Skeleton />
      ) : (
        <div>
          {children}
        </div>
      )}
    </>
  )
}

export function Skeleton() {
  return (
    <div className="h-dvh w-dvw overflow-hidden p-8">
      <div className="flex justify-between w-full h-10">
        <div className="h-full w-40 bg-gray-100 rounded-sm skeleton"></div>
        <div className="flex gap-2 h-full">
          <div className="h-full w-32 bg-gray-100 rounded-sm skeleton"></div>
          <div className="h-full w-32 bg-gray-100 rounded-sm skeleton"></div>
          <div className="h-full w-32 bg-gray-100 rounded-sm skeleton"></div>
          <div className="h-full w-10 bg-gray-100 rounded-sm skeleton"></div>
        </div>
      </div>

      <div className="container cont gap-20 mt-20">
        <div className="cont gap-1">
          <div className="h-32 w-3/5 bg-gray-100 rounded-sm skeleton"></div>
          <div className="h-32 w-4/5 bg-gray-100 rounded-sm skeleton"></div>
          <div className="h-10 w-3/5 bg-gray-100 rounded-sm skeleton"></div>
        </div>

        <div className="w-full">
          <div className="h-16 w-1/3 bg-gray-100 rounded-sm skeleton mb-4"></div>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-44 bg-gray-100 rounded-sm skeleton"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
