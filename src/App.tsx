import Header from './components/Header'
import Hero from './components/Hero'
import Energy from './components/Energy'
import Product from './components/Product'
import Explore from './components/Explore'
import Footer from './components/Footer'

function App() {
  return (
    <div id="inicio" className="min-h-screen bg-rb-black">
      <Header />
      <main>
        <Hero />
        <Energy />
        <Product />
        <Explore />
      </main>
      <Footer />
    </div>
  )
}

export default App
