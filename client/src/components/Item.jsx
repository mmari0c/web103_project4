import React from 'react'
import { useState, useEffect } from 'react'

const Item = (props) => {
   const [item, setItem] = useState({
      name: '',
      category_id: null,
      style_tag: '',
      price: null,
      image: ''
   })

   useEffect( () => {
      setItem({
         name: props.name,
         category_id: props.category_id,
         style_tag: props.style_tag,
         price: props.price,
         image: props.image
      })
   }, [props])

   return (
      <article className='w-65 min-w-50 flex-none'>
         <img src={item.image} alt={item.name} className=' w-full border border-gray-300 p-2'/>
         <div className='mt-3'>
            <h3 className='font-medium'>{item.name}</h3>
            <p className='text-sm text-gray-600'>${item.price}</p>
         </div>
      </article>
   )

}

export default Item
