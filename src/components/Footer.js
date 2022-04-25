import React, {useState} from "react"
import ReactDOM from 'react-dom';
import { graphql, useStaticQuery } from 'gatsby'
import { PrismicLink } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import MailchimpSubscribe from "react-mailchimp-subscribe"





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
	<div className="w-full md:w-1/3 mb-6">
	    <h2 className="font-subhed uppercase w-[90%] text-2xl border-b-2  border-yellow-900 mr-20">Get our newsletter</h2>
	    <div className="font-subhed mt-3 mailchimp">
		<MailchimpSubscribe url="https://redemmas.us6.list-manage.com/subscribe/post?u=ba8275d3da8a8eeb9ab92d64f&amp;id=723faff526" />

	    </div>
	</div>
	
	</>

    )
}

export default Footer
