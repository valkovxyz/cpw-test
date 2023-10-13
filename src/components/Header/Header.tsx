import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import '../../App.css';
import logo from '../../assets/img/logo.png';
import menu from '../../assets/img/menu.png';
import wallet from '../../assets/wallet.svg'
import statusCirce from '../../assets/statusCircle.png'
import arbitrum from '../../assets/Arbitrum.svg'
import avatar from '../../assets/Avatar.svg'
import dropdownIcon from '../../assets/List.svg'
import close from '../../assets/close2.svg'
import inventory from '../../assets/folder.svg'
import settings from '../../assets/setting.svg'
import bridge from '../../assets/bridge.svg'
import language from '../../assets/language.svg'
import cybernet from '../../assets/cybernet.svg'
import {DropdownItem} from "../DropdownItem/DropdownItem";
import {connectWallet} from "../../utils/connectWallet";
import {SidebarMenu} from "../SidebarMenu/SidebarMenu";
import metamask from "../../assets/metamask.svg";


export const Header: React.FC = () => {
  const [sessionWallet, setSessionSessionWallet] = useState<string>('')
  const [truncatedWallet, setTruncatedWallet] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const truncateString = () => {
    if (sessionWallet) {
      const value: string = `${sessionWallet.substring(0, 5)}....${sessionWallet.substring(sessionWallet.length - 4)}`;
      setTruncatedWallet(value)
    }
  }

  const handleConnectWallet = async () => {
    await connectWallet()
    navigate('/create-hero')
  }

  useEffect(() => {
    const walletFromLocalStorage = localStorage.getItem('wallet');
    if (walletFromLocalStorage !== null) {
      setSessionSessionWallet(walletFromLocalStorage);
    }
    truncateString()
  }, [sessionWallet]);
  return (
    <>
      <header className={'header'}>
        <div className={'header_title'}>
          <img src={menu} alt='menu'/>
          <img src={logo} alt='logo'/>
        </div>
        <div className={'header_wallet'}>
          <div className={'header_wallet_score'}>
            <img src={statusCirce} alt={'Status'} className={'status_circle'}/>
            4302932921
          </div>
          {sessionWallet ?
            <div className={`header_wallet_dropdown ${isOpen ? 'dropdown_open' : ''}`}
                 onClick={() => setIsOpen(!isOpen)}>
              <img src={arbitrum} alt="Arbitrum"/>
              {truncatedWallet}
              {isOpen
                ? <img src={close} alt="Close" className={'dropdown_icon'}/>
                : <img src={dropdownIcon} alt="Menu" className={'dropdown_icon'}/>
              }
              {isOpen
                ? <div className={'dropdown_menu'}>
                  <div className={'dropdown_section'}>
                    <DropdownItem img={wallet} text={'Session Wallet'}/>
                    <DropdownItem img={inventory} text={'Inventory'}/>
                    <DropdownItem img={settings} text={'Setting'}/>
                    <DropdownItem img={bridge} text={'Bridge'}/>
                    <DropdownItem img={language} text={'Language'}/>
                  </div>
                  <div className={'dropdown_section'}>
                    <DropdownItem img={cybernet} text={'Arbitrum'}/>
                    <DropdownItem img={cybernet} text={'Arbitrum Goerli'}/>
                    <DropdownItem img={arbitrum} text={'Cybernet L3'}/>
                  </div>
                </div>
                : ''
              }
            </div>

            :
            <div className={'header_wallet_connect'} onClick={() => setIsSidebarOpen(!isOpen)}>
              Connect Wallet
            </div>
          }
          {sessionWallet ? <img src={avatar} alt="" className={'header_avatar'}/> : ''}

        </div>


      </header>
      <SidebarMenu isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(!isSidebarOpen)}>
        <img src={close} alt="" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={'sidebar_close_button'}/>
        <div className={'button_metamask'} onClick={handleConnectWallet}>
          <img src={metamask} alt="Metamask" className={'metamask_icon'}/>
          <p className={'button_metamask_title'}>MetaMask</p>
        </div>
      </SidebarMenu>
    </>
  )
}