// src/MetaTags.js
import React, { useEffect } from "react";

const MetaTags = () => {
  useEffect(() => {
    // Create and append meta tags
    const metaTags = [
      { httpEquiv: "X-Frame-Options", content: "DENY" },
      { httpEquiv: "X-Content-Type-Options", content: "nosniff" },
      {
        httpEquiv: "Content-Security-Policy",
        content:
          "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:;",
      },
      {
        httpEquiv: "Permissions-Policy",
        content: "geolocation=(), microphone=(), camera=()",
      },
    ];

    metaTags.forEach((tag) => {
      const meta = document.createElement("meta");
      meta.httpEquiv = tag.httpEquiv;
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Cleanup function to remove meta tags on unmount (optional)
    return () => {
      metaTags.forEach((tag) => {
        const meta = document.querySelector(
          `meta[http-equiv="${tag.httpEquiv}"]`
        );
        if (meta) {
          document.head.removeChild(meta);
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything
};

export default MetaTags;
