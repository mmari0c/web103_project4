const Mannequin = (props) => {
   const selectedItems = Object.values(props.selectedItems || {}).filter(Boolean)
   const totalPrice = selectedItems.reduce((total, item) => total + Number(item.price || 0), 0)
   const topItem = props.selectedItems?.[1] || null
   const jacketItem = props.selectedItems?.[2] || null
   const bottomItem = props.selectedItems?.[3] || null
   const shoesItem = props.selectedItems?.[4] || null
   const topItemClassName = jacketItem
      ? 'absolute left-[34%] top-5 h-44 w-44 -translate-x-1/2 -rotate-12 object-contain'
      : 'absolute left-1/2 top-3 h-52 w-52 -translate-x-1/2 object-contain'

   function renderOutfit() {
      return (
         <div className='relative h-[34rem] w-full max-w-xs'>
            {topItem && (
               <img
                  src={topItem.image}
                  alt={topItem.name}
                  className={topItemClassName}
               />
            )}
            {jacketItem && (
               <img
                  src={jacketItem.image}
                  alt={jacketItem.name}
                  className='absolute left-1/2 top-0 h-52 w-52 -translate-x-1/2 object-contain'
               />
            )}
            {bottomItem && (
               <img
                  src={bottomItem.image}
                  alt={bottomItem.name}
                  className='absolute left-1/2 top-44 h-52 w-52 -translate-x-1/2 object-contain'
               />
            )}
            {shoesItem && (
               <img
                  src={shoesItem.image}
                  alt={shoesItem.name}
                  className='absolute left-1/2 bottom-1 w-45 -translate-x-1/2 object-contain'
               />
            )}
            {!topItem && !jacketItem && !bottomItem && !shoesItem && (
               <div className='flex h-full items-center justify-center'>
                  <p className='text-gray-500'>Select items to build your outfit!</p>
               </div>
            )}
         </div>
      )
   }

   // function renderSelectedSummary() {
   //    return (
   //       <div className='mt-4 flex flex-col gap-3'>
   //          {selectedItems.map((item) => (
   //             <div key={item.item_id} className='flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3'>
   //                <img src={item.image} alt={item.name} className='h-14 w-14 rounded-md object-cover' />
   //                <div>
   //                   <p className='font-semibold'>{item.name}</p>
   //                   <p className='text-sm text-gray-500'>{item.style_tag}</p>
   //                </div>
   //             </div>
   //          ))}
   //       </div>
   //    )
   // }

   return (
      <aside className='sticky top-6 rounded-sm border border-gray-200 bg-white p-4 max-w-full'>
         <div className='mb-4'>
            { selectedItems.length > 0 ? (
               <div className='flex items-center justify-between gap-3'>
                  <input type='text' placeholder='My Outfit' className=' p-2 rounded-md' />
                  <button className='rounded bg-black px-4 py-2 text-sm font-medium text-white'>Save Outfit</button>
               </div>
            ) : (
               null
            )
            }
            

         </div>
         <div className='flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4'>
            {renderOutfit()}
         </div>
         {/* {selectedItems.length > 0 && renderSelectedSummary()} */}
         <div className='mt-4'>
            <div className='flex items-center justify-between'>
               <p className='text-sm text-gray-500'>Total</p>
               <p className='text-lg font-semibold'>${totalPrice.toFixed(2)}</p>
            </div>
         </div>
      </aside>
   )
}

export default Mannequin
