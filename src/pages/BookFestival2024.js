/** @jsx jsx */
import { jsx } from "theme-ui"
import React, {useState,useEffect} from "react"
import { graphql, useStaticQuery, Link } from 'gatsby'


import SEO from "../components/seo"
import InnerLayout from "../components/InnerLayout.js"
import moment from 'moment'
import Event from "../components/Event"
import BBF from "../images/BBF_Logo.png"
//import WBFS from "../images/wbf-social.jpg"




const BookFestival2024Page = () => {

    
    const [nowtime, setNowtime] = useState(Date.now())
    useEffect(() => {
	setNowtime(Date.now())
    },[])

    
    const eventsData = useStaticQuery(graphql`{
  allAirtable(
    sort: {data: {Date_and_time: ASC}}
    filter: {table: {eq: "Events"}, data: {Status: {eq: "Published"}, Location: {regex: "/Baltimore Book Festival 2024/"}}}
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
	    <SEO title="Waverly Book Festival: Schedule of talks" description="April 28-30th, 2023 * Baltimore, MD" image={WBFS} />	
	    <h1 className="text-4xl md:text-6xl mb-6 font-text text-stone-900 border-b border-yellow-700">Book talks at the Waverly Book Festival</h1>
	    <div className="flex flex-wrap">
		<div className="w-full md:w-1/3">
		<a href=""><img src={BBF} alt="Baltimore Book Festival logo, with letters in front of a drawing of rowhouses opening like books"  /></a></div>
		<div class="font-text w-full md:w-2/3 md:px-4">
		    <p className="text-xl mb-2">
			<Link className="text-yellow-900  uppercase font-subhed decoration-dashed hover:underline hover:text-yellow-700 transition-colors " to="https://baltimorebookfestival.com">The Baltimore Book Festival</Link> is taking place across the entire Waverly neighborhood from Friday, April 28th to Sunday April 30th, 2023.
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

export default BookFestival2024Page;
