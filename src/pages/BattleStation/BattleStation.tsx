import React, {useEffect, useState} from "react";
import Layout from "../../components/layout";
import {Contract, ethers} from "ethers";
import ContractABI from "../../contracts/HeroesCitadel.json";

export const BattleStation: React.FC = () => {
  const [heroes, setHeroes] = useState<any>()
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  useEffect(() => {
    if (provider) {
      getHeroes()
    }
  }, []);
  const getHeroes = async () => {
    const accounts = await provider.listAccounts();
    const signer = provider.getSigner(accounts[0]);
    const heroesCitadelContract = new Contract(ContractABI.address, ContractABI.abi, signer);
    const heroes: object = await heroesCitadelContract.getHeroes(signer._address)
    console.log(heroes)
    setHeroes(heroes)
  }
  return (
    <Layout>
    </Layout>
  );
};