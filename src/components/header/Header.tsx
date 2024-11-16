import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import LanguageSwitcher from "../language-switcher";

const Header: React.FC = () => {
  return (
    <header className="h-16 border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl font-bold">BitBlogs</h1>
        </Link>
        <nav className="flex space-x-4">
          <NavLink to="">Home</NavLink>
          <NavLink to="write">Write</NavLink>
          <NavLink to="about">About</NavLink>
        </nav>
        <div className="space-x-6 flex items-center">
          <span>
            <Search />
          </span>

          <Link to="login">
            <Button variant="secondary">Sing in</Button>
          </Link>
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
