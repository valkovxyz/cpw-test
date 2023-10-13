import React, {useState, useEffect} from "react";
import {ethers, BrowserProvider, Contract, Wallet} from 'ethers'
import Layout from "../../components/layout";
import ContractABI from '../../contracts/HeroesCitadel.json'
import balance from '../../assets/Balance.svg'
import Avatar from '../../assets/Avatar.svg'
import Lock from '../../assets/Lock.svg'
import Hero from '../../assets/img/Hero.png'
import ComingSoon from '../../assets/img/coming_soon.png'
import {Button} from "../../components/Button/Button";
import {Box} from "../../components/Box/Box";
import {BoxHeader} from "../../components/BoxHeader/BoxHeader";
import {BoxSection} from "../../components/BoxSection/BoxSection";
import {BoxInput} from "../../components/BoxInput/BoxInput";
import {BoxDescription} from "../../components/BoxDescription/BoxDescription";
import {ModalButton} from "../../components/ModalButton/ModalButton";
import {BoxButtons} from "../../components/BoxButtons/BoxButtons";
import {BoxText} from "../../components/BoxText/BoxText";
import {BoxSteps} from "../../components/BoxSteps/BoxSteps";
import {Modal} from "../../components/Modal/Modal";
import {useNavigate} from "react-router-dom";

