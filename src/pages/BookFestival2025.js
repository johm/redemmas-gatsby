/** @jsx jsx */
import { jsx } from "theme-ui"
import React, {useState,useEffect} from "react"
import { graphql, useStaticQuery, Link } from 'gatsby'


import SEO from "../components/seo"
import InnerLayout from "../components/InnerLayout.js"
import moment from 'moment'
import Event from "../components/Event"
//import BBF from "../images/BBF_Logo.png"
//import WBFS from "../images/wbf-social.jpg"




const BookFestival2025Page = () => {

    
    const [nowtime, setNowtime] = useState(Date.now())
    useEffect(() => {
	setNowtime(Date.now())
    },[])

    
    const eventsData = useStaticQuery(graphql`{
  allAirtable(
    sort: {data: {Date_and_time: ASC}}
    filter: {table: {eq: "Events"}, data: {Status: {eq: "Published"}, Location: {regex: "/Baltimore Book Festival 2025/"}}}
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
}`)



    return (
	<InnerLayout>
	    <SEO title="Baltimore Book Festival: Red Emma's schedule" description="September 28-29th, 2024 * Baltimore, MD" />	
	    <h1 className="text-4xl md:text-6xl mb-6 font-text text-stone-900 border-b border-yellow-700">Our events for the 2024 Baltimore Book Festival</h1>
	    <div className="flex flex-wrap">
		<div className="w-full md:w-1/3">
		    <img src="https://baltimorebookfest.com/wp-content/uploads/2025/07/cropped-baltimorebookfest_finalcolorlogo_horiz_20250625.png"
		</div>
		<div class="font-text w-full md:w-2/3 md:px-4">
		    <p className="text-xl mb-2">
			<Link className="text-yellow-900  uppercase font-subhed decoration-dashed hover:underline hover:text-yellow-700 transition-colors " to="https://baltimorebookfest.com">The Baltimore Book Festival</Link> is taking place across the entire Waverly neighborhood, Saturday, September 13th to Sunday September 14th, 2025.
		    </p>

		    <p className="mb-2">Here's the events Red Emma's is organizing for the festival, inside our store and on the outdoor 32nd Street stage</p>
		</div>
	    </div>
	    <div className="md:grid grid-cols-2 lg:grid-cols-3 gap-8 mt-12 auto-rows-fr">
		{eventsData.allAirtable.edges.map((e,index) => {
		    return (
			<div key={e.node.data.Slug}>
			    <Event e={e.node.data} />
			</div>
		)})}
	    </div>
	</InnerLayout>
    );

}

export default BookFestival2025Page;
