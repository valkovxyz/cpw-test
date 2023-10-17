import React from "react";
interface IBox {
    children?: React.ReactNode,
    isWallet?: boolean,
    isLarge?: boolean,
    isModal?: boolean
}
export const Box: React.FC<IBox> = ({children, isWallet, isLarge, isModal}) => {
    return (
        <div onClick={(e) => e.stopPropagation()} className={`box ${isWallet? 'wallet': ''} ${isLarge? 'large' : ''}  ${isModal? 'box_modal' : ''}`}>
            {children}
        </div>
    )
}