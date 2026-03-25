import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Blocks, ArrowRight, Lock, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase'; // We'll use this for client logins

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // 1. Check Super Admin Hardcoded Credentials
        if (email === 'admin@unaimember.com' && password === 'UNAITECH') {
            localStorage.setItem('userAuth', JSON.stringify({ role: 'superadmin', email }));
            navigate('/');
            setIsLoading(false);
            return;
        }

        // 1.5. Check Company Admin Hardcoded Credentials
        if (email === 'admin@unaitech' && password === 'UNAI2026') {
            localStorage.setItem('userAuth', JSON.stringify({ role: 'companyadmin', email }));
            navigate('/company-admin/dashboard');
            setIsLoading(false);
            return;
        }

        // 2. Check Supabase for Employee Login
        try {
            const { data: empData } = await supabase
                .from('employee_credentials')
                .select('*')
                .eq('work_email', email)
                .eq('password', password)
                .eq('status', 'active')
                .single();

            if (empData) {
                localStorage.setItem('userAuth', JSON.stringify({
                    role: 'employee',
                    email: empData.work_email,
                    employeeId: empData.employee_id || empData.id,
                    employeeName: empData.employee_name,
                    companyId: empData.company_id,
                    department: empData.department,
                    designation: empData.designation,
                }));
                navigate('/employee/dashboard');
                setIsLoading(false);
                return;
            }
        } catch (err) {
            // Not found in employee_credentials, continue to client check
        }

        // 3. Otherwise, check Supabase for Client Login
        try {
            const { data, error: dbError } = await supabase
                .from('clients')
                .select('*')
                .eq('admin_email', email)
                .eq('password', password)
                .single();

            if (data) {
                localStorage.setItem('userAuth', JSON.stringify({
                    role: 'client',
                    email: data.admin_email,
                    clientId: data.id,
                    companyName: data.name
                }));
                navigate('/client-portal');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('Invalid email or password');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex-1 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-soft-light relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 left-1/2 -ml-[30rem] -mt-[15rem] w-[60rem] h-[60rem] rounded-full bg-primary-100/50 mix-blend-multiply blur-3xl opacity-70 pointer-events-none" />
            <div className="absolute top-0 right-1/2 ml-[10rem] -mt-[15rem] w-[50rem] h-[50rem] rounded-full bg-indigo-100/50 mix-blend-multiply blur-3xl opacity-70 pointer-events-none" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="flex justify-center flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                        <Blocks className="w-10 h-10 text-primary-600" />
                    </div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                        Sign in to Unai Member
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 font-medium">
                        Super Admin & Client Portal
                    </p>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white/80 backdrop-blur-xl py-8 px-4 shadow-2xl border border-white rounded-3xl sm:px-10">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Email Address
                            </label>
                            <div className="mt-2 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/50 focus:bg-white"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <div className="mt-2 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/50 focus:bg-white"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 font-medium text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70 group"
                            >
                                {isLoading ? (
                                    'Signing in...'
                                ) : (
                                    <span className="flex items-center">
                                        Sign in
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
