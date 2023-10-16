import React from "react";
import profileImg from '../../assets/Dashboard.svg'
import cityMapImg from '../../assets/city_map.svg'
import marketplaceImg from '../../assets/Sales.svg'
import tournamentsImg from '../../assets/tournament.svg'
import leaderboardImg from '../../assets/leader_board.svg'
import knowledgeImg from '../../assets/knowledge_base.svg'
import tokenSale from '../../assets/token.svg'
import nftSale from '../../assets/token.svg'
export const Navigation : React.FC = () => {
  return (
    <div className={'navigation'}>
      <div className={'navigation_container'}>
      <div className={'navigation_header'}></div>
      <div className={'navigation_section'}>
        <div className={'navigation_section_item'}>
          <img src={profileImg} alt="" className={'navigation_section_item_img'}/>
          <p className={'navigation_section_item_text'}></p>
        </div>
      </div>
      <div className={'navigation_section'}>
        <div className={'navigation_section_item'}>
          <img src={cityMapImg} alt="" className={'navigation_section_item_img'}/>
          <p className={'navigation_section_item_text'}></p>
        </div>
        <div className={'navigation_section_item'}>
          <img src={marketplaceImg} alt="" className={'navigation_section_item_img'}/>
          <p className={'navigation_section_item_text'}></p>
        </div>
        <div className={'navigation_section_item'}>
          <img src={tournamentsImg} alt="" className={'navigation_section_item_img'}/>
          <p className={'navigation_section_item_text'}></p>
        </div>
        <div className={'navigation_section_item'}>
          <img src={leaderboardImg} alt="" className={'navigation_section_item_img'}/>
          <p className={'navigation_section_item_text'}></p>
        </div>
      </div>
      <div className={'navigation_section'}>
        <div className={'navigation_section_item'}>
          <img src={knowledgeImg} alt="" className={'navigation_section_item_img'}/>
          <p className={'navigation_section_item_text'}></p>
        </div>
      </div>
      <div className={'navigation_section'}>
        <div className={'navigation_section_item'}>
          <img src={tokenSale} alt="" className={'navigation_section_item_img'}/>
          <p className={'navigation_section_item_text'}></p>
        </div>
        <div className={'navigation_section_item'}>
          <img src={nftSale} alt="" className={'navigation_section_item_img'}/>
          <p className={'navigation_section_item_text'}></p>
        </div>
      </div>

      <div className={'navigation_footer'}></div>
      </div>
    </div>
  )
}