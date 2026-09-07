import { NavLink } from "react-router-dom";
import { navigationItems } from "../../data/navigation";
type NavMenuProps = {
    menuAberto: boolean;
    fecharMenu: () => void;
};
export function NavMenu({ menuAberto, fecharMenu }: NavMenuProps) {
    let menuClass = "absolute left-[5%] right-[5%] top-16 z-40 flex-col gap-2 rounded-xl border border-white/20 bg-[#3438c8]/95 p-3 shadow-card backdrop-blur-xl lg:static lg:flex lg:flex-row lg:border-0 lg:bg-transparent lg:p-0lg: shadow - none";
    if (menuAberto) {
        menuClass += " flex";
    } else {
        menuClass += " hidden lg:flex";
    }
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
                                "block rounded-full border px-4 py-2 font-extrabold transition duration-300";
                            if (isActive) {
                                return `${baseClass} border-white/35 bg-soul-yellow text-soul-ink`;
                            }
                            return `${baseClass} border-white/10 text-white hover:-translate-y-px hover:border-white/35 hover:bg-soulyellow hover:text-soul-ink`;
                        }}
                    >
                        {item.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}
