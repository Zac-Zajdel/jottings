import Layout from 'components/Layout'
import Auth from 'components/Auth'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import 'styles/globals.css'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Auth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Auth>
    </SessionProvider>
  )
}

export default App
