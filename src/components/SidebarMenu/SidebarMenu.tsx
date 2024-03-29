import React from "react";
import ReactDOM from "react-dom";
import close from "../../assets/close2.svg";
import metamask from "../../assets/metamask.svg";

interface ISidebar {
  connectWallet?: () => void,
  handleClose?: () => void,
  children?: React.ReactNode,
  isOpen?: boolean
}
export const SidebarMenu: React.FC<ISidebar> = ({ handleClose, connectWallet, isOpen }) => {
  return (
    <>
        <div className={`sidebar ${isOpen ? 'isopen' : ''}`}>
            <img src={close} alt="" onClick={handleClose} className={'sidebar_close_button'}/>
            <div className={'button_metamask'} onClick={connectWallet}>
              <img src={metamask} alt="Metamask" className={'metamask_icon'}/>
              <p className={'button_metamask_title'}>MetaMask</p>
            </div>
        </div>
    </>
  )
};