import React from 'react';
import { FC, useCallback } from 'react';
import { Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Connection } from "@solana/web3.js";
import {  useWallet } from '@solana/wallet-adapter-react';

const SendSolanaBtn: FC = () => {

    const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/IjcuUmymeTy65r4Z0KPaWfm7hsIC5OFK", "confirmed");
    const { publicKey, sendTransaction } = useWallet();

    // Here, specify the wallet where to send SOL
    const theWallet = 'A8grZ1aaL9Hm8sC7mtVyiAqdkFf4mB63aBpfq2WR9drt'

    const onClick = useCallback( async (e:any) => {

        try {
            let lamportsI = LAMPORTS_PER_SOL* e.target.value;   // How much to send SOL 
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(theWallet),
                    lamports: lamportsI,
                })
            );

            const signature = await sendTransaction(transaction, connection);
            
            await connection.confirmTransaction(signature, 'processed');
        
          } catch (err) {
            console.log(err)
          }       
    }, [publicKey, sendTransaction, connection ]);
    
    return (
        <button value={0.1}  onClick={onClick}>SEND 0.1 SOL</button>  
    );
};

export default SendSolanaBtn;