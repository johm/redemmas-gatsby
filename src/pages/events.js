/** @jsx jsx */
import { jsx } from "theme-ui"
import React, {useState,useEffect} from "react"
import { graphql, useStaticQuery } from 'gatsby'


import SEO from "../components/seo"
import InnerLayout from "../components/InnerLayout.js"
import moment from 'moment'
import Event from "../components/Event"
import SemiCompactEvent from "../components/SemiCompactEvent"



const NewEventsPage = () => {

    const [nowtime, setNowtime] = useState(Date.now())
    useEffect(() => {
	setNowtime(Date.now())
    },[])

    
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
              childImageSharp {
                gatsbyImageData(placeholder: DOMINANT_COLOR, layout: CONSTRAINED)
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
	    <h1 className="text-4xl md:text-6xl mb-6 font-text text-stone-900 border-b border-yellow-700">Upcoming events</h1>
	    <div className="md:flex gap-8 md:flex-wrap"> 
		<div className="md:flex-1 md:grid grid-cols-2  lg:grid-cols-4 gap-8 mt-12 auto-rows-fr">
		    {eventsData.allAirtable.edges.filter(edge => ! edge.node.data.List_in_Courses_and_meet_ups).slice(0,2).map((e,index) => {
			return (
			    <div key={e.node.data.Slug}>
				<Event e={e.node.data} />
			    </div>
			)})}
		    <div>
		    <div className=" bg-slate-100 p-6  mb-6">
			<h3 className="border-b border-yellow-700 font-subhed md:text-xl mb-6 sm:text-lg" >Courses, workshops and meetups...</h3>
			{eventsData.allAirtable.edges.filter(edge => edge.node.data.List_in_Courses_and_meet_ups).slice(0,2).map((e,index) => {
			    return (
			    <div key={e.node.data.Slug}>
				<SemiCompactEvent e={e.node.data} />
			    </div>
			    )})}
		    </div>
			</div>
		    {eventsData.allAirtable.edges.filter(edge => ! edge.node.data.List_in_Courses_and_meet_ups).slice(2,6).map((e,index) => {
			return (
			    <div key={e.node.data.Slug}>
				<Event e={e.node.data} />
			    </div>
			)})}
		    <div>
		    <div className=" bg-slate-100 p-6  mb-6">
			<h3 className="border-b border-yellow-700 font-subhed text-xl mb-6" >More courses, workshops and meetups...</h3>
			{eventsData.allAirtable.edges.filter(edge => edge.node.data.List_in_Courses_and_meet_ups).slice(2,4).map((e,index) => {
			    return (
				<div key={e.node.data.Slug}>
				    <SemiCompactEvent e={e.node.data} />
				</div>
			    )})}
		    </div>
			</div>
		    {eventsData.allAirtable.edges.filter(edge => ! edge.node.data.List_in_Courses_and_meet_ups).slice(6).map((e,index) => {
			return (
			    <div key={e.node.data.Slug}>
				<Event e={e.node.data} />
 			    </div>
			)})}
		    

		    
		</div> 

	    </div>

		    <div className=" bg-slate-100 p-6 pb-0  mb-6 ">
			<h3 className="border-b border-yellow-700 font-subhed text-xl mb-6" >More courses, workshops and meetups...</h3>
			<div class="md:grid grid-cols-2  lg:grid-cols-4 gap-8">
			{eventsData.allAirtable.edges.filter(edge => edge.node.data.List_in_Courses_and_meet_ups).slice(4).map((e,index) => {
			    return (
				<div key={e.node.data.Slug}>
				    <SemiCompactEvent e={e.node.data} />
				</div>
			    )})}
		    </div>
</div>
	    
	    <div className="mb-6 font-text italic"><a className="text-yellow-700"  href="/eventarchive">See our archive of past events</a></div>
	</InnerLayout>
    );

}

export default NewEventsPage;
