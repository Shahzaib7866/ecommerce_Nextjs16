import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollection from '../Components/NewCollections/NewCollection'
import NewsLetter from '../Components/NewsLetter/NewsLetter'

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