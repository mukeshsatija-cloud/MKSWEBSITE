import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';
import { Newspaper, ChevronRight, History, BellRing } from 'lucide-react';

export default async function AgentDashboard() {
  const session = await auth0.getSession();
  if (session?.user?.role !== 'agent') {
    return redirect('/'); 
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Daily Supply</h1>
          <p className="text-slate-500 mt-1">Review your standing orders and request changes</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="p-3 bg-white text-slate-400 border border-slate-200 rounded-2xl hover:text-blue-500 transition-colors">
                <BellRing size={20} />
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 text-sm uppercase tracking-wider">
               Change Req.
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Main Supply List */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                    <Newspaper size={20} className="text-blue-500"/>
                    Standing Order
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SupplyCard name="The Morning Times" quantity={45} type="Daily" />
                    <SupplyCard name="Daily Courier" quantity={120} type="Daily" />
                    <SupplyCard name="Economic Feed" quantity={15} type="Daily" />
                    <SupplyCard name="Sunday Magazine" quantity={30} type="Weekly" />
                </div>
            </div>
        </div>

        {/* Right Col: Recent Activity */}
        <div className="space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <History size={18} className="text-slate-400"/>
                    Recent History
                </h2>
                <div className="space-y-4">
                    <HistoryItem date="Mar 16" title="Change Approved" desc="+10 Times Now" color="text-emerald-600 bg-emerald-50" />
                    <HistoryItem date="Mar 14" title="Variation Logged" desc="Week 12 Entry" color="text-blue-600 bg-blue-50" />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

function SupplyCard({ name, quantity, type }: any) {
  return (
    <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300 group cursor-pointer">
      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{type}</span>
        <p className="font-bold text-slate-800 mt-1">{name}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-2xl font-black text-blue-600 px-3 py-1 rounded-xl bg-blue-100/50 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            {quantity}
        </div>
        <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
}

function HistoryItem({ date, title, desc, color }: any) {
    return (
        <div className="flex gap-4 group cursor-pointer">
            <div className="flex flex-col items-center">
                <div className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{date}</div>
                <div className="w-0.5 h-full bg-slate-100 mt-2"></div>
            </div>
            <div className={`flex-1 p-3 rounded-xl ${color} border border-transparent group-hover:border-current/10 transition-all`}>
                <p className="text-xs font-bold leading-tight">{title}</p>
                <p className="text-[10px] opacity-70 mt-0.5">{desc}</p>
            </div>
        </div>
    )
}
