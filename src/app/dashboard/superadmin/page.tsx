import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

export default async function SuperAdminDashboard() {
  const session = await getSession();
  if (session?.user?.role !== 'superadmin') {
    return redirect('/'); // unauthorized
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Superadmin Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Agents" value="150" color="bg-blue-500" />
        <StatCard title="Pending Requests" value="12" color="bg-orange-500" />
        <StatCard title="Active Publications" value="20" color="bg-emerald-500" />
      </div>

      <div className="mt-10 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-800">Recent Notifications & Requests</h2>
          <button className="text-sm px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors">
            ↻ Refresh manually
          </button>
        </div>
        
        <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100">
          <div className="p-4 bg-slate-50 text-slate-500 text-sm text-center">
            You will implement the dynamic list of requests here
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string | number; color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${color}`}>
        ■
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
