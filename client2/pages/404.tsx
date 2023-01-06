import React, { ReactElement } from 'react';

export default function PageNotFound404() {
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      Error 404. Page not found.
    </div>
  );
}

PageNotFound404.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
