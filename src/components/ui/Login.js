"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Drawer,
  Form,
  Input,
  Tabs,
  Checkbox,
  Flex,
  Alert,
} from "antd";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Login({ open, setOpen }) {
  const [selectedTab, setSelectedTab] = useState("login");

  const onClose = () => {
    setOpen(false);
  };

  const items = [
    {
      label: `Iniciar Sesión`,
      key: "login",
      children: <LoginTab setSelectedTab={setSelectedTab} />,
    },
    {
      label: `Registrarse`,
      key: "register",
      children: <RegisterTab />,
    },
  ];

  return (
    <>
      <Drawer
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        className="modern-drawer"
      >
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 -m-6 mb-6 p-8 rounded-b-3xl">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Bienvenido a TooDoo!</h1>
            <p className="text-gray-600">Tu compañero para la productividad</p>
          </div>
        </div>
        
        <Tabs
          defaultActiveKey={selectedTab}
          activeKey={selectedTab}
          onTabClick={(key) => {
            setSelectedTab(key);
          }}
          type="card"
          size="large"
          items={items}
          className="modern-tabs"
          tabBarStyle={{
            marginBottom: '2rem',
            borderRadius: '12px',
            background: '#f8fafc',
            padding: '4px',
          }}
        />
      </Drawer>
    </>
  );
}

const LoginTab = ({ setSelectedTab }) => {
  const { login, isLoading, error, clearError } = useAuth();
  const [form] = Form.useForm();

  // Limpiar errores cuando se cambia de tab
  useEffect(() => {
    clearError();
  }, [clearError]);

  const onFinish = async (values) => {
    try {
      await login(values.username, values.password);
      // El contexto maneja el estado global, no necesitamos recargar
    } catch (error) {
      // El error ya se maneja en el contexto
    }
  };

  return (
    <div className="px-8">
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        layout="vertical"
        className="space-y-4"
      >
        {error && (
          <Alert 
            message={error} 
            type="error" 
            className="mb-4 rounded-lg"
            showIcon
          />
        )}
        
        <Form.Item
          name="username"
          label={<span className="text-gray-700 font-semibold">Usuario</span>}
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu nombre de usuario",
            },
          ]}
        >
          <Input 
            prefix={<UserOutlined className="text-gray-400" />} 
            placeholder="Nombre de usuario"
            className="h-12 rounded-xl"
            disabled={isLoading}
          />
        </Form.Item>
        
        <Form.Item
          name="password"
          label={<span className="text-gray-700 font-semibold">Contraseña</span>}
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu contraseña",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Contraseña"
            className="h-12 rounded-xl"
            disabled={isLoading}
          />
        </Form.Item>
        
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox disabled={isLoading}>Recordarme</Checkbox>
            </Form.Item>
            <a href="#" className="text-blue-500 hover:text-blue-600">
              ¿Olvidaste tu contraseña?
            </a>
          </Flex>
        </Form.Item>

        <Form.Item className="mb-0">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="loading-spinner w-5 h-5"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
            )}
            <span>{isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}</span>
          </button>
          
          <div className="text-center mt-4">
            <span className="text-gray-600">¿No tienes cuenta? </span>
            <button
              type="button"
              onClick={() => setSelectedTab("register")}
              className="text-blue-500 hover:text-blue-600 font-semibold"
              disabled={isLoading}
            >
              Regístrate aquí
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

const RegisterTab = () => {
  const { register, isLoading, error, clearError } = useAuth();
  const [form] = Form.useForm();

  // Limpiar errores cuando se monta el componente
  useEffect(() => {
    clearError();
  }, [clearError]);

  const onFinish = async (values) => {
    try {
      await register({
        username: values.nickname,
        email: values.email,
        password: values.password,
      });
      // El contexto maneja el estado global, no necesitamos recargar
    } catch (error) {
      // El error ya se maneja en el contexto
    }
  };

  return (
    <div className="px-8">
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        layout="vertical"
        className="space-y-4"
        scrollToFirstError
      >
        {error && (
          <Alert 
            message={error} 
            type="error" 
            className="mb-4 rounded-lg"
            showIcon
          />
        )}
        
        <Form.Item
          name="email"
          label={<span className="text-gray-700 font-semibold">Email</span>}
          rules={[
            {
              type: "email",
              message: "Ingresa un email válido",
            },
            {
              required: true,
              message: "Por favor ingresa tu email",
            },
          ]}
        >
          <Input 
            placeholder="tu@email.com"
            className="h-12 rounded-xl"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          name="nickname"
          label={<span className="text-gray-700 font-semibold">Nombre de usuario</span>}
          rules={[
            {
              required: true,
              message: "Por favor ingresa un nombre de usuario",
              whitespace: true,
            },
          ]}
        >
          <Input 
            placeholder="Tu nombre de usuario"
            className="h-12 rounded-xl"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span className="text-gray-700 font-semibold">Contraseña</span>}
          rules={[
            {
              required: true,
              min: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          ]}
          hasFeedback
        >
          <Input.Password 
            placeholder="Contraseña (mínimo 6 caracteres)"
            className="h-12 rounded-xl"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label={<span className="text-gray-700 font-semibold">Confirmar Contraseña</span>}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Por favor confirma tu contraseña",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contraseñas no coinciden")
                );
              },
            }),
          ]}
        >
          <Input.Password 
            placeholder="Confirma tu contraseña"
            className="h-12 rounded-xl"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Debes aceptar los términos")),
            },
          ]}
        >
          <Checkbox disabled={isLoading}>
            He leído y acepto los{" "}
            <a href="#" className="text-blue-500 hover:text-blue-600">
              términos y condiciones
            </a>
          </Checkbox>
        </Form.Item>
        
        <Form.Item className="mb-0">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="loading-spinner w-5 h-5"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            )}
            <span>{isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}</span>
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};
