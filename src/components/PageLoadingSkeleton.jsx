import React from 'react';
import Skeleton from './Skeleton';

const PageLoadingSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col p-8 md:p-16 gap-12 pt-32 animation-fade-in">
      {/* Hero Section Mock */}
      <div className="flex flex-col items-center justify-center space-y-6 mb-8 mt-12 w-full max-w-4xl mx-auto">
        <Skeleton className="h-14 w-3/4 md:w-2/3 rounded-xl" />
        <Skeleton className="h-14 w-5/6 md:w-3/4 rounded-xl" />
        <br />
        <Skeleton className="h-4 w-full md:w-5/6" />
        <Skeleton className="h-4 w-4/6 md:w-1/2" />
        <Skeleton className="h-12 w-48 rounded-full mt-6" />
      </div>

      {/* Grid Content Mock */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto opacity-70">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col space-y-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <div className="space-y-3 pt-2">
              <Skeleton className="h-6 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-full rounded-sm" />
              <Skeleton className="h-4 w-5/6 rounded-sm" />
            </div>
            <div className="flex gap-2 pt-4">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageLoadingSkeleton;
