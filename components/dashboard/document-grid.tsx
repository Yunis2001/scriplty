'use client'

import { Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import UploadFile from "../upload-file"

interface DocumentsGridProps {
    showUploadComponent?: boolean
}

function DocumentsGrid({showUploadComponent}:DocumentsGridProps) {
  return (
    <div className="w-full my-10 pb-5 grid justify-items-center sm:justify-items-start grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-9">
        {showUploadComponent && <UploadFile />}
        <article className="w-[300px] sm:w-[200px] bg-white flex flex-col gap-4">
            <Link href='/docs/123'>
                <header className="w-full shadow-xl py-4 px-5 rounded-md border-2 outline-none">
                    <h1 className="font-bold uppercase mb-3 text-lg">Document Title</h1>
                    <p className="text-sm sm:text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sit cumque soluta aspernatur inventore quisquam ipsam fuga, iure, expedita sunt mollitia vel officia ducimus, molestias accusantium doloremque adipisci sint facilis.</p>
                </header>
            </Link>
            <footer className="w-full flex justify-center shadow-2xl py-1 rounded-md border-2 outline-none">
                <Button variant='link' onClick={()=> {}}>
                    <Trash />
                </Button>
            </footer>
        </article>

        <article className="w-[300px] sm:w-[200px] bg-white flex flex-col gap-4">
            <Link href='/'>
                <header className="w-full shadow-xl py-4 px-5 rounded-md border-2 outline-none">
                    <h1 className="font-bold uppercase mb-3 text-lg">Document Title</h1>
                    <p className="text-sm sm:text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sit cumque soluta aspernatur inventore quisquam ipsam fuga, iure, expedita sunt mollitia vel officia ducimus, molestias accusantium doloremque adipisci sint facilis.</p>
                </header>
            </Link>
            <footer className="w-full flex justify-center shadow-2xl py-1 rounded-md border-2 outline-none">
                <Button variant='link' onClick={()=> {}}>
                    <Trash />
                </Button>
            </footer>
        </article>

        <article className="w-[300px] sm:w-[200px] bg-white flex flex-col gap-4">
            <Link href='/'>
                <header className="w-full shadow-xl py-4 px-5 rounded-md border-2 outline-none">
                    <h1 className="font-bold uppercase mb-3 text-lg">Document Title</h1>
                    <p className="text-sm sm:text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sit cumque soluta aspernatur inventore quisquam ipsam fuga, iure, expedita sunt mollitia vel officia ducimus, molestias accusantium doloremque adipisci sint facilis.</p>
                </header>
            </Link>
            <footer className="w-full flex justify-center shadow-2xl py-1 rounded-md border-2 outline-none">
                <Button variant='link' onClick={()=> {}}>
                    <Trash />
                </Button>
            </footer>
        </article>

        <article className="w-[300px] sm:w-[200px] bg-white flex flex-col gap-4">
            <Link href='/'>
                <header className="w-full shadow-xl py-4 px-5 rounded-md border-2 outline-none">
                    <h1 className="font-bold uppercase mb-3 text-lg">Document Title</h1>
                    <p className="text-sm sm:text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sit cumque soluta aspernatur inventore quisquam ipsam fuga, iure, expedita sunt mollitia vel officia ducimus, molestias accusantium doloremque adipisci sint facilis.</p>
                </header>
            </Link>
            <footer className="w-full flex justify-center shadow-2xl py-1 rounded-md border-2 outline-none">
                <Button variant='link' onClick={()=> {}}>
                    <Trash />
                </Button>
            </footer>
        </article>

        <article className="w-[300px] sm:w-[200px] bg-white flex flex-col gap-4">
            <Link href='/'>
                <header className="w-full shadow-xl py-4 px-5 rounded-md border-2 outline-none">
                    <h1 className="font-bold uppercase mb-3 text-lg">Document Title</h1>
                    <p className="text-sm sm:text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sit cumque soluta aspernatur inventore quisquam ipsam fuga, iure, expedita sunt mollitia vel officia ducimus, molestias accusantium doloremque adipisci sint facilis.</p>
                </header>
            </Link>
            <footer className="w-full flex justify-center shadow-2xl py-1 rounded-md border-2 outline-none">
                <Button variant='link' onClick={()=> {}}>
                    <Trash />
                </Button>
            </footer>
        </article>

        <article className="w-[300px] sm:w-[200px] bg-white flex flex-col gap-4">
            <Link href='/'>
                <header className="w-full shadow-xl py-4 px-5 rounded-md border-2 outline-none">
                    <h1 className="font-bold uppercase mb-3 text-lg">Document Title</h1>
                    <p className="text-sm sm:text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sit cumque soluta aspernatur inventore quisquam ipsam fuga, iure, expedita sunt mollitia vel officia ducimus, molestias accusantium doloremque adipisci sint facilis.</p>
                </header>
            </Link>
            <footer className="w-full flex justify-center shadow-2xl py-1 rounded-md border-2 outline-none">
                <Button variant='link' onClick={()=> {}}>
                    <Trash />
                </Button>
            </footer>
        </article>

        <article className="w-[300px] sm:w-[200px] bg-white flex flex-col gap-4">
            <Link href='/'>
                <header className="w-full shadow-xl py-4 px-5 rounded-md border-2 outline-none">
                    <h1 className="font-bold uppercase mb-3 text-lg">Document Title</h1>
                    <p className="text-sm sm:text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sit cumque soluta aspernatur inventore quisquam ipsam fuga, iure, expedita sunt mollitia vel officia ducimus, molestias accusantium doloremque adipisci sint facilis.</p>
                </header>
            </Link>
            <footer className="w-full flex justify-center shadow-2xl py-1 rounded-md border-2 outline-none">
                <Button variant='link' onClick={()=> {}}>
                    <Trash />
                </Button>
            </footer>
        </article>

        <article className="w-[300px] sm:w-[200px] bg-white flex flex-col gap-4">
            <Link href='/'>
                <header className="w-full shadow-xl py-4 px-5 rounded-md border-2 outline-none">
                    <h1 className="font-bold uppercase mb-3 text-lg">Document Title</h1>
                    <p className="text-sm sm:text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sit cumque soluta aspernatur inventore quisquam ipsam fuga, iure, expedita sunt mollitia vel officia ducimus, molestias accusantium doloremque adipisci sint facilis.</p>
                </header>
            </Link>
            <footer className="w-full flex justify-center shadow-2xl py-1 rounded-md border-2 outline-none">
                <Button variant='link' onClick={()=> {}}>
                    <Trash />
                </Button>
            </footer>
        </article>

        <article className="w-[300px] sm:w-[200px] bg-white flex flex-col gap-4">
            <Link href='/'>
                <header className="w-full shadow-xl py-4 px-5 rounded-md border-2 outline-none">
                    <h1 className="font-bold uppercase mb-3 text-lg">Document Title</h1>
                    <p className="text-sm sm:text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sit cumque soluta aspernatur inventore quisquam ipsam fuga, iure, expedita sunt mollitia vel officia ducimus, molestias accusantium doloremque adipisci sint facilis.</p>
                </header>
            </Link>
            <footer className="w-full flex justify-center shadow-2xl py-1 rounded-md border-2 outline-none">
                <Button variant='link' onClick={()=> {}}>
                    <Trash />
                </Button>
            </footer>
        </article>

        <article className="w-[300px] sm:w-[200px] bg-white flex flex-col gap-4">
            <Link href='/'>
                <header className="w-full shadow-xl py-4 px-5 rounded-md border-2 outline-none">
                    <h1 className="font-bold uppercase mb-3 text-lg">Document Title</h1>
                    <p className="text-sm sm:text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sit cumque soluta aspernatur inventore quisquam ipsam fuga, iure, expedita sunt mollitia vel officia ducimus, molestias accusantium doloremque adipisci sint facilis.</p>
                </header>
            </Link>
            <footer className="w-full flex justify-center shadow-2xl py-1 rounded-md border-2 outline-none">
                <Button variant='link' onClick={()=> {}}>
                    <Trash />
                </Button>
            </footer>
        </article>
    </div>
  )
}

export default DocumentsGrid
