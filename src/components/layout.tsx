import React from 'react';
import '../App.css';
import {Header} from "./Header/Header";
interface ILayout {
    children?: React.ReactNode
}
const Layout: React.FC<ILayout> = ({ children }) => {
    return (
        <div className={'layout'}>
            <span className={'triangle-topleft'} />
            <div className={'container'}>
                <Header />
                <main className={'main'}>{children}</main>
            </div>
        </div>
    );
};
export default Layout;




