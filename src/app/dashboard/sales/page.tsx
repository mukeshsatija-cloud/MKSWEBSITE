import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';
import { User, MapPin, ChevronRight, Plus, Package } from 'lucide-react';

export default async function SalesDashboard() {
  const session = await auth0.getSession();
  if (session?.user?.role !== 'sales') {
    return redirect('/'); 
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Sales Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage hawkers and supply variations</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 text-sm">
          <Plus size={18} />
          New Supply Change
        </button>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <User size={20} className="text-blue-500"/>
            My Assigned Agents
          </h2>
          <span className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
            Total 150
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <AgentListCard name="Kiran Kumar" region="East Zone" status="Active" supply="450" />
           <AgentListCard name="Suresh Raina" region="North Block" status="Pending" supply="120" />
           <AgentListCard name="Mohit Sharma" region="Park View" status="Active" supply="850" />
           <AgentListCard name="Vijay Singh" region="City Center" status="Active" supply="300" />
        </div>
      </div>
    </div>
  );
}

function AgentListCard({ name, region, status, supply }: any) {
    return (
        <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-blue-600 font-bold group-hover:scale-110 transition-transform">
                        {name[0]}
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase text-xs tracking-tight">{name}</p>
                        <div className="flex items-center text-[10px] text-slate-500 font-medium">
                            <MapPin size={10} className="mr-1" />
                            {region}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                        <Package size={10} />
                        {supply}
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 group-hover:text-blue-400 transition-all" />
                </div>
            </div>
        </div>
    )
}
