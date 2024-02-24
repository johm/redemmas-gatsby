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

    
    const eventsData = useStaticQuery(graphql`{
  allAirtable(
    sort: {data: {Date_and_time: ASC}}
    filter: {table: {eq: "Events"}, data: {Status: {eq: "Published"}, Upcoming: {eq: 1}, WBFOnly: {ne: true}}}
  ) {
    edges {
      node {
        data {
          Name
          Slug
          Date_and_time
          Location
          List_in_Courses_and_meet_ups
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
}`)

    
    return (
	<InnerLayout>


	    <h1 className="text-4xl md:text-6xl mb-6 font-text text-stone-900 border-b border-yellow-700">Upcoming events</h1>
		<textarea id="mytextarea" className="w-full h-screen">
		    {renderToStaticMarkup(<Evs eventsData={eventsData}/>)}
		</textarea>

	</InnerLayout>
    )
}

const Ev = ({ev}) => {
    return (
    	    <>
		    <div key={ev.Slug} className="mcnTextContent">
			<a href={"https://redemmas.org/events/"+ev.Slug}>
			    <img width="100%" src={"https://redemmas.org"+ encodeURI(ev.Image.localFiles[0].publicURL)} />
			</a>
			<br /><br />
			<h3><a href={"https://redemmas.org/events/"+ev.Slug}>{ev.Name}</a></h3>
			<br />
			<h4 className="">{moment(ev.Date_and_time).tz('America/New_York').format("dddd, MMMM Do YYYY")}</h4>
			<h4 className="">{moment(ev.Date_and_time).tz('America/New_York').format("h:mm a")}</h4>
			<h4 className="">{ev.Location}</h4>
			<br />
			{ev.Withfriends_url &&  <a href={ev.Withfriends_url} className="" style={{backgroundColor:"#4c1d95",
												  color:"#ffffff",
												  padding:"3px",
												  paddingRight:"10px",
												  paddingLeft:"10px",
												  borderRadius:"10px"}} >RSVP on withfriends</a>}
			<br /><br />

			<div className="font-text">{ev.Short_Description}</div><br />
		    	<hr />
		    </div>
	 		{`\n\n`}
	    </>)
};

const ShortEv = ({ev}) => {
    return (
    	    <>
		    <div key={ev.Slug} className="mcnTextContent">
			<h3><a href={"https://redemmas.org/events/"+ev.Slug}>{ev.Name}</a></h3>
			<br />
			<h4 className="">{moment(ev.Date_and_time).tz('America/New_York').format("dddd, MMMM Do YYYY")}</h4>
			<h4 className="">{moment(ev.Date_and_time).tz('America/New_York').format("h:mm a")}</h4>
			<h4 className="">{ev.Location}</h4>

			{ev.Withfriends_url && 		<><br /> <a href={ev.Withfriends_url} className="" style={{backgroundColor:"#4c1d95",
												  color:"#ffffff",
												  padding:"3px",
												  paddingRight:"10px",
												  paddingLeft:"10px",
												  borderRadius:"10px"}} >RSVP on withfriends</a> </>}
			<br /><br />
			<div className="font-text">{ev.Short_Description}</div>
						<br />
		    </div>
	 		{`\n\n`}
	    </>)
};



const Evs = ({eventsData})=>{

    return (
	<>
	    {eventsData.allAirtable.edges.filter(edge => ! edge.node.data.List_in_Courses_and_meet_ups).slice(0,2).map((e,index) => {
		return (
		    <Ev ev={e.node.data} />
		)}
					     )}

	    <table style={{backgroundColor:"#e2e8f0"}}>
	<tr><td style={{padding:"20px"}}>
	<h4 style={{marginBottom:"20px"}}>Courses, workshops, and meetups...</h4>
	<br />
	{eventsData.allAirtable.edges.filter(edge => edge.node.data.List_in_Courses_and_meet_ups).slice(0,2).map((e,index) => {
		return (
		    <ShortEv ev={e.node.data} />
		)}
					     )}
	    </td></tr></table>
	    <br />
	    {eventsData.allAirtable.edges.filter(edge => ! edge.node.data.List_in_Courses_and_meet_ups).slice(2,6).map((e,index) => {
		return (
		    <Ev ev={e.node.data} />
		)}
														      )}
	    <table style={{backgroundColor:"#e2e8f0"}}>
	<tr><td style={{padding:"20px"}}>
		<h4 style={{marginBottom:"20px"}}>More courses, workshops, and meetups...</h4> <br />
<br />
	{eventsData.allAirtable.edges.filter(edge => edge.node.data.List_in_Courses_and_meet_ups).slice(2,4).map((e,index) => {
		return (
		    <ShortEv ev={e.node.data} />
		)}
					     )}
</td></tr></table>
<br />
	    {eventsData.allAirtable.edges.filter(edge => ! edge.node.data.List_in_Courses_and_meet_ups).slice(6).map((e,index) => {
		return (
		    <Ev ev={e.node.data} />
		)})}
	

	    
	</>
    )};




export default EventsPage;
