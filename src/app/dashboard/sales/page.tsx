import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default async function SalesDashboard() {
  const session = await getSession();
  if (session?.user?.role !== 'sales') {
    return redirect('/'); // unauthorized
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Sales Executive Dashboard</h1>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-800">My Assigned Agents</h2>
          <button className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            + Request Supply Change
          </button>
        </div>
        
        <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100">
          <div className="p-4 bg-slate-50 flex justify-between items-center group hover:bg-slate-100 transition-colors cursor-pointer">
            <div>
              <p className="font-semibold text-slate-800">Mock Vendor 1</p>
              <p className="text-sm text-slate-500">Sub-region A</p>
            </div>
            <div className="flex space-x-3">
               <span className="text-sm px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">pending variations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
