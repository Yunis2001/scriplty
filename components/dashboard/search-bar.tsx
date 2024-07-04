"use client"
import { Search } from "lucide-react";
import { Button } from "../ui/button";

const SearchBar = () => {
    const onClick = () => {
        //TODO: Handle search operations for the documents.
    }

    return ( 
        <div>
            <form className="w-full relative lg:flex gap-5 items-center" action="">
                <input className="w-full py-2 px-3 rounded-2xl border-solid border-[1.5px] border-black flex-1" type="text" placeholder="Search a document" />
                <Search className="absolute top-1/4 right-3 lg:relative lg:w-8 lg:h-8 stroke-[1px]" onClick={()=>onClick} />
            </form>
        </div>
     );
}
 
export default SearchBar;