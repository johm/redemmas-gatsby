/** @jsx jsx */
import { jsx } from "theme-ui"
import React, {useState,useEffect} from "react"
import { graphql, useStaticQuery, Link } from 'gatsby'


import SEO from "../components/seo"
import InnerLayout from "../components/InnerLayout.js"
import moment from 'moment'
import ArchiveEvent from "../components/ArchiveEvent"



const EventsPage = () => {
    
    const eventsData = useStaticQuery(graphql`{
  allAirtable(
    sort: {data: {Date_and_time: DESC}}
    filter: {table: {eq: "Events"}, data: {Status: {eq: "Published"}, Upcoming: {ne: 1}, WBFOnly: {ne: true}}}
  ) {
    edges {
      node {
        data {
          Name
          Slug
          Date_and_time
          Location
          Short_Description
  }
}
}
}
}`)



    return (
	<InnerLayout>
	    <h1 className="text-4xl md:text-6xl mb-6 font-text text-stone-900 border-b border-yellow-700">Past events</h1>
	    {eventsData.allAirtable.edges.map((e,index) => {
		return (
		    <div key={e.node.data.Slug}>
			<ArchiveEvent e={e.node.data} />
		    </div>
		)})}
	</InnerLayout>
    );

}

export default EventsPage;
