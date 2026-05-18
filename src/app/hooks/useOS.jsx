import React, { useEffect, useMemo } from "react";

export default function useOS() {
  return useMemo(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.includes("mac")) {
      return "mac";
    }

    if (userAgent.includes("win")) {
      return "windows";
    }

    if (userAgent.includes("lin")) {
      return "linux";
    }

    return "unknown";
  }, []);
}
