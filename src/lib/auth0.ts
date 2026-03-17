import { Auth0Client } from '@auth0/nextjs-auth0/server';

// This allows us to use real Auth0 if configured, 
// or a mock session for local development if credentials are missing.
const isMissingCredentials = !process.env.AUTH0_DOMAIN || process.env.AUTH0_DOMAIN.includes('YOUR_DOMAIN');

export const auth0 = new Auth0Client();

// Enhanced getSession with Mock data for local development
const originalGetSession = auth0.getSession.bind(auth0);

auth0.getSession = (async (...args: any[]) => {
  if (process.env.NODE_ENV === 'development' && isMissingCredentials) {
    console.log('🛠️ PREVIEW MODE: Using mock session (Check .env.local to disable)');
    return {
      user: {
        name: 'Developer (Preview)',
        email: 'dev@beepweep.com',
        role: 'superadmin', // Set to 'sales' or 'agent' to test other views
        sub: 'mock_user_123'
      }
    };
  }
  return originalGetSession(...args);
}) as any;
