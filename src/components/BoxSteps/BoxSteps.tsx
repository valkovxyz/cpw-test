import React from "react";

interface IBoxSteps {
  step: number
}
export const BoxSteps: React.FC<IBoxSteps> = ({step}) => {
    return (
        <div className={'box_steps'}>
            <div className={`box_step_dot ${step >= 1 ? 'done' : ''}`}></div>
            <div className={`box_step_dot ${step >= 2 ? 'done' : ''}`}></div>
            <div className={`box_step_dot ${step >= 3 ? 'done' : ''}`}></div>
        </div>
    )
}