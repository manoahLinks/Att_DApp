import {FaJenkins } from 'react-icons/fa6'

const Navbar = ({address, disconnectWallet, connectWallet, connection}) => {
   

    return ( 
        <div className=" text-yellow-50 flex flex-col md:flex-row gap-2 md:gap-4 items-center pt-4 px-[2em] justify-between w-full">
          <p className="font-bold text-2xl">Att_DApp</p>
          <span className="flex items-center p-2 rounded-md text-green-500 shadow-green-200">
            <span className='flex items-center gap-x-2 '>
                <FaJenkins/>
                <small className='text-[10px] font-light'>Connected acct:</small>
            </span>
            <small className='text-[10px] font-bold'>{address || `NIL`}</small>
          </span>
          {connection ? (
            <button
              className="border rounded-lg shadow-md border-black bg-white text-purple-950 py-2 px-4 mb-2"
              onClick={disconnectWallet}
            >
              Disconnect
            </button>
          ) : (
            <button
              className="border rounded-lg shadow-md border-black bg-white text-purple-950 py-2 px-4 mb-2"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </div>
     );
}
 
export default Navbar;