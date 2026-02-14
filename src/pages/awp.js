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




const AWPPage = () => {

    
    const [nowtime, setNowtime] = useState(Date.now())
    useEffect(() => {
	setNowtime(Date.now())
    },[])

    
    const eventsData = useStaticQuery(graphql`{
  allAirtable(
    sort: {data: {Date_and_time: ASC}}
    filter: {table: {eq: "Events"}, data: {Status: {eq: "Published"}, Special_event_series: {regex: "/AWP 2026/"}}}
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
          Special_event_series
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
	    <SEO title="AWP 2026: Offsite at Red Emma's" description="March 4-7, 2026 * Baltimore, MD" />	
	    <h1 className="text-4xl md:text-6xl mb-6 font-text text-stone-900 border-b border-yellow-700">Readings, parties, and happy hours at Red Emma's during AWP 2026</h1>
	    <div className="flex flex-wrap">
		<div className="w-full md:w-1/3">
		    
		</div>
		<div class="font-text w-full md:w-2/3 md:px-4">
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

export default AWPPage;
