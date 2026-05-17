import React, { useState } from "react";
import Modal from "../../widgets/Modal/Modal";

export default function SettingsPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <h1>Settings Page</h1>
      <button onClick={() => setIsOpen(true)}>Resume Library</button>
      {/* {isOpen && <DocumentLibraryModal setIsOpen={setIsOpen} isOpen={isOpen} />} */}
    </div>
  );
}
