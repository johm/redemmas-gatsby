import * as React from 'react'
import { graphql } from 'gatsby'

import { Seo } from '../../components/seo.js'
import InnerLayout from "../../components/InnerLayout.js"
import Book from "../../components/Book.js"

//	    <Seo title={doc.data.title.text} />

const CategoryTemplate = ({ data }) => {
    if (!data) return null
    const doc = data.category

    return (
	<InnerLayout>
	    <div>
		<h1 className="font-text text-6xl" >{doc.name}</h1>
		make this a banner with the category image and a gradient and white text
	    </div>

	    <div className="grid grid-cols-3 gap-8 mt-12 auto-rows-fr">
		{doc.titles.slice().reverse().map((t,index) => {
		    return (
			<Book title={t} edition={t.latest_published_edition} />
		)})}
	    </div>
	    
	</InnerLayout>
	
    )
}


export const query = graphql`
    query ($id: String) {
	category (id: { eq: $id }) {
            id
	    name
	    description
            slug 
	    titles {
		id
		slug
		title
		contributions {
		    what
		    author {
			id
			fullName}
		}
		latest_published_edition {
		    id
		    cover_image_url
		    list_price
		}
	    }
	}
    }
`

export default CategoryTemplate
