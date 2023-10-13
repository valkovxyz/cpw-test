import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import Layout from "../../components/layout";
import connectImage from '../../assets/connect-image.png'
import cyberpunksworld  from '../../assets/cyberpunksworld.svg';
import metamask from '../../assets/metamask.svg'
import {Button} from "../../components/Button/Button";
import {SidebarMenu} from "../../components/SidebarMenu/SidebarMenu";
import {connectWallet} from "../../utils/connectWallet";
import close from "../../assets/close2.svg";



export const ConnectWallet: React.FC = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [walletAddress, setWalletAddress] = useState<any>(localStorage.getItem('wallet'))
    const navigate = useNavigate();

    useEffect(() => {
        if (window.ethereum) {
            setWalletAddress(localStorage.getItem('wallet'))
        }
        if (walletAddress) {
            navigate('/create-hero')
        }
    }, [walletAddress]);

    const handleConnectWallet = async () => {
        await connectWallet()
        navigate('/create-hero')
    }

    return (
        <Layout>
            <div className={'box'}>
                <div className={'box_connect_image'}>
                    <img src={connectImage} alt="Cyberpunks world" />
                </div>
                <img src={cyberpunksworld} alt="Cyberpunks" className={'box_logo'}/>
                <div className={'box_info'}>
                    <div className={`box_info_title`}>
                       <p>Connect you wallet to Arbitrum One network to create a character and start playing <br/>
                           <a href="/" className={'box_info_link'}>(add Arbitrum One network)</a>
                       </p>
                    </div>
                </div>
                <div className={'box_buttons'}>
                    <Button
                        value={'Connect Wallet'}
                        primary={true}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    />
                    <Button
                        value={'Quick Preview'}
                        primary={false}

                    />
                </div>
            </div>
            <SidebarMenu isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(!isSidebarOpen)}>
                <img src={close} alt="" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={'sidebar_close_button'}/>
                <div className={'button_metamask'} onClick={handleConnectWallet}>
                    <img src={metamask} alt="Metamask" className={'metamask_icon'}/>
                    <p className={'button_metamask_title'}>MetaMask</p>
                </div>
            </SidebarMenu>
        </Layout>
    );
};