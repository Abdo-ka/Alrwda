import * as Sentry from "@sentry/nextjs";

/**
 * Utility functions for Sentry error handling and monitoring
 */

export const sentryUtils = {
  /**
   * Capture an exception with additional context
   */
  captureException: (error: Error, context?: {
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
    user?: { id?: string; email?: string; username?: string };
  }) => {
    Sentry.captureException(error, {
      tags: {
        component: "custom",
        ...context?.tags,
      },
      extra: {
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
        ...context?.extra,
      },
      user: context?.user,
    });
  },

  /**
   * Capture a message with context
   */
  captureMessage: (message: string, level: 'info' | 'warning' | 'error' = 'info', context?: {
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
  }) => {
    Sentry.captureMessage(message, {
      level,
      tags: context?.tags,
      extra: {
        timestamp: new Date().toISOString(),
        ...context?.extra,
      },
    });
  },

  /**
   * Set user context
   */
  setUser: (user: { id?: string; email?: string; username?: string }) => {
    Sentry.setUser(user);
  },

  /**
   * Set additional context
   */
  setContext: (key: string, context: Record<string, unknown>) => {
    Sentry.setContext(key, context);
  },

  /**
   * Add breadcrumb for tracking user actions
   */
  addBreadcrumb: (message: string, category: string = 'custom', level: 'info' | 'warning' | 'error' = 'info') => {
    Sentry.addBreadcrumb({
      message,
      category,
      level,
      timestamp: Date.now() / 1000,
    });
  },

  /**
   * Start a performance transaction
   */
  startTransaction: (name: string, op: string = 'custom') => {
    return Sentry.startSpan({ name, op }, () => {
      // Transaction logic goes here
    });
  },

  /**
   * Check if Sentry is properly configured
   */
  isConfigured: () => {
    try {
      return !!Sentry.getClient();
    } catch {
      return false;
    }
  },
};

export default sentryUtils;
