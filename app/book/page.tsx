"use client";

import Cal from "@calcom/embed-react";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-bg pt-20 pb-16 px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-fg mb-8 text-center">
          Book a Discovery Call
        </h1>
        <div className="bg-white rounded-lg border-2 border-border/20 p-4 md:p-8">
          <Cal
            calLink="patrick-pinta/30min"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{
              layout: "month_view",
            }}
          />
        </div>
      </div>
    </div>
  );
}
