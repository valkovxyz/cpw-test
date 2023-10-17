import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import Layout from "../../components/layout";
import connectImage from '../../assets/connect-image.png'
import cyberpunksworld  from '../../assets/cyberpunksworld.svg';
import {Button} from "../../components/Button/Button";
import {useDispatch} from "react-redux";
import {setSideBarOpen} from "../../store/navigationSlice";



export const ConnectWallet: React.FC = () => {
    const [walletAddress, setWalletAddress] = useState<any>(localStorage.getItem('wallet'))
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleToggleSideBar = () => {
        dispatch(setSideBarOpen(true));
    };

    useEffect(() => {
        if (window.ethereum) {
            setWalletAddress(localStorage.getItem('wallet'))
        }
        if (walletAddress) {
            navigate('/create-hero')
        }
    }, [walletAddress]);

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
                        onClick={() => handleToggleSideBar()}
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