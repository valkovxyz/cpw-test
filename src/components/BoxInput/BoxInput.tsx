import React, {ChangeEvent} from "react";
import add from "../../assets/add.svg";
import minus from "../../assets/minus.svg";
import copy from '../../assets/copy.svg'
import {Button} from "../Button/Button";
import {CopyToClipboard} from 'react-copy-to-clipboard';

interface IBoxInput {
  title: string,
  value: string | number,
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  placeholder: string,
  isFull?: boolean,
  isIncrement?: boolean,
  isButton?: boolean,
  buttonText?: string,
  addFunds?: () => void;
  setIncrement?: () => void;
  setDecrement?: () => void;
  inputType?: string,
  isCrypto?: boolean,
  inputLength?: number
}




export const BoxInput: React.FC<IBoxInput> = ({
                                                title,
                                                value,
                                                handleChange,
                                                placeholder,
                                                isFull,
                                                isCrypto,
                                                isIncrement,
                                                isButton,
                                                buttonText,
                                                addFunds,
                                                setIncrement,
                                                setDecrement,
                                                inputType,
                                                inputLength
                                              }) => {
  return (
    <label>
      <p className={'box_text'}> {title}</p>
      <div className={'box_input_buttons'}>
        {isCrypto ?
          <CopyToClipboard text={`${value}`}>
          <img src={copy} alt="Copy" className={'box_copy_button'} />
          </CopyToClipboard>
          : ''}
        <input
          type={inputType || 'text'}
          minLength={inputLength}
          className={`box_input ${isFull ? 'full' : ''}`}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}/>
        {isIncrement ?
          <>
            <div className={'box_input_button'} onClick={setIncrement}>
              <img src={add} alt=""/>
            </div>
            <div className={'box_input_button'} onClick={setDecrement}>
              <img src={minus} alt=""/>
            </div>

          </>
          : ''}
        {isButton
          ?
          <Button
            onClick={addFunds}
            value={buttonText}
          />
          : ''}
      </div>
    </label>
  )
}