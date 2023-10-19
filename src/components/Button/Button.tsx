import React from "react";
import {Oval} from "react-loader-spinner";

interface IButton {
  value?: string,
  style?: React.CSSProperties,
  primary?: boolean,
  onClick?: () => void;
  isLoading?: boolean
}

export const Button: React.FC<IButton> = ({value, style, primary, onClick, isLoading = false}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(); // Вызываем функцию обратного вызова при клике на кнопку
    }
  };
  return (
    <div className={'button'} onClick={handleClick}>
      <svg className={primary ? 'primary_svg' : 'secondary_svg'} xmlns="http://www.w3.org/2000/svg" width="22"
           height="56" viewBox="0 0 22 56">
        <path
          d="M0 10C0 4.47715 4.47715 0 10 0H22V56C19.4388 56 16.9826 54.9826 15.1716 53.1716L2.92893 40.9289C1.05357 39.0536 0 36.51 0 33.8579V10Z"
          fill=""/>
      </svg>

      <div className={primary ? 'button primary' : 'button secondary'}>
        {isLoading
          ? <Oval
            height={40}
            width={40}
            color="#2D394E"
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#7EFADD"
            strokeWidth={3}
            strokeWidthSecondary={2}
          />
        : <p className={'button_text'}>{value}</p>
        }
      </div>

      <svg className={primary ? 'primary_svg' : 'secondary_svg'} xmlns="http://www.w3.org/2000/svg" width="22"
           height="56" viewBox="0 0 22 56">
        <path
          d="M22 46C22 51.5228 17.5228 56 12 56L0 56L4.89568e-06 -1.9233e-06V-1.9233e-06C2.56116 -1.6994e-06 5.01742 1.01741 6.82843 2.82843L19.0711 15.0711C20.9464 16.9464 22 19.49 22 22.1421L22 46Z"/>
        <path
          d="M0.5 55.5L0.500005 0.513647C2.74635 0.6364 4.87586 1.58296 6.47488 3.18198L18.7175 15.4246C20.4991 17.2062 21.5 19.6226 21.5 22.1421L21.5 46C21.5 51.2467 17.2467 55.5 12 55.5L0.5 55.5Z"/>
      </svg>
    </div>
  )
}