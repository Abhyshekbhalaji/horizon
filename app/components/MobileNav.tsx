'use client';
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
  
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Footer from './Footer';
const MobileNav = ({user}:MobileNavProps) => {
    const path=usePathname();
  return (
    <section className='w-full max-w-[264px]'>
<Sheet>
  <SheetTrigger>
    

    <Image
    src='/icons/hamburger.svg'
    width={30}
    height={30}
     alt="menu"
     className='cursor-pointer'/>
      
  </SheetTrigger>
  <SheetContent side="left" className='border-none bg-white'>




  <Link href='/' className=' cursor-pointer flex items-center gap-1 px-4' >
            <Image src="/icons/logo.svg" width={34} height={34} alt="Horizon Logo"  />
            <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
       
            </Link>
             <div className='mobilenav-sheet' >
           
               <SheetClose asChild>
                <nav className='flex h-full flex-col gap-6 pt-16 text-white'>
                {sidebarLinks.map((link)=>
            { 
                const isActive=path===link.route || path.startsWith(`${link.route}/`) 
                return (
                    <SheetClose asChild key={link.route} >
                  <Link className={cn('mobilenav-sheet_close w-full',{
                    'bg-bankGradient':isActive
                })} href={link.route} key={link.label}>
                    
                    <Image src={link.imgURL}
                     alt={link.label}
                
                    width={20}
                    height={20}
                    className={cn({
                        "brightness-[3] invert-0": isActive, // Correctly wrapped the class name in quotes
                      })}

                     />
               
                    <p className={cn('text-16 font-semibold text-black-2',{
                        '!text-white':isActive
                    })}>{link.label}</p>
                </Link>       
               
                    </SheetClose>
                
            )})}

            Userdata
                </nav>
               </SheetClose>
       
        <Footer user={user} type='mobile'/>
             </div>
           
            
  </SheetContent>
</Sheet>

    </section>
  )
}

export default MobileNav