"use client";

import GenericModal from "./modal";
import JournalModalContent from "./journal-modal-content";

interface JournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export default function JournalModal({ isOpen, onClose, data }: JournalModalProps) {
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title={data?.title || "Journal Entry"} // Fallback title
      maxWidth="max-w-4xl" // Slightly narrower for reading focus
    >
      <JournalModalContent data={data} />
    </GenericModal>
  );
}