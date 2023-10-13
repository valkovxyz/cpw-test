import React, {useState} from "react";
import {Box} from "../Box/Box";
interface IModal {
  children?: React.ReactNode
  isOpen: boolean
  handleClose: () => void
}
export const Modal: React.FC<IModal> = ({children, isOpen, handleClose}) => {
  return (
    <>
    {isOpen ?
        <div className={'modal'} hidden={isOpen} onClick={handleClose} >
        <Box isModal={isOpen}>
          {children}
        </Box>
      </div> : '' }
    </>
  )
}