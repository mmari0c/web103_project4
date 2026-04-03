import { useEffect, useState } from 'react'
import Outfit from '../components/Outfit'
import { Link } from 'react-router-dom'

const ViewOutfit = () => {
   const [outfits, setOutfits] = useState([])

   useEffect(() => {
      const fetchOutfits = async () => {
         const response = await fetch('http://localhost:3000/outfits')
         const json = await response.json()
         setOutfits(json)
      }

      fetchOutfits()
   }, [])

   return (
      <div className='min-h-screen px-4 py-6 lg:px-8'>
         <section className='mb-6'>
            <div className='mb-4 flex items-center justify-between'>
               <div>
                  <h1 className='text-2xl font-bold'>Saved Outfits</h1>
                  <p className='text-sm text-gray-500'>Browse every fit you have built so far.</p>
               </div>
            </div>

            {outfits.length === 0 ? (
               <div className=''>
                  No outfits saved yet.
               </div>
            ) : (
               <div className='flex flex-wrap gap-4 pb-2'>
                  {outfits.map((outfit) => {
                     const outfitSlots = {
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

                     return (
                        <Link to={`/outfits/${outfit.outfit_id}`}>
                           <article key={outfit.outfit_id} className='w-[22rem] min-w-[22rem] flex-none border rounded-lg border-gray-200 bg-white'>
                              <div className=' bg-white p-4'>
                                 <div className='mb-4 flex items-start justify-between gap-4'>
                                    <div>
                                       <h2 className='text-lg font-semibold text-gray-900'>{outfit.name}</h2>
                                    </div>
                                 </div>
                                 <Outfit
                                    slots={outfitSlots}
                                    showSummary
                                    summaryTitle='Included Pieces'
                                 />
                              </div>
                           </article>
                        </Link>
                     )
                  })}
               </div>
            )}
         </section>
      </div>
   )
}

export default ViewOutfit
