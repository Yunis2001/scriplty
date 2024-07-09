'use client'
import DocumentSidebar from "@/components/document/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { processText } from "@/lib/process-text";
import { Download } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface CustomDocProps {
    title: string;
    content: string;
    document_id: number;
    rawText:string;
}

const DocumentView = () => {
    const params = useParams();
    const [document,setDocument] = useState<CustomDocProps | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState([])
    const documentId = params.id[0];

    const getDocument = async()=> {
        try {
            setLoading(true);
            const response = await fetch(`/api/docs/${documentId}`);
            const data = await response.json();
    
            if(response.ok){
                setDocument(data.document);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
        getDocumentCount();
    }

    const getDocumentCount = ()=> {
        const wordCount = document?.rawText.trim().split(/\s+/).length
        return wordCount;
        
    }

    const processDocument = async () => {
        if(!document){
            return;
        }
        const rawText = document.rawText;
        try {
            const result = await fetch('/api/process-text',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(rawText),
            })
    
            const data = await result.json();
            setSuggestions(data.result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getDocument();
    },[documentId]);

    useEffect(()=>{        
        processDocument()
    },[document]);
    return (
        <div className="p-5 relative">
            {!isLoading ?
            <div>
                <div className="fixed top-0 left-0 p-4 md:px-7 flex items-center justify-between bg-white w-full">
                    <div className="flex items-center gap-3">
                        <DocumentSidebar />
                        <div className="w-full h-full bg-blue-600 rounded-sm py-2 px-5">
                            <p className="text-white">{document?.title.substring(0,document.title.lastIndexOf('.'))}</p>
                        </div>
                    </div>
                    <div className="bg-blue-600 rounded-md p-2">
                        <Download className="stroke-white w-6 h-6" />
                    </div>
                </div>
                <div className="flex my-14">
                    <div className='hidden xl:block min-h-screen xl:border-r-2 xl:border-black w-1/2 overflow-scroll mt-7 px-3'>
                        {!document ? <div>No documents</div>: <div className='word-document-content font-thin' dangerouslySetInnerHTML={{__html:document.content}} />}
                    </div>
                    <div className='min-h-screen overflow-scroll mt-7 px-3 xl:pl-10'>
                        <div>TODO: Processed Document</div>
                    </div>
                </div>

                <div className="fixed bottom-0 right-0 left-0 bg-white flex justify-end p-6">
                    <div className="flex items-center">
                        {getDocumentCount()} words
                    </div>
                </div>
            </div>
            :
            <div className="flex">
                <div className="w-1/2 hidden xl:flex flex-col gap-10 p-10">
                    <Skeleton className="w-full rounded-r-xl p-9"/>
                    <Skeleton className="w-full min-h-screen px-5"/>
                </div>

                <div className="w-full xl:w-1/2 flex flex-col gap-10 p-3 xl:p-8">
                    <Skeleton className="w-full rounded-r-xl p-9"/>
                    <Skeleton className="w-full min-h-screen px-5"/>
                </div>
            </div>                
            }
                
        </div>
     );
}
 
export default DocumentView;