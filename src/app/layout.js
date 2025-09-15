import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { TaskProvider } from "@/contexts/TaskContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TooDoo - Tu compañero para la productividad",
  description: "Organiza tu vida con TooDoo, la aplicación perfecta para gestionar tus tareas diarias",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <TaskProvider>
            {children}
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
