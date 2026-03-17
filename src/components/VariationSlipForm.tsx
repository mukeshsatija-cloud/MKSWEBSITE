'use client';

import { useState } from 'react';
import { FileSpreadsheet, Save, CheckCircle2 } from 'lucide-react';
import { format, startOfNextWeek, addDays } from 'date-fns';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function VariationSlipForm({ agents = [] }: { agents?: { id: string, name: string }[] }) {
  const nextMonday = startOfNextWeek(new Date(), { weekStartsOn: 1 });
  const [selectedAgent, setSelectedAgent] = useState('');
  const [variations, setVariations] = useState<Record<string, number>>(
    Object.fromEntries(DAYS.map((_, i) => [format(addDays(nextMonday, i), 'yyyy-MM-dd'), 0]))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (dateStr: string, val: string) => {
    setVariations(prev => ({ ...prev, [dateStr]: parseInt(val) || 0 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <FileSpreadsheet size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Weekly Variation Slip</h3>
                        <p className="text-xs text-slate-400 font-medium">Valid for week starting {format(nextMonday, 'MMM do, yyyy')}</p>
                    </div>
                </div>

                {agents.length > 0 && (
                    <div className="md:w-64">
                        <select 
                            value={selectedAgent}
                            onChange={(e) => setSelectedAgent(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-sm"
                            required
                        >
                            <option value="">Select Agent...</option>
                            {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                    </div>
                )}
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {DAYS.map((day, i) => {
                    const date = addDays(nextMonday, i);
                    const dateStr = format(date, 'yyyy-MM-dd');
                    return (
                        <div key={day} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:border-indigo-100 hover:shadow-lg transition-all">
                            <label className="block space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{day}</span>
                                <span className="block text-xs font-bold text-slate-600 mb-2">{format(date, 'MMM do')}</span>
                                <input 
                                    type="number"
                                    placeholder="+ / -"
                                    value={variations[dateStr] || ''}
                                    onChange={(e) => handleInputChange(dateStr, e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-black text-center text-lg"
                                />
                            </label>
                        </div>
                    );
                })}
           </div>

           <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${
                    success ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20'
                  }`}
                >
                  {isSubmitting ? 'Saving Slip...' : success ? (
                      <>
                        <CheckCircle2 size={20} />
                        Slip Saved
                      </>
                  ) : (
                      <>
                        <Save size={18} />
                        Save Variation Slip
                      </>
                  )}
                </button>
           </div>
        </div>

      </form>
    </div>
  );
}
