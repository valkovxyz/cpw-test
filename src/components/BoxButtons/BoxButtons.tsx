import React from "react";

interface IBoxButtons {
  children?: React.ReactNode
  isHeroPage?: boolean
}
export const BoxButtons: React.FC<IBoxButtons> = ({children, isHeroPage}) => {
  return (
    <div className={`box_buttons ${isHeroPage ? 'hero' : ''}`}>
      {children}
    </div>
  )
}