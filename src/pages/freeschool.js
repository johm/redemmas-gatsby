/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { graphql, useStaticQuery, navigate } from 'gatsby'

import InnerLayout from "../components/InnerLayout.js"

import { PrismicLink } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import Event from "../components/Event"



const FreeschoolPage = () => {

    const freeschoolData = useStaticQuery(graphql`

	{
	    prismicFreeschoolIntro {
		data {
		    intro_text {raw}
		    footer_text {raw}
		}
	    }

  allAirtable(
    sort: {data: {Date_and_time: ASC}}
    filter: {table: {eq: "Events"}, data: {Status: {eq: "Published"}, Upcoming: {eq: 1}, WBFOnly: {ne: true},Location: {eq: "Free School Classroom" }}}
  ) {
    edges {
      node {
        data {
          Name
          Slug
          Date_and_time
          Location
          Short_Description
          Author_bio
          Withfriends_url
          Image {
            localFiles {
              childImageSharp {
                gatsbyImageData(placeholder: TRACED_SVG, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
}
    `
				    )

 
    
    return (
	<InnerLayout>
	    <div className="mb-6 text-2xl md:text-6xl font-text text-stone-900 border-b border-yellow-700">The Baltimore Free School</div>
	    <div className="flex flex-wrap mb-6  ">
		<div className="w-full font-text text-2xl mb-6 exthtml">
		    
		    <PrismicRichText field={freeschoolData.prismicFreeschoolIntro.data.intro_text.raw}
				     components={{
				     }}
				     
		    />
		    
		</div>
		
		<div className="md:grid grid-cols-2 lg:grid-cols-3 gap-8 mt-12 auto-rows-fr">
		    {freeschoolData.allAirtable.edges.map((e,index) => {
			return (
			    <div key={e.node.data.Slug}>
				<Event e={e.node.data} />
			    </div>
			)})}
		</div>
		
		
		<div className="w-full font-text text-2xl mb-6 exthtml bg-stone-100 p-6">
		    <PrismicRichText field={freeschoolData.prismicFreeschoolIntro.data.footer_text.raw}
				     components={{
				     }}
				     
		    />
		</div>
	    </div>
	</InnerLayout>
	
    );

}

export default FreeschoolPage;
