import React from 'react'
import { useState, useEffect }  from "react"
import Item from '../components/Item'
import Category from '../components/category'
import Mannequin from '../components/Mannequin'

const CreateOutfit = () => {

    // const [items, setItems] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('http://localhost:3000/categories')
            const json = await response.json()

            setCategories(json)
            return json
         }

         fetchCategories()
    }, [])

    return (
        <div className='flex min-h-screen flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8'>
            <div className='w-full lg:w-3/4 lg:pr-6'>
                {categories.map(category => {
                    return (
                        <Category
                            key={category.category_id}
                            category_id={category.category_id}
                            name={category.name}
                        />
                    )
                })
                }
            </div>
            <div className='w-full lg:w-1/4'>
                <Mannequin />
            </div>
        </div>
    )
}

export default CreateOutfit
