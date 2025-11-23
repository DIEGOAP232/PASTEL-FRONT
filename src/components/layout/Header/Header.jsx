import TopBar from "./TopBar";
import NavMenu from "./NavMenu";
import "./Header.css";

function Header() {
  return (
    <header className="header-container">
      <TopBar />
      <NavMenu />
    </header>
  );
}

export default Header;
