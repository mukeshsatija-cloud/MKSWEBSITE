import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default async function AgentDashboard() {
  const session = await getSession();
  if (session?.user?.role !== 'agent') {
    return redirect('/'); // unauthorized
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Daily Supply</h1>
        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-colors">
          Request Change for Tomorrow
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">Current Standing Supply</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SupplyCard name="The Morning Times" quantity={45} />
          <SupplyCard name="Daily Courier" quantity={120} />
          <SupplyCard name="Sunday Magazine" quantity={30} />
        </div>
      </div>
    </div>
  );
}

function SupplyCard({ name, quantity }: { name: string; quantity: number }) {
  return (
    <div className="border border-slate-100 p-4 rounded-xl flex items-center justify-between hover:border-slate-300 transition-colors">
      <div>
        <p className="font-semibold text-slate-800">{name}</p>
        <p className="text-sm text-slate-500">Scheduled delivery</p>
      </div>
      <div className="text-2xl font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
        {quantity}
      </div>
    </div>
  );
}
