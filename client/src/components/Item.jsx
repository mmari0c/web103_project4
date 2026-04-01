import React from 'react'

const Item = (props) => {
   return (
      <article className='w-65 min-w-50 flex-none cursor-pointer' onClick={props.selectItem}>
         <img
            src={props.image}
            alt={props.name}
            className={`w-full border p-2 ${props.isSelected ? 'border-black' : 'border-gray-300'}`}
         />
         <div className='mt-3'>
            <h3 className={props.isSelected ? 'font-bold' : 'font-medium'}>{props.name}</h3>
            <p className='text-sm text-gray-600'>${props.price}</p>
         </div>
      </article>
   )

}

export default Item
