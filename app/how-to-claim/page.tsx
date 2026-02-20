'use client';

import Link from 'next/link';

export default function HowToClaimPage() {
  return (
    <div className="min-h-screen bg-[#0d1a0f] text-primary p-6 md:p-12 font-mono">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary border-b border-primary/30 pb-2">
          How to Claim
        </h1>
        <p className="text-primary/90 leading-relaxed">
          Instructions for claiming will be available here. Check back soon or follow our official channels for updates.
        </p>
        <div className="pt-4">
          <Link href="/" className="text-primary underline hover:no-underline">
            ← Back to terminal
          </Link>
        </div>
      </div>
    </div>
  );
}
