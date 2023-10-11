import React, {useState} from "react";
import Layout from "../../components/layout";
import connectImage from '../../assets/connect-image.png'
import cyberpunksworld  from '../../assets/cyberpunksworld.svg';
import {Button} from "../../components/Button/Button";



export const ConnectWallet: React.FC = () => {

    const [isWalletConnected, setIsWalletConnected] = useState(false);

    const connectWallet = async () => {
        try {
            if (typeof window.ethereum === 'undefined') {
                throw new Error('MetaMask not detected. Please install MetaMask.');
            }

            if (window.ethereum.selectedAddress) {
                // MetaMask is connected, and you have access to the selected address
                console.log('MetaMask is connected:', window.ethereum.selectedAddress);
            }
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts)
            if (accounts.length > 0) {
                const userAddress = accounts[0];
                setIsWalletConnected(true);
                // Store userAddress or perform other actions
            } else {
                // Handle user denial
            }
        } catch (error) {
            console.error('Error connecting wallet:', (error as Error).message);
        }
    };

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