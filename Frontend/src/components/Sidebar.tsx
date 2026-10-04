interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const menus = [
  "Dashboard",
  "Phòng",
  "Đặt phòng",
  "Khách hàng",
  "Thanh toán",
  "Dịch vụ",
  "Báo cáo",
  "Cài đặt",
];

function Sidebar({
  activeMenu,
  setActiveMenu,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="logo">
        HOMESTAY
      </div>

      <div className="menu-list">
        {menus.map((menu) => (
          <button
            key={menu}
            className={`menu ${
              activeMenu === menu ? "active" : ""
            }`}
            onClick={() => setActiveMenu(menu)}
          >
            {menu}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;