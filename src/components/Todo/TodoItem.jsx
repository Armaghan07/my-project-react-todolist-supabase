import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Edit2, Trash2, CheckCircle, Circle, Calendar } from "lucide-react";
import { format } from "date-fns";
import { EditTodo } from "./EditTodo";

export const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const toggleStatus = async () => {
    try {
      setLoading(true);
      const newStatus = todo.status === "pending" ? "completed" : "pending";
      const { error } = await supabase
        .from("todos")
        .update({ status: newStatus })
        .eq("id", todo.id);

      if (error) throw error;
      onUpdate({ ...todo, status: newStatus });
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      setLoading(true);
      const { error } = await supabase.from("todos").delete().eq("id", todo.id);

      if (error) throw error;
      onDelete(todo.id);
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (updatedTodo) => {
    onUpdate(updatedTodo);
  };

  const isOverdue =
    new Date(todo.due_date) < new Date() && todo.status === "pending";

  return (
    <>
      <div
        className={`card p-4 mb-3 transition-all duration-200 hover:shadow-xl ${
          todo.status === "completed" ? "opacity-75" : ""
        } ${isOverdue ? "border-red-300 dark:border-red-700" : ""}`}
      >
        <div className="flex items-start gap-3">
          <button
            onClick={toggleStatus}
            disabled={loading}
            className="mt-1 flex-shrink-0"
          >
            {todo.status === "completed" ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-semibold ${
                todo.status === "completed"
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : "text-gray-800 dark:text-white"
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                {todo.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span
                className={`text-xs ${
                  isOverdue ? "text-red-500 font-semibold" : "text-gray-500"
                }`}
              >
                Due: {format(new Date(todo.due_date), "MMM dd, yyyy")}
                {isOverdue && " (Overdue)"}
              </span>
            </div>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            {/* Edit Button */}
            <button
              onClick={() => setShowEditModal(true)}
              disabled={loading}
              className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-blue-500"
            >
              <Edit2 className="w-4 h-4" />
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              disabled={loading}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditTodo
          todo={todo}
          onUpdate={handleUpdate}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};
