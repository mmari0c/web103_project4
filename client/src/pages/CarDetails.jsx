import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Outfit from '../components/Outfit'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const OutfitDetails = () => {
   const [outfit, setOutfit] = useState(null)
   const { id: outfitId } = useParams()

   useEffect(() => {
      const fetchOutfit = async () => {
         const response = await fetch(`http://localhost:3000/outfits/${outfitId}`)
         const data = await response.json()
         setOutfit(data)
      }

      fetchOutfit()
   }, [outfitId])

   const outfitSlots = outfit
      ? {
           top: {
              item_id: outfit.top_item_id,
              name: outfit.top_name,
              image: outfit.top_image,
              price: outfit.top_price
           },
           jacket: outfit.jacket_item_id
              ? {
                   item_id: outfit.jacket_item_id,
                   name: outfit.jacket_name,
                   image: outfit.jacket_image,
                   price: outfit.jacket_price
                }
              : null,
           bottom: {
              item_id: outfit.bottom_item_id,
              name: outfit.bottom_name,
              image: outfit.bottom_image,
              price: outfit.bottom_price
           },
           shoes: {
              item_id: outfit.shoes_item_id,
              name: outfit.shoes_name,
              image: outfit.shoes_image,
              price: outfit.shoes_price
           }
        }
      : null

   const itemRows = [
      { label: 'Top', item: outfitSlots?.top },
      { label: 'Jacket', item: outfitSlots?.jacket },
      { label: 'Bottom', item: outfitSlots?.bottom },
      { label: 'Shoes', item: outfitSlots?.shoes }
   ]

   const totalPrice = itemRows.reduce((total, { item }) => total + Number(item?.price || 0), 0)

   return (
      <div className='min-h-screen px-4 py-6 lg:px-8'>
         {!outfit ? (
            <div className='rounded-xl bg-gray-50 px-6 py-10 text-center text-gray-500'>Loading outfit...</div>
         ) : (
            <section className='mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
               <div className='rounded-2xl bg-white p-4 border border-gray-200'>
                  <div className='mb-4 flex items-center justify-between gap-4'>
                     <h1 className='text-3xl font-bold text-gray-900'>{outfit.name}</h1>
                     <Link to={`/edit/${outfitId}`} className='text-gray-500 hover:text-gray-700'>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                     </Link>
                      </div>
                  <Outfit slots={outfitSlots} />
               </div>

               <div className='rounded-2xl bg-white p-6 border border-gray-200 h-fit'>
                  <div className='mb-6 flex items-start justify-between gap-4'>
                     <div>
                        <p className='text-sm uppercase tracking-[0.2em] text-gray-500'>Total</p>
                        <h2 className='text-xl font-semibold text-gray-900'>Included Pieces</h2>
                     </div>
                     <p className='text-lg font-semibold text-gray-900'>${totalPrice.toFixed(2)}</p>
                  </div>

                  <div className='space-y-3'>
                     {itemRows.map(({ label, item }) => (
                        <div
                           key={label}
                           className='flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3'
                        >
                           <div>
                              <p className='text-xs uppercase tracking-[0.18em] text-gray-500'>{label}</p>
                              <p className='text-sm font-medium text-gray-900'>
                                 {item?.name || `No ${label.toLowerCase()} selected`}
                              </p>
                           </div>
                           <p className='text-sm text-gray-600'>
                              {item ? `$${Number(item.price).toFixed(2)}` : '-'}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </section>
         )}
      </div>
   )
}

export default OutfitDetails
