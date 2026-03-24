import React from 'react';

interface CalendarProps {
    year: number;
    month: number;
    attendance: Record<string, 'present' | 'absent' | 'halfday' | 'late' | 'weekend' | 'holiday'>;
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function Calendar({ year, month, attendance }: CalendarProps) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

    const statusColors: Record<string, string> = {
        present: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        absent: 'bg-rose-100 text-rose-800 border-rose-200',
        halfday: 'bg-amber-100 text-amber-800 border-amber-200',
        late: 'bg-orange-100 text-orange-800 border-orange-200',
        weekend: 'bg-gray-50 text-gray-400 border-gray-100',
        holiday: 'bg-sky-100 text-sky-800 border-sky-200',
    };

    const statusDots: Record<string, string> = {
        present: 'bg-emerald-500',
        absent: 'bg-rose-500',
        halfday: 'bg-amber-500',
        late: 'bg-orange-500',
        weekend: 'bg-gray-300',
        holiday: 'bg-sky-500',
    };

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    return (
        <div className="w-full">
            <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">{monthName} {year}</h3>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {dayNames.map(d => (
                    <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider py-2">
                        {d}
                    </div>
                ))}
                {days.map((day, idx) => {
                    if (day === null) return <div key={`empty-${idx}`} />;
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const status = attendance[dateStr];
                    const colorClass = status ? statusColors[status] : 'bg-white text-gray-700 border-gray-100';
                    const dotClass = status ? statusDots[status] : '';

                    return (
                        <div
                            key={day}
                            className={`relative flex flex-col items-center justify-center rounded-lg border p-1.5 sm:p-2 text-xs sm:text-sm font-medium transition-all hover:scale-105 ${colorClass}`}
                        >
                            {day}
                            {dotClass && (
                                <div className={`absolute bottom-0.5 h-1 w-1 rounded-full ${dotClass}`} />
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
                {Object.entries({ Present: 'emerald', Absent: 'rose', Late: 'orange', 'Half Day': 'amber', Weekend: 'gray', Holiday: 'sky' }).map(([label, color]) => (
                    <div key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
                        <div className={`h-2 w-2 rounded-full bg-${color}-500`} />
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
}
