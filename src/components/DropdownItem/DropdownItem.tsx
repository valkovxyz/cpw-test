import React from "react";
import wallet from "../../assets/wallet.svg";

interface IDropdownItem {
  img: string,
  text: string
}
export const DropdownItem: React.FC<IDropdownItem> = ({img, text}) => {
  return (
    <div className={'dropdown_item'}>
      <img src={img} alt=""/>
      <p className={'dropdown_item_text'}>{text}</p>
    </div>
  )
}