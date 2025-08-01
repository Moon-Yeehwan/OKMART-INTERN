import { Icon } from "@/components/ui/Icon";
import type { ILeftMenuButtonProps, ISubMenuItemProps } from "@/shared/types/sidebar.types";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const textToIconMap: Record<string, string> = {
  '상품관리': 'product',
  '주문관리': 'order', 
  '서비스': 'service',
};

export const SidebarMenuButton = ({
  text,
  hasSubmenu = false,
  isActive = false,
  onClick,
  className = '',
  onMouseEnter,
  onMouseLeave,
}: ILeftMenuButtonProps) => {
  const icon = textToIconMap[text];

  const getIconSize = (name: string) => {
    switch (name) {
      case 'product':
        return 'w-5 h-5';
      case 'order':
        return 'w-7 h-7';
      case 'service':
        return 'w-6 h-6';
      default:
        return 'w-6 h-6';
    }
  };

  return (
    <button
      className={`w-[95%] text-left p-3 rounded-md transition-all duration-200 text-h4
        flex items-center gap-2 mx-auto hover:bg-fill-alt-200 group h-12 ${
        isActive && "bg-fill-alt-200"
      } ${className}`}
      onClick={onClick}
      onMouseEnter={hasSubmenu ? onMouseEnter : undefined}
      onMouseLeave={hasSubmenu ? onMouseLeave : undefined}
      type="button"
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className={`w-7 h-7 flex items-center justify-center transition-colors duration-200 ${
            isActive ? "text-primary-500" : "text-text-base-200 group-hover:text-primary-500"
          }`}>
            <Icon 
              name={icon} 
              ariaLabel={icon} 
              style={`${getIconSize(icon)} transition-colors duration-200 ${
                isActive 
                  ? "text-primary-500" 
                  : "text-text-base-200 group-hover:text-primary-500"
              }`} 
            />
          </div>
        )}
        <span className={`transition-colors duration-200 text-h4 ${
          isActive 
            ? "text-primary-500" 
            : "text-text-base-500 group-hover:text-primary-500"
        }`}>
          {text}
        </span>
      </div>
      {hasSubmenu && (
        <ChevronRight
          className={`w-6 h-6 ml-auto transition-all duration-300 ease-in-out transform
            ${
              isActive 
                ? "text-primary-500 rotate-90" 
                : "text-text-base-200 group-hover:text-primary-500 rotate-0 group-hover:rotate-90"
            }`}
        />
      )}
    </button>
  );
};

export const SubMenuItem = ({
  text,
  parentText,
  onClick,
  className
}: ISubMenuItemProps) => {
  const [subText, _setSubText] = useState(parentText || "");
  
  return (
    <button
      onClick={onClick}
      className={`group flex justify-between w-full px-5 py-2 h-12 text-left text-text-base-400 text-h4 hover:text-primary-500 hover:bg-fill-alt-200 transition-colors duration-200 mx-auto ${className}`}
    >
      {text}
      {subText === '서비스' && (
        <Icon name="redirect" ariaLabel="redirect" style="w-4 h-4 transition-colors duration-200 group-hover:text-primary-500" />
      )}
    </button>
  );
};