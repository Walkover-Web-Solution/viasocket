'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Step5({ selectedDate, setSelectedDate, selectedTime, setSelectedTime }) {
    const [monthOffset, setMonthOffset] = useState(0);

    const today = new Date();
    const viewDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const monthLabel = viewDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const firstDow = viewDate.getDay();

    const times = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'];

    return (
        <div className="animate-[hireStepFade_0.32s_cubic-bezier(0.2,0.7,0.2,1)]">
            <div className="flex items-center justify-between mb-3.5">
                <div className="text-[15px] font-bold text-[#111] tracking-[-0.2px]">{monthLabel}</div>
                <div className="flex gap-1">
                    <button
                        onClick={() => setMonthOffset((m) => Math.max(0, m - 1))}
                        className="w-8 h-8 border border-[#ececec] bg-white rounded-lg flex items-center justify-center text-[#555] hover:border-accent hover:text-accent transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setMonthOffset((m) => m + 1)}
                        className="w-8 h-8 border border-[#ececec] bg-white rounded-lg flex items-center justify-center text-[#555] hover:border-accent hover:text-accent transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[11px] font-semibold text-[#888] uppercase tracking-wide">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="py-1.5">
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 mb-[22px]">
                {Array.from({ length: firstDow }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateKey = `${viewDate.getFullYear()}-${viewDate.getMonth()}-${day}`;
                    const isPast =
                        viewDate.getFullYear() === today.getFullYear() &&
                        viewDate.getMonth() === today.getMonth() &&
                        day < today.getDate();
                    const selected = selectedDate === dateKey;
                    return (
                        <button
                            key={day}
                            disabled={isPast}
                            onClick={() => setSelectedDate(dateKey)}
                            className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                                isPast
                                    ? 'text-[#ccc] cursor-not-allowed'
                                    : selected
                                      ? 'bg-accent text-white font-semibold'
                                      : 'text-[#222] hover:bg-[#faf9f4]'
                            }`}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>

            {selectedDate && (
                <>
                    <h4 className="text-[15px] font-bold text-[#111] mb-3 tracking-[-0.2px]">Pick a time (IST)</h4>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                        {times.map((t) => {
                            const selected = selectedTime === t;
                            return (
                                <button
                                    key={t}
                                    onClick={() => setSelectedTime(t)}
                                    className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${
                                        selected
                                            ? 'bg-accent border-accent text-white'
                                            : 'bg-white border-[#ececec] text-[#222] hover:border-accent hover:text-accent'
                                    }`}
                                >
                                    {t}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
