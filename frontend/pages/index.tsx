import type { NextPage } from 'next'

const Home: NextPage = ({data} : any) => {
  console.log(data)
  return(
    <>

    </>
  )
}

export async function getServerSideProps() {

  //fetch data from api
  const res = await fetch('http://localhost:8080/api/posts/')
  const data = await res.json()

  //pass data to the page via props
  return {
    props: {
      data
    },
  }
}


export default Home
