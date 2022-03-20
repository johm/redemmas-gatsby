/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { graphql, useStaticQuery } from 'gatsby'

import InnerLayout from "../components/InnerLayout.js"
import Book from "../components/Book.js"
import BookSearchForm from "../components/BookSearchForm.js"

import { PrismicLink } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'




const BooksPage = () => {

    const booksData = useStaticQuery(graphql`

	{
	    prismicBookstoreIntro {
		data {
		    body {raw}
		    lists {slug}
		}
	    }
	    
	    allTitlelist {
		edges {
		    node {
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
				key
				cover_image_url
				list_price
			    }
			}
		    }
		}
	    }
	}
	
    `
    )

    const featureLists=booksData.prismicBookstoreIntro.data.lists.map(x => x.slug)
    
    return (
	<InnerLayout>
	    <div className="mb-6 text-6xl font-text text-stone-900 border-b border-yellow-700">The Bookstore</div>
	    <div className="flex mb-6  ">
		<div className="w-full md:w-1/2 font-text text-2xl">

		    <PrismicRichText field={booksData.prismicBookstoreIntro.data.body.raw}
				     components={{
				     }}

		    />

		</div>
		<div className="w-full md:w-1/2 bg-stone-100 p-6">
		    <BookSearchForm />
		</div>
	    </div>
	    
	    {booksData.allTitlelist.edges.filter(x => featureLists.includes(x.node.slug)).map ((edgeItem,index) => {
		return (
		    <div>
			<div className="text-3xl mb-6 font-text text-stone-900 border-b border-yellow-700">
			    <a href={"/title_lists/"+edgeItem.node.slug}>{ edgeItem.node.name }</a>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-4  gap-8 mt-12 auto-rows-fr">
			    {edgeItem.node.titles.filter(t => t !== null).map((t,index) => {
				return (
				    <Book title={t} edition={t.latest_published_edition} />
			    )})}
			</div>
			
			
		    </div>
		    
	    )})}
	</InnerLayout>

    );

}

export default BooksPage;
