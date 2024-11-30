'use client';
import React, { useState } from 'react'
import {  Loader2 } from 'lucide-react';
import Link from 'next/link'
import Image from 'next/image'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';


import { authFormSchema } from '@/lib/utils';
import CustomInput from './CustomInput';
import { signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';


const AuthForm = ({ type }: { type: string }) => {
    const router=useRouter();
  const [user, setUser] = useState(null)
  const [isLoading,setIsLoading]=useState(false)
    const formSchema=authFormSchema(type);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        firstName: "",
        lastName: "",
        address1: "",
        city:'',
        state: "",
        postalCode: "",
        dateOfBirth: "",
        ssn: "",
        email: "",
        password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    
    setIsLoading(true);
    try {
        const userData={
            firstName:data.firstName!,
            lastName:data.lastName!,
            address1:data.address1!,
            city:data.city!,
            state:data.state!,
            postalCode:data.postalCode!,
            dateOfBirth:data.dateOfBirth!,
            ssn:data.ssn!,
            email:data.email,
            password:data.password
        }
        if(type==='sign-up'){
            const newUser=await signUp(userData);
            if(newUser){
             setUser(newUser);    
            }
           
        }
        if(type==='sign-in'){
             const res=await signIn({
                email:data.email,
                 password:data.password
            })
            if(res){
                console.log('Redirecting to homepage...');
                router.push('/')
            }
        }
         


    } catch (error) {
        console.log(error);
    }
    finally{
      setIsLoading(false);   
    } 
  }

  return (
   
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
            <Link href='/' className=' cursor-pointer flex items-center gap-1' >
                <Image src="/icons/logo.svg" width={34} height={34} alt="Horizon Logo"  />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
           
                </Link>
                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user ??  type==='sign-in'?'Sign In':'Sign Up' }
                        <p className='text-16 font-normal text-gray-600'>
                            {user ? 'Link your account':'Please enter your details'}
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className='flex flex-col gap-4'>
                    <PlaidLink user={user} variant='primary' />
                </div>
            ):
            <>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {type==='sign-up' && (
                    <>
                    <div className='flex gap-4'>
                    <CustomInput control={form.control} name='firstName' label='First Name' placeholder='Enter your first name'/>
                   <CustomInput control={form.control} name='lastName' label='Last Name' placeholder='Enter your last name'/>    
                    </div>
                   
                   <CustomInput control={form.control} name='address1' label='Address' placeholder='Enter your specifc address'/>
                   <CustomInput control={form.control} name='city' label='City' placeholder='Enter your city'/>
                   <div className='flex gap-4'>
                    <CustomInput control={form.control} name='state' label='State' placeholder='Example:TN'/>
                   <CustomInput control={form.control} name='postalCode' label='Postal Code' placeholder='Example:00000'/> 
                   </div>
                  <div className='flex gap-4'> <CustomInput control={form.control} name='dateOfBirth' label='Date of  Birth' placeholder='YYYY/MM/DD'/>
                   <CustomInput control={form.control} name='ssn' label='SSN' placeholder='Example: 1234'/></div>
                  

                    </>

                )}
               
            <CustomInput control={form.control} name='email' label='Email' placeholder='Enter your email'/>
            <CustomInput  control={form.control} name='password' label='Password' placeholder='Enter your password' />
                <div className='flex flex-col gap-4'>
                <Button type="submit" className='form-btn' disabled={isLoading}>{isLoading ?(
                    <>
                    <Loader2 size={20} className='animate-spin' />&nbsp;
                    Loading...
                    </>
                ): type==='sign-in' ?'Sign in':'Sign up' }</Button>    
                </div>
                
            </form>
    </Form>
    <footer className='flex justify-center gap-1'>
        <p className='text-14 font-normal text-gray-600' >{type==='sign-in' ?'Dont have an account':'Already have an account?' }</p>
        <Link href={type==='sign-in'?'/sign-up':'/sign-in'} className='form-link'>{
            type==='sign-in'?'Sign Up':'Sign In'
        }</Link>

    </footer>
            </>
            }
        </section>
   
  )
}

export default AuthForm