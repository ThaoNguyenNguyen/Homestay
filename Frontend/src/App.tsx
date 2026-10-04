import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import "./index.css";
import Bookings from "./pages/Bookings";

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  return (
    <div className="app">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <main className="main">
        <Header title={activeMenu} />

        {activeMenu === "Dashboard" && <Dashboard />}

        {activeMenu === "Phòng" && <Rooms />}

        {activeMenu === "Đặt phòng" && <Bookings />}

        {activeMenu === "Khách hàng" && <div>Quản lý khách hàng</div>}

        {activeMenu === "Thanh toán" && <div>Quản lý thanh toán</div>}

        {activeMenu === "Dịch vụ" && <div>Quản lý dịch vụ</div>}

        {activeMenu === "Báo cáo" && <div>Báo cáo</div>}

        {activeMenu === "Cài đặt" && <div>Cài đặt</div>}
      </main>
    </div>
  );
}

export default App;
