import React from "react";

interface IBoxDescription {
  children?: React.ReactNode,
  isModal?: boolean
}

export const BoxDescription: React.FC<IBoxDescription> = ({children, isModal}) => {
  return (
    <>
      <div className={`box_description ${isModal ? 'description_modal' : '' }`}>
        <>
          {children}
        </>
      </div>
    </>
  )
}