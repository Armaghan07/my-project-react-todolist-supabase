import React, { useState } from 'react';
import { TodoList } from '../Todo/TodoList';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

export const WeekView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const weekStart = startOfWeek(selectedDate);
  const weekEnd = endOfWeek(selectedDate);
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const goToPreviousWeek = () => setSelectedDate(subWeeks(selectedDate, 1));
  const goToNextWeek = () => setSelectedDate(addWeeks(selectedDate, 1));
  const goToCurrentWeek = () => setSelectedDate(new Date());

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousWeek}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToCurrentWeek}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Current Week
            </button>
            <button
              onClick={goToNextWeek}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span className="text-xl font-semibold text-gray-800 dark:text-white">
              {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-6">
          {weekDays.map(day => (
            <div key={day.toString()} className="text-center">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {format(day, 'EEE')}
              </div>
              <div className={`text-lg font-semibold mt-1 ${
                format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                  ? 'text-blue-500'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>
      </div>

      <TodoList view="week" selectedDate={selectedDate} />
    </div>
  );
};