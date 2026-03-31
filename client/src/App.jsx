import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewOutfit from './pages/ViewCars'
import EditOutfit from './pages/EditCar'
import CreateOutfit from './pages/CreateCar'
import OutfitDetails from './pages/CarDetails'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateOutfit title='Fit Builder | Customize' />
    },
    {
      path:'/outfits',
      element: <ViewOutfit title='Fit Builder | Custom Cars' />
    },
    {
      path: '/outfits/:id',
      element: <OutfitDetails title='Fit Builder | View' />
    },
    {
      path: '/edit/:id',
      element: <EditOutfit title='Fit Builder | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App
