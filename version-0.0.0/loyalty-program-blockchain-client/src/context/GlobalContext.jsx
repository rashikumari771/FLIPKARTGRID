import React, { useEffect, useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { abi } from "./../constants/abi";
import { contractAddresses } from "../constants/contractAddresses";

const GlobalContext = React.createContext(null);

export const useGlobal = () => React.useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const { chainId: chainIdHex, isWeb3Enabled, account, Moralis } = useMoralis();
  const chainId = parseInt(chainIdHex, 16);
  const flipcoinContractAddress =
    chainId in contractAddresses ? contractAddresses[chainId] : null;
  const { runContractFunction: getName } = useWeb3Contract({
    abi: abi,
    contractAddress: flipcoinContractAddress,
    functionName: "name",
    params: {},
  });
  const { runContractFunction: getSymbol } = useWeb3Contract({
    abi: abi,
    contractAddress: flipcoinContractAddress,
    functionName: "symbol",
    params: {},
  });
  const { runContractFunction: getOwner } = useWeb3Contract({
    abi: abi,
    contractAddress: flipcoinContractAddress,
    functionName: "owner",
    params: {},
  });
  const { runContractFunction: getTotalSupply } = useWeb3Contract({
    abi: abi,
    contractAddress: flipcoinContractAddress,
    functionName: "totalSupply",
    params: {},
  });
  const { runContractFunction: getPartners } = useWeb3Contract({
    abi: abi,
    contractAddress: flipcoinContractAddress,
    functionName: "getPartners",
    params: {},
  });
  const { runContractFunction: getTransactions } = useWeb3Contract({
    abi: abi,
    contractAddress: flipcoinContractAddress,
    functionName: "getTransactions",
    params: {
      _address: account,
    },
  });
  const { runContractFunction: getBalance } = useWeb3Contract({
    abi: abi,
    contractAddress: flipcoinContractAddress,
    functionName: "getBalance",
    params: {},
  });
  const addPartner = async ({ name, address }) => {
    try {
      Moralis.executeFunction({
        contractAddress: flipcoinContractAddress,
        functionName: "addPartner",
        abi: abi,
        params: {
          _name: name,
          _partner: address,
        },
      }).then(async () => {
        await updatePartners();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const mintTokens = async ({ address, amount }) => {
    try {
      Moralis.executeFunction({
        contractAddress: flipcoinContractAddress,
        functionName: "mint",
        abi: abi,
        params: {
          _to: address,
          _value: amount,
        },
      }).then(async () => {
        await updateTransactions();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const transferTokens = async ({ address, amount }) => {
    try {
      Moralis.executeFunction({
        contractAddress: flipcoinContractAddress,
        functionName: "transfer",
        abi: abi,
        params: {
          _to: address,
          _value: amount,
        },
      }).then(async () => {
        await updateTransactions();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const burnTokens = async ({ amount }) => {
    try {
      Moralis.executeFunction({
        contractAddress: flipcoinContractAddress,
        functionName: "burn",
        abi: abi,
        params: {
          _value: amount,
        },
      }).then(async () => {
        await updateTotalSupply();
        await updateTransactions();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const transferTokensFrom = async ({ from, to, amount }) => {
    try {
      Moralis.executeFunction({
        contractAddress: flipcoinContractAddress,
        functionName: "transferFrom",
        abi: abi,
        params: {
          _from: from,
          _to: to,
          _value: amount,
        },
      }).then(async () => {
        await updateTransactions();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const rewardTokens = async ({ partnerAddress, amount }) => {
    try {
      Moralis.executeFunction({
        contractAddress: flipcoinContractAddress,
        functionName: "reward",
        abi: abi,
        params: {
          _partner: partnerAddress,
          _value: amount,
        },
      }).then(async () => {
        await updateBalance();
        await updateTransactions();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const redeemRewards = async ({ amount }) => {
    try {
      Moralis.executeFunction({
        contractAddress: flipcoinContractAddress,
        functionName: "redeem",
        abi: abi,
        params: {
          _value: amount,
        },
      }).then(async () => {
        await updateBalance();
        await updateTransactions();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [balance, setBalance] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [partners, setPartners] = useState([]);
  const [isPartner, setIsPartner] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const updateTransactions = async () => {
    getTransactions().then((transactions) => {
      setTransactions(
        transactions.map((t) => {
          return {
            from: t[0],
            to: t[1],
            amount: t[2].toString(),
          };
        })
      );
    });
  };

  const updatePartners = async () => {
    getPartners().then((_partners) => {
      setPartners(
        _partners?.map((p) => {
          if (p[1].toLowerCase() === account) setIsPartner(true);
          return {
            name: p[0],
            address: p[1],
          };
        })
      );
    });
  };

  const updateTotalSupply = async () => {
    getTotalSupply().then((ts) => {
      setTotalSupply(ts.toString());
    });
  };

  const updateBalance = async () => {
    getBalance().then((b) => {
      setBalance(b?.toString());
    });
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      getSymbol().then((symbol) => {
        setSymbol(symbol.toString());
      });
      getName().then((name) => {
        setName(name.toString());
      });
      updateTotalSupply();
      updateBalance();
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    if (isWeb3Enabled) {
      getOwner().then((owner) => {
        if (owner.toString().toLowerCase() === account) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      });
      updatePartners();
      updateTransactions();
    }
  }, [isWeb3Enabled, account]);

  const value = {
    account,
    name,
    getName,
    symbol,
    getSymbol,
    isOwner,
    getOwner,
    totalSupply,
    getTotalSupply,
    isPartner,
    getPartners,
    transactions,
    getTransactions,
    addPartner,
    partners,
    mintTokens,
    transferTokens,
    burnTokens,
    transferTokensFrom,
    getBalance,
    balance,
    rewardTokens,
    redeemRewards,
  };
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
