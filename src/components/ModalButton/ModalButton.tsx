import React from "react";
import info from "../../assets/Info.svg";

interface IModalButton {
  text?: string,
  handleClick: () => void
}
export const ModalButton: React.FC<IModalButton> = ({text, handleClick}) => {
  return (
    <div className={'modal_button'} onClick={handleClick}>
      <img src={info} alt="Info"/>
      <p className={'box_text'}>
        {text}
      </p>
    </div>
  )
}