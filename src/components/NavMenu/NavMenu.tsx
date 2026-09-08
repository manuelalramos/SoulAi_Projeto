import { NavLink } from "react-router-dom";
import { navigationItems } from "../../data/navigation";

type NavMenuProps = {
  menuAberto: boolean;
  fecharMenu: () => void;
};

export function NavMenu({ menuAberto, fecharMenu }: NavMenuProps) {
  const menuClass = menuAberto
    ? "absolute left-[5%] right-[5%] top-16 z-40 flex flex-col gap-2 rounded-xl bg-[#3438c8]/95 p-3 shadow-card backdrop-blur-xl lg:static lg:flex lg:flex-row lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none"
    : "absolute left-[5%] right-[5%] top-16 z-40 hidden flex-col gap-2 rounded-xl bg-[#3438c8]/95 p-3 shadow-card backdrop-blur-xl lg:static lg:flex lg:flex-row lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none";

  return (
    <ul className={menuClass}>
      {navigationItems.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            end={item.path === "/"}
            onClick={fecharMenu}
            className={({ isActive }) => {
              const baseClass =
                "relative z-0 block overflow-hidden rounded-full px-4 py-2 font-extrabold transition duration-300 before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-gradient-to-r before:from-soul-yellow before:to-[#fff5bd] before:transition-transform before:duration-300 before:content-[''] hover:-translate-y-1 hover:text-soul-ink hover:before:scale-y-100";

              if (isActive) {
                return `${baseClass} text-soul-ink before:scale-y-100`;
              }

              return `${baseClass} text-white`;
            }}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}