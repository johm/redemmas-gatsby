/** @jsx jsx */
import { jsx } from "theme-ui"
import React, {useState,useEffect} from "react"
import { graphql, useStaticQuery, Link } from 'gatsby'

import { renderToStaticMarkup } from 'react-dom/server'


import SEO from "../components/seo"
import InnerLayout from "../components/InnerLayout.js"
import moment from 'moment'
import Event from "../components/Event"


const CanvaPage = () => {

    
    const eventsData = useStaticQuery(graphql`
	{
	    allAirtable(
		sort: { fields: [data___Date_and_time], order: ASC }
		filter: {
		    table: { eq: "Events" }
		    data: {
			Status: {eq: "Published"}
			Upcoming: {eq: 1}
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
				    publicURL
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

	    <Evs eventsData={eventsData}/>)


	</InnerLayout>
    )
}


const Evs = ({eventsData})=>{

    return (
	<div>
	    {eventsData.allAirtable.edges.map((e,index) => {
		const ev=e.node.data
		return (
		    <div key={ev.Slug} className="mcnTextContent">
			<h3>{moment(ev.Date_and_time).tz('America/New_York').format("MMM D")}: {ev.Name}</h3>
		    </div> 
		)}
					     )}
	</div>
    )};




export default CanvaPage;
