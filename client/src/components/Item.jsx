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
      <div className=''>
         <img src={item.image} alt={item.name} className=''/>
         <h3>{item.name}</h3>
         <p>Price: ${item.price}</p>
      </div>
   )

}

export default Item