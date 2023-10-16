import React, { createContext, useContext, useState } from 'react';
import '../App.css';
import {Header} from "./Header/Header";
import {Navigation} from "./Navigation/Navigation";
interface ILayout {
    children?: React.ReactNode
    isNavOpen?: boolean
}


const NavigationContext: React.Context<boolean> = createContext(false)
const Layout: React.FC<ILayout> = ({ children, isNavOpen = false }) => {
    return (
      <NavigationContext.Provider value={isNavOpen} >
        <div className={'layout'}>
            <span className={'triangle-topleft'} />
            <div className={'container'}>
                <Header />
                <main className={'main'}>{children}</main>
            </div>
          {isNavOpen && <Navigation />}
        </div>
      </NavigationContext.Provider>

    );
};
export default Layout;




