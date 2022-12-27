import { NextPage } from 'next';
import { ComponentType, ReactElement, ReactNode } from 'react';

// Persistent Layout Patterns in Next.js. 
// Read more here >>> https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (_page: ReactElement) => ReactNode;
  layout?: ComponentType;
};
