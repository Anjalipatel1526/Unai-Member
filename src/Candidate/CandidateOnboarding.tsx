import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '../HR/components/Button';
import { Upload, CheckCircle2, User, Mail, Phone, Briefcase, FileText, CreditCard, Landmark, GraduationCap, ChevronRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function CandidateOnboarding() {
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: 'Developer',
        role: 'Developer',
        salary: 0,
        joining_date: new Date().toISOString().split('T')[0]
    });
    const [files, setFiles] = useState<{ [key: string]: File | null }>({
        aadhar_card: null,
        pan_card: null,
        bank_passbook: null,
        last_sem_certificate: null
    });

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'department') {
            setFormData({ ...formData, department: value, role: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        setError(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!allowedTypes.includes(file.type)) {
                alert(`Invalid file type for ${key.replace('_', ' ')}. Please upload a PDF or Image (JPG, PNG).`);
                e.target.value = ''; // Reset input
                return;
            }
            setFiles({ ...files, [key]: file });
            setError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Final Validation Check
        const missingFiles = Object.keys(files).filter(key => !files[key]);
        if (missingFiles.length > 0) {
            setError(`Please upload all 4 required documents (Missing: ${missingFiles.join(', ').replace(/_/g, ' ')})`);
            return;
        }

        setIsLoading(true);

        try {
            // 1. Insert Employee Record and get the ID
            const { data: newEmp, error: empError } = await supabase
                .from('company_employees')
                .insert([{
                    ...formData,
                    status: 'Active',
                    company_id: 'COMP_001',
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`
                }])
                .select()
                .single();

            if (empError) throw empError;
            const employee_id = newEmp.id;

            // 2. Simulate Document Uploads
            const docPromises = Object.keys(files).map(async (key) => {
                if (files[key]) {
                    const title = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    return supabase
                        .from('company_documents')
                        .insert([{
                            title: `${formData.name} - ${title}`,
                            employee_id: employee_id,
                            employee_name: formData.name,
                            type: 'Other',
                            date: new Date().toISOString().split('T')[0],
                            url: '#',
                            company_id: 'COMP_001'
                        }]);
                }
            });

            await Promise.all(docPromises);
            setSubmitted(true);
        } catch (err: any) {
            console.error('Onboarding Error:', err);
            setError('Submission failed: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="fixed inset-0 bg-white flex items-center justify-center p-6 z-50 animate-in fade-in duration-500">
                <div className="max-w-md w-full text-center p-12">
                    <div className="h-24 w-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-indigo-200 rotate-6">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Onboarding Complete!</h2>
                    <p className="text-slate-500 mb-10 text-base font-medium leading-relaxed">
                        Your professional profile has been submitted and is now being processed by our HR team.
                    </p>
                    <Button variant="primary" className="w-full h-15 rounded-2xl bg-slate-900 font-black text-lg hover:bg-slate-800" onClick={() => window.location.reload()}>
                        Done
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-12 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-y-auto">
            <div className="w-full max-w-xl flex flex-col items-center space-y-10 py-12">
                <div className="w-full text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-sm border border-slate-100 mb-1">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Verified Secure Portal</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                        Official Onboarding
                    </h1>
                    <p className="text-slate-400 text-sm font-bold max-w-sm mx-auto leading-relaxed uppercase tracking-widest">
                        Submit Mandatory Documents Only
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="bg-white rounded-[2.5rem] shadow-[0_32px_80px_rgba(0,0,0,0.06)] border border-slate-100 p-8 md:p-10 space-y-10">
                        {/* Part 1: Details */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-8 bg-indigo-600 rounded-full" />
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">Identity Information</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="group space-y-2 text-start">
                                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1 group-focus-within:text-indigo-500 transition-colors block">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input required name="name" type="text" value={formData.name} onChange={handleInputChange} placeholder="Legal Name"
                                            className="w-full rounded-2xl border-none ring-1 ring-slate-100 py-4 pl-12 pr-5 text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none bg-slate-50/20" />
                                    </div>
                                </div>

                                <div className="group space-y-2 text-start">
                                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1 group-focus-within:text-indigo-500 transition-colors block">Work Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input required name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="name@company.com"
                                            className="w-full rounded-2xl border-none ring-1 ring-slate-100 py-4 pl-12 pr-5 text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none bg-slate-50/20" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="group space-y-2 text-start">
                                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1 group-focus-within:text-indigo-500 transition-colors block">Phone</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <input required name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+91"
                                                className="w-full rounded-2xl border-none ring-1 ring-slate-100 py-4 pl-12 pr-5 text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none bg-slate-50/20" />
                                        </div>
                                    </div>
                                    <div className="group space-y-2 text-start">
                                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1 group-focus-within:text-indigo-500 transition-colors block">Role</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <select name="department" value={formData.department} onChange={handleInputChange}
                                                className="w-full rounded-2xl border-none ring-1 ring-slate-100 py-4 pl-12 pr-5 text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none bg-slate-50/20 appearance-none cursor-pointer">
                                                <option>Developer</option><option>Full Stack Developer</option>
                                                <option>Frontend</option><option>Backend</option>
                                                <option>UI/UX Design</option><option>Automation Testing</option>
                                                <option>Manual Testing</option><option>Marketing</option><option>HR</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Part 2: Files */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-8 bg-indigo-600 rounded-full" />
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">Mandatory Scans</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { key: 'aadhar_card', label: 'Aadhar Card', icon: CreditCard },
                                    { key: 'pan_card', label: 'PAN Card', icon: FileText },
                                    { key: 'bank_passbook', label: 'Bank Passbook', icon: Landmark },
                                    { key: 'last_sem_certificate', label: 'Last Sem Cert', icon: GraduationCap }
                                ].map((doc) => (
                                    <div key={doc.key} className="relative group text-start">
                                        <input type="file" required accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileChange(e, doc.key)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                        <div className={`p-4 rounded-2xl border border-slate-100 flex items-center gap-4 transition-all ${files[doc.key] ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50/50 hover:bg-white hover:border-indigo-200 shadow-sm'}`}>
                                            <div className={`h-10 w-10 flex-shrink-0 rounded-xl flex items-center justify-center ${files[doc.key] ? 'bg-indigo-600 text-white' : 'bg-white text-slate-300 shadow-sm'}`}>
                                                <doc.icon size={18} />
                                            </div>
                                            <div className="flex-1 min-w-0 pr-4">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{doc.label}</p>
                                                <p className="text-xs font-bold text-slate-600 truncate">
                                                    {files[doc.key] ? files[doc.key]!.name : 'Select PDF/Image'}
                                                </p>
                                            </div>
                                            {files[doc.key] && <CheckCircle2 size={18} className="text-indigo-600" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 animate-in slide-in-from-top-1 duration-300">
                                <AlertCircle size={18} />
                                <p className="text-xs font-bold">{error}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-6 pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full h-16 bg-slate-900 text-white rounded-3xl overflow-hidden shadow-xl active:scale-[0.98] disabled:opacity-70 transition-all font-black"
                        >
                            <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isLoading ? 'Finalizing Profile...' : 'Submit Profile for Verification'}
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
