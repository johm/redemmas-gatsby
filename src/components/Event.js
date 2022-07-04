import React from "react"
import moment from 'moment-timezone'
import { GatsbyImage} from "gatsby-plugin-image";
import { Link } from "gatsby"
 

const Event = ({e}) => (


    <div className=" mb-6 "> 

	<Link to={"/events/"+e.Slug}>
	    <GatsbyImage
		image={
		    e.Image.localFiles[0].childImageSharp.gatsbyImageData
		}
		alt={e.Name}
	    />
	</Link>
	     
	<a href={"/events/"+e.Slug}><h2 className="text-2xl md:text-3xl mb-3 font-text leading-tight text-stone-900">{e.Name}</h2></a>
	<div className="font-subhed uppercase">{moment(e.Date_and_time).tz('America/New_York').format("dddd, MMMM Do YYYY")}</div>
	<div className="font-subhed uppercase">{moment(e.Date_and_time).tz('America/New_York').format("h:mm a")}</div>
	<div className="font-subhed uppercase">{e.Location}</div>
	{e.Withfriends_url &&  <a href={e.Withfriends_url} className="inline-block mt-1 text-center  rounded-full bg-violet-900 text-stone-100 font-subhed px-3 py-0.5 uppercase hover:bg-stone-800 transition-colors text-xs">RSVP on withfriends</a>}

	<div className="font-text">{e.Short_Description}</div>
    </div>

)
export default Event
