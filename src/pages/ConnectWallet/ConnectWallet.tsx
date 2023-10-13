import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Layout from "../../components/layout";
import connectImage from '../../assets/connect-image.png'
import cyberpunksworld  from '../../assets/cyberpunksworld.svg';
import {Button} from "../../components/Button/Button";
import {Simulate} from "react-dom/test-utils";



export const ConnectWallet: React.FC = () => {
    const connectWallet = async () => {
        try {
            if (typeof window.ethereum === 'undefined') {
                throw new Error('MetaMask not detected. Please install MetaMask.');
            }
            if (window.ethereum.selectedAddress) {
                localStorage.setItem('wallet', window.ethereum.selectedAddress)
            }
            const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(account)
        } catch (error) {
            console.error('Error connecting wallet:', (error as Error).message);
        }
    };

    const navigate = useNavigate();
    const wallet = localStorage.getItem('wallet')
    useEffect(() => {
        if (wallet) {
            navigate('/create-hero')
        }
    }, [wallet]);

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
                        onClick={connectWallet}
                    />
                    <Button
                        value={'Quick Preview'}
                        primary={false}

                    />
                </div>
            </div>
        </Layout>
    );
};