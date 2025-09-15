"use client";
import Image from "next/image";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import Login from "@/components/ui/Login";

export default function MainPage() {
  const [open, setOpen] = useState(false);
  const items = [
    {
      key: "home",
      label: `Home`,
    },
    {
      key: "aboutme",
      label: `About me`,
    },
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout className="min-h-screen flex flex-col">
        <Login open={open} setOpen={setOpen} />
        {/* 🎨 Header con gradiente moderno */}
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
              <h1 className="text-white text-2xl font-bold hidden md:block">
                TooDoo
              </h1>
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["home"]}
              items={items}
              className="bg-transparent border-none flex-1 justify-center hidden md:flex"
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: 'none'
              }}
              itemStyle={{
                color: 'white',
                fontWeight: '500'
              }}
            />
            <button
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1.5 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm border border-white border-opacity-30 hover:scale-105 text-sm whitespace-nowrap"
              onClick={() => setOpen(true)}
            >
              Iniciar Sesión
            </button>
          </div>
        </Header>
        
        {/* 🎨 Hero Section */}
        <Content className="flex-grow">
          <div className="relative overflow-hidden">
            {/* Background decorativo */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
              {/* Hero Section */}
              <div className="text-center mb-20 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
                  Organiza tu
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> vida</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  TooDoo es tu compañero perfecto para gestionar tareas, aumentar la productividad 
                  y alcanzar tus objetivos diarios.
                </p>
                <button
                  onClick={() => setOpen(true)}
                  className="gradient-bg text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Comenzar gratis
                </button>
              </div>

              {/* Features Section */}
              <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Feature 1 */}
                <div className="animate-fade-in-up space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">Gestión Intuitiva</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Crea, edita y organiza tus tareas con una interfaz limpia y moderna. 
                    Todo diseñado para que puedas enfocarte en lo que realmente importa.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-4 card-hover">
                      <div className="text-green-600 font-semibold">✓ Fácil de usar</div>
                    </div>
                    <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-4 card-hover">
                      <div className="text-green-600 font-semibold">✓ Sin complicaciones</div>
                    </div>
                  </div>
                </div>
                
                <div className="animate-slide-in-right">
                  <div className="card-hover bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                    <Image
                      src="/toodoologo.png"
                      alt="TooDoo App Preview"
                      width={400}
                      height={400}
                      className="rounded-xl w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="grid md:grid-cols-2 gap-16 items-center mt-20">
                <div className="animate-slide-in-right order-2 md:order-1">
                  <div className="card-hover bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                    <Image
                      src="/toodoologo.png"
                      alt="TooDoo Features"
                      width={400}
                      height={400}
                      className="rounded-xl w-full"
                    />
                  </div>
                </div>
                
                <div className="animate-fade-in-up space-y-6 order-1 md:order-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">Organización Inteligente</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Utiliza tags personalizables para categorizar tus tareas. 
                    Encuentra lo que necesitas al instante y mantén todo perfectamente organizado.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700">Tags personalizables</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Búsqueda instantánea</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Categorización automática</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
        
        {/* 🎨 Footer modernizado */}
        <Footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Image
                src="/toodoologowhite.png"
                alt="TooDoo Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold">TooDoo</span>
            </div>
            <p className="text-gray-400 mb-4">
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
    </>
  );
}
