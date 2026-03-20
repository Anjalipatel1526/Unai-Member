import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, Briefcase, MapPin } from 'lucide-react';
import { Card } from '../../components/Card';
import { Avatar } from '../../components/Avatar';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { useHRData } from '../../hooks/useHRData';

export function EmployeeProfileDetail() {
    const { id } = useParams();
    const { employees, loading } = useHRData();

    const employee = employees.find(e => e.id === id);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!employee) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link to="/assistant-hr/employees">
                        <Button variant="ghost" size="sm" icon={<ArrowLeft size={18} />} />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Employee Not Found</h1>
                </div>
                <Card className="p-10 text-center text-gray-400">
                    The requested employee does not exist or has been removed.
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/assistant-hr/employees">
                    <Button variant="ghost" size="sm" icon={<ArrowLeft size={18} />} />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Employee Profile</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <Card className="lg:col-span-1">
                    <div className="flex flex-col items-center">
                        <Avatar src={employee.avatar} alt={employee.name} size="xl" className="ring-4 ring-indigo-50 mb-4" />
                        <h2 className="text-xl font-bold text-gray-900">{employee.name}</h2>
                        <p className="text-sm font-medium text-indigo-600 mt-1">{employee.role}</p>
                        <Badge variant={employee.status === 'Active' ? 'success' : 'warning'} className="mt-3">
                            {employee.status}
                        </Badge>
                    </div>

                    <div className="mt-8 space-y-4 pt-8 border-t border-gray-50">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Mail size={18} className="text-gray-400" />
                            {employee.email}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Phone size={18} className="text-gray-400" />
                            {employee.phone}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <MapPin size={18} className="text-gray-400" />
                            Organization HQ
                        </div>
                    </div>
                </Card>

                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Card title="Attendance Summary">
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-3xl font-extrabold text-gray-900">94%</span>
                                <span className="text-sm font-bold text-emerald-600 mb-1">+2%</span>
                            </div>
                            <p className="text-xs text-gray-400 font-medium">Monthly average presence</p>
                        </Card>
                        <Card title="Leave Balance">
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-3xl font-extrabold text-gray-900">12</span>
                                <span className="text-sm font-bold text-gray-400 mb-1">/ 20 days</span>
                            </div>
                            <p className="text-xs text-gray-400 font-medium">Available for this year</p>
                        </Card>
                    </div>

                    <Card title="Employment Details">
                        <div className="grid grid-cols-2 gap-y-6">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Department</p>
                                <p className="text-sm font-bold text-gray-900">{employee.department}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Employee ID</p>
                                <p className="text-sm font-bold text-gray-900">{employee.id.substring(0, 8)}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Joining Date</p>
                                <p className="text-sm font-bold text-gray-900">{employee.joining_date}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Reporting Lead</p>
                                <p className="text-sm font-bold text-gray-900">Robert Vance</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
