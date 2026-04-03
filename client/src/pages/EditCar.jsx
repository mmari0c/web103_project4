import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Item from '../components/Item'
import Mannequin from '../components/Mannequin'

const EditOutfit = () => {
   const { id: outfitId } = useParams()
   const [categories, setCategories] = useState([])
   const [itemsByCategory, setItemsByCategory] = useState({})
   const [selectedItems, setSelectedItems] = useState({
      1: null,
      2: null,
      3: null,
      4: null
   })
   const [outfitName, setOutfitName] = useState('')
   const [isLoading, setIsLoading] = useState(true)
   const [isSaving, setIsSaving] = useState(false)
   const [isDeleting, setIsDeleting] = useState(false)
   const [error, setError] = useState('')

   useEffect(() => {
      const fetchEditData = async () => {
         try {
            setIsLoading(true)
            setError('')

            const [categoriesResponse, outfitResponse] = await Promise.all([
               fetch('http://localhost:3000/categories'),
               fetch(`http://localhost:3000/outfits/${outfitId}`)
            ])

            const categoriesData = await categoriesResponse.json()
            const outfitData = await outfitResponse.json()

            setCategories(categoriesData)
            setOutfitName(outfitData.name || '')
            setSelectedItems({
               1: {
                  item_id: outfitData.top_item_id,
                  name: outfitData.top_name,
                  image: outfitData.top_image,
                  price: outfitData.top_price
               },
               2: outfitData.jacket_item_id
                  ? {
                       item_id: outfitData.jacket_item_id,
                       name: outfitData.jacket_name,
                       image: outfitData.jacket_image,
                       price: outfitData.jacket_price
                    }
                  : null,
               3: {
                  item_id: outfitData.bottom_item_id,
                  name: outfitData.bottom_name,
                  image: outfitData.bottom_image,
                  price: outfitData.bottom_price
               },
               4: {
                  item_id: outfitData.shoes_item_id,
                  name: outfitData.shoes_name,
                  image: outfitData.shoes_image,
                  price: outfitData.shoes_price
               }
            })

            const itemResults = await Promise.all(
               categoriesData.map(async (category) => {
                  const response = await fetch(`http://localhost:3000/items/category/${category.category_id}`)
                  const data = await response.json()

                  return [category.category_id, data]
               })
            )

            setItemsByCategory(Object.fromEntries(itemResults))
         } catch (fetchError) {
            console.error('Error loading outfit for edit:', fetchError)
            setError('Failed to load outfit details.')
         } finally {
            setIsLoading(false)
         }
      }

      fetchEditData()
   }, [outfitId])

   const handleSelectItem = (categoryId, item) => {
      setSelectedItems((prev) => ({
         ...prev,
         [categoryId]: prev[categoryId]?.item_id === item.item_id ? null : item
      }))
   }

   const handleUpdateOutfit = async (event) => {
      event.preventDefault()

      try {
         setIsSaving(true)
         setError('')

         const updatedOutfit = {
            name: outfitName || 'My Outfit',
            top_id: selectedItems[1]?.item_id,
            jacket_id: selectedItems[2]?.item_id,
            bottom_id: selectedItems[3]?.item_id,
            shoes_id: selectedItems[4]?.item_id
         }

         await fetch(`http://localhost:3000/outfits/${outfitId}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedOutfit)
         })

         window.location = `/outfits/${outfitId}`
      } catch (updateError) {
         console.error('Error updating outfit:', updateError)
         setError('Failed to update outfit.')
      } finally {
         setIsSaving(false)
      }
   }

   const handleDeleteOutfit = async () => {
      try {
         setIsDeleting(true)
         setError('')

         await fetch(`http://localhost:3000/outfits/${outfitId}`, {
            method: 'DELETE'
         })

         window.location = '/outfits'
      } catch (deleteError) {
         console.error('Error deleting outfit:', deleteError)
         setError('Failed to delete outfit.')
      } finally {
         setIsDeleting(false)
      }
   }

   if (isLoading) {
      return (
         <div className='min-h-screen px-4 py-6 lg:px-8'>
            <div className='rounded-xl px-6 py-10 text-center text-gray-500'>
               Loading outfit editor...
            </div>
         </div>
      )
   }

   return (
      <div className='min-h-screen px-4 py-6 lg:px-8'>
         <div className='mb-6 flex items-start justify-between gap-4'>
            <div>
               <p className='text-sm uppercase tracking-[0.2em] text-gray-500'>Edit Outfit</p>
               <h1 className='text-3xl font-bold text-gray-900'>Update Your Fit</h1>
            </div>
            <button
               type='button'
               onClick={handleDeleteOutfit}
               disabled={isDeleting}
               className='rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 disabled:cursor-not-allowed disabled:opacity-60'
            >
               {isDeleting ? 'Deleting...' : 'Delete Outfit'}
            </button>
         </div>

         {error ? (
            <div className='mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600'>{error}</div>
         ) : null}

         <div className='grid gap-6 lg:grid-cols-[3fr_1.5fr]'>
            <form onSubmit={handleUpdateOutfit} className='min-w-0 space-y-6'>
               {categories.map((category) => (
                  <section key={category.category_id} className='min-w-0 bg-white p-5'>
                     <div className='mb-4 flex items-center justify-between'>
                        <h2 className='text-lg font-semibold text-gray-900'>{category.name}</h2>
                        <p className='text-sm text-gray-500'>Pick one item</p>
                     </div>

                     <div className='flex w-full gap-3 overflow-x-auto pb-2'>
                        {(itemsByCategory[category.category_id] || []).map((item) => (
                           <Item
                              key={item.item_id}
                              item_id={item.item_id}
                              name={item.name}
                              category_id={item.category_id}
                              style_tag={item.style_tag}
                              price={item.price}
                              image={item.image}
                              isSelected={selectedItems[category.category_id]?.item_id === item.item_id}
                              selectItem={() => handleSelectItem(category.category_id, item)}
                           />
                        ))}
                     </div>
                  </section>
               ))}
            </form>

            <div className='min-w-0 h-fit'>
               <Mannequin
                  selectedItems={selectedItems}
                  outfitName={outfitName}
                  setOutfitName={setOutfitName}
                  onSave={handleUpdateOutfit}
                  isSaving={isSaving}
                  saveLabel={isSaving ? 'Saving...' : 'Save Changes'}
               />
            </div>
         </div>
      </div>
   )
}

export default EditOutfit
