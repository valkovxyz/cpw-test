import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {Header} from "./Header/Header";
import {Navigation} from "./Navigation/Navigation";
import {RootState} from "../store/store";
import '../App.css';
import {SidebarMenu} from "./SidebarMenu/SidebarMenu";
import {connectWallet} from "../utils/connectWallet";
import { setNavOpen, setSideBarOpen } from '../store/navigationSlice';

interface ILayout {
  children?: React.ReactNode
}

const Layout: React.FC<ILayout> = ({children}) => {

  const navigate = useNavigate()
  const handleConnectWallet = async () => {
    await connectWallet()
    if (localStorage.getItem('wallet')) {
    navigate('/create-hero')
    }
    dispatch(setSideBarOpen(!isSideBarOpen));
  }

  const isNavOpen = useSelector((state: RootState) => state.navigation.isNavOpen);
  const isSideBarOpen = useSelector((state: RootState) => state.navigation.isSideBarOpen);
  const dispatch = useDispatch();

  const handleToggleNav = () => {
    dispatch(setNavOpen(!isNavOpen));
  };
  const handleToggleSideBar = () => {
    dispatch(setSideBarOpen(!isSideBarOpen));
  };

  return (
    <div className={'layout'}>
      <span className={'triangle-topleft'}/>
      <div className={'container'}>
        <Header/>
        <main className={'main'}>{children}</main>
      </div>
      <Navigation isActive={isNavOpen} handleClose={() => handleToggleNav()}/>
      <SidebarMenu
              isOpen={isSideBarOpen}
              connectWallet={() => handleConnectWallet()}
              handleClose={() => {handleToggleSideBar()}}
          />
    </div>
  );
};
export default Layout;




