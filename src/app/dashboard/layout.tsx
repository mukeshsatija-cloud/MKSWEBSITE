import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, User, LayoutDashboard, FileText, ClipboardList, Wallet } from 'lucide-react';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth0.getSession();
  if (!session?.user) {
    redirect('/auth/login');
  }

  const user = session.user;
  const role = user.role || 'agent'; 
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row h-full overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <h2 className="text-xl font-bold text-blue-400">Portal</h2>
        <div className="flex items-center space-x-4">
          <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded uppercase font-bold tracking-tighter">
            {role}
          </span>
        </div>
      </div>

      {/* Primary Sidebar (Tablet/Desktop) */}
      <nav className="hidden md:flex w-64 bg-slate-900 text-white flex-col h-screen shrink-0 border-r border-slate-800 shadow-2xl">
        <div className="p-8">
          <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm italic">N</span>
            Portal
          </h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-2 ml-10">DISTRIBUTION MGMT</p>
        </div>

        <div className="flex-grow px-4 space-y-1 font-medium overflow-y-auto mt-4 custom-scrollbar">
          {role === 'superadmin' && (
            <>
              <SidebarLink href="/dashboard/superadmin" icon={<LayoutDashboard size={18}/>}>Overview</SidebarLink>
              <SidebarLink href="/dashboard/superadmin/agents" icon={<User size={18}/>}>Manage Agents</SidebarLink>
              <SidebarLink href="/dashboard/superadmin/requests" icon={<ClipboardList size={18}/>}>Requests</SidebarLink>
            </>
          )}

          {role === 'sales' && (
            <>
              <SidebarLink href="/dashboard/sales" icon={<LayoutDashboard size={18}/>}>My Agents</SidebarLink>
              <SidebarLink href="/dashboard/sales/cash" icon={<Wallet size={18}/>}>Cash Collections</SidebarLink>
              <SidebarLink href="/dashboard/sales/variations" icon={<FileText size={18}/>}>Variation Slips</SidebarLink>
            </>
          )}

          {role === 'agent' && (
            <>
              <SidebarLink href="/dashboard/agent" icon={<LayoutDashboard size={18}/>}>Daily Supply</SidebarLink>
              <SidebarLink href="/dashboard/agent/requests" icon={<ClipboardList size={18}/>}>Change Requests</SidebarLink>
              <SidebarLink href="/dashboard/agent/complaints" icon={<FileText size={18}/>}>Log Complaint</SidebarLink>
              <SidebarLink href="/dashboard/agent/variations" icon={<FileText size={18}/>}>Variation Slips</SidebarLink>
            </>
          )}
        </div>

        <div className="p-6 bg-slate-950/40 border-t border-slate-800/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="text-sm truncate">
              <p className="font-bold text-white truncate max-w-[140px]">{user.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          <Link 
            href="/auth/logout"
            className="flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-all duration-300 text-sm font-bold group"
          >
            <LogOut size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Sign out
          </Link>
        </div>
      </nav>

      {/* Mobile Bottom Navigation (iOS style) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] glass-panel rounded-2xl flex items-center justify-around p-3 z-50 border border-white/20 shadow-2xl bg-white/70 backdrop-blur-xl">
          <MobileNavItem href="/dashboard" icon={<LayoutDashboard size={20}/>} />
          <MobileNavItem href="/dashboard/requests" icon={<ClipboardList size={20}/>} />
          {role === 'sales' && <MobileNavItem href="/dashboard/sales/cash" icon={<Wallet size={20}/>} />}
          <MobileNavItem href="/auth/logout" icon={<LogOut size={20}/>} color="text-red-500" />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50 pb-24 md:pb-0 h-full">
        <div className="max-w-7xl mx-auto p-4 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ href, children, icon }: { href: string; children: ReactNode; icon: ReactNode }) {
  return (
    <Link 
      href={href}
      className="flex items-center px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 group"
    >
      <span className="mr-3 group-hover:scale-110 transition-transform text-slate-500 group-hover:text-blue-500">{icon}</span>
      {children}
    </Link>
  );
}

function MobileNavItem({ href, icon, color = "text-slate-600" }: { href: string; icon: ReactNode; color?: string }) {
    return (
        <Link href={href} className={`${color} p-2 active:scale-90 transition-transform`}>
            {icon}
        </Link>
    )
}
