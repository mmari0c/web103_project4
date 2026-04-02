import Outfit from './Outfit'

const Mannequin = (props) => {
   const selectedItems = Object.values(props.selectedItems || {}).filter(Boolean)
   const outfitSlots = {
      top: props.selectedItems?.[1] || null,
      jacket: props.selectedItems?.[2] || null,
      bottom: props.selectedItems?.[3] || null,
      shoes: props.selectedItems?.[4] || null
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
                  <button className='rounded bg-black px-4 py-2 text-sm font-medium text-white cursor-pointer' onClick={props.createOutfit}>
                     Save Outfit
                  </button>
               </div>
            ) : (
               null
            )
            }
         </div>
         <Outfit slots={outfitSlots} showSummary summaryTitle='Selected Pieces' />
      </aside>
   )
}

export default Mannequin
