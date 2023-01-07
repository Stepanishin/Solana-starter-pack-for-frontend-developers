import React, {FC} from 'react';
import SendSolanaBtn from '../SendSolanaBtn/SendSolanaBtn';
import SendSPLTokenBtn from '../SendSPLTokenBtn/SendSPLTokenBtn';


const MainPage: FC = () => {


    return (
        <main className='MainPage'>
            <SendSolanaBtn />
            <SendSPLTokenBtn />
        </main>
    );
};

export default MainPage;