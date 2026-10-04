interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header className="header">
      <div>
        <h1>{title}</h1>
        <span>Hệ thống quản lý Homestay</span>
      </div>

      <div className="user">
        <div className="avatar">
          AD
        </div>

        <span>Administrator</span>
      </div>
    </header>
  );
}

export default Header;