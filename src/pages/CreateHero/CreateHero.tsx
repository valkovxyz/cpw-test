import React, {useState, useEffect} from "react";
import {ethers, Contract, BigNumber} from 'ethers'
import Layout from "../../components/layout";
import ContractABI from '../../contracts/HeroesCitadel.json'
import balance from '../../assets/Balance.svg'
import Avatar from '../../assets/Avatar.svg'
import Lock from '../../assets/Lock.svg'
import Hero from '../../assets/img/Hero.png'
import ComingSoon from '../../assets/img/coming_soon.png'
import equip from '../../assets/equip.svg'
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
import {Notification} from "../../components/Notification/Notification";

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
  const [funds, setFunds] = useState<number | string>(0.003)
  const [notificationText, setNotificaitonText] = useState<string>('')
  const [heroClass, setHeroClass] = useState<number>(0)
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [heroId, setHeroId] = useState<number>(0)
  const navigate = useNavigate();

  enum StatsKey {
    NotConfigured,
    Attack, // 1
    Health  // 2
  }

  enum HeroClass {
    NOT_CONFIGURED,
    INFILTRATOR,
    AGENT_X,
    TECHNOMANCER,
    NETRUNNER
  }

  const handleShowNotification = () => {
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 5500);
  };
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
    if (!localStorage.getItem('wallet')) {
      navigate('/connect-wallet')
    }
    if (sessionWallet && localStorage.getItem('wallet')) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      provider.getBalance(sessionWallet).then((balance) => {
        const balanceInEth = ethers.utils.formatEther(balance);
        const formattedBalance = parseFloat(balanceInEth).toFixed(4);
        setWalletBalance(formattedBalance)
      });
    }
  }, [sessionWallet, funds]);

  const createHero = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    if (!provider) {

      console.error('Ethereum provider not available.');
      return;
    }
    try {
      const accounts = await provider.listAccounts();
      const signer = provider.getSigner(accounts[0]);
      const valueToRecharge: BigNumber = ethers.utils.parseEther(funds.toString());
      setIsLoading(true);
      const heroesCitadelContract = new Contract(ContractABI.address, ContractABI.abi, signer);
      const tx = await heroesCitadelContract.createHero(characterName, signer._address, heroClass, [attack], [health], { value: valueToRecharge, gasLimit: 210000 });
      await tx.wait();
      setIsLoading(false);
      navigate('/battle-station')
    } catch (error) {
      console.error('Error creating hero:', (error as Error).message);
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (characterName.length < 5) {
        setNotificaitonText('Name must be at least 5 characters')
        handleShowNotification()
      } else {
        setStep(step + 1)
      }
    } else if (step === 2) {
      if (funds < 0.003) {
        setNotificaitonText('The minimal required ETH is 0.003')
        handleShowNotification()
      } else {
        setStep(step + 1)
      }
    }
  }


  const heroes = [
    { id: 0, src: Avatar, heroClass: HeroClass.INFILTRATOR },
    { id: 1, src: Avatar, heroClass: HeroClass.AGENT_X },
    { id: 2, src: Avatar, heroClass: HeroClass.TECHNOMANCER },
    { id: 3, src: Avatar, heroClass: HeroClass.NETRUNNER },
    { id: 4, src: Lock },
    { id: 5, src: Lock },
    { id: 6, src: Lock },
    { id: 7, src: Lock },
    { id: 8, src: Lock },
    { id: 9, src: Lock },
    { id: 10, src: Lock },
    { id: 11, src: Lock },
  ];

  const HeroList: any = () => heroes.map((hero) => (
    <div className={'box_hero_container'}>
    <img key={hero.id} src={hero.src} className={'box_hero'} alt="" onClick={() => setHeroClass(hero.heroClass || heroClass)}>

    </img>
      {hero.id === heroClass - 1 ?  <div className={'box_hero_equip'}><img src={equip} alt="Equip"/></div>  : ''}
    </div>
  ))

  const handleValidateNumber = (inputValue: string) => {

    if (/^[0-9]*\.?[0-9]*$/.test(inputValue)) {
      setFunds(inputValue);
    }
  };



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
              title={'Character Name'}
              value={characterName}
              handleChange={(e) => setCharacterName(e.target.value)}
              inputLength={5}
              placeholder={'Enter Character Name'}
              isFull={true}/>
          </BoxSection>
          <BoxSection>
            <p className={'box_text'}> Distribute {points} points across offered stats</p>

            <BoxInput
              title={'Attack'}
              value={attack}
              inputType={'number'}
              isDisabled={true}
              handleChange={(e) => setAttack(Number(e.target.value))}
              placeholder={'0'}
              isIncrement={true}
              setIncrement={() => handleAdjust('attack', 'increment')}
              setDecrement={() => handleAdjust('attack', 'decrement')}
            />
            <BoxInput
              title={'Health'}
              value={health}
              inputType={'number'}
              isDisabled={true}
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
              primary={characterName.length >= 5}
              onClick={() => nextStep()}
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
              value={funds.toString()}
              inputType={'text'}
              handleChange={(e) => handleValidateNumber(e.target.value)}
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
              onClick={() => setStep(step - 1)}
            />
            <Button
              value={'Next'}
              primary={true}
              onClick={() => nextStep()}
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
              onClick={() => setStep(step - 1)}
            />
            <Button
              isLoading={isLoading}
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
      {showNotification ? <Notification text={notificationText} /> : ''}

    </Layout>
  );
};