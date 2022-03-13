import * as React from 'react'
import { graphql } from 'gatsby'

import { Seo } from '../../components/seo.js'
import InnerLayout from "../../components/InnerLayout.js"

import Book from "../../components/Book.js"
import Contributors from '../../components/contributors'
import BuyButtons from '../../components/BuyButtons.js'
import BookSearchForm from "../../components/BookSearchForm.js"

//	    <Seo title={doc.data.title.text} />

const TitleTemplate = ({ data }) => {
    if (!data) return null
    const doc = data.title

    const other_editions=doc.editions.filter(e => e.id !== doc.latest_published_edition.id)

    const by_same_authors=doc.contributions.flatMap((c) => c.author !== null ? c.author.titles :  [])

    
    return (
	<InnerLayout>

	{doc.latest_published_edition !== null && 	
	 <div className="flex flex-wrap">    
	     <div className="sm:w-1/3 w-full mb-3">
		 
		 <img className="object-contain w-full object-right-top" src={'https://redemmas.org'+ doc.latest_published_edition.cover_image_url} />
		 
		 
	     </div>

	     <div className="sm:w-2/3 w-full md:pl-6">
		 <div className="">
		     <div className=" text-5xl font-text">{doc.title}</div>
		     <div className=" text-2xl font-subhed uppercase mt-6 leading-tight">
			 <Contributors title={doc} />
		     </div>
		     <div className="mt-3 text-sm  font-subhed uppercase text-stone-500">{doc.latest_published_edition.publisherName} <br />   {doc.latest_published_edition.isbn13}  <br />{doc.latest_published_edition.year_of_publication}</div> 
		     <div className=" mt-6 font-subhed text-xl">
			 <div>${doc.latest_published_edition.list_price}</div>
			 
		     </div>
		     
		     <div className=" mt-6 ">
			 <BuyButtons title={doc} edition={doc.latest_published_edition}/>
		     </div>
		 </div>
	     </div>
	 </div>
	}    
	{ other_editions.length > 0 && 
	  <div className="mt-6">
	      <h2 className="font-subhed uppercase text-2xl border-b">Other editions</h2>
	      <div className="grid sm:grid-cols-3 gap-8 mt-12 auto-rows-fr">
		  {other_editions.map((e,index) => {
		      return (
			  <Book title={doc} edition={e} />
		  )})}
	      </div>
	  </div>
	}
	    
	    
	    { by_same_authors.length > 0 && 
	      <div className="mt-6">
		  <h2 className="font-subhed uppercase text-2xl border-b">By the same author(s)</h2>
		  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12 auto-rows-fr">
		      {by_same_authors.map((t,index) => {
			  return (
			      <Book title={t} edition={t.latest_published_edition} />
		      )})}
		  </div>
	      </div>
	    }
	    
	    {doc.categories.length > 0  &&
	     <div>
		<h2 className="font-subhed uppercase text-4xl  mt-6 mb-3 border-b border-yellow-700">In our sections</h2>
		<div className="flex flex-wrap">
		{ doc.categories.map((c,index) => {
		    return (
			<div className="relative top-0 grow md:w-1/2 lg:w-1/3 w-full bg-blue-100 h-64 bg-cover" style={{backgroundImage : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.0) 0%, rgba(0, 0, 0, 0.20) 75%,  rgba(0, 0, 0, 0.90) 100%),url('+ process.env.IMAGE_SERVER + c.image_url}}>
			    
			    <div className="absolute bottom-5 left-5 text-stone-100 font-subhed  text-2xl z-20">
				{c.name}
			    </div>
		     
			</div>
		)})}
	 </div>
	 </div>   
		
	    }
	
	    { doc.titlelists.length > 0 &&
	      <div>
		  <h2 className="font-subhed uppercase text-4xl  mt-6 border-b border-yellow-700">On our lists</h2>
		  { doc.titlelists.map((tl,index) => {
			return (
			    <div className="mt-6">
				<div className="text-3xl mb-6 font-text text-stone-900 border-b border-b border-stone-400">
				    <a href={"/title_lists/"+tl.slug}>{ tl.name }</a>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-6 auto-rows-fr">
				    {tl.titles.filter(t => t.id !== doc.id).map((t,index) => {
					return (
					    <Book title={t} edition={t.latest_published_edition} />
				    )})}
				    
				</div>
			    </div>
		    )})}
	      </div>
	    }
	    

	    <div className="w-full bg-stone-100 p-6 mb-6">
		<BookSearchForm />
	    </div>

	</InnerLayout>
    )
}


export const query = graphql`

    fragment TitleMetadata on Title {
	id
	title
	slug
	updatedAt
    }



    query ($id: String) {
	title (id: { eq: $id }) {
	    ...TitleMetadata
	    
	    
	    titlelists {
		name
		slug
		titles {
		    ...TitleMetadata
		    
		    latest_published_edition {
			id
			key
			cover_image_url
			opengraph_image_url
			list_price
			year_of_publication
			publisherName
		    }
		    
		    contributions {
			what
			author {
			    fullName
			    slug
			    key
			}
		    }
		    
		}
	    }
	    
	    categories {
		id
		name
		slug
		image_url
	    }
	    
	    contributions {
		what
		author {
		    key
		    slug 
		    fullName
		    titles {
			...TitleMetadata

			latest_published_edition {
			    id
			    key
			    cover_image_url
			    opengraph_image_url
			    list_price
			    year_of_publication
			    publisherName
			}
			
			contributions {
			    what
			    author {
				fullName
				slug
				key
			    }
			}
		    }
		}
	    }

	    latest_published_edition {
		id
		key
		cover_image_url
		opengraph_image_url
		list_price
		year_of_publication
		isbn13
		publisherName

	    }
	    
	    editions {
		id
		key
		cover_image_url
		opengraph_image_url
		list_price
		year_of_publication
		isbn13
		publisherName

	    }
	}
    }
`

export default TitleTemplate
