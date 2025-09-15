import { useState, useEffect } from 'react';
import { TaskService } from '@/services/taskService';
import { Modal } from 'antd';
import { getModalConfig } from '@/lib/utils';

/**
 * Hook personalizado para manejar todas las operaciones de tareas
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, contextHolder] = Modal.useModal();

  // Cargar tareas al montar el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userTasks = await TaskService.getUserTasks();
      
      setTasks(userTasks);
      if (userTasks.length > 0) {
        setSelectedTask(userTasks[0]);
      } else {
        setSelectedTask({});
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Error loading tasks. Please try again.');
      await modal.error(
        getModalConfig('Error', <p>Error loading tasks: {error.message}</p>)
      );
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const newTask = await TaskService.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      setSelectedTask(newTask);
      
      await modal.success(
        getModalConfig('Success', <p>Task created successfully</p>)
      );
      
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      await modal.error(
        getModalConfig('Error', <p>Error creating task: {error.message}</p>)
      );
      throw error;
    }
  };

  const updateTask = async (taskObject, taskData) => {
    try {
      const updatedTask = await TaskService.updateTask(taskObject, taskData);
      
      setTasks(prev => 
        prev.map(task => 
          task.key === updatedTask.id ? updatedTask : task
        )
      );
      
      setSelectedTask(updatedTask);
      
      await modal.success(
        getModalConfig('Success', <p>Task updated successfully</p>)
      );
      
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      await modal.error(
        getModalConfig('Error', <p>Error updating task: {error.message}</p>)
      );
      throw error;
    }
  };

  const deleteTask = async (taskId) => {
    const result = await modal.confirm(
      getModalConfig('Are you sure that you want to delete this task?')
    );

    if (!result) return;

    try {
      await TaskService.deleteTasks([taskId]);
      
      setTasks(prev => {
        const updatedTasks = prev.filter(task => task.key !== taskId);
        setSelectedTask(updatedTasks.length > 0 ? updatedTasks[0] : {});
        return updatedTasks;
      });

      await modal.success(
        getModalConfig('Success', <p>Task deleted successfully</p>)
      );
    } catch (error) {
      console.error('Error deleting task:', error);
      await modal.error(
        getModalConfig('Error', <p>Error deleting task: {error.message}</p>)
      );
    }
  };

  const selectTask = (task) => {
    setSelectedTask(task);
  };

  return {
    tasks,
    selectedTask,
    loading,
    error,
    contextHolder,
    createTask,
    updateTask,
    deleteTask,
    selectTask,
    refetch: fetchTasks,
  };
};