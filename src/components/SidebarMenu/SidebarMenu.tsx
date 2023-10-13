import React from "react";
import ReactDOM from "react-dom";

interface ISidebar {
  isOpen?: boolean,
  onClose?: () => void,
  children?: React.ReactNode
}
export const SidebarMenu: React.FC<ISidebar> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen ?
        <div className={'sidebar'}> {children}</div>
        :
        ''}

    </>
  )
};