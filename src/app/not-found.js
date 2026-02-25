import ErrorComp from '@/components/404/404Comp'

export const runtime = 'edge';

export const metadata = {
  title: '404 - Page not found',
  description: 'The page you are looking for could not be found.',
}

export default function NotFound() {
  return <ErrorComp />
}
