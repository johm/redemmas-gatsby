import React from "react"
import moment from 'moment'
import { GatsbyImage} from "gatsby-plugin-image";
import { Link } from "gatsby"


const ShortEvent = ({event}) => (


    <div className=" mb-6 relative"> 

	<Link to={"/events/"+event.Slug}>
	    <GatsbyImage
		image={
		event.Image.localFiles[0].childImageSharp.gatsbyImageData
		}
		alt={event.Name}
	    />

	    <h2 className="text-2xl md:text-3xl mb-3 font-text leading-tight text-stone-900">{event.Name}</h2></Link>
	<div className="font-subhed uppercase">{moment(event.Date_and_time).format("dddd, MMMM Do YYYY")}</div>
	<div className="font-subhed uppercase">{moment(event.Date_and_time).format("h:mm a")}</div>
	<div className="font-subhed uppercase mb-6">{event.Location}</div>
	{event.Withfriends_url &&  <a href={event.Withfriends_url} className="inline-block mt-1 absolute bottom-0 text-center  rounded-full bg-violet-900 text-stone-100 font-subhed px-3 py-0.5 uppercase hover:bg-stone-800 transition-colors text-xs">RSVP on withfriends</a>}


	
	

	
    </div>

)


export default ShortEvent
