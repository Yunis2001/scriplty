'use client'

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import UploadFile from "@/components/upload-file";
import { Download, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Markdown from 'react-markdown'
import DownloadButton from "@/components/document/download-button";

const DashBoard = () => {
    const [documents, setDocuments] = useState<Array<{ document_id: number; title: string,content:string,rawText:string}>>([]);
    const [isLoading, setLoading] = useState(true);

    const getDocuments = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/get-documents");

            const data = await response.json();
    
            if(response.ok){
                console.log("Documents retrieved successfully")
                setDocuments(data.documents);
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }

    const deleteDocument = async (documentId:string) => {
        const response = await fetch("/api/delete-documents",{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: documentId,
        });
        if(response.ok){
            toast.success("Document deleted successfully")
        }
    }

    useEffect(()=>{
        getDocuments();
    },[]);

    const onUploadSuccess = ()=> {
        getDocuments();
    }

    return ( 
        <div className="w-full my-10 pb-5 grid justify-items-center sm:justify-items-start grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-9">
            < UploadFile onUploadSuccess={onUploadSuccess} />
            {isLoading ? (
                // Show skeletons while loading
                <>
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <Skeleton key={idx} className="w-[300px] sm:w-[200px] flex flex-col shadow-xl rounded-md border-2 outline-none py-5 px-3">
                            <Skeleton className="w-full h-[150px]" />
                            <Skeleton className="w-full " />
                        </Skeleton>
                    ))}
                </>
            ) : (
                documents ? (
                    documents.map((doc, id) => (
                        <article key={id} className="w-[300px] sm:w-[200px] bg-white flex flex-col shadow-xl rounded-md border-2 outline-none py-5 px-3">
                            <Link href={`/docs/${doc.document_id}`} className="mb-3">
                                <header className="w-full">
                                    <h1 className="font-bold uppercase mb-3 text-sm">{doc.title.substring(0, doc.title.lastIndexOf('.'))}</h1>
                                    <Markdown className="text-sm sm:text-sm overflow-hidden h-[100px]">{doc.content.substring(0,180)}</Markdown>
                                </header>
                            </Link>
                            <footer className="w-full flex justify-center shadow-2xl py-2 rounded-md border-2 outline-none mt-auto gap-2">
                                <Button variant='outline' onClick={()=> {
                                    deleteDocument(`${doc.document_id}`)
                                    setTimeout(getDocuments,1000)
                                    }}>
                                    <Trash className="w-4 h-4" />
                                </Button>
                                <DownloadButton document_id={doc.document_id}>
                                    <Button variant='outline'>
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </DownloadButton>
                            </footer>
                        </article>
                    ))   
                ):
                (
                    <div></div>
                )
            )}
        </div>
     );
}
 
export default DashBoard;