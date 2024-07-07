import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { AlignJustify, Download, Home, LogOut, XIcon} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '../ui/separator'
import { logOut } from '@/app/actions/Logout'
import LogoutButton from '../logout-button'

const DocumentSidebar = () => {
    const links = [
        {
            title: 'Close', 
            icon:<XIcon className='w-7 h-7 stroke-[1px]'/>,
        },
        {
            title: 'Dashboard',
            icon:<Home className='w-7 h-7 stroke-[1px]'/>,
            home:true,
        }
    ]

    const onCLick = ()=>{
        logOut();
    }
  return (
    <div>
      <Sheet>
        <SheetTrigger>
            <Button className='shadow-md' variant='outline'>
                <AlignJustify className='stroke-[1px] w-8 h-8' />
            </Button>
        </SheetTrigger>
        <SheetContent className='px-10 py-16 flex flex-col gap-5' side='left'>
            <SheetHeader className='mb-14'>
                <Image 
                    src='/Logo.svg'
                    width={150}
                    height={40}
                    alt='Scriptly logo featuring a blue pen and dark text reading scriptly side by side'
                />
            </SheetHeader>
            <div className='flex flex-col gap-6'>
                {links.map((link,index)=>(
                    <SheetClose key={index} className=''>
                        {!!link.home ? (
                            <Link className='flex items-center gap-3' href='/dashboard'>
                                {link.icon} 
                                <Button variant='link' className='text-2xl font-light'>{link.title}</Button>
                            </Link>
                        ):
                        (
                            <div className='flex items-center gap-3'>
                                {link.icon}
                                <Button variant='link' className='text-2xl font-light'>{link.title}</Button>
                            </div>
                        )
                    
                    }
                    </SheetClose>
                    ))
                }
            </div>
            <Separator orientation='horizontal'/>

            <div>
                <SheetClose>
                    <div className='flex items-center gap-3'>
                        <Download className='h-7 w-7 stroke-[1px]' />
                        <Button variant='link' className='text-2xl font-light'>Download</Button>
                    </div>
                </SheetClose>
            </div>
            <SheetClose className='mt-auto'>
                <LogoutButton />
            </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default DocumentSidebar
