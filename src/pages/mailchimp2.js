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
	    <div key={ev.Slug} className="mcnTextContent" style={{padding:"0px",
								  marginTop:"40px"}}>
		<a href={"https://redemmas.org/events/"+ev.Slug}>
		    <img width="100%" src={"https://redemmas.org"+ encodeURI(ev.Image.localFiles[0].publicURL)} />
		</a>
		<br /><br />
		<h3 style={{paddingRight:"10px",
			    paddingLeft:"10px"}}>
		<a style={{textDecoration:"none !important"}} href={"https://redemmas.org/events/"+ev.Slug}>{ev.Name}</a></h3>
		<table style={{marginTop:"10px",
			       marginRight:"10px",
			       marginLeft:"10px"}}>
		    <tr>
			<td width="60%">{ev.Short_Description}</td>
			<td width="40%" style={{textAlign:"right"}}>
			    <h4 className="">{moment(ev.Date_and_time).tz('America/New_York').format("ddd MMMM D")}</h4>
			    <h4 className="">{moment(ev.Date_and_time).tz('America/New_York').format("h:mm a")}</h4>
			    <h4 className="">{ev.Location}</h4>
			    <br />
			    {ev.Withfriends_url &&  <a href={ev.Withfriends_url} className="" style={{
							   fontFamily:"Helvetica",
							   border:"2px solid #4c1d95",
							   color:"#4c1d95",
							   padding:"10px",
							   paddingRight:"20px",
							   paddingLeft:"20px",
							   textDecoration:"none",
 				  			   borderRadius:"10px"}} >RSVP now!</a>}
			</td>
		    </tr>
		</table>
		
		
		
		
	    </div>
	    {`\n\n`}
	</>)
};

const ShortEv = ({ev}) => {
    return (
    	<>
	    <div key={ev.Slug} className="mcnTextContent" style={{width:"45%",
								  paddingRight:"5%",
								  float:"left"}} >
		<h4 style={{marginTop:"20px",
			    textAlign:"left !important"}}><a style={{textDecoration:"none !important",
								      color:"#a96800"}} href={"https://redemmas.org/events/"+ev.Slug}>{ev.Name}</a></h4>
		<br />
		<h5 style={{fontFamily:"Helvetica"}} className="">{moment(ev.Date_and_time).tz('America/New_York').format("ddd, MMMM D")}</h5>
		<h5 style={{fontFamily:"Helvetica"}}  className="">{moment(ev.Date_and_time).tz('America/New_York').format("h:mm a")}</h5>
		<h5 style={{fontFamily:"Helvetica"}} className="">{ev.Location}</h5>
		
		<br />
		<h5 style={{fontFamily:"Helvetica"}} className="">
		<a href={ev.Withfriends_url || "https://redemmas.org/events/"+ev.Slug} className=""
			  style={{fontFamily:"Helvetica",
				  color:"#4c1d95",
				  textDecoration:"none",
				 }}>RSVP and more info</a>
		</h5>
	    </div>
	    {`\n\n`}
	</>)
};
			


const Evs = ({eventsData})=>{

    return (
	<>
	    {eventsData.allAirtable.edges.filter(edge => ! edge.node.data.List_in_Courses_and_meet_ups).slice(0,3).map((e,index) => {
		return (
		    <Ev ev={e.node.data} />
		)}
														      )}
	    
	    <table style={{backgroundColor:"#e2e8f0",marginTop:"30px"}}>
		<tr><td style={{padding:"20px"}}>
			<h3 style={{fontFamily:"Helvetica"}}>Courses, workshops, and meetups...</h3>
			
			<div>
			    {eventsData.allAirtable.edges.filter(edge => edge.node.data.List_in_Courses_and_meet_ups).slice(0,2).map((e,index) => {
				return (
				    <ShortEv ev={e.node.data} />
				)})}
			</div>
			<div style={{clear:"both"}}>
			    {eventsData.allAirtable.edges.filter(edge => edge.node.data.List_in_Courses_and_meet_ups).slice(2,4).map((e,index) => {
				return (
				    <ShortEv ev={e.node.data} />
				)})}
			</div>
		    </td></tr></table>
	    <br />
	    {eventsData.allAirtable.edges.filter(edge => ! edge.node.data.List_in_Courses_and_meet_ups).slice(3,6).map((e,index) => {
		return (
		    <Ev ev={e.node.data} />
		)}
														      )}
	    <table style={{backgroundColor:"#e2e8f0",marginTop:"30px"}}>
		<tr><td style={{padding:"20px"}}>
			<h3 style={{fontFamily:"Helvetica"}}>More courses, workshops, and meetups...</h3>


			<div>
			    {eventsData.allAirtable.edges.filter(edge => edge.node.data.List_in_Courses_and_meet_ups).slice(4,6).map((e,index) => {
				return (
				    <ShortEv ev={e.node.data} />
				)})}
			</div>
			<div style={{clear:"both"}}>
			    {eventsData.allAirtable.edges.filter(edge => edge.node.data.List_in_Courses_and_meet_ups).slice(6,8).map((e,index) => {
				return (
				    <ShortEv ev={e.node.data} />
				)})}
			</div>
			
		    </td></tr></table>
	    <br />
	    {eventsData.allAirtable.edges.filter(edge => ! edge.node.data.List_in_Courses_and_meet_ups).slice(6).map((e,index) => {
		return (
		    <Ev ev={e.node.data} />
		)})}
	
	</>
    )};




export default EventsPage;
