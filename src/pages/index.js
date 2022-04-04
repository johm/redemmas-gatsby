/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { graphql, useStaticQuery,navigate } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import SEO from "../components/seo"
//import Layout from '../components/Layout'
import Logo from '../components/logo'




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

    const homepageData = useStaticQuery(graphql`
	{
	    prismicHomePage {
		data {
		    about {text}
		    image_blocks {
			link {
			    url
			}
			title {text}
			image { 
			    url
			    gatsbyImageData
			}
			
		    }
		}
	    }
	}
    `)

    const homepage=homepageData.prismicHomePage.data;
    
    return (
	<div>
	    <SEO />	
	    <div className="h-screen w-screen bg-cover bg-center bg-top  brightness-75 bg-scroll bg-[url('../images/test-bg2.jpg')]">
	    </div>
	    <IndexTitle />
	    <div className="bg-stone-50 p-8 z-30  font-text">
		<div className="p-16 border border-yellow-700 rounded text-2xl" >{homepage.about.text}</div>
	    </div>
	    <div className="flex flex-wrap w-full">
		{homepage.image_blocks.map((image_block, index) => {
		    return (
			<div  onClick={() => navigate(image_block.link.url) } className="relative top-0 sm:w-1/2 w-full bg-blue-100 h-50vw bg-cover" style={{backgroundImage : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.0) 0%, rgba(0, 0, 0, 0.20) 75%,  rgba(0, 0, 0, 0.90) 100%),url('+ image_block.image.url}}>
			    
			    <div className="absolute bottom-5 left-5 text-stone-100 font-subhed  text-6xl z-20">
				{image_block.title.text}
			    </div>
			    <div className="absolute bottom-5 right-5 border-t-4 border-yellow-700 w-1/2 h-6 z-10" />
			    
			</div>
		    )
		})
		}
	    </div>
	</div>
	

)};

export default IndexPage
