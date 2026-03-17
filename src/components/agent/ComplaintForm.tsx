'use client';

import { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ComplaintForm() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    setIsSubmitting(true);
    // TODO: Add API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setSubject('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <MessageSquare size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Support Case</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">Issue Subject</label>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Late Arrival of Times Now"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium text-slate-700"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">Detailed Message</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Provide as much detail as possible..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium text-slate-700 min-h-[160px]"
                required
              />
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-slate-400">
                <AlertCircle size={16} />
                <p className="text-[10px] font-bold uppercase tracking-tight">Directly reported to Sales Executive</p>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting || !subject || !message}
              className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 ${
                success ? 'bg-emerald-500 text-white' : 'bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white shadow-slate-900/20'
              }`}
            >
              {isSubmitting ? 'Sending...' : success ? (
                <>
                  <CheckCircle2 size={20} />
                  Case Logged
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Complaint
                </>
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
