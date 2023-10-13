import React, { useState, useEffect } from "react";
import '../../App.css';
import logo  from '../../assets/img/logo.png';
import menu from '../../assets/img/menu.png';
import wallet from '../../assets/wallet.svg'
import statusCirce from '../../assets/statusCircle.png'
import arbitrum from '../../assets/Arbitrum.svg'
import dropdownIcon from '../../assets/List.svg'
import close from '../../assets/close2.svg'


export const Header: React.FC = () => {
    const [sessionWallet, setSessionSessionWallet] = useState<string>('')
    const [truncatedWallet, setTruncatedWallet] = useState<string>('')
    const [isOpen, setIsOpen] = useState(false)
    const truncateString = () => {
      if (sessionWallet) {
        const value: string = `${sessionWallet.substring(0, 5)}....${sessionWallet.substring(sessionWallet.length - 4)}`;
        setTruncatedWallet(value)
      }
    }
  useEffect(() => {
    const walletFromLocalStorage = localStorage.getItem('wallet');
    if (walletFromLocalStorage !== null) {
      setSessionSessionWallet(walletFromLocalStorage);
    }
    truncateString()
  }, [sessionWallet]);
    return(
        <header className={'header'}>
            <div className={'header_title'}>
                <img src={menu} alt='menu' />
                <img src={logo} alt='logo'/>
            </div>
            <div className={'header_wallet'}>
                    <div className={'header_wallet_score'}>
                        <img src={statusCirce} alt={'Status'} className={'status_circle'}/>
                        4302932921
                    </div>
              {sessionWallet ?
                <div className={`header_wallet_dropdown ${isOpen? 'dropdown_open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                  <img src={arbitrum} alt="Arbitrum"/>
                  {truncatedWallet}
                  {isOpen
                    ? <img src={close} alt="Close" className={'dropdown_icon'}/>
                    : <img src={dropdownIcon} alt="Menu" className={'dropdown_icon'}/>
                  }
                  {isOpen
                    ? <div className={'dropdown_menu'}>
                        <div className={'dropdown_section'}>
                          <div className={'dropdown_item'}>

                          </div>
                        </div>
                    </div>
                    : ''
                  }
                </div>
                :
                <div className={'header_wallet_connect'}>
                  Connect Wallet
                  <img src={wallet} alt="Wallet"/>
                </div>
              }

            </div>
        </header>
    )
}