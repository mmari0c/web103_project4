const Mannequin = () => {
   return (
      <aside className='sticky top-6 rounded-sm border border-gray-200 bg-white p-4'>
         <div className='mb-4 flex items-center justify-between gap-3'>
            <h3 className='text-lg font-bold'>Your Outfit</h3>
            <button className='rounded bg-black px-4 py-2 text-sm font-medium text-white'>Save Outfit</button>
         </div>
         <div className='flex h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50'>
         </div>
         <div className='mt-4'>
            <div className='flex items-center justify-between'>
               <p className='text-sm text-gray-500'>Total</p>
               <p className='text-lg font-semibold'>$0.00</p>
            </div>
         </div>
      </aside>
   )
}

export default Mannequin
