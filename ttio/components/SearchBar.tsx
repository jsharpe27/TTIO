'use client'

import { FunctionComponent, useState } from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { useDebounce } from "@/hooks/UseDebouncedValue";

interface SearchBarProps {   
}
 
const SearchBar: FunctionComponent<SearchBarProps> = () => {
    const [value, setvalue] = useState('')
    const debouncedValue = useDebounce(value, 500);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setvalue(e.target.value)
    }

    // TODO: do the db search here using debouncedValue
    // the debounced value represents the value of the input after 500ms of no typing

    return (
        <div
            className="w-full max-w-2xl px-6 my-4 relative"
        >
            <SearchIcon
                size={24}
                className="absolute top-1/2 left-10 transform -translate-y-1/2"
            />
            <Input
                placeholder="Search for the Truth..."
                className="w-full h-12 rounded-3xl py-4 pl-12 border-2 border-primary/50 focus:border-none transition-all duration-100"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}
 
export default SearchBar;