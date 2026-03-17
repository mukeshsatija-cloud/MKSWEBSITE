import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';
import { UserPlus, Search, Edit2, Trash2, Filter } from 'lucide-react';

const MOCK_AGENTS = [
  { id: '1', name: 'Rahul Sharma', zone: 'East', email: 'rahul@example.com', status: 'Active' },
  { id: '2', name: 'Suresh Raina', zone: 'North', email: 'suresh@example.com', status: 'Active' },
  { id: '3', name: 'Mohit Sharma', zone: 'West', email: 'mohit@example.com', status: 'Inactive' },
  { id: '4', name: 'Vijay Singh', zone: 'Central', email: 'vijay@example.com', status: 'Active' },
];

export default async function ManageAgentsPage() {
  const session = await auth0.getSession();
  if (session?.user?.role !== 'superadmin') {
    return redirect('/');
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manage Agents</h1>
          <p className="text-slate-500 mt-1">Add, update or suspend agent profiles</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all active:scale-95 text-sm uppercase tracking-widest">
          <UserPlus size={18} />
          Add New Agent
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50/30">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search agents..." 
                    className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
            </div>
            <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
                <Filter size={16} />
                Filter by Zone
            </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5">Agent Name</th>
                <th className="px-8 py-5">Zone</th>
                <th className="px-8 py-5">Email</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_AGENTS.map((agent) => (
                <tr key={agent.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                            {agent.name[0]}
                        </div>
                        <span className="font-bold text-slate-700 text-sm">{agent.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">{agent.zone}</td>
                  <td className="px-8 py-5 text-sm text-slate-400 italic">{agent.email}</td>
                  <td className="px-8 py-5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${
                      agent.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right space-x-2">
                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-slate-50/30 border-t border-slate-100 flex justify-center">
            <button className="text-xs font-bold text-slate-400 hover:text-blue-500 transition-colors">
                Load More Agents
            </button>
        </div>
      </div>
    </div>
  );
}
