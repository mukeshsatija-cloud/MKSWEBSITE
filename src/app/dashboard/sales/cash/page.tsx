import CashCollectionForm from '@/components/sales/CashCollectionForm';
import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';

// Mock agents for demonstration
const MOCK_AGENTS = [
  { id: '1', name: 'Rahul Sharma (East Zone)' },
  { id: '2', name: 'Suresh Raina (North Block)' },
  { id: '3', name: 'Mohit Sharma (Park View)' },
  { id: '4', name: 'Vijay Singh (City Center)' },
];

export default async function CashCollectionPage() {
  const session = await auth0.getSession();
  if (session?.user?.role !== 'sales') {
    return redirect('/');
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Log Cash Collection</h1>
        <p className="text-slate-500 mt-1">Enter daily collections from agents with denomination breakdown</p>
      </div>

      <CashCollectionForm agents={MOCK_AGENTS} />
    </div>
  );
}
