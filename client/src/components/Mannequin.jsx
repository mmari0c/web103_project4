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
            <div className='flex items-center justify-between gap-3'>
               <input
                  type='text'
                  value={props.outfitName}
                  onChange={(event) => props.setOutfitName(event.target.value)}
                  placeholder='My Outfit'
                  className='w-fit rounded-md border border-gray-300 p-2 outline-none focus:border-black'
               />
               <button
                  type='button'
                  className='cursor-pointer rounded bg-black px-2 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60'
                  onClick={props.onSave}
                  disabled={props.isSaving || selectedItems.length === 0}
               >
                  {props.saveLabel || 'Save Outfit'}
               </button>
            </div>
         </div>
         <Outfit slots={outfitSlots} showSummary summaryTitle='Selected Pieces' />
      </aside>
   )
}

export default Mannequin
