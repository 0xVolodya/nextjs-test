import Head from 'next/head'
import Gallery from '../components/Gallery'

export default function Home() {


  return (
    <>
      <Head>
        <title>Next.js test</title>
        <meta name="description" content="next.js test"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Gallery />

    </>
)
}
