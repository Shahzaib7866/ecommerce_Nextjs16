'use client'
import ShopContextProvider from '../context/ShopContext'

export default function Providers({ children }) {
  return <ShopContextProvider>{children}</ShopContextProvider>
}





