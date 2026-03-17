import { getSession } from '@auth0/nextjs-auth0';
import { Newspaper } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getSession();

  // If already logged in, redirect to their role-based dashboard
  if (session?.user) {
    const role = session.user.role || 'agent'; // fallback
    if (role === 'superadmin') return redirect('/dashboard/superadmin');
    if (role === 'sales') return redirect('/dashboard/sales');
    return redirect('/dashboard/agent');
  }

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 bg-slate-900 overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary-600/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-500/20 blur-[120px] pointer-events-none" />

      <div className="glass-panel max-w-md w-full p-8 rounded-2xl flex flex-col items-center text-center space-y-6 relative z-10">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
          <Newspaper size={32} />
        </div>
        
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Supply Portal</h1>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">
            Manage your daily newspaper distribution, request variations, and track cash logistics seamlessly.
          </p>
        </div>

        <div className="w-full h-px bg-slate-200/50 my-6" />

        <div className="w-full space-y-3">
          <Link 
            href="/api/auth/login" 
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all active:scale-95 duration-200 group"
          >
            <span>Secure Login</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          
          <p className="text-xs text-slate-400 font-medium">
            Protected by Auth0 Enterprise Authentication
          </p>
        </div>
      </div>
    </main>
  );
}
