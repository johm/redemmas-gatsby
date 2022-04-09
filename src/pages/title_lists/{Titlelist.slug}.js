import * as React from 'react'
import { graphql } from 'gatsby'

import { Seo } from '../../components/seo.js'
import InnerLayout from "../../components/InnerLayout.js"
import Book from "../../components/Book.js"
import BookSearchForm from "../../components/BookSearchForm.js"
//	    <Seo title={doc.data.title.text} />

const TitlelistTemplate = ({ data }) => {
    if (!data) return null
    const doc = data.titlelist

    return (
	<InnerLayout>
	    <div>
		<h1 className="font-text text-6xl mb-6" >{doc.name}</h1>

	    </div>

	    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12 auto-rows-fr">
		{doc.titles.filter(t => t !== null && t.latest_published_edition !== null ).map((t,index) => {
		    return (
			<Book title={t} edition={t.latest_published_edition} />
		)})}
	    </div>

	    <div className="w-full bg-stone-100 p-6 mb-6">
		<BookSearchForm />
	    </div>

	    
	</InnerLayout>
	
    )
}


export const query = graphql`
    query ($id: String) {
	titlelist (id: { eq: $id }) {
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
		}
	    }
}
}
`

export default TitlelistTemplate
