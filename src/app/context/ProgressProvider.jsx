import { createContext, useContext, useState } from "react";

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const start = () => {
    setVisible(true);
    setProgress(20);
  };

  const finish = () => {
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 300);
  };

  return (
    <ProgressContext.Provider
      value={{ progress, visible, setProgress, start, finish }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
