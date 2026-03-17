import VariationSlipForm from '@/components/VariationSlipForm';
import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';

export default async function AgentVariationsPage() {
  const session = await auth0.getSession();
  if (session?.user?.role !== 'agent') {
    return redirect('/');
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Variation Slip</h1>
        <p className="text-slate-500 mt-1">Fill in your supply variations for the upcoming week.</p>
      </div>

      <VariationSlipForm />
    </div>
  );
}
