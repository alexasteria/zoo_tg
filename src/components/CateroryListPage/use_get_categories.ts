import {useEffect, useState} from "react";

export type Category = {
    depth: number
    description: string
    id: number
    name: string
    parent_id: number | null
}

const useGetCategories: () => {
    categories: Category[],
} = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const getCategories = async() => {
        const res = await fetch("https://zoomagasin.ru/api/api.php?route=sections")
        const result: {items: Category[]} = await res.json()
        setCategories(result.items)
    }
    useEffect(()=>{
        getCategories()
    },[])
    return {
        categories: categories
    }
}
export {useGetCategories}