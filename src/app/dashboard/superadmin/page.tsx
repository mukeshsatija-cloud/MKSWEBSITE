import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';
import { Newspaper, Users, Clock, AlertTriangle, ArrowUpRight } from 'lucide-react';

export default async function SuperAdminDashboard() {
  const session = await auth0.getSession();
  if (session?.user?.role !== 'superadmin') {
    return redirect('/'); // unauthorized or not admin
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">System Overview</h1>
          <p className="text-slate-500 mt-1">Live snapshots of your distribution network</p>
        </div>
        <button className="flex items-center gap-2 text-sm px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold shadow-sm hover:bg-slate-50 transition-all active:scale-95">
          <Clock size={16} className="text-blue-600"/>
          Manual Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Hawkers" 
          value="150" 
          change="+2 this week"
          icon={<Users size={24}/>} 
          color="bg-blue-600" 
        />
        <StatCard 
          title="Requests" 
          value="12" 
          change="8 Urgent"
          icon={<AlertTriangle size={24}/>} 
          color="bg-amber-500" 
        />
        <StatCard 
          title="Publications" 
          value="20" 
          change="All active"
          icon={<Newspaper size={24}/>} 
          color="bg-emerald-600" 
        />
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Incoming Feed</h2>
            <p className="text-xs text-slate-400 mt-0.5">Approval requests and reported complaints</p>
          </div>
          <button className="text-blue-600 text-xs font-bold uppercase tracking-wider hover:underline underline-offset-4">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
           {/* Mock rows for aesthetic review */}
           <FeedItem 
              name="Rahul Sharma (Hawker)" 
              action="Requested supply change" 
              time="10 mins ago" 
              tag="Pending Approval"
              tagColor="bg-amber-100 text-amber-700"
           />
           <FeedItem 
              name="Vikas Gupta (Sales)" 
              action="Logged variation slip (Week 12)" 
              time="45 mins ago" 
              tag="Variation"
              tagColor="bg-blue-100 text-blue-700"
           />
           <FeedItem 
              name="Amit Patel (Hawker)" 
              action="Complaint: Late delivery of Times Now" 
              time="2 hours ago" 
              tag="Urgent"
              tagColor="bg-red-100 text-red-700"
           />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon, color }: { title: string; value: string; change: string; icon: any; color: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-start justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-500">
      <div className="flex flex-col h-full justify-between">
        <div>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-tight mb-1">{title}</p>
          <p className="text-4xl font-black text-slate-900">{value}</p>
        </div>
        <p className="text-[10px] font-bold text-slate-400 mt-4 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
            {change}
        </p>
      </div>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl ${color} -rotate-6 group-hover:rotate-0 transition-transform duration-500`}>
        {icon}
      </div>
    </div>
  );
}

function FeedItem({ name, action, time, tag, tagColor }: any) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden shrink-0">
                    <div className="w-full h-full flex items-center justify-center font-bold text-slate-500 text-xs">{name[0]}</div>
                </div>
                <div>
                    <p className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{name}</p>
                    <p className="text-xs text-slate-500">{action}</p>
                </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-4 mt-4 sm:mt-0">
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-tighter shadow-sm ${tagColor}`}>
                    {tag}
                </span>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                    {time}
                    <ArrowUpRight size={12} />
                </div>
            </div>
        </div>
    )
}
