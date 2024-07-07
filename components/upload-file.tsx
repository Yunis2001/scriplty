import { Button } from "./ui/button"
import { FolderUp, RotateCw, Upload } from "lucide-react"
import { useRef, useState } from "react"
import { Input } from "./ui/input"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UploadFileProps {
    onUploadSuccess: () => void;
}

const UploadFile = ({onUploadSuccess}:UploadFileProps) => {
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null);
    const [error,setError] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (e:any)=> {
        setFile(e.target.files[0]);
        console.log(file);
    }

    const onSubmit = async(e:any) => {
        e?.preventDefault();
        if (!file){
            toast.error('Please upload a file');
            return;
        };
        setError('');
        setIsUploading(true);

        const uploadedFile = new FormData();
        uploadedFile.append("original-document",file);
        try {
            const response = await fetch('/api/upload-document',{
                method: "POST",
                body:uploadedFile,
            });

            const data = await response.json();
            if(response.ok){
                toast.success("Document uploaded successfully");
                router.push(`/docs/${data.documentId}`);
                onUploadSuccess();
            }
            else {
                setError(data.message);
                toast(error);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setFile(null);
            setIsUploading(false);
        }
    }

  return (
    <form className="w-[300px] h-full sm:w-[200px] border-dashed border-2 border-blue-400 bg-white flex flex-col gap-4 p-4 items-center">
        <Input ref={inputRef} onChange={handleFileChange} type="file" id="original-document-upload" accept=".docx" className="hidden"/>
        <div onClick={() => { inputRef.current?.click() }} className="w-[150px] h-[150px] bg-blue-400 rounded-full flex justify-center items-center cursor-pointer">
            <FolderUp className="w-10 h-10 stroke-white" />
        </div>
        <div>
            {file && <p>{file.name}</p>}
        </div>
        <Button className="flex items-center shadow-xl mt-auto justify-center w-full" variant='outline' onClick={onSubmit}>
            {!isUploading ?
                <span className="flex gap-2">Upload Document&nbsp;<Upload className="w-4 h-4" /></span> :
                <span className="w-full flex justify-center">Uploading&nbsp;<RotateCw className="w-5 h-5 animate-spin"/></span>
            }
        </Button>
    </form>
  )
}

export default UploadFile
