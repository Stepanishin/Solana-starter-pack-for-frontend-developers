import React, { memo } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC } from "react";

require("@solana/wallet-adapter-react-ui/styles.css");

const ConnectWallet: FC = () => {
  return <Content />;
};

export default ConnectWallet;

const Content: FC = memo(() => {
  return (
    <div className="connectWallet_wrapper">
      <WalletMultiButton />
    </div>
  );
});
