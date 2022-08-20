import React, { useState } from "react";
import { Principal } from '@dfinity/principal';
import { canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {

  const [recipientId, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [isHidden, setHidden] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [isDisabled, setDisable] = useState(false);
  
  async function handleClick() {
    setHidden(true);
    setDisable(true);
    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.transfer(recipient, amountToTransfer);
    setFeedback(result);
    setHidden(false);
    setDisable(false);
  }

  return (
    <div className="window">
    <p>Transfer Tokens:</p>
      <div>
          <legend>To Account:</legend>
              <input
                type="text"
                value={recipientId}
                onChange={(e) => setId(e.target.value)}
              />
          <legend>Amount:</legend>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
        <p className="trade-buttons">
          <button 
          onClick={handleClick} 
          disabled={isDisabled}
          >
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
