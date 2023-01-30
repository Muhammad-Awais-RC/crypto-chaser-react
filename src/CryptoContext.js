import { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("pkr");

  const [symbol, setSymbol] = useState("Rs. ");

  useEffect(() => {
    if (currency === "pkr") setSymbol("Rs. ");
    else setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const useCryptoContext = () => useContext(Crypto);
