import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'
import WeatherWidget from '../components/WeatherWidget'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <WhyUs />
        <Testimonials />
        {/* <WeatherWidget /> */}
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
