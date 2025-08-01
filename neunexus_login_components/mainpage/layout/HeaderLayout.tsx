import { useAuthContext } from "@/contexts";
import { Icon } from "@/components/ui/Icon";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/contexts/SidebarContext";

export const HeaderLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const { toggle } = useSidebar();

  const handleLogout = async () => {
      try {
        await logout();

        navigate('/login');
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <header className="px-4 pt-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={toggle}>
            <Icon name="hamberger" ariaLabel="검색" style="w-9 h-9 text-text-base-400" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="group flex justify-center items-center w-9 h-9 bg-primary-500 hover:bg-text-contrast-500 text-text-contrast-500 rounded-full">
            <Icon name="search" ariaLabel="검색" style="w-[18px] h-[18px] text-white group-hover:text-primary-500" />
          </button>
          <button className="group flex justify-center items-center w-9 h-9 bg-primary-500 hover:bg-text-contrast-500 text-text-contrast-500 rounded-full">
            <Icon name="message" ariaLabel="검색" style="w-[18px] h-[18px] text-white group-hover:text-primary-500" />
          </button>
          <button className="group flex justify-center items-center w-9 h-9 bg-primary-500 hover:bg-text-contrast-500 text-text-contrast-500 rounded-full">
            <Icon name="bell" ariaLabel="검색" style="w-[18px] h-[18px] text-white group-hover:text-primary-500" />
          </button>
          <button 
            className="group flex justify-center items-center w-9 h-9 bg-primary-500 hover:bg-text-contrast-500 text-text-contrast-500 rounded-full"
            onClick={handleLogout}
          >
            <Icon name="exit" ariaLabel="검색" style="w-[18px] h-[18px] text-white group-hover:text-primary-500" />
          </button>
        </div>
      </div>
    </header>
  );
};