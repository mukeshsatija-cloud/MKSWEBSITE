'use client';

import { useState, useMemo } from 'react';
import { Wallet, Calculator, CheckCircle2, ChevronDown } from 'lucide-react';
import { CashDenomination } from '@/types';

const DENOMINATIONS = [500, 200, 100, 50, 20, 10, 5, 2, 1] as const;

export default function CashCollectionForm({ agents }: { agents: { id: string, name: string }[] }) {
  const [selectedAgent, setSelectedAgent] = useState('');
  const [counts, setCounts] = useState<Record<string, number>>(
    Object.fromEntries(DENOMINATIONS.map(d => [d, 0]))
  );
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const totalAmount = useMemo(() => {
    return DENOMINATIONS.reduce((sum, d) => sum + d * (counts[d] || 0), 0);
  }, [counts]);

  const handleInputChange = (denom: number, val: string) => {
    const num = parseInt(val) || 0;
    setCounts(prev => ({ ...prev, [denom]: Math.max(0, num) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAgent) return alert('Please select an agent');
    
    setIsSubmitting(true);
    // TODO: Add API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      // Reset after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Step 1: Selection */}
        <section className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
           <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Wallet size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">New Collection</h3>
           </div>

           <div className="space-y-4">
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Target Agent</label>
               <div className="relative group">
                   <select 
                     value={selectedAgent}
                     onChange={(e) => setSelectedAgent(e.target.value)}
                     className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                   >
                       <option value="">Select an agent...</option>
                       {agents.map(a => (
                           <option key={a.id} value={a.id}>{a.name}</option>
                       ))}
                   </select>
                   <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
               </div>
           </div>
        </section>

        {/* Step 2: Denominations */}
        <section className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Calculator size={120} />
            </div>

            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 pl-1">Denomination Breakdown</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {DENOMINATIONS.map(denom => (
                    <div key={denom} className="space-y-2">
                        <label className="flex items-center justify-between text-[11px] font-bold text-slate-500 px-1">
                            <span>₹{denom}</span>
                            <span className="text-blue-500 opacity-50">Value: ₹{denom * (counts[denom] || 0)}</span>
                        </label>
                        <input 
                            type="number"
                            min="0"
                            placeholder="0"
                            value={counts[denom] || ''}
                            onChange={(e) => handleInputChange(denom, e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-900"
                        />
                    </div>
                ))}
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Total Collected</p>
                    <p className="text-4xl font-black text-slate-900 tracking-tight">₹{totalAmount.toLocaleString()}</p>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting || totalAmount === 0 || !selectedAgent}
                  className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 ${
                    success ? 'bg-emerald-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30'
                  }`}
                >
                  {isSubmitting ? 'Logging...' : success ? (
                      <>
                        <CheckCircle2 size={20} />
                        Logged Successfully
                      </>
                  ) : 'Confirm Collection'}
                </button>
            </div>
        </section>

        <section className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 pl-1">Additional Notes</h3>
            <textarea 
               value={notes}
               onChange={(e) => setNotes(e.target.value)}
               placeholder="Payment details, check numbers (if any), etc."
               className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-[100px] text-slate-700 font-medium"
            />
        </section>

      </form>
    </div>
  );
}
