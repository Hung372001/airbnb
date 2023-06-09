'use client'
import React, {useCallback, useState} from 'react';
import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "@/app/components/navbar/Avatar";
import MenuItem from "@/app/components/navbar/MenuItem";
import userRegisterModal from "@/app/hooks/useRegisterModal";
import userLoginModal from "@/app/hooks/useLogInModal";
import {User} from "@prisma/client";
import {mockSession} from "next-auth/client/__tests__/helpers/mocks";
import user = mockSession.user;
import userRentModal from "@/app/hooks/useRentModal";
import {useRouter} from "next/navigation";

interface UserMenuProps {
    currentUser?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const router = useRouter()
    const registerModal = userRegisterModal()
    const loginModal = userLoginModal()
    const rentModal = userRentModal()
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])
    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }
        rentModal.onOpen()

    }, [currentUser, loginModal,rentModal])
    return (
        <div className="relative ">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    Air your bnb
                </div>
                <div onClick={toggleOpen}
                     className="p-4 md:py-1 md:px-2 border-[1px] border-netral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex  flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={() => router.push("/trips")}
                                    label="My trips"
                                />
                                <MenuItem
                                    onClick={() => {
                                    }}
                                    label="My favorites"
                                />
                                <MenuItem
                                    onClick={() => router.push("/reservations") }
                                    label="My reservations"
                                />
                                <MenuItem
                                    onClick={() => {
                                    }}
                                    label="My properties"
                                />
                                <MenuItem
                                    onClick={rentModal.onOpen}
                                    label="Airbnb my home"
                                />
                                <hr/>
                                <MenuItem
                                    onClick={() => {
                                    }}
                                    label="Log out"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="Register"
                                />
                            </>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;