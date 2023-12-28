import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import { useState, useEffect } from 'react'
import { connect, disconnect } from 'starknetkit'

const Main = () => {

    const [connection, setConnection] = useState("");
    const [provider, setProvider] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
    
        const connectToStarknet = async () => {
        
        const connection = await connect( { modalMode: "neverAsk" } )
        
        if (connection && connection.isConnected) {
            setConnection(connection);
            setProvider(connection.account);
            setAddress(connection.selectedAddress);
        }
        };
        
        connectToStarknet();
    }, [])

    const connectWallet = async() => {
        const connection = await connect();
    
        if(connection && connection.isConnected) {
            setConnection(connection)
            setProvider(connection.account)
            setAddress(connection.selectedAddress)
        }
    }

    const disconnectWallet = async () => {
    
        await disconnect();
        
        setConnection(undefined);
        setProvider(undefined);
        setAddress('');
    }
    
    return ( 
        <main className="bg-gradient-to-br from-indigo-900 to-purple-400 h-screen gap-y-8">
            <Navbar address={address} disconnectWallet={disconnectWallet} connectWallet={connectWallet} connection={connection}/>
            <div className="flex flex-col flex-1 items-center justify-center">
                {connection && <Outlet context={[provider]}/>}
            </div>
        </main>
     );
}
 
export default Main;