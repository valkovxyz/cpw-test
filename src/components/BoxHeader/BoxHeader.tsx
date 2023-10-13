import React from "react";
import close from '../../assets/close.svg'
import info from '../../assets/Info.svg'

interface IBoxHeader {
  title: string,
  stepNumber?: string,
  isWide?: boolean,
  isModal?: boolean,
  handleCloseModal?: () => void,
}

export const BoxHeader: React.FC<IBoxHeader> = ({title, stepNumber, isWide, isModal,handleCloseModal}) => {
  return (
    <div className={'box_header'}>
      {isModal ?
        <img src={info} alt="" />
        : ''}
      <div className={`box_title ${isWide ? 'wide' : ''}`}> {title}</div>
      {isModal ?
        <img src={close} alt="" onClick={handleCloseModal} /> :
        <div className={'box_step'}> Step {stepNumber}</div>
      }
    </div>
  )
}