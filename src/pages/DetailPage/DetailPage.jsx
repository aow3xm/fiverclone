import React from 'react'
import JobDetail from '../../components/DetailPage/JobDetail'
import { faqData } from './data'
const DetailPage = () => {
  return (
   <section>
      <JobDetail faqData={faqData}/>
   </section>
  )
}

export default DetailPage