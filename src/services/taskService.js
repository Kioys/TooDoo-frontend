import Parse from "parse";

/**
 * Servicio para manejar todas las operaciones relacionadas con tareas
 */
export class TaskService {
  /**
   * Obtener todas las tareas del usuario actual
   */
  static async getUserTasks() {
    const Task = Parse.Object.extend("Task");
    const query = new Parse.Query(Task);
    query.equalTo("user", Parse.User.current());
    query.descending("createdAt");
    
    const results = await query.find();
    
    return results.map(result => ({
      parseObject: result,
      id: result.id,
      key: result.id,
      title: result.get("title"),
      createdAt: result.get("createdAt"),
      tags: result.get("tags") || [],
      content: result.get("content"),
    }));
  }

  /**
   * Crear una nueva tarea
   */
  static async createTask({ title, content, tags }) {
    const Task = Parse.Object.extend("Task");
    const task = new Task();
    const user = Parse.User.current();
    
    task.set({ title, content, tags, user });
    task.setACL(new Parse.ACL(user));
    
    const savedTask = await task.save();
    
    return {
      parseObject: savedTask,
      id: savedTask.id,
      key: savedTask.id,
      title: savedTask.get("title"),
      createdAt: savedTask.get("createdAt"),
      tags: savedTask.get("tags"),
      content: savedTask.get("content"),
    };
  }

  /**
   * Actualizar una tarea existente
   */
  static async updateTask(taskObject, { title, content, tags }) {
    taskObject.set({ title, content, tags });
    const updatedTask = await taskObject.save();
    
    return {
      parseObject: updatedTask,
      id: updatedTask.id,
      key: updatedTask.id,
      title: updatedTask.get("title"),
      createdAt: updatedTask.get("createdAt"),
      tags: updatedTask.get("tags"),
      content: updatedTask.get("content"),
    };
  }

  /**
   * Eliminar tareas por IDs
   */
  static async deleteTasks(taskIds) {
    const query = new Parse.Query("Task");
    query.containedIn("objectId", taskIds);
    
    const tasks = await query.find();
    
    if (tasks.length === 0) {
      throw new Error("No tasks found");
    }
    
    return Parse.Object.destroyAll(tasks);
  }
}