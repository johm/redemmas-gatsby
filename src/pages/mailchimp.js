/** @jsx jsx */
import { jsx } from "theme-ui"
import React, {useState,useEffect} from "react"
import { graphql, useStaticQuery, Link } from 'gatsby'

import { renderToStaticMarkup } from 'react-dom/server'


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
		<textarea id="mytextarea" className="w-full h-screen">
		    {renderToStaticMarkup(<Evs eventsData={eventsData}/>)}
		</textarea>

	</InnerLayout>
    )
}


const Evs = ({eventsData})=>{

    return (
	<div>
	    {eventsData.allAirtable.edges.map((e,index) => {
		const ev=e.node.data
		return (
		    <div key={ev.Slug}>
			<a href={"https://redemmas.org/events/"+ev.Slug}>
			    <h3>{ev.Name}</h3>
			    <img src={"https://redemmas.org"+ ev.Image.localFiles[0].publicURL} />
			    <h4 className="">{moment(ev.Date_and_time).tz('America/New_York').format("dddd, MMMM Do YYYY")}</h4>
			    <h4 className="">{moment(ev.Date_and_time).tz('America/New_York').format("h:mm a")}</h4>
			    <h4 className="">{ev.Location}</h4>
			    {ev.Withfriends_url &&  <a href={ev.Withfriends_url} className="">RSVP on withfriends</a>}

			    <div className="font-text">{ev.Short_Description}</div>

			</a>
		    </div> 
		)}
					     )}
	</div>
    )};




export default EventsPage;
