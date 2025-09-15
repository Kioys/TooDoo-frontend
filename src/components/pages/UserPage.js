"use client";
import Image from "next/image";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {
  Typography,
  Layout,
  theme,
  Table,
  Tag,
  ConfigProvider,
  Modal,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { useState, useEffect } from "react";
import { useTasks } from "@/contexts/TaskContext";
import { useAuth } from "@/contexts/AuthContext";
import TaskForm from "@/components/forms/TaskForm";

const { Title } = Typography;

export default function UserPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Usar los contextos
  const {
    tasks,
    selectedTask,
    isLoading,
    contextHolder,
    createTask,
    updateTask,
    deleteTask,
    selectTask,
    fetchTasks,
  } = useTasks();

  const { user, logout } = useAuth();

  // Cargar tareas cuando el componente se monta
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Manejar responsive
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const columns = [
    {
      title: "Tarea",
      dataIndex: "title",
      width: 200,
      key: "title",
      render: (taskName, record) => (
        <div
          className="cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => selectTask(record)}
        >
          <a>{taskName}</a>
        </div>
      ),
    },
    {
      title: "Creada",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        const date = new Date(createdAt);
        const formattedDate = date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        return <>{formattedDate}</>;
      },
    },
    {
      title: "Etiquetas",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags?.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "urgente") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const handleCreateTask = async (taskData) => {
    await createTask(taskData);
    setIsNewTaskModalOpen(false);
  };

  const handleUpdateTask = async (taskData) => {
    if (selectedTask.parseObject) {
      await updateTask(selectedTask.parseObject, taskData);
      setIsUpdateTaskModalOpen(false);
    }
  };

  const handleDeleteTask = async () => {
    if (selectedTask.key) {
      await deleteTask(selectedTask.key);
    }
  };

  return (
    <>
      <Layout className="min-h-screen flex flex-col">
        {/* Header modernizado */}
        <Header className="gradient-bg shadow-lg">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-4">
              <Image
                src="/toodoologowhite.png"
                alt="logo toodoo app"
                width={60}
                height={60}
                className="rounded-lg transition-transform hover:scale-105"
              />
              <h1 className="text-white text-xl font-bold hidden md:block">
                TooDoo
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white font-medium hidden sm:block">
                Hola, {user?.get("username")}
              </span>
              <button
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white border-opacity-30 hover:scale-105 flex items-center space-x-2"
                onClick={logout}
                title="Cerrar Sesión"
              >
                <LogoutOutlined className="text-base" />
                <span className="hidden sm:inline text-sm font-medium">Salir</span>
              </button>
            </div>
          </div>
        </Header>

        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            breakpoint="sm"
            collapsedWidth={"0"}
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={500}
            className="bg-white shadow-xl"
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-center">
              <Title
                level={2}
                className="text-white m-0 animate-fade-in-up"
                style={{ visibility: collapsed ? "hidden" : "visible", color: 'white' }}
              >
                📋 Mis Tareas
              </Title>
            </div>
            
            <div className="p-4 space-y-4" style={{ visibility: collapsed ? "hidden" : "visible" }}>
              <div className="grid grid-cols-1 gap-3">
                <button
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2"
                  onClick={() => setIsNewTaskModalOpen(true)}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  <span>Nueva Tarea</span>
                </button>
                
                <button
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setIsUpdateTaskModalOpen(true)}
                  disabled={!selectedTask.key || isLoading}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  <span>Editar</span>
                </button>
                
                <button
                  className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleDeleteTask}
                  disabled={!selectedTask.key || isLoading}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  <span>Eliminar</span>
                </button>
              </div>

              {tasks.length > 0 && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mt-6 card-hover">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{tasks.length}</div>
                    <div className="text-gray-600 text-sm">Tareas totales</div>
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex flex-col justify-center items-center py-8">
                  <div className="loading-spinner mb-3"></div>
                  <p className="text-gray-600 text-sm">Cargando tareas...</p>
                </div>
              )}

              {!isLoading && tasks.length === 0 && (
                <div className="text-center py-8 animate-fade-in-up">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">¡Comienza tu productividad!</h3>
                  <p className="text-gray-500 text-sm">Crea tu primera tarea para empezar</p>
                </div>
              )}

              {/* Tabla de tareas con estilos mejorados */}
              {!isLoading && tasks.length > 0 && (
                <ConfigProvider
                  theme={{
                    components: {
                      Table: {
                        headerBorderRadius: 12,
                        borderColor: '#e2e8f0',
                        headerBg: '#f8fafc',
                        rowSelectedBg: '#e0f2fe', // Color suave azul claro para fila seleccionada
                        rowSelectedHoverBg: '#b3e5fc', // Hover más suave
                      },
                    },
                    token: {
                      colorPrimary: '#8b5cf6', // Color primario púrpura
                    },
                  }}
                >
                  <Table
                    dataSource={tasks}
                    columns={columns}
                    pagination={false}
                    size="middle"
                    className="shadow-lg rounded-xl overflow-hidden"
                    rowSelection={{
                      type: 'radio',
                      selectedRowKeys: selectedTask.key ? [selectedTask.key] : [],
                      onSelect: (record) => selectTask(record),
                      renderCell: (checked, record, index, originNode) => {
                        return (
                          <div className="flex items-center justify-center">
                            <div
                              className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                                checked 
                                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 border-purple-500' 
                                  : 'border-gray-300 hover:border-purple-400'
                              }`}
                            >
                              {checked && (
                                <div className="w-full h-full flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      },
                    }}
                  />
                </ConfigProvider>
              )}
            </div>

            <Modal
              title={
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  <span className="text-lg font-semibold">Crear Nueva Tarea</span>
                </div>
              }
              open={isNewTaskModalOpen}
              destroyOnClose={true}
              onCancel={() => setIsNewTaskModalOpen(false)}
              footer={null}
              className="modern-modal"
              width={600}
            >
              <TaskForm
                onSubmit={handleCreateTask}
                onCancel={() => setIsNewTaskModalOpen(false)}
                loading={isLoading}
              />
            </Modal>

            <Modal
              title={
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  <span className="text-lg font-semibold">Editar Tarea</span>
                </div>
              }
              open={isUpdateTaskModalOpen}
              destroyOnClose={true}
              onCancel={() => setIsUpdateTaskModalOpen(false)}
              footer={null}
              className="modern-modal"
              width={600}
            >
              <TaskForm
                onSubmit={handleUpdateTask}
                onCancel={() => setIsUpdateTaskModalOpen(false)}
                taskToEdit={selectedTask}
                loading={isLoading}
              />
            </Modal>
          </Sider>
          
          <Layout
            style={{
              visibility: !collapsed && isMobile ? "hidden" : "visible",
            }}
          >
            <Content className="p-6 m-4">
              {selectedTask.title ? (
                <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in-up max-w-4xl mx-auto">
                  <div className="border-b border-gray-200 pb-6 mb-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-3">
                          {selectedTask.title}
                        </h1>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z"></path>
                            </svg>
                            <span>Creada: {new Date(selectedTask.createdAt).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedTask.tags && selectedTask.tags.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">ETIQUETAS</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTask.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="prose max-w-none">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">DESCRIPCIÓN</h3>
                    <div className="bg-gray-50 rounded-xl p-6 text-gray-800 leading-relaxed">
                      {selectedTask.content || (
                        <span className="text-gray-400 italic">Sin descripción disponible</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex justify-end space-x-3">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50"
                        onClick={() => setIsUpdateTaskModalOpen(true)}
                        disabled={isLoading}
                      >
                        Editar tarea
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50"
                        onClick={handleDeleteTask}
                        disabled={isLoading}
                      >
                        Eliminar tarea
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center animate-fade-in-up max-w-md mx-auto">
                    <div className="text-8xl mb-6">📋</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Selecciona una tarea
                    </h2>
                    <p className="text-gray-500 leading-relaxed">
                      Elige una tarea de la lista para ver los detalles aquí, 
                      o crea una nueva para comenzar.
                    </p>
                    <button
                      className="mt-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                      onClick={() => setIsNewTaskModalOpen(true)}
                      disabled={isLoading}
                    >
                      Crear mi primera tarea
                    </button>
                  </div>
                </div>
              )}
            </Content>
          </Layout>
        </Layout>
        
        <Footer className="bg-gray-900 text-white">
          <div className="text-center py-4">
            <p className="text-gray-400 mb-2">
              Hecho con ❤️ para aumentar tu productividad
            </p>
            <a
              href="https://www.linkedin.com/in/matias-arratibel/"
              target="_blank"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium"
            >
              Matias Arratibel
            </a>
            <span className="text-gray-500 ml-2">©{new Date().getFullYear()}</span>
          </div>
        </Footer>
      </Layout>
      {contextHolder}
    </>
  );
}
