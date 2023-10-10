import React, {ChangeEvent, useState} from "react";
import Layout from "../../components/layout";
import add from '../../assets/add.svg'
import minus from '../../assets/minus.svg'
import balance from '../../assets/Balance.svg'
import {Button} from "../../components/Button/Button";

interface IHero {
    characterName: string
}

interface  IStepState {
    first: boolean;
    second: boolean;
    third: boolean;
}
export const CreateHero: React.FC = () => {
    const [characterName, setCharacterName] = useState('')
    const [step, setStep] = useState<IStepState>({first: true, second: false, third: false})
    const handleCharacterName = (e: ChangeEvent<HTMLInputElement>) => {
        setCharacterName(e.target.value)
    }

    const handleButtonClick = (stepToChange: keyof IStepState, value: boolean) => {
        // Создаем копию текущего состояния
        const updatedStep = { ...step };
        // Устанавливаем указанный шаг в true
        updatedStep[stepToChange] = value;
        // Обновляем состояние
        setStep(updatedStep);
    };

    return (
            <Layout>

                <div className={'box'}>
                    { step.first && !step.second && !step.third ?
                        <>
                            <div className={'box_header'}>
                                <div className={'box_title'}> Create a Hero</div>
                                <div className={'box_step'}> Step 1</div>
                            </div>
                            <div className={'box_section'}>
                                <label>
                                    <p className={'box_text'}> Character Name</p>
                                    <input
                                        type="text"
                                        className={'box_input full'}
                                        value={characterName}
                                        onChange={handleCharacterName}
                                        placeholder={'Enter Character Name'}/>
                                </label>
                            </div>

                            <div className={'box_section'}>
                                <p className={'box_text'}> Distribute 5 points across offered stats</p>
                                <label>
                                    <p className={'box_text'}> Attack</p>
                                    <div className={'box_input-health'}>
                                        <input
                                            type="number"
                                            className={'box_input'}
                                            value={characterName}
                                            onChange={handleCharacterName}
                                            placeholder={'0'}/>
                                        <div className={'box_input_button'}>
                                            <img src={add} alt=""/>
                                        </div>
                                        <div className={'box_input_button'}>
                                            <img src={minus} alt=""/>
                                        </div>
                                    </div>
                                </label>
                                <label>
                                    <p className={'box_text'}> Health Points</p>
                                    <div className={'box_input-health'}>
                                        <input
                                            type="number"
                                            className={'box_input'}
                                            value={characterName}
                                            onChange={handleCharacterName}
                                            placeholder={'0'}/>
                                        <div className={'box_input_button'}>
                                            <img src={add} alt=""/>
                                        </div>
                                        <div className={'box_input_button'}>
                                            <img src={minus} alt=""/>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <div className={'box_steps'}>
                                <div className={`box_step_dot ${step.first ? 'done' : ''}`}></div>
                                <div className={`box_step_dot ${step.first && step.second ? 'done' : ''}`}></div>
                                <div className={`box_step_dot ${step.first && step.second && step.third ? 'done' : ''}`}></div>
                            </div>
                            <div className={'box_buttons'}>
                                <Button
                                    value={'Next'}
                                    primary={true}
                                    onClick={() => handleButtonClick('second', true)}
                                />
                            </div>
                        </>
                        : ''}

                    {step.first && step.second && !step.third ?
                        <>
                            <div className={'box_header'}>
                                <div className={'box_title'}>Setup Session Wallet</div>
                                <div className={'box_step'}>Step 2</div>
                            </div>
                            <div className={'box_section'}>
                                <label>
                                    <p className={'box_text'}> Setup Session Wallet</p>
                                    <input
                                        type="text"
                                        className={'box_input full'}
                                        value={characterName}
                                        onChange={handleCharacterName}
                                        placeholder={'Enter Session Wallet Name'}/>
                                </label>
                                <div className={'box_balance'}>
                                    <img src={balance} alt=""/>

                                </div>
                            </div>

                            <div className={'box_section'}>
                            </div>
                            <div className={'box_steps'}>
                                <div className={`box_step_dot ${step.first ? 'done' : ''}`}></div>
                                <div className={`box_step_dot ${step.first && step.second ? 'done' : ''}`}></div>
                                <div className={`box_step_dot ${step.first && step.second && step.third ? 'done' : ''}`}></div>
                            </div>
                            <div className={'box_buttons'}>
                                <Button
                                    value={'Back'}
                                    primary={false}
                                    onClick={() => handleButtonClick('second', false)}
                                />
                                <Button
                                    value={'Next'}
                                    primary={true}
                                    onClick={() => handleButtonClick('second', true)}
                                />
                            </div>
                        </>
                        : ''}
                </div>


            </Layout>
    );
};