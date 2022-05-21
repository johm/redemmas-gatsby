/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { graphql, useStaticQuery, Link } from 'gatsby'


import SEO from "../components/seo"
import InnerLayout from "../components/InnerLayout.js"
import moment from 'moment'
import Event from "../components/Event"



const EventsPage = () => {

    const eventsData = useStaticQuery(graphql`
	{
	    allAirtable(
		sort: { fields: [data___Date_and_time], order: ASC }
		filter: {
		    table: { eq: "Events" }
		    data: {Status: {eq: "Published"}}
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
	    <div class="md:grid grid-cols-2 lg:grid-cols-3 gap-8 mt-12 auto-rows-fr">
		{eventsData.allAirtable.edges.filter(edgeItem => parseInt(moment(edgeItem.node.data.Date_and_time).format("x")) > Date.now()).map((e,index) => {
		    return (
			<div className="" key={e.node.data.Slug}>
			    <Event e={e.node.data} />
			</div>
		)})}
	    </div>
	</InnerLayout>
    );

}

export default EventsPage;
