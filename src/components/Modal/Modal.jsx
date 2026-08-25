import React, { createContext, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const ModalContext = createContext(null);

function useModal() {
  return useContext(ModalContext);
}

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <div className={styles["modal-overlay"]} onClick={onClose}>
        <div className={styles["modal-container"]} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body,
  );
}

function Header({ children }) {
  const { onClose } = useModal();

  return (
    <div className={styles["modal-header"]}>
      <h2>{children}</h2>
    </div>
  );
}

function Body({ children }) {
  return <div className={styles["modal-body"]}>{children}</div>;
}

function Footer({ children }) {
  return <div className={styles["modal-footer"]}>{children}</div>;
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
