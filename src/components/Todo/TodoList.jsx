import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { TodoItem } from './TodoItem';
import { AddTodo } from './AddTodo';
import { Plus, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

export const TodoList = ({ view = 'day', selectedDate = new Date() }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState('all'); // all, pending, completed
  const { user } = useAuth();

  useEffect(() => {
    fetchTodos();
  }, [view, selectedDate, user]);

  const fetchTodos = async () => {
    if (!user) return;

    try {
      setLoading(true);
      let query = supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date', { ascending: true });

      // Apply date filters based on view
      if (view === 'day') {
        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        query = query.eq('due_date', dateStr);
      } else if (view === 'week') {
        const weekStart = format(startOfWeek(selectedDate), 'yyyy-MM-dd');
        const weekEnd = format(endOfWeek(selectedDate), 'yyyy-MM-dd');
        query = query.gte('due_date', weekStart).lte('due_date', weekEnd);
      } else if (view === 'month') {
        const monthStart = format(startOfMonth(selectedDate), 'yyyy-MM-dd');
        const monthEnd = format(endOfMonth(selectedDate), 'yyyy-MM-dd');
        query = query.gte('due_date', monthStart).lte('due_date', monthEnd);
      }

      const { data, error } = await query;
      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTodoAdded = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleTodoUpdate = (updatedTodo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
  };

  const handleTodoDelete = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return todo.status === 'pending';
    if (filter === 'completed') return todo.status === 'completed';
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.status === 'completed').length,
    pending: todos.filter(t => t.status === 'pending').length,
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="card">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {view === 'day' && format(selectedDate, 'EEEE, MMMM d, yyyy')}
              {view === 'week' && `Week of ${format(selectedDate, 'MMM d, yyyy')}`}
              {view === 'month' && format(selectedDate, 'MMMM yyyy')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {stats.completed} of {stats.total} tasks completed
            </p>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'completed'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Todo List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="card text-center py-12">
          <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No tasks found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {filter === 'all' 
              ? "You haven't added any tasks yet. Click the 'Add Task' button to get started!" 
              : `No ${filter} tasks in this ${view}`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleTodoUpdate}
              onDelete={handleTodoDelete}
            />
          ))}
        </div>
      )}

      {/* Add Todo Modal */}
      {showAddModal && (
        <AddTodo
          onTodoAdded={handleTodoAdded}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};