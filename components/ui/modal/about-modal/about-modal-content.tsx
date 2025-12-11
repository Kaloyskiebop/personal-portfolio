"use client";

// No more imports for useEffect, X icon, or ModalProps!
// Just pure UI components.

export default function AboutModalContent() {
  return (
    <div className="space-y-6 text-zinc-300 font-SpaceMono-Regular">
      {/* Replace this with your actual About Me grid/text content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
           <h3 className="text-xl text-white font-bold mb-4">Who I am</h3>
           <p>
             I am a developer based in Davao City... (Rest of your content)
           </p>
        </div>
        <div className="bg-zinc-800/50 rounded-xl p-6">
           <h3 className="text-xl text-white font-bold mb-4">Tech Stack</h3>
           {/* Your skills list */}
        </div>
      </div>
    </div>
  );
}