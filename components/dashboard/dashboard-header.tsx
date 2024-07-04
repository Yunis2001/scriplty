import Image from "next/image";
import UserButton from "./user-button";
import MobileNav from "./mobile-nav";
import SearchBar from "./search-bar";

const DashboardHeader = () => {
    return ( 
       <header className="mt-5 py-3">
            <div className="flex w-full justify-between items-center">
                <div className="lg:hidden">
                    <MobileNav />
                </div>
                <div className="flex gap-5 lg:w-full lg:justify-between">
                    <Image
                        className="w-28" 
                        src='/Logo.svg'
                        width={100}
                        height={40}
                        alt="Scriptly logo featuring a blue pen vector icon and text reading scriptly."
                    />

                    <UserButton />
                </div>
            </div>
            <div className="mt-5">
                <SearchBar />
            </div>
       </header> 
    );
}
 
export default DashboardHeader;