import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  containerId?: string;
  className?: string;
}

const Portal: React.FC<PortalProps> = ({
  children,
  containerId = "portal-root",
  className = "",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if portal container exists, if not create it
    let element = document.getElementById(containerId);
    if (!element) {
      element = document.createElement("div");
      element.id = containerId;
      if (className) {
        element.className = className;
      }

      // After mounted, apend to the body
      document.body.appendChild(element);
    }

    return () => {
      // Cleanup: remove portal container if it's empty
      const container = document.getElementById(containerId);
      if (container && container.childNodes.length === 0) {
        document.body.removeChild(container);
      }
    };
  }, [containerId, className]);

  // Only render after component is mounted to avoid SSR issues
  if (!mounted) {
    return null;
  }

  // Get or create portal container
  let portalContainer = document.getElementById(containerId);
  if (!portalContainer) {
    portalContainer = document.createElement("div");
    portalContainer.id = containerId;
    if (className) {
      portalContainer.className = className;
    }
    document.body.appendChild(portalContainer);
  }

  return createPortal(children, portalContainer);
};

export default Portal;