export const CreateHero: React.FC = () => {
  const [characterName, setCharacterName] = useState('');
  const [points, setPoints] = useState<number>(5)
  const [attack, setAttack] = useState<number>(0);
  const [health, setHealth] = useState<number>(0);
  const [sessionWallet, setSessionWallet] = useState<string>(localStorage.getItem('wallet') || '');
  const [walletBalance, setWalletBalance] = useState('')
  const [step, setStep] = useState<number>(1)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false);
  const [funds, setFunds] = useState('')
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const browserProvider = new BrowserProvider(window.ethereum);
  const navigate = useNavigate();
  const handleAdjust = (valueType: string, action: string) => {
    if (valueType === 'attack' && action === 'increment' && attack < 5 && points > 0) {
      setPoints(points - 1)
      setAttack(attack + 1);
    } else if (valueType === 'attack' && action === 'decrement' && attack > 0) {
      setPoints(points + 1)
      setAttack(attack - 1);
    } else if (valueType === 'health' && action === 'increment' && health < 5 && points > 0) {
      setPoints(points - 1)
      setHealth(health + 1);
    } else if (valueType === 'health' && action === 'decrement' && health > 0) {
      setPoints(points + 1)
      setHealth(health - 1);
    }
  };

  useEffect(() => {
    console.log(window.ethereum.isConnected())
    if (!localStorage.getItem('wallet')) {
      navigate('connect-wallet')
    }
    if (typeof window.ethereum !== 'undefined') {
      const heroesCitadelContract = new Contract(ContractABI.address, ContractABI.abi, browserProvider);
      setContract(heroesCitadelContract);
    }
    if (sessionWallet) {
      browserProvider.getBalance(sessionWallet).then((balance) => {
        const balanceInEth = ethers.formatEther(balance);
        const formattedBalance = parseFloat(balanceInEth).toFixed(3);
        setWalletBalance(formattedBalance)
      });
    }
  }, [sessionWallet, window.ethereum.isConnected()]);

  const createHero = async () => {
    setIsLoading(true)
    if (!contract || !browserProvider) {
      console.error('Ethereum provider or contract not available.');
      return;
    }
    try {
      if (characterName.length < 5) {
        throw new Error('Name must be at least 5 characters');
      }
      const valueToRecharge: bigint = ethers.parseEther(funds);
      const privateKey: string = Wallet.createRandom().privateKey;
      const signer: Wallet = new Wallet(privateKey, browserProvider);

      const tx = await contract.createHero(characterName, signer.address, [attack], [health], {value: valueToRecharge});
      setIsLoading(true);
      await tx.wait();
    } catch (error) {
      console.error('Error creating hero:', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  const heroes = [
    {id: 0, src: Avatar},
    {id: 1, src: Avatar},
    {id: 2, src: Avatar},
    {id: 3, src: Avatar},
    {id: 4, src: Lock},
    {id: 5, src: Lock},
    {id: 6, src: Lock},
    {id: 7, src: Lock},
    {id: 8, src: Lock},
    {id: 9, src: Lock},
    {id: 10, src: Lock},
    {id: 11, src: Lock},
  ]

  const HeroList: any = () => heroes.map((hero) => (
    <img key={hero.id} src={hero.src} className={'box_hero'} alt=""></img>
  ))

  return (
    <Layout>
      {step === 1 ?
        <Box>
          <BoxHeader
            title={'Create a Hero'}
            stepNumber={'1'}
          />
          <BoxSection>
            <BoxInput
              title={'CharacterName'}
              value={characterName}
              handleChange={(e) => setCharacterName(e.target.value)}
              placeholder={'Enter Character Name'}

              isFull={true}/>
          </BoxSection>
          <BoxSection>
            <p className={'box_text'}> Distribute {points} points across offered stats</p>
            <BoxInput
              title={'Attack'}
              value={attack}
              handleChange={(e) => setAttack(Number(e.target.value))}
              placeholder={'0'}
              isIncrement={true}
              setIncrement={() => handleAdjust('attack', 'increment')}
              setDecrement={() => handleAdjust('attack', 'decrement')}
            />
            <BoxInput
              title={'Health'}
              inputType={"number"}
              value={health}
              handleChange={(e) => setHealth(Number(e.target.value))}
              placeholder={'0'}
              isIncrement={true}
              setIncrement={() => handleAdjust('health', 'increment')}
              setDecrement={() => handleAdjust('health', 'decrement')}
            />
          </BoxSection>
          <BoxSteps step={1}/>
          <BoxButtons>
            <Button
              value={'Next'}
              primary={true}
              onClick={() => setStep(2)}
            />
          </BoxButtons>
        </Box>
        : ''}

      {step === 2 ?
        <Box isWallet={true}>
          <BoxHeader
            title={'Session Wallet Address'}
            stepNumber={step.toString()}
          />
          <BoxSection>
            <BoxInput
              title={'Setup Session Wallet'}
              value={sessionWallet}
              handleChange={(e) => setSessionWallet(e.target.value)}
              placeholder={'Enter Session Wallet Address'}
              isFull={true}
              isCrypto={true}
            />
            <div className={'box_balance'}>
              <div className={'box_balance_box'}>
                <img src={balance} alt=""/>
                <p className={'box_text'}> Balance</p>
              </div>
              <div className={'box_balance_box'}>
                <p className={'box_balance_value'}>{walletBalance}</p>
                <p className={'box_balance_value'}>ETH</p>
              </div>
            </div>
          </BoxSection>
          <BoxSection>
            <BoxDescription>
              Refill you session wallet address with ETH tokens 0.0030 ETH = ~120 in-game actions
            </BoxDescription>
            <BoxInput
              title={'Add Funds'}
              value={funds}
              handleChange={(e) => setFunds(e.target.value)}
              placeholder={'0'}
              isButton={true}
              buttonText={'Add'}
            />
          </BoxSection>
          <BoxSection>
            <ModalButton text={'What is session wallet address?'} handleClick={() => setIsModalOpen(true)}/>
          </BoxSection>
          <BoxSteps step={2}/>
          <BoxButtons>
            <Button
              value={'Back'}
              primary={false}
              onClick={() => setStep(1)}
            />
            <Button
              value={'Next'}
              primary={true}
              onClick={() => setStep(3)}
            />
          </BoxButtons>
        </Box>
        : ''}
      {step === 3 ?
        <Box isLarge={true}>
          <BoxHeader
            title={'Choose your Hero Picture'}
            stepNumber={'3'}
            isWide={true}
          />
          <BoxSection row={true}>
            <div className={'box_section_column'}>
              <BoxText text={'Default Hero Pictures'}/>
              <div className={'box_section_content'}>
                <div className={'box_section_heroes'}>
                  <HeroList/>
                </div>
                <img src={Hero} alt=""/>
              </div>
            </div>
            <div className={'box_section_column'}>
              <BoxText text={'Unique Hero Pictures'}/>
              <div className={'box_section_content'}>
                <img src={ComingSoon} alt="Sale coming soon" className={'box_coming_soon'}/>
              </div>
            </div>

          </BoxSection>
          <BoxSection>
            <ModalButton text={'What is Hero Picture?'} handleClick={() => setIsModalOpen(true)}/>
          </BoxSection>
          <BoxSteps step={3}/>
          <BoxButtons isHeroPage={true}>
            <Button
              value={'Back'}
              primary={false}
              onClick={() => setStep(2)}
            />
            <Button
              value={'Create Hero'}
              primary={true}
              onClick={createHero}
            />
          </BoxButtons>
        </Box>
        : ''}
      <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        {step === 2 ?
          <>
            <BoxHeader
              title={'What is session wallet address?'}
              isModal={true}
              handleCloseModal={() => setIsModalOpen(false)}
            />
            <BoxDescription>
              <p>To perform in-game actions, a player needs to confirm every transaction with a we3 (metamask) wallet.
                This often results in players having to repeatedly click “approve,” hindering the gaming experience.</p>
              <p>To address this issue, we have implemented a session wallet with account abstraction logic.</p>
              <p>This automatically generates a session wallet address that is authorized to perform in-game actions
                during the current game session. The private key of that address is securely stored in the player’s
                browser. This method not only ensures safety, but also offers a seamless gaming experience. Importantly,
                the session wallet does not hold any game assets and is unique to each game session. All the player
                needs to do is top up the address with a small amount of coins, which will be used as transaction fees
                for in-game actions. </p>
              <p>0.0030 ETH = ~120 in-game actions.</p>
            </BoxDescription>
          </>
          : ''}
        {step === 3 ?
          <>
            <BoxHeader
              title={'What is Hero Picture?'}
              isModal={true}
              handleCloseModal={() => setIsModalOpen(false)}
            />
            <BoxDescription isModal={true}>
              <p>
                Players will have two options:
              </p>
              <ol type="1">
                <li>
                  Choose a default hero picture from the provided options.
                </li>
                <li>
                  Purchase a unique hero picture from the upcoming NFT mint, featuring 10,000 unique heroes. Each
                  picture will be one-of-a-kind (1:1 unique). Mint a unique hero profile picture and unlock future
                  features as an early supporter of the Cyberpunks World project.
                </li>
              </ol>
            </BoxDescription>
          </>
          : ''}
      </Modal>
    </Layout>
  );
};