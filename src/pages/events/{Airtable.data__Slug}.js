import * as React from 'react'
import { graphql, navigate,Link } from 'gatsby'
import { getSrc } from "gatsby-plugin-image"
import moment from 'moment-timezone'
import { GatsbyImage} from "gatsby-plugin-image";

import SEO from '../../components/seo.js'
import InnerLayout from "../../components/InnerLayout.js"
import Markdown from "markdown-to-jsx"


const EventTemplate = ({ data }) =>{
    if (!data || !data.airtable) return null
    const doc = data.airtable.data
    
    return (
	
	<InnerLayout>
	
	<SEO title={doc.Name} description="RSVP now for this event at Red Emma's" image={doc.Image && doc.Image.localFiles[0] && doc.Image.localFiles[0].childImageSharp &&  doc.Image.localFiles[0].childImageSharp.original && `https://redemmas.org${doc.Image.localFiles[0].childImageSharp.original.src}`} />	
	
	<div className="mb-6 xl:mr-48 xl:ml-48"  >
	<GatsbyImage
	image={doc.Image &&
	       doc.Image.localFiles[0].childImageSharp.gatsbyImageData
	}
	alt={doc.Name} className="mb-6  "
	/>
	<div className="lg:ml-24 lg:mr-24 ">
	<h2 className="text-3xl md:text-4xl mb-3 font-text leading-tight text-stone-900">{doc.Name}</h2>
	    { doc.Upcoming != 1 && 
		<h3  className="text-2xl md:text-3xl mb-3 font-text leading-tight text-yellow-700 italic">This event has already happened.</h3>
}
	<div className="flex flex-wrap mb-6">
	<div className="w-full md:w-1/2 font-subhed uppercase text-xl">
	<div>{moment(doc.Date_and_time).tz('America/New_York').format("dddd, MMMM Do YYYY")}</div>
	<div>{moment(doc.Date_and_time).tz('America/New_York').format("h:mm a")}</div>
	<div>{doc.Location}</div>
	</div>
	<div className="w-full md:w-1/2">
	{doc.Withfriends_url &&  <a href={doc.Withfriends_url} className="inline-block mt-1 text-center  rounded-full bg-violet-900 text-stone-100 font-subhed px-3 py-0.5 uppercase hover:bg-stone-800 transition-colors text-xl w-full">RSVP on withfriends</a>}
	</div>
	</div>
	
	
	<div className="font-text text-2xl mb-3 exthtml">{doc.Short_Description}</div>
	<div className="font-text mb-3 exthtml">
	    {doc.Long_Description &&
	     <Markdown>{doc.Long_Description}</Markdown>
	    }
	</div>
	<div className="font-text mb-3 exthtml">
	    {doc.Author_bio && 
	     <Markdown>{doc.Author_bio}</Markdown>
	    }
	</div>

	
	{doc.Withfriends_url &&  <a href={doc.Withfriends_url} className="inline-block mt-1 mb-3 text-center  rounded-full bg-violet-900 text-stone-100 font-subhed px-3 py-0.5 uppercase hover:bg-stone-800 transition-colors text-xl w-full">RSVP on withfriends</a>}
	<Link to="/events" className="inline-block mt-1 text-center  rounded-full bg-yellow-900 text-stone-100 font-subhed px-3 py-0.5 uppercase hover:bg-stone-800 transition-colors text-xl w-full">See all upcoming events</Link>
	
	</div>
	
	</div>
	
	</InnerLayout>
    )
}



export const query = graphql`
    query ($id: String) {
	airtable (id: { eq: $id }
	    data: {Status: {eq: "Published"}}
	) {
	    data {
		Name
		Slug
		Date_and_time
		Location
		Short_Description
		Long_Description 
		Author_bio
		Withfriends_url
                Upcoming
		Image {
		    localFiles {
			childImageSharp {
			    gatsbyImageData( placeholder: DOMINANT_COLOR, layout: CONSTRAINED)
			    original {src}
			}
		    }
		}
	    }
	}
    }
`

export default EventTemplate
