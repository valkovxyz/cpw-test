import React from "react";
import profileImg from '../../assets/Dashboard.svg'
import cityMapImg from '../../assets/city_map.svg'
import marketplaceImg from '../../assets/Sales.svg'
import tournamentsImg from '../../assets/tournament.svg'
import leaderboardImg from '../../assets/leader_board.svg'
import knowledgeImg from '../../assets/knowledge_base.svg'
import tokenSale from '../../assets/token.svg'
import nftSale from '../../assets/token.svg'
import close from '../../assets/close.svg'

interface INavigation {
  handleClose?: () => void
}
export const Navigation : React.FC<INavigation> = ({handleClose}) => {
  return (
    <div className={'navigation'}>
      <div className={'navigation_container'}>
      <div className={'navigation_header'}>
        <img src={close} alt="" className={'navigation_header_close'} onClick={handleClose} />
      </div>
      <div className={'navigation_section'}>
        <div className={'navigation_section_item'}>
          <img src={profileImg} alt="" className={'navigation_section_item_img'}/>
          <p className={'navigation_section_item_text'}>Profile</p>
        </div>
      </div>
      <div className={'navigation_section'}>
        <div className={'navigation_section_item'}>
          <img src={cityMapImg} alt="" className={'navigation_section_item_img'}/>
          <p className={'navigation_section_item_text'}>City Map</p>
        </div>
        <div className={'navigation_section_item'}>
          <img src={marketplaceImg} alt="" className={'navigation_section_item_img'}/>
          <p className={'navigation_section_item_text'}>Marketplace</p>
        </div>
        <div className={'navigation_section_item'}>
          <img src={tournamentsImg} alt="" className={'navigation_section_item_img'}/>
          <p className={'navigation_section_item_text'}>Tournaments</p>
        </div>
        <div className={'navigation_section_item'}>
          <img src={leaderboardImg} alt="" className={'navigation_section_item_img'}/>
          <p className={'navigation_section_item_text'}>Leaderboard</p>
        </div>
      </div>
      <div className={'navigation_section'}>
        <div className={'navigation_section_item'}>
          <img src={knowledgeImg} alt="" className={'navigation_section_item_img'}/>
          <p className={'navigation_section_item_text'}>Knowledge base</p>
        </div>
      </div>
      <div className={'navigation_section'}>
        <div className={'navigation_section_item'}>
          <img src={tokenSale} alt="" className={'navigation_section_item_img'}/>
          <p className={'navigation_section_item_text'}>Token Sale</p>
        </div>
        <div className={'navigation_section_item'}>
          <img src={nftSale} alt="" className={'navigation_section_item_img'}/>
          <p className={'navigation_section_item_text'}>NFT Sale</p>
        </div>
      </div>

      <div className={'navigation_footer'}></div>
      </div>
    </div>
  )
}