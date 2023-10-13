import React from "react";

interface IBoxSection {
    children?: React.ReactNode
    row?: boolean
}
export const BoxSection: React.FC<IBoxSection> = ({children, row}) => {
    return (
        <div className={`box_section ${row ? 'row': ''}`}>
            {children}
        </div>
    )
}