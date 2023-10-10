import React from "react";
import Layout from "../../components/layout";
import connectImage from '../../assets/connect-image.png'
import cyberpunksworld  from '../../assets/cyberpunksworld.svg';
import {Button} from "../../components/Button/Button";

export const ConnectWallet: React.FC = () => {
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