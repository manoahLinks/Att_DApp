import {FaSpinner} from 'react-icons/fa6'

const Loading = () => {
    return ( 
        <div className=" m-auto">
            <FaSpinner className='animate-spin' size={20} color='purple'/>
        </div>
     );
}
 
export default Loading;