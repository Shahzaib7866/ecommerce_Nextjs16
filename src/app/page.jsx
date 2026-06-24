import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
import Offers from '../components/Offers/Offers'
import NewCollection from '../components/NewCollections/NewCollection'
import NewsLetter from '../components/NewsLetter/NewsLetter'

export default function HomePage() {
  return (
    <div className="shop-page">
      <Hero />
      <Popular />
      <Offers />
      <NewCollection />
      <NewsLetter />
    </div>
  )
}