import React from "react";

interface IBoxText {
  text?: string
  children?: React.ReactNode
}

export const BoxText: React.FC<IBoxText> = ({ text, children}) => {
  return (
    <p className={'box_text'}>{text || children}</p>
  )
}