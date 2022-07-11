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
		    <div key={ev.Slug} className="mcnTextContent">
			<a href={"https://redemmas.org/events/"+ev.Slug}>
			    <img width="100%" src={"https://redemmas.org"+ ev.Image.localFiles[0].publicURL} />
			</a>
			<br /><br />
			<h3><a href={"https://redemmas.org/events/"+ev.Slug}>{ev.Name}</a></h3>
			<br />
			<h4 className="">{moment(ev.Date_and_time).tz('America/New_York').format("dddd, MMMM Do YYYY")}</h4>
			<h4 className="">{moment(ev.Date_and_time).tz('America/New_York').format("h:mm a")}</h4>
			<h4 className="">{ev.Location}</h4>
			<br />
			{ev.Withfriends_url &&  <a href={ev.Withfriends_url} className="" style={{background-color:"#4c1d95",
												  color:"#ffffff",
												  padding:"3px",
												  paddingRight:"10px",
												  paddingLeft:"10px",
												  borderRadius:"10px"}} >RSVP on withfriends</a>}
			<br /><br />

			<div className="font-text">{ev.Short_Description}</div>
		    	<hr />
		    </div> 
		)}
					     )}
	</div>
    )};




export default EventsPage;
