import React, { useState } from "react";
import '../../App.css';
import logo  from '../../assets/img/logo.png';
import menu from '../../assets/img/menu.png';
import wallet from '../../assets/wallet.svg'
import statusCirce from '../../assets/statusCircle.png'
export const Header: React.FC = () => {
    const isConnected = useState(false)

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
                    <div className={'header_wallet_connect'}>
                        Connect Wallet
                        <img src={wallet} alt="Wallet"/>
                    </div>
            </div>
        </header>
    )
}