import React, {useState} from "react"
import ReactDOM from 'react-dom';
import { graphql, useStaticQuery } from 'gatsby'
import { PrismicLink } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'





const Footer = () => {

    const queryData = useStaticQuery(graphql`
	{
	    prismicFooter {
		data {
		    chunks {
			title {text}
			description {raw}
		    }
		}
	    }
	}
    `)
    
    const footer=queryData.prismicFooter
    
    return (
	<>
	    {footer.data.chunks.map((chunk, index) => {
		return(
		    <div className="w-full md:w-1/3 mb-6">
			<h2 className="font-subhed uppercase w-[90%] text-2xl border-b-2  border-yellow-900 mr-20">{chunk.title.text}</h2>
			<div className="font-subhed mt-3">
			    <PrismicRichText field={chunk.description.raw}
					     components={{
					     }}

			    />
			</div>
		    </div>
		)
	    })}
	</>

    )
}

export default Footer
