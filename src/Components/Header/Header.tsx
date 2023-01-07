import React, {FC} from 'react';
import ConnectWallet from '../ConnectWallet/ConnectWallet';

const Header: FC = () => {


    return (
        <header className='Header'>
            <ConnectWallet />
        </header>
    );
};

export default Header;