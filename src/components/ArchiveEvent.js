import React from "react"
import moment from 'moment-timezone'
import { GatsbyImage} from "gatsby-plugin-image";
import { Link } from "gatsby"
 

const Event = ({e}) => (


    <div className=" mb-3 "> 
	<dt><span className="font-subhed uppercase text-sm">{moment(e.Date_and_time).tz('America/New_York').format("M/D/YYYY")} / {e.Location}</span></dt>
	<dd><a href={"/events/"+e.Slug}> <h2 className="text-lg mb-3 font-text  leading-tight text-yellow-900 inline">{e.Name}</h2></a></dd>
    </div>

)
export default Event
