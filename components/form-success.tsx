import { ShieldCheck } from 'lucide-react';

interface FormSuccessProps {
    message?:string;
}

const FormSuccess = ({message}: FormSuccessProps) => {
    if (!message) {
        return null;
    }
    return ( 
        <div className='w-full bg-teal-600 flex gap-x-2 p-3 rounded-md text-white text-sm items-center'>
            <ShieldCheck />
            <p>{message}</p>
        </div>    
    );
}
 
export default FormSuccess;