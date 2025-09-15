"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { TaskService } from '@/services/taskService';
import { Modal } from 'antd';
import { getModalConfig } from '@/lib/utils';
import { useAuth } from './AuthContext';

// Crear el contexto
const TaskContext = createContext(null);

// Provider del contexto
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modal, contextHolder] = Modal.useModal();
  
  const { user, isAuthenticated } = useAuth();

  // Función para cargar tareas
  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setTasks([]);
      setSelectedTask({});
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const userTasks = await TaskService.getUserTasks();
      
      setTasks(userTasks);
      if (userTasks.length > 0) {
        setSelectedTask(userTasks[0]);
      } else {
        setSelectedTask({});
      }
      
      console.log(`✅ Loaded ${userTasks.length} tasks`);
    } catch (error) {
      console.error('❌ Error fetching tasks:', error);
      setError('Error loading tasks. Please try again.');
      await modal.error(
        getModalConfig('Error', <p>Error loading tasks: {error.message}</p>)
      );
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user, modal]);

  // Crear nueva tarea
  const createTask = async (taskData) => {
    try {
      setIsLoading(true);
      const newTask = await TaskService.createTask(taskData);
      
      setTasks(prev => [newTask, ...prev]);
      setSelectedTask(newTask);
      
      await modal.success(
        getModalConfig('Éxito', <p>Tarea creada exitosamente</p>)
      );
      
      console.log('✅ Task created:', newTask.title);
      return newTask;
    } catch (error) {
      console.error('❌ Error creating task:', error);
      await modal.error(
        getModalConfig('Error', <p>Error creating task: {error.message}</p>)
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Actualizar tarea
  const updateTask = async (taskObject, taskData) => {
    try {
      setIsLoading(true);
      const updatedTask = await TaskService.updateTask(taskObject, taskData);
      
      setTasks(prev => 
        prev.map(task => 
          task.key === updatedTask.id ? updatedTask : task
        )
      );
      
      setSelectedTask(updatedTask);
      
      await modal.success(
        getModalConfig('Éxito', <p>Tarea actualizada exitosamente</p>)
      );
      
      console.log('✅ Task updated:', updatedTask.title);
      return updatedTask;
    } catch (error) {
      console.error('❌ Error updating task:', error);
      await modal.error(
        getModalConfig('Error', <p>Error updating task: {error.message}</p>)
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar tarea
  const deleteTask = async (taskId) => {
    const result = await modal.confirm(
      getModalConfig('¿Estás seguro de que quieres eliminar esta tarea?')
    );

    if (!result) return;

    try {
      setIsLoading(true);
      await TaskService.deleteTasks([taskId]);
      
      setTasks(prev => {
        const updatedTasks = prev.filter(task => task.key !== taskId);
        setSelectedTask(updatedTasks.length > 0 ? updatedTasks[0] : {});
        return updatedTasks;
      });

      await modal.success(
        getModalConfig('Éxito', <p>Tarea eliminada exitosamente</p>)
      );
      
      console.log('✅ Task deleted');
    } catch (error) {
      console.error('❌ Error deleting task:', error);
      await modal.error(
        getModalConfig('Error', <p>Error deleting task: {error.message}</p>)
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Seleccionar tarea
  const selectTask = (task) => {
    setSelectedTask(task);
  };

  // Limpiar errores
  const clearError = () => {
    setError(null);
  };

  // Valor del contexto
  const value = {
    tasks,
    selectedTask,
    isLoading,
    error,
    contextHolder,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    selectTask,
    clearError,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

// Hook para usar el contexto
export function useTasks() {
  const context = useContext(TaskContext);
  
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  
  return context;
}