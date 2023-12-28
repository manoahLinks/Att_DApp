import {useState} from 'react';
import { useOutletContext } from "react-router-dom";
import {Contract, RpcProvider} from 'starknet';
import att_abi from '../abis/main_abi.json';
import { toast } from 'react-toastify';
import { Loading, StudentForm } from '../components';
import img1 from '../assets/icons8-avatar-64.png'
import { feltToString } from '../helpers';
import { HiMiniXCircle, HiMiniHandThumbUp,  HiMiniPlus} from 'react-icons/hi2';

const Dashboard = () => {

    const [studentForm, setStudentForm] = useState(false);
    const [owner, setOwner] = useState('');
    const [student, setStudent] = useState({
        name: '',
        age: '',
        is_active: '',
        has_reward: '',
        xp_earnings: ''
    });
    const [studentAddress, setStudentAddress] = useState('');
    const [isPending, setIsPending] = useState(false)
    const [provider] = useOutletContext();
    const att_address = '0x04ca1301fb1cc1899bbb9d94a0becacfa13a250565b3491c985d435603feecdb';

    const providers = new RpcProvider({
        nodeUrl: 'https://starknet-goerli.infura.io/v3/c61b0457e5004368ac942e464b8d1f62',
      });

    const getOwner = async () => {
        try {
            const readContract = new Contract(att_abi, att_address, providers); 

            const owner = await readContract.get_owner();

            console.log('owner',owner)
            setOwner(owner.toString(16))

        } catch (error) {
            alert(error.message)
        }
    }

    const getStudent = async () => {
        try {
            setStudent({
                name: '',
                age: '',
                is_active: '',
                has_reward: '',
                xp_earnings: ''
            })
            setIsPending(true)
            const readContract = new Contract(att_abi, att_address, providers); 

            const student = await readContract.get_student(studentAddress);

            if(!student) {
                setIsPending(false)
                toast.error('student doest exist')
            }

            setIsPending(false)
            setStudent({
                name: feltToString(student.name),
                age: student.age.toString(),
                xp_earnings: student.xp_earnings.toString(),
                has_reward: student.has_reward,
                is_active: student.is_active.toString()
            })
            toast.success('student found')

        } catch (error) {
            toast.error(error.message)
        }
    }

    return ( 
        <div className="flex-1 flex flex-col w-full gap-y-8">
            <div className='md:w-5/12 m-auto flex justify-end '>
                <span onClick={()=>{setStudentForm(true)}} className='flex gap-y-2 items-center hover:underline text-white cursor-pointer'>
                    <HiMiniPlus size={20}/>
                    <h4>Add student</h4>
                </span>
                
            </div>
            <div className='bg-white p-5 rounded-lg md:w-5/12 m-auto flex flex-col gap-y-4'>
                <h4 className='text-center text-purple-400 text-xl'>Get student</h4>
                <div className='flex flex-col gapy-y-2'>
                    <label className='font-bold text-slate-400'>Student's address</label>
                    <input 
                        className='w-full placeholder-slate-300 border-slate-300 text-xs'
                        type="text" 
                        value={studentAddress}
                        onChange={(e) =>{setStudentAddress(e.target.value)}}
                        placeholder='e.g 0x000000000000000000000000000000000'
                    />
                </div>
                
                <button
                    type='button'
                    onClick={()=>{getStudent()}}
                    className='py-2 text-white bg-gradient-to-br from-indigo-900 to-purple-400 cursor-pointer hover:shadow hover:shadow-purple-400 rounded-md w-6/12 mx-auto'
                >
                    proceed
                </button>
                {isPending && <Loading/>}
            </div>
            
            {student && student.name != '' && <div className='bg-white p-5 rounded-lg md:w-5/12 m-auto gap-y-4 grid grid-cols-4 gap-x-4 grid-cols-1'>
                <div className='p-2 bg-purple-200 rounded-md flex'>
                    <img className='m-auto' src={img1} alt="" />
                </div>
                
                <div className='col-span-2 grid grid-cols-2 gap-2'>
                    <div className='flex flex-col'>
                        <small className='text-xs font-light'>Name</small>
                        <h4 className='font-bold text-slate-300'>{student.name}</h4>
                    </div>
                    
                    <div className='flex flex-col'>
                        <small className='text-xs font-light'>Age</small>
                        <h4 className='font-bold text-slate-300'>{student.age}</h4>
                    </div>

                    <div className='flex flex-col'>
                        <small className='text-xs font-light'>Xp_earnings</small>
                        <h4 className='font-bold text-slate-300'>N{student.xp_earnings}</h4>
                    </div>

                    <div className='flex flex-col gap-y-1'>
                        <small className='text-xs font-light'>is_active</small>
                        {student.is_active ? <HiMiniHandThumbUp color='green'/> : <HiMiniXCircle color='red'/>}
                    </div>
                     
                </div>
                
            </div>}
            
            <div className='w-full bottom-2 ml-2 fixed'>
                <h4
                    className='text-semibold text-xs text-white'
                    onLoad={getOwner()}
                >
                    contractOwner:  {owner != `` ? `0x${owner}  🚀` : `loading ...`}
                </h4>
            </div>
            {studentForm && <StudentForm close={() => {setStudentForm(false)}} provider={provider} abi={att_abi} contractAddress={att_address}/>}
        </div>
     );
}
 
export default Dashboard;