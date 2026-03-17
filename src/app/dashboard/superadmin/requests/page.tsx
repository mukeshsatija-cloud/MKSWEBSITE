import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';
import { Check, X, Clock, User, Newspaper } from 'lucide-react';

const MOCK_REQUESTS = [
  { id: '1', agent: 'Rahul Sharma', publication: 'The Morning Times', oldQty: 45, newQty: 55, date: '2026-03-18', time: '09:15 AM' },
  { id: '2', agent: 'Suresh Raina', publication: 'Daily Courier', oldQty: 120, newQty: 110, date: '2026-03-18', time: '10:05 AM' },
];

export default async function ApproveRequestsPage() {
  const session = await auth0.getSession();
  if (session?.user?.role !== 'superadmin') {
    return redirect('/');
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pending Approvals</h1>
        <p className="text-slate-500 mt-1">Review and approve next-day supply change requests</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_REQUESTS.map((req) => (
          <div key={req.id} className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-8 group hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-8 flex-1">
                <div className="flex items-center gap-4 min-w-[200px]">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        <User size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Agent</p>
                        <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{req.agent}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 min-w-[240px]">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center">
                        <Newspaper size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Publication</p>
                        <p className="font-bold text-slate-700 uppercase tracking-tight">{req.publication}</p>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1 text-center">Current</p>
                        <p className="text-2xl font-black text-slate-300 line-through decoration-red-500/30">{req.oldQty}</p>
                    </div>
                    <div className="w-8 h-px bg-slate-100" />
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1 text-center">Requested</p>
                        <p className="text-2xl font-black text-blue-600">{req.newQty}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-6 lg:pt-0">
                <div className="flex items-center gap-2 text-slate-400">
                    <Clock size={16} />
                    <span className="text-xs font-bold">{req.time}</span>
                </div>
                
                <div className="flex items-center gap-2">
                    <button className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all active:scale-90 shadow-sm border border-red-100">
                        <X size={20} />
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
                        <Check size={18} />
                        Approve
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
