import '@/styles/globals.css'
import CityContextProvider from '@/context/cityContext'


export default function App({ Component, pageProps }) {
  return (
    <CityContextProvider>
      <Component {...pageProps} />
    </CityContextProvider>
  )
}
