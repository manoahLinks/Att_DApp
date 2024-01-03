import { useState } from 'react';
import {HiMiniXMark} from 'react-icons/hi2'
import { toast } from 'react-toastify';
import { Contract } from 'starknet';

const StudentForm = ({close, provider, abi, contractAddress}) => {
    
    const writeContract = new Contract(abi, contractAddress, provider);

    const [student, setStudent] = useState({
        wallet: '',        
        name: '',
        age: '',
        is_active: true,
        has_reward: false,
        xp_earnings: ''
    });

    const inputChange = (e) => {
        setStudent((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const {wallet, name, age, is_active, has_reward, xp_earnings} = student
            await writeContract.set_student(wallet, name, age, is_active, has_reward, xp_earnings)
            alert('succesfully added')
            
        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    }

    return ( 
        <div className="inset-0 fixed bg-indigo-900 bg-opacity-50 h-screen flex w-full">
            <div className='md:w-4/12 flex flex-col m-auto gap-y-2'>
                <HiMiniXMark onClick={close} color='red' size={30} className='cursor-pointer p-1 rounded-full bg-slate-200 self-end'/>
                <div className=' bg-white rounded-lg p-5 flex flex-col gap-y-6'>
                    <h4 className='text-center font-bold text-slate-300'>Add student</h4>

                    <form 
                        className='flex flex-col gap-y-4'
                    >
                        <div className='flex flex-col gap-y-1'>
                            <label className='text-xs'>Wallet Address</label>
                            <input 
                                type="text" 
                                className='text-xs border-slate-300 placeholder-slate-300' 
                                name="wallet"
                                value={student.wallet} 
                                onChange={inputChange}
                                id=""
                                placeholder='e.g 0x000000000000000000000000000000'
                            />
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <label className='text-xs'>Name</label>
                            <input 
                                type="text" 
                                className='text-xs border-slate-300 placeholder-slate-300' 
                                name="name"
                                value={student.name} 
                                onChange={inputChange}
                                id=""
                                placeholder='e.g John Doe'
                            />
                        </div>

                        <div className='flex flex-col gap-y-1'>
                            <label className='text-xs'>Age</label>
                            <input 
                                type="number" 
                                className='text-xs border-slate-300 placeholder-slate-300' 
                                name="age"
                                value={student.age} 
                                onChange={inputChange}
                                id=""
                                placeholder='e.g 25'
                            />
                        </div>

                        <div className='flex flex-col gap-y-1'>
                            <label className='text-xs'>Xp_earnings</label>
                            <input 
                                type="number" 
                                className='text-xs border-slate-300 placeholder-slate-300' 
                                name="xp_earnings"
                                value={student.xp_earnings} 
                                onChange={inputChange}
                                id=""
                                placeholder='e.g 2,500'
                            />
                        </div>

                        {/* <div className='flex flex-col gap-y-1'>
                            <label htmlFor='' className='text-xs'>Is Active ?</label>
                            <div className='flex items-center gap-x-4'>
                                <label className='text-xs' htmlFor="">true</label>
                                <input 
                                    type="radio" 
                                    className='' 
                                    name="is_active" 
                                    checked={student.is_active == 1}
                                    onChange={inputChange } 
                                    id=""
                                    value={student.is_active}
                                />

                                <label className='text-xs' htmlFor="">false</label>
                                <input 
                                    type="radio" 
                                    className='' 
                                    name="is_active"
                                    checked={student.is_active == 0}
                                    onChange={inputChange} 
                                    id=""
                                    value={student.is_active}
                                /> 
                            </div>
                            
                        </div> */}

                        <button 
                            onClick={handleSubmit}
                            className='p-2 bg-gradient-to-br mt-4 from-indigo-900 to-purple-400 hover:bg-opacity-50 text-white rounded-full  hover:rounded-md'
                        >
                            Submit
                        </button>

                    </form>
                </div>
               
            </div>
        </div>
     );
}
 
export default StudentForm;