/** @jsx jsx */
import { jsx } from "theme-ui"
import React, {useState,useEffect} from "react"
import { graphql, useStaticQuery, Link } from 'gatsby'


import SEO from "../components/seo"
import InnerLayout from "../components/InnerLayout.js"
import moment from 'moment'
import Event from "../components/Event"



const EventsPage = () => {

    const [nowtime, setNowtime] = useState(Date.now())
    useEffect(() => {
	setNowtime(Date.now())
    },[])

    
    const eventsData = useStaticQuery(graphql`
	{
	    allAirtable(
		sort: { fields: [data___Date_and_time], order: ASC }
		filter: {
		    table: { eq: "Events" }
		    data: {
			Status: {eq: "Published"}
			Upcoming: {eq: 1}
			WBFOnly: {ne: true}
}
		}
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
					gatsbyImageData( placeholder: TRACED_SVG, layout: CONSTRAINED)
					
				    }	
				}
			    }
			}
		    }
		}
	    }
	}
    `)



    return (
	<InnerLayout>
	    <h1 className="text-4xl md:text-6xl mb-6 font-text text-stone-900 border-b border-yellow-700">Upcoming events</h1>
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

export default EventsPage;
