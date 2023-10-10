import React from 'react';
import '../App.css';
import {Header} from "./Header/header";
interface MyTest {
    children?: React.ReactNode
}
const Layout: React.FC<MyTest> = ({ children }) => {
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




