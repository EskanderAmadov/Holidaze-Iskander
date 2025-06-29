import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VenueDetail from "./pages/VenueDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreateVenue from "./pages/CreateVenue";
import EditVenue from "./pages/EditVenue";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import About from "./pages/About";
import VenuesPage from "./pages/VenuesPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/venues" element={<MainLayout><VenuesPage /></MainLayout>} />
      <Route path="/venue/:id" element={<MainLayout><VenueDetail /></MainLayout>} />
      <Route path="/about" element={<MainLayout><About /></MainLayout>} />
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/register" element={<MainLayout><Register /></MainLayout>} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute requireManager>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/venue/create"
        element={
          <ProtectedRoute requireManager>
            <AdminLayout>
              <CreateVenue />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/venue/edit/:id"
        element={
          <ProtectedRoute requireManager>
            <AdminLayout>
              <EditVenue />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<MainLayout><h1>404 - Page Not Found</h1></MainLayout>} />
    </Routes>
  );
}

export default AppRoutes;
