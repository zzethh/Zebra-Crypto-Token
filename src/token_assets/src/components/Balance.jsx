import React, { useState } from "react";
import { Principal } from '@dfinity/principal';
import { token } from "../../../declarations/token";

function Balance() {

  const [inputValue, setInput] = useState("");
  const [balanceResult, setBalance] = useState("");
  const [cryptoSymbol, setSymbol] = useState("");
  const [isHidden, setHidden] = useState(true);
  
  async function handleClick() {
    // console.log(inputValue);
    const principal = Principal.fromText(inputValue);
    const balance = await token.balanceOf(principal);
    setBalance(balance.toLocaleString());
    setSymbol(await token.getSymbol());
    setHidden(false);
  }


  return (
    <div className="window">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter Principal ID"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult} {cryptoSymbol}.</p>
    </div>
  );
}

export default Balance;
