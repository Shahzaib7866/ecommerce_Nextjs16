
import './globals.css'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { Poppins } from 'next/font/google'
import Providers from '../Components/Providers'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata = {
  title: 'WearIt',
  description: 'New Collections For Everyone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <Navbar />
          <div style={{ paddingTop: '68px' }}>
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}