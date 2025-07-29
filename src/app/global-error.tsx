"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Capture the error with additional context
    Sentry.captureException(error, {
      tags: {
        component: "GlobalError",
        errorBoundary: true,
      },
      extra: {
        digest: error.digest,
        timestamp: new Date().toISOString(),
      },
    });
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ 
          padding: '20px', 
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1 style={{ color: '#dc3545', marginBottom: '20px' }}>Something went wrong!</h1>
          <p style={{ color: '#6c757d', marginBottom: '20px' }}>
            We&apos;ve been notified about this error and will fix it soon.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
        {/* Fallback to NextError for debugging */}
        <div style={{ display: 'none' }}>
          <NextError statusCode={0} />
        </div>
      </body>
    </html>
  );
}
