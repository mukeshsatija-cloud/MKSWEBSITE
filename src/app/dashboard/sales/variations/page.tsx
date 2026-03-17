import VariationSlipForm from '@/components/VariationSlipForm';
import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';

const MOCK_AGENTS = [
  { id: '1', name: 'Rahul Sharma (East Zone)' },
  { id: '2', name: 'Suresh Raina (North Block)' },
  { id: '3', name: 'Mohit Sharma (Park View)' },
  { id: '4', name: 'Vijay Singh (City Center)' },
];

export default async function SalesVariationsPage() {
  const session = await auth0.getSession();
  if (session?.user?.role !== 'sales') {
    return redirect('/');
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Variation Slip</h1>
        <p className="text-slate-500 mt-1">Submit weekly quantity adjustments for your assigned agents.</p>
      </div>

      <VariationSlipForm agents={MOCK_AGENTS} />
    </div>
  );
}
