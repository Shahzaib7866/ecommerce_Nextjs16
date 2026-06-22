'use client'
import ShopContextProvider from '../Context/ShopContext'

export default function Providers({ children }) {
  return <ShopContextProvider>{children}</ShopContextProvider>
}





