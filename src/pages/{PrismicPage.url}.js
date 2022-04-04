import * as React from 'react'
import { graphql } from 'gatsby'

import { Seo } from '../components/seo.js'
import InnerLayout from "../components/InnerLayout.js"
import { GatsbyImage} from "gatsby-plugin-image";

//import { SliceZone } from '../components/SliceZone'

//	    <Seo title={doc.data.title.text} />

const PageTemplate = ({ data }) => {
    if (!data) return null
    const doc = data.prismicPage.data
    
    return (
	<InnerLayout>
	    <div className="mb-6 mr-6 ml-6 xl:mr-48 xl:ml-48"  >
		<GatsbyImage
		    image={doc.featured_image &&
			   doc.featured_image.gatsbyImageData
		    }
		    alt={doc.Name} className="mb-6 w-full"
		/>
		
		<div className="font-text text-4xl lg:text-6xl">{doc.title.text}</div>
		<div className="font-text text-stone-500 text-2xl lg:text-3xl mb-6">{doc.subtitle.text}</div>

		<div className="font-text text-lg lg:mr-24 exthtml">
		    <div dangerouslySetInnerHTML={{ __html: doc.body.html }}>
			
		    </div>
		</div>
	    </div>
	</InnerLayout>
    )
}


export const query = graphql`
    query PageQuery($id: String) {
	prismicPage(id: { eq: $id }) {
	    data {
		title {
		    text
		}
		subtitle {
		    text
		}
		featured_image {
		    gatsbyImageData
		    
		}
		body {
		    html
		}
	    }
	    
	}
    }
`

export default PageTemplate
