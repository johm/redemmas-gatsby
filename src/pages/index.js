/** @jsx jsx */
import { jsx } from "theme-ui"
import React, {useState,useEffect} from "react"
import { graphql, useStaticQuery,navigate,Link } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import SEO from "../components/seo"
//import Layout from '../components/Layout'
import Logo from '../components/logo'
import moment from 'moment'
import ShortEvent from "../components/ShortEvent"
import { PrismicLink } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'



class IndexTitle extends React.Component {
    componentDidMount() {
	window.addEventListener("scroll", this.resizeHeaderOnScroll);
    }
    resizeHeaderOnScroll() {
	const headerEl = document.getElementById("indextitle");
	const rect = headerEl.getBoundingClientRect();
	
	if (rect.y < 10) {
	    headerEl.classList.remove("absolute");
	    headerEl.classList.remove("top-96");
	    headerEl.classList.add("fixed");
	    headerEl.classList.add("top-0");
	    headerEl.classList.add("bg-stone-900");
	} 
    }

    render (){
	return (
    	<div id="indextitle" className="transition-colors ease-in duration-500 delay-100 flex absolute top-96 pl-2 items-center gap-2 w-screen h-16">
	<Logo />
	<h1 className="text-stone-100 font-text text-2xl md:text-3xl flex-1" >
        Red Emma&#8217;s </h1>
	</div>
	)
    }
}



const IndexPage = () => {

    const [nowtime, setNowtime] = useState(Date.now())
    useEffect(() => {
	setNowtime(Date.now())
    },[])
    
    
    const homepageData = useStaticQuery(graphql`{
  prismicHomePage {
    data {
      about {
        text
        raw
      }
      image_blocks {
        link {
          url
        }
        title {
          text
        }
        image {
          url
          gatsbyImageData
        }
      }
    }
  }
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

    const homepage=homepageData.prismicHomePage.data;
    
    return (
	<div>
	<SEO />	
	<div className="h-screen w-screen bg-cover bg-center bg-top  brightness-75 bg-scroll bg-[url('../images/may2024.webp')]">
	</div>
	<IndexTitle />
	<div className="bg-stone-50 p-8 z-30  font-text">
	    <div className="p-8 md:p-16 border border-yellow-700 rounded text-xl md:text-2xl exthtml" >

	<PrismicRichText field={homepage.about.raw} components={{}} />

	</div>
	</div>
	    <div className="grid w-full sm:grid-cols-2 gap-8 p-8">
	    {homepage.image_blocks.map((image_block, index) => {
		return (
		    <div  onClick={() => navigate(image_block.link.url) } className="relative top-0 bg-blue-100 h-50vw bg-cover" style={{backgroundImage : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.0) 0%, rgba(0, 0, 0, 0.20) 75%,  rgba(0, 0, 0, 0.90) 100%),url('+ image_block.image.url}}>
			
			<div className="absolute bottom-5 left-5 text-stone-100 font-subhed  text-6xl z-20">
			    {image_block.title.text}
			</div>
			<div className="absolute bottom-5 right-5 border-t-4 border-yellow-700 w-1/2 h-6 z-10" />
			
		    </div>
		)
	    })
	    }
	</div>

	<div className="p-6">
	    <h1 className="text-2xl md:text-4xl mb-6 font-text text-stone-900 border-b border-yellow-700"><Link to="/events">Coming up soon</Link></h1>
	    <div class="md:grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 auto-rows-fr">
		{homepageData.allAirtable.edges.slice(0,3).map((e,index) => {
		    return (
			<ShortEvent e={e.node.data} />
		)})}
	    </div>
	    <Link className="text-center rounded-full bg-yellow-900 text-stone-100 block px-3 py-2 uppercase font-subhed hover:bg-stone-800 transition-colors md:mx-40 lg:mx-72 text-xl" to="/events">See all upcoming events</Link>
	</div>
	</div>
	    

	)};

export default IndexPage
