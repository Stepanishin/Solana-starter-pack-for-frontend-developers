import React, { FC, useCallback } from "react";
import { Transaction, PublicKey } from "@solana/web3.js";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID, createTransferInstruction } from "@solana/spl-token";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { Connection } from "@solana/web3.js";

const SendSPLTokenBtn: FC = () => {
  const connection = new Connection(
    "https://solana-mainnet.g.alchemy.com/v2/IjcuUmymeTy65r4Z0KPaWfm7hsIC5OFK",
    "confirmed"
  );
  const { publicKey, signTransaction, sendTransaction } = useWallet();

  let mintUSDCAdress = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; //The address of the token to send
  let theWallet = "A8grZ1aaL9Hm8sC7mtVyiAqdkFf4mB63aBpfq2WR9drt"; //Wallet to send to

  const onClick = useCallback(
    async (e: any) => {
      try {
        if (!publicKey || !signTransaction) throw new WalletNotConnectedError();

        const toPublicKey = new PublicKey(theWallet); //Wallet to send to
        const mint1 = new PublicKey(mintUSDCAdress); //The address of the token to send

        const fromTokenAccount1 = await getOrCreateAssociatedTokenAccount(
          connection,
          publicKey,
          mint1,
          publicKey,
          signTransaction
        );

        const toTokenAccount1 = await getOrCreateAssociatedTokenAccount(
          connection,
          publicKey,
          mint1,
          toPublicKey,
          signTransaction
        );

        let lamportsI = 1000000 * e.target.value; // How much to send SOL

        const transaction = new Transaction().add(
          createTransferInstruction(
            fromTokenAccount1.address, // source
            toTokenAccount1.address, // dest
            publicKey,
            lamportsI,
            [],
            TOKEN_PROGRAM_ID
          )
        );

        const blockHash = await connection.getRecentBlockhash();
        transaction.feePayer = await publicKey;
        transaction.recentBlockhash = await blockHash.blockhash;
        const signed = await signTransaction(transaction);
        await connection.sendRawTransaction(signed.serialize());
      } catch (error) {
        console.log(error);
      }
    },
    [publicKey, sendTransaction, connection]
  );

  return (
    <button value={0.1} onClick={onClick}>
      SEND 0.1 SPL TOKEN USDC
    </button>
  );
};

export default SendSPLTokenBtn;
