import { TriangleAlertIcon } from 'lucide-react';

interface FormErrorProps {
    message?:string;
}

const FormError = ({message}: FormErrorProps) => {
    if (!message) {
        return null;
    }
    return ( 
        <div className='w-full bg-destructive/15 flex gap-x-2 p-3 rounded-md text-destructive text-sm items-center'>
            <TriangleAlertIcon />
            <p>{message}</p>
        </div>    
    );
}
 
export default FormError;