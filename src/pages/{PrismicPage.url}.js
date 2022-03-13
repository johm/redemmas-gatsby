import * as React from 'react'
import { graphql } from 'gatsby'

import { Seo } from '../components/seo.js'
//import { SliceZone } from '../components/SliceZone'

//	    <Seo title={doc.data.title.text} />

const PageTemplate = ({ data }) => {
    if (!data) return null
    const doc = data.prismicPage
    
    return (
	<div>
	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>	    <div className="text-sky-500">HI</div>
	    <div className="text-sky-500">HI</div>
	    <div>{doc.title}</div>
	</div>

    )
}


export const query = graphql`
  query PageQuery($id: String) {
    prismicPage(id: { eq: $id }) {
      data {
        title {
          text
        }
}

}
}
`

export default PageTemplate
