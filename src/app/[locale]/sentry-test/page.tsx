"use client";

import { useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import sentryUtils from '@/lib/sentry-utils';
import ErrorBoundary from '@/components/error-boundary';

// Test error component
function TestErrorComponent() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('Test React Error Boundary Error');
  }

  return (
    <div className="p-4 border border-gray-300 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Error Boundary Test</h3>
      <button
        onClick={() => setShouldError(true)}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Trigger React Error
      </button>
    </div>
  );
}

export default function SentryTestPage() {
  const [lastAction, setLastAction] = useState<string>('');

  const handleAsyncError = async () => {
    setLastAction('Async Error Test');
    sentryUtils.addBreadcrumb('User clicked async error button', 'user');
    
    try {
      // Simulate an async operation that fails
      await new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Async operation failed')), 1000);
      });
    } catch (error) {
      sentryUtils.captureException(error as Error, {
        tags: { testType: 'async', component: 'SentryTestPage' },
        extra: { userAction: 'async-error-test' }
      });
    }
  };

  const handlePerformanceTest = () => {
    setLastAction('Performance Test');
    sentryUtils.addBreadcrumb('User clicked performance test button', 'user');
    
    Sentry.startSpan({
      name: 'Performance Test Span',
      op: 'test',
    }, () => {
      // Simulate some work
      const start = Date.now();
      while (Date.now() - start < 100) {
        // Busy wait for 100ms
      }
      
      sentryUtils.captureMessage('Performance test completed', 'info', {
        tags: { testType: 'performance' },
        extra: { duration: Date.now() - start }
      });
    });
  };

  const handleUserContextTest = () => {
    setLastAction('User Context Test');
    sentryUtils.setUser({
      id: 'test-user-123',
      email: 'test@example.com',
      username: 'testuser'
    });
    
    sentryUtils.setContext('test_context', {
      feature: 'sentry-testing',
      timestamp: new Date().toISOString(),
      browser: typeof window !== 'undefined' ? window.navigator.userAgent : 'server'
    });
    
    sentryUtils.captureMessage('User context set successfully', 'info');
  };

  const handleNetworkError = async () => {
    setLastAction('Network Error Test');
    sentryUtils.addBreadcrumb('User clicked network error button', 'user');
    
    try {
      // Try to fetch from a non-existent endpoint
      const response = await fetch('/api/non-existent-endpoint');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      sentryUtils.captureException(error as Error, {
        tags: { testType: 'network', component: 'SentryTestPage' },
        extra: { endpoint: '/api/non-existent-endpoint' }
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Sentry Testing Dashboard</h1>
        
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Test Status</h2>
          <p className="text-gray-700">
            Sentry Configuration: <span className="font-semibold text-green-600">
              {sentryUtils.isConfigured() ? '✅ Active' : '❌ Not Configured'}
            </span>
          </p>
          <p className="text-gray-700">
            Last Action: <span className="font-semibold">{lastAction || 'None'}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Frontend Error Tests */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Frontend Error Tests</h2>
            
            {/* JavaScript Error */}
            <div className="p-4 border border-gray-300 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">JavaScript Error</h3>
              <button
                onClick={() => {
                  setLastAction('JavaScript Error Test');
                  sentryUtils.addBreadcrumb('User clicked JS error button', 'user');
                  throw new Error('Test JavaScript Error from button click');
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Trigger JS Error
              </button>
            </div>

            {/* Error Boundary Test */}
            <ErrorBoundary>
              <TestErrorComponent />
            </ErrorBoundary>

            {/* Async Error */}
            <div className="p-4 border border-gray-300 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Async Error</h3>
              <button
                onClick={handleAsyncError}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Trigger Async Error
              </button>
            </div>

            {/* Network Error */}
            <div className="p-4 border border-gray-300 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Network Error</h3>
              <button
                onClick={handleNetworkError}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Trigger Network Error
              </button>
            </div>
          </div>

          {/* Backend & Performance Tests */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Backend & Performance Tests</h2>
            
            {/* Backend API Error */}
            <div className="p-4 border border-gray-300 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Backend API Error</h3>
              <button
                onClick={async () => {
                  setLastAction('Backend API Error Test');
                  sentryUtils.addBreadcrumb('User clicked backend error button', 'user');
                  try {
                    const response = await fetch('/api/sentry-example-api');
                    if (!response.ok) {
                      throw new Error('Backend API error occurred');
                    }
                  } catch (error) {
                    sentryUtils.captureException(error as Error, {
                      tags: { testType: 'backend', component: 'SentryTestPage' }
                    });
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Trigger Backend Error
              </button>
            </div>

            {/* Performance Test */}
            <div className="p-4 border border-gray-300 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Performance Monitoring</h3>
              <button
                onClick={handlePerformanceTest}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Test Performance Tracking
              </button>
            </div>

            {/* User Context Test */}
            <div className="p-4 border border-gray-300 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">User Context</h3>
              <button
                onClick={handleUserContextTest}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Set User Context
              </button>
            </div>

            {/* Custom Message */}
            <div className="p-4 border border-gray-300 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Custom Message</h3>
              <button
                onClick={() => {
                  setLastAction('Custom Message Test');
                  sentryUtils.captureMessage('Custom test message from Sentry dashboard', 'info', {
                    tags: { testType: 'message', source: 'dashboard' },
                    extra: { timestamp: new Date().toISOString() }
                  });
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Send Custom Message
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Instructions</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Click any button above to test different Sentry features</li>
            <li>Check your Sentry dashboard for captured events</li>
            <li>Errors should appear with proper context and user information</li>
            <li>Performance data should be tracked for the performance test</li>
            <li>All events include breadcrumbs showing user actions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
