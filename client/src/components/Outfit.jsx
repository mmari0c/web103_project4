const SLOT_ORDER = [
   {
      key: 'top',
      label: 'Top',
      getImageClassName: ({ hasJacket }) =>
         hasJacket
            ? 'absolute left-[34%] top-5 h-44 w-44 -translate-x-1/2 -rotate-12 object-contain'
            : 'absolute left-1/2 top-3 h-52 w-52 -translate-x-1/2 object-contain'
   },
   {
      key: 'jacket',
      label: 'Jacket',
      getImageClassName: () => 'absolute left-1/2 top-0 h-52 w-52 -translate-x-1/2 object-contain'
   },
   {
      key: 'bottom',
      label: 'Bottom',
      getImageClassName: () => 'absolute left-1/2 top-44 h-52 w-52 -translate-x-1/2 object-contain'
   },
   {
      key: 'shoes',
      label: 'Shoes',
      getImageClassName: () => 'absolute left-1/2 bottom-1 w-45 -translate-x-1/2 object-contain'
   }
]

const Outfit = ({
   slots = {},
   emptyMessage = 'Select items to build your outfit!',
   showSummary = false,
   summaryTitle,
   className = ''
}) => {
   const hasJacket = Boolean(slots.jacket?.image)
   const filledSlots = SLOT_ORDER.filter(({ key }) => slots[key]?.image)
   const hasItems = filledSlots.length > 0
   const totalPrice = filledSlots.reduce((total, { key }) => total + Number(slots[key]?.price || 0), 0)

   return (
      <div className={`w-full ${className}`.trim()}>
         <div className='flex min-h-96 w-full items-center justify-center rounded-xl bg-gray-50 p-4'>
            <div className='relative h-[34rem] w-full max-w-xs'>
               {filledSlots.map(({ key, label, getImageClassName }) => (
                  <img
                     key={key}
                     src={slots[key].image}
                     alt={slots[key].name || label}
                     className={getImageClassName({ hasJacket })}
                  />
               ))}
               {/* {!hasItems && (
                  <div className='flex h-full items-center justify-center'>
                     <p className='text-center text-gray-500'>{emptyMessage}</p>
                  </div>
               )} */}
            </div>
         </div>

         {/* {showSummary && (
            <div className='mt-4 rounded-xl border border-gray-200 bg-white p-4'>
               <div className='mb-3 flex items-center justify-between gap-3'>
                  <p className='text-sm font-semibold uppercase tracking-[0.2em] text-gray-500'>
                     {summaryTitle || 'Outfit Details'}
                  </p>
                  <p className='text-sm font-semibold text-gray-900'>${totalPrice.toFixed(2)}</p>
               </div>
               <div className='space-y-2'>
                  {SLOT_ORDER.map(({ key, label }) => {
                     const item = slots[key]

                     return (
                        <div
                           key={key}
                           className='flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2'
                        >
                           <div>
                              <p className='text-xs uppercase tracking-[0.18em] text-gray-500'>{label}</p>
                              <p className='text-sm font-medium text-gray-900'>{item?.name || `No ${label.toLowerCase()} selected`}</p>
                           </div>
                           <p className='text-sm text-gray-600'>{item ? `$${Number(item.price || 0).toFixed(2)}` : '-'}</p>
                        </div>
                     )
                  })}
               </div>
            </div>
         )} */}
      </div>
   )
}

export default Outfit
