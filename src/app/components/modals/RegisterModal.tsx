'use client'
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
import { signIn } from "next-auth/react";
import userLoginModal from "@/app/hooks/useLogInModal";


const RegisterModal = () => {
    const loginModal = userLoginModal()
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register, handleSubmit, formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            // confirmPassword:''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/register', data)
            .then(() => {
                toast.success('Registered!');
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch(err => {
                toast.error("Something went wrong   ")
            }).finally(() => {
            setIsLoading(false)

        })
    }
    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subTitle="Create an account"/>
            <Input id="email" type="Email" label="Email" disabled={isLoading} register={register} errors={errors}
                   required/>
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required
                   errors={errors}/>
            <Input id="password" type="password" label="password" disabled={isLoading} register={register}
                   errors={errors} required/>
        </div>
    )
    const footerContent = (
        <div class=" flex flex-col gap-4 mt-3">
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
                    Already have an account?
                </div>
                <div onClick={onToggle} className="text-neutral-800 cursor-pointer hover:underline">
                    Login
                </div>
            </div>
        </div>
    )
    return (
        <Modals disable={isLoading} isOpen={registerModal.isOpen} title="Register" actionLabel="Continue"
                onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent}
                footer={footerContent}/>
    );
};

export default RegisterModal;