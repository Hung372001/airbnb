'use client'
import { signIn} from 'next-auth/react'
import axios from 'axios'
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import React, {useCallback, useState} from 'react';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modals from "@/app/components/modals/Modals";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Input/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import userLoginModal from "@/app/hooks/useLogInModal";
import {useRouter} from "next/navigation";
import registerModal from "@/app/components/modals/RegisterModal";


const LoginModal = () => {
    const router = useRouter()
    const loginModal = userLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register, handleSubmit, formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const registerModal = useRegisterModal();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
      signIn('credentials',{
          ...data,
          redirect: false,
      }).then((callback) => {
          setIsLoading(false)
          if (callback?.ok) {
               toast.success('Login success')
              router.refresh()
              loginModal.onClose()
          }
          if(callback?.error){
              toast.error(callback?.error)
          }
      })
    }
    const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal])
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subTitle=" Login to your account"/>
            <Input id="email" type="Email" label="Email" disabled={isLoading} register={register} errors={errors}
                   required/>

            <Input id="password" type="password" label="password" disabled={isLoading} register={register}
                   errors={errors} required/>
        </div>
    )
    const footerContent = (
        <div className=" flex flex-col gap-4 mt-3">
            <hr/>
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={()=>signIn('google')}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={()=>signIn('github')}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div>
                    First time using Airbnb?
                </div>
                <div onClick={onToggle} className="text-neutral-800 cursor-pointer hover:underline">
                    Create an account
                </div>
            </div>
        </div>
    )
    return (
        <Modals disable={isLoading} isOpen={loginModal.isOpen} title="Login" actionLabel="Continue"
                onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent}
                footer={footerContent}/>
    );
};

export default LoginModal;