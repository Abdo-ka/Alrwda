# Sentry Setup Documentation

## Overview
This project has been configured with Sentry for comprehensive error monitoring, performance tracking, and user session replay capabilities.

## Configuration Files

### Core Sentry Files
- `sentry.server.config.ts` - Server-side Sentry configuration
- `sentry.edge.config.ts` - Edge runtime Sentry configuration  
- `src/instrumentation-client.ts` - Client-side Sentry configuration
- `src/instrumentation.ts` - Next.js instrumentation hooks
- `next.config.ts` - Sentry webpack plugin configuration

### Utility Files
- `src/lib/sentry-utils.ts` - Custom Sentry utility functions
- `src/components/error-boundary.tsx` - React Error Boundary component
- `src/app/global-error.tsx` - Global error handling for Next.js App Router

## Features Enabled

### ✅ Error Monitoring
- **Frontend errors**: JavaScript exceptions, React component errors
- **Backend errors**: API route errors, server-side exceptions
- **Global error handling**: Unhandled promise rejections, global errors

### ✅ Performance Monitoring
- **Web Vitals**: LCP, FID, CLS automatically tracked
- **Custom transactions**: API calls, database queries
- **Route transitions**: Page navigation performance

### ✅ Session Replay
- **User sessions**: Visual replay of user interactions
- **Error context**: Replay sessions when errors occur
- **Privacy controls**: Sensitive data masking in production

### ✅ Advanced Features
- **User context**: Track user information across sessions
- **Custom breadcrumbs**: Track user actions and app state
- **Release tracking**: Automatic release detection with Git commits
- **Environment detection**: Separate dev/staging/production data

## Environment Variables

Your project already has a `.env.local` file configured with the necessary Sentry variables:

```bash
# Sentry Configuration
SENTRY_DSN=https://17118f78006ad472132176588ccf3f27@o4509753626001408.ingest.us.sentry.io/4509753695469568
SENTRY_ORG=abd-alrahman-kanawati
SENTRY_PROJECT=alrwda
SENTRY_AUTH_TOKEN=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

# Public Sentry Configuration (accessible in browser)
NEXT_PUBLIC_SENTRY_DSN=https://17118f78006ad472132176588ccf3f27@o4509753626001408.ingest.us.sentry.io/4509753695469568

# Environment
NODE_ENV=development

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Additional Sentry Configuration
SENTRY_TUNNEL_ROUTE=/monitoring
SENTRY_TRACES_SAMPLE_RATE=1.0
SENTRY_REPLAYS_SESSION_SAMPLE_RATE=0.1
SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE=1.0

# Islamic App Specific
NEXT_PUBLIC_APP_NAME=Alrwda
NEXT_PUBLIC_APP_DESCRIPTION=Islamic Electric Clocks Market
```

### Important Notes:
- ✅ **Auth Token**: Already configured with your Sentry auth token
- ✅ **DSN**: Configured for your specific Sentry project
- ✅ **Organization**: Set to `abd-alrahman-kanawati`
- ✅ **Project**: Set to `alrwda`
- ✅ **Environment Protection**: `.env.local` is gitignored for security

## Testing Sentry

### Option 1: Use the Test Dashboard
Visit `/sentry-test` to access a comprehensive testing dashboard with buttons to test:
- Frontend JavaScript errors
- React Error Boundary errors
- Async operation failures
- Backend API errors
- Performance monitoring
- User context setting
- Network errors

### Option 2: Use the Original Example Page
Visit `/sentry-example-page` for the basic Sentry test implementation.

### Option 3: Manual Testing
```typescript
import sentryUtils from '@/lib/sentry-utils';

// Capture custom errors
sentryUtils.captureException(new Error('Test error'), {
  tags: { component: 'MyComponent' },
  extra: { customData: 'value' }
});

// Send custom messages
sentryUtils.captureMessage('Something interesting happened', 'info');

// Set user context
sentryUtils.setUser({ id: '123', email: 'user@example.com' });

// Add breadcrumbs
sentryUtils.addBreadcrumb('User clicked button', 'user');
```

## Production Considerations

### Performance Settings
- **Trace sampling**: Set to 10% in production (`tracesSampleRate: 0.1`)
- **Replay sampling**: 10% for normal sessions, 100% for error sessions
- **Source maps**: Automatically uploaded for better stack traces

### Privacy & Security
- **Data scrubbing**: Sensitive data automatically masked
- **PII filtering**: Personal information filtered from error reports
- **Session replay masking**: Text and media masked in production

### Monitoring & Alerts
1. Set up Sentry alerts for:
   - Error rate increases
   - Performance degradation
   - New error types
   - High-volume error events

2. Configure notification channels:
   - Email notifications
   - Slack integration
   - PagerDuty for critical issues

## Troubleshooting

### Common Issues

1. **"Sentry not capturing errors"**
   - Check browser console for Sentry initialization logs
   - Verify DSN is correct in environment variables
   - Test with the `/sentry-test` page

2. **"No source maps in error traces"**
   - Ensure `SENTRY_AUTH_TOKEN` is set
   - Check build logs for source map upload success
   - Verify Sentry project settings

3. **"Session replay not working"**
   - Check browser compatibility (Chrome, Firefox, Safari)
   - Verify replay integration is enabled
   - Check network tab for replay data uploads

### Debug Mode
Enable debug logging in development:
```typescript
// In sentry configs, set:
debug: process.env.NODE_ENV === "development"
```

## Links
- [Sentry Dashboard](https://sentry.io/organizations/abd-alrahman-kanawati/projects/alrwda/)
- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Error Monitoring Best Practices](https://docs.sentry.io/product/error-monitoring/)

## Support
For Sentry-related issues in this project, check:
1. The test pages for functionality verification
2. Browser developer tools for client-side issues
3. Server logs for backend issues
4. Sentry dashboard for captured events
