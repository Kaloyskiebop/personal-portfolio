"use client";

import GenericModal from "../modal";
import AboutModalContent from "./about-modal-content";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title="About Me"
      maxWidth="max-w-6xl" // Wider for about section
    >
      <AboutModalContent />
    </GenericModal>
  );
}