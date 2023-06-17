import React from "react"
import moment from 'moment-timezone'
import { GatsbyImage} from "gatsby-plugin-image";
import { Link } from "gatsby"
 

const Event = ({e}) => (


    <div className=" mb-6 "> 
	    
	<a href={"/events/"+e.Slug}><h2 className="text-xl mb-3 font-text leading-tight text-yellow-900">{e.Name}</h2></a>
	<div className="font-subhed uppercase text-sm">{moment(e.Date_and_time).tz('America/New_York').format("dddd, MMMM Do YYYY")}</div>
	<div className="font-subhed uppercase text-sm">{moment(e.Date_and_time).tz('America/New_York').format("h:mm a")} </div>
	{e.Withfriends_url &&  <a href={e.Withfriends_url} className="inline-block mt-1 text-center  rounded-full border border-violet-900 text-violet-900 hover:text-stone-100 font-subhed px-3 py-0.5 uppercase hover:bg-stone-800 transition-colors text-xs">RSVP</a>}

    </div>

)
export default Event
