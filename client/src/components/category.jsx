import React from 'react'
import { useState, useEffect } from 'react'
import Item from './Item'

const Category = (props) => {
   const [items, setItems] = useState([])
   const [selectedItem, setSelectedItem] = useState(null)

   useEffect(() => {
      const fetchItems = async () => {
         if (!props.category_id) return

         const response = await fetch(`http://localhost:3000/items/category/${props.category_id}`)
         const json = await response.json()
         setItems(json)
      }
      fetchItems()
      console.log('Items after fetch:', items)
   }, [props.category_id])

   useEffect(() => {
      if (!props.selectItem) return

      props.selectItem(selectedItem)
   }, [selectedItem, props.selectItem])

   return (
      <section className='mb-6'>
         <div className='mb-4 flex items-center justify-between'>
            <h3 className='text-lg font-bold'>{props.name}</h3>
            <p className='text-sm text-gray-500'>Scroll to view more</p>
         </div>
         <div className='flex gap-3 overflow-x-auto pb-2'>
            {items.map((item) => (
               <Item
                  key={item.item_id}
                  item_id={item.item_id}
                  name={item.name}
                  category_id={item.category_id}
                  style_tag={item.style_tag}
                  price={item.price}
                  image={item.image}
                  isSelected={selectedItem?.item_id === item.item_id}
                  selectItem={() => setSelectedItem(selectedItem?.item_id === item.item_id ? null : item)}
               />
            ))}
         </div>
      </section>
   )
}

export default Category
