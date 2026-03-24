import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col shadow-xl z-20">
      <div className="h-16 flex items-center justify-center text-white text-2xl font-extrabold border-b border-slate-800 bg-slate-950">
        Tool<span className="text-blue-500">Bite</span> Admin
      </div>
      <div className="flex-grow py-6">
        <NavLink
          to="/admin/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center px-6 py-4 mx-4 rounded-xl font-medium transition-all duration-200 ${
              isActive 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>
      </div>
      <div className="p-6 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full px-4 py-3 text-slate-400 hover:text-white hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-all duration-200 font-medium"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
