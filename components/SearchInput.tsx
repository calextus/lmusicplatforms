"use client";

import qs from "query-string";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./Input";

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const debouncedvalue = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            title: debouncedvalue,
        };

        const url = qs.stringifyUrl({
            url: '/search',
            query: query
        })

        router.push(url);
    }, [debouncedvalue, router]);

    return (
        <Input 
        placeholder="O batla ho mamela mino o feng ?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        />
    )
}

export default SearchInput;