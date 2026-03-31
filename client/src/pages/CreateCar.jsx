import React from 'react'
import { useState, useEffect }  from "react"
import Item from '../components/Item'

const CreateOutfit = () => {

    const [items, setItems] = useState([])

    useEffect(() => {
        const fetchItems = async () => {
                const response = await fetch('http://localhost:3000/items')
                const json = await response.json()

                setItems(json)
                return json
        }

        fetchItems()
    }, [])

    return (
        <div>
            <p>You're creating a fit!</p>
            {items.map(item => (
                <Item
                    key={item.id}
                    name={item.name}
                    category_id={item.category_id}
                    style_tag={item.style_tag}
                    price={item.price}
                    image={item.image}
                />
            ))}
        </div>
    )
}

export default CreateOutfit
