import React, { useContext, useState } from "react"; 
import Logo from "../Elements/Logo";
import Input from "../Elements/Input";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Icon from "../Elements/Icon";
import { NavLink, useNavigate } from "react-router-dom"; 
import { ThemeContext } from "../../context/themeContext";
import { AuthContext } from "../../context/authContext";
import { Backdrop, CircularProgress } from "@mui/material"; 
import { logoutService } from "../../services/authService"; 

function MainLayout(props) {
  const { children } = props;
  const navigate = useNavigate();

  const themes = [
    { name: "theme-green", bgcolor: "bg-[#299D91]", color: "#299D91" },
    { name: "theme-blue", bgcolor: "bg-[#1E90FF]", color: "#1E90FF" },
    { name: "theme-purple", bgcolor: "bg-[#6A5ACD]", color: "#6A5ACD" },
    { name: "theme-pink", bgcolor: "bg-[#DB7093]", color: "#DB7093" },
    { name: "theme-brown", bgcolor: "bg-[#8B4513]", color: "#8B4513" },
  ];

  const { theme, setTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const menu = [
    { id: 1, name: "Overview", icon: <Icon.Overview />, link: "/" },
    { id: 2, name: "Balances", icon: <Icon.Balance />, link: "/balance" },
    { id: 3, name: "Transaction", icon: <Icon.Transaction />, link: "/transaction" },
    { id: 4, name: "Bills", icon: <Icon.Bill />, link: "/bill" },
    { id: 5, name: "Expenses", icon: <Icon.Expense />, link: "/expenses" },
    { id: 6, name: "Goals", icon: <Icon.Goal />, link: "/goal" },
    { id: 7, name: "Settings", icon: <Icon.Setting />, link: "/setting" },
  ];

  // LOGIKA LOGOUT YANG DIPERBARUI
  const handleLogout = async () => {
    setOpenBackdrop(true); // 1. Aktifkan Backdrop Loading
    try {
      // 2. Panggil API Logout backend agar token hangus
      await logoutService(); 
      
      // 3. Beri jeda 1.5 detik untuk efek UX sesuai instruksi
      setTimeout(() => {
        logout(); // 4. Bersihkan state/token di client (AuthContext)
        setOpenBackdrop(false);
        navigate("/login"); // 5. Arahkan kembali ke login
      }, 1500); 
    } catch (err) {
      console.error("Logout Error:", err);
      // Fallback: Tetap logout di client jika API gagal
      logout(); 
      setOpenBackdrop(false);
      navigate("/login");
    }
  };

  return (
    <>
      <div className={`flex min-h-screen ${theme.name}`}>
        <aside className="bg-defaultBlack w-28 sm:w-64 text-special-bg2 flex flex-col justify-between px-7 py-12">
          <div>
            <div className="mb-10">
              <Logo variant="secondary" />
            </div>
            <nav>
              {menu.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  className={({ isActive }) =>
                    `flex px-4 py-3 rounded-md hover:text-white hover:font-bold hover:scale-105 ${
                    isActive
                      ? "bg-primary text-white font-bold"
                      : "hover:bg-special-bg3"
                    }`
                  }    
                >
                  <div className="mx-auto sm:mx-0">{item.icon}</div>
                  <div className="ms-3 hidden sm:block">{item.name}</div>
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div>
            <p className="text-gray-03 mb-2 hidden sm:block">Themes</p>
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              {themes.map((t) => (
                <div
                  key={t.name}
                  className={`${t.bgcolor} w-6 h-6 rounded-md cursor-pointer mb-2`}
                  onClick={() => setTheme(t)}
                ></div>
              ))}
            </div>
          </div>

          <div>
            <div 
              onClick={handleLogout} 
              className="flex bg-special-bg3 text-white px-4 py-3 rounded-md cursor-pointer hover:bg-opacity-80 transition-all"
            >
              <div className="mx-auto sm:mx-0 text-primary">
                <Icon.Logout/>    
              </div>
              <div className="ms-3 hidden sm:block">Logout</div>
            </div>
            <div className="border my-10 border-b-special-bg"></div>
            <div className="flex justify-between items-center">
              <div>Avatar</div>
              <div className="hidden sm:block">
                <div>{user.name}</div>
                <div>View Profile</div>
              </div>
              <div className="hidden sm:block">
                <Icon.Detail size={15} />
              </div>
            </div>
          </div>    
        </aside>

        <div className="bg-special-mainBg flex-1 flex flex-col">
          <header className="border border-b border-gray-05 px-6 py-7 flex justify-between items-center">
            <div className="flex items-center">
              <div className="font-bold text-2xl me-6">{user.name}</div>
              <div className="text-gray-03 flex">
                <Icon.ChevronRight size={20} />
                <span>May 19, 2023</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="me-10">
                <NotificationsIcon className="text-primary scale-110"/>
              </div>
              <Input backgroundColor="bg-white" border="border-white" />
            </div>
          </header>
          <main className="flex-1 px-6 py-4">{children}</main>
        </div>
      </div>

      {/* COMPONENT BACKDROP LOGOUT */}
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: "column",
          gap: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.7)' 
        }}
        open={openBackdrop}
      >
        <div className="flex flex-col justify-center items-center h-[60vh]">
            <CircularProgress color="inherit" size={50} enableTrackSlot />
            Logging Out
          </div>
      </Backdrop>
    </>
  );
}

export default MainLayout;