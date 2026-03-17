import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import Link from 'next/link';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session?.user) {
    redirect('/api/auth/login');
  }

  // NOTE: Auth0 assigns custom roles, which we assume is in user.role
  const user = session.user;
  const role = user.role || 'agent'; // default
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-tight text-primary-400">Portal</h2>
          <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">{role} access</p>
        </div>

        <div className="flex-grow p-4 space-y-2 font-medium">
          {role === 'superadmin' && (
            <>
              <NavLink href="/dashboard/superadmin">Overview</NavLink>
              <NavLink href="/dashboard/superadmin/agents">Manage Agents</NavLink>
              <NavLink href="/dashboard/superadmin/requests">Requests</NavLink>
            </>
          )}

          {role === 'sales' && (
            <>
              <NavLink href="/dashboard/sales">My Agents</NavLink>
              <NavLink href="/dashboard/sales/cash">Cash Collections</NavLink>
              <NavLink href="/dashboard/sales/variations">Variation Slips</NavLink>
            </>
          )}

          {role === 'agent' && (
            <>
              <NavLink href="/dashboard/agent">Daily Supply</NavLink>
              <NavLink href="/dashboard/agent/requests">Change Requests</NavLink>
              <NavLink href="/dashboard/agent/complaints">Log Complaint</NavLink>
              <NavLink href="/dashboard/agent/variations">Variation Slips</NavLink>
            </>
          )}
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="text-sm truncate">
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <Link 
            href="/api/auth/logout"
            className="block w-full text-center py-2 px-4 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-semibold"
          >
            Sign out
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link 
      href={href}
      className="block px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
    >
      {children}
    </Link>
  );
}
