import React from 'react'
import { useState, useEffect }  from "react"
import Category from '../components/category'
import Mannequin from '../components/Mannequin'

const CreateOutfit = () => {

    // const [items, setItems] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedItems, setSelectedItems] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
    })

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('http://localhost:3000/categories')
            const json = await response.json()

            setCategories(json)
            return json
         }

         fetchCategories()
    }, [])

    const handleSelectItem = (categoryId, item) => {
        setSelectedItems((prev) => ({
            ...prev,
            [categoryId]: item
        }))
        console.log('Selected items:', selectedItems)
    }

    return (
        <div className='flex min-h-screen flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8'>
            <div className='w-full lg:w-2/3 lg:pr-6'>
                {categories.map(category => {
                    return (
                        <Category
                            key={category.category_id}
                            category_id={category.category_id}
                            name={category.name}
                            selectItem={(item) => handleSelectItem(category.category_id, item)}
                        />
                    )
                })
                }
            </div>
            <div className='w-full lg:w-1/3'>
                <Mannequin
                    selectedItems={selectedItems}
                />
            </div>
        </div>
    )
}

export default CreateOutfit
