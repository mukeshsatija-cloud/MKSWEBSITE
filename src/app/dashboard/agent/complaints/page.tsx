import ComplaintForm from '@/components/agent/ComplaintForm';
import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';

export default async function ComplaintsPage() {
  const session = await auth0.getSession();
  if (session?.user?.role !== 'agent') {
    return redirect('/');
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Report an Issue</h1>
        <p className="text-slate-500 mt-1">Found a discrepancy or late delivery? Report it here for immediate review.</p>
      </div>

      <ComplaintForm />
    </div>
  );
}
