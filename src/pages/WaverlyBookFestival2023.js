/** @jsx jsx */
import { jsx } from "theme-ui"
import React, {useState,useEffect} from "react"
import { graphql, useStaticQuery, Link } from 'gatsby'


import SEO from "../components/seo"
import InnerLayout from "../components/InnerLayout.js"
import moment from 'moment'
import Event from "../components/Event"
import WBF from "../images/waverlybf.jpg"
import WBFS from "../images/wbf-social.jpg"




const WaverlyBookFestival2023Page = () => {

    
    const [nowtime, setNowtime] = useState(Date.now())
    useEffect(() => {
	setNowtime(Date.now())
    },[])

    
    const eventsData = useStaticQuery(graphql`{
  allAirtable(
    sort: {data: {Date_and_time: ASC}}
    filter: {table: {eq: "Events"}, data: {Status: {eq: "Published"}, Waverly: {eq: 1}, Upcoming: {eq: 1}}}
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
              childImageSharp {
                gatsbyImageData(placeholder: TRACED_SVG, layout: CONSTRAINED)
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
	    <SEO title="Waverly Book Festival: Schedule of talks" description="April 28-30th, 2023 * Baltimore, MD" image={WBFS} />	
	    <h1 className="text-4xl md:text-6xl mb-6 font-text text-stone-900 border-b border-yellow-700">Book talks at the Waverly Book Festival</h1>
	    <div className="flex flex-wrap">
		<div className="w-full md:w-1/3">
		<a href=""><img src={WBF} alt="Waverly Book Festival logo, with letters in front of a drawing of rowhouses opening like books"  /></a></div>
		<div class="font-text w-full md:w-2/3 md:px-4">
		    <p className="text-xl mb-2">
			<Link className="text-yellow-900  uppercase font-subhed decoration-dashed hover:underline hover:text-yellow-700 transition-colors " to="https://waverlybookfestival.com">The new Waverly Book Festival</Link> is taking place across the entire Waverly neighborhood from Friday, April 28th to Sunday April 30th, 2023.
		    </p>
		    <p className="mb-2">
			Events will take place at Red Emma's and other area bookstores, as well as at Peabody Heights Brewery. On Sunday, 4/30, we're taking over the farmer's market lot on 32nd St. between Greenmount and Barclay for an outdoor book market with food, drinks, and a festival stage.
			</p>
			
		    <p className="mb-2"><Link className="text-yellow-900  uppercase font-subhed decoration-dashed hover:underline hover:text-yellow-700 transition-colors " to="https://docs.google.com/forms/d/e/1FAIpQLSffyuFGdEDlZ6wuQXYDmOFaiEDK03pQqGZZyJ8yHXW9wq0TmQ/viewform">Learn more about how to become a festival vendor here.</Link></p>

		    <p className="mb-2">Below, you'll find the schedule of book talks for the festival, with more being announced every day. And look for the printed schedule in the Baltimore Beat!</p>
			
		<div className="border-dashed border p-2 border-yellow-900 mx-4 mt-4 text-center font-subhed">The Waverly Book Festival is brought to you by: Red Emma's * Waverly Main Street * Peabody Heights Brewery</div>
		</div>
	    </div>
	    <div className="md:grid grid-cols-2 lg:grid-cols-3 gap-8 mt-12 auto-rows-fr">
		{eventsData.allAirtable.edges.map((e,index) => {
		    return (
			<div key={e.node.data.Slug}>
			    <Event e={e.node.data} />
			</div>
		)})}
	    </div>
	</InnerLayout>
    );

}

export default WaverlyBookFestival2023Page;
