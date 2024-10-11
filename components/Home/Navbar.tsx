import { HeartIcon, User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ShoppingCart from "../Helpers/ShoppingCart";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
    return (
        <div className='h-[12vh] sticky top-0 z-[1] bg-white shadow-md'>
            <div className='flex items-center justify-between w-[95%] md:w-4/5 mx-auto h-full'>
                <Link href="/">
                <Image src="/images/logo.png" alt="logo" height={140} width={140} />
                </Link>
                <div className="flex items-center space-x-6">
                    <HeartIcon size={26} cursor={"pointer"}></HeartIcon>
                    <ShoppingCart></ShoppingCart>
                   <SignedIn>
                    <UserButton></UserButton>
                   </SignedIn>
                   <SignedOut>
                    <SignInButton>
                    <User2Icon size={26} cursor={"pointer"}></User2Icon>
                    </SignInButton>
                   </SignedOut>
                   
                </div>
            </div>
            
        </div>
    );
};

export default Navbar;