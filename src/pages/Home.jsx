import React from 'react'
import Header from '../components/Header'
import LatestCollection from '../components/latestCollection'
import BestSellers from '../components/BestSellers'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'

const home = () => {
  return (
    <div>
        <Header/>
        <LatestCollection/>
        <BestSellers/>
        <OurPolicy/>
        <NewsLetterBox/>
    </div>
  )
}

export default home