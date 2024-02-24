import React, { useState, useEffect } from "react"
var sanitizeHtml = require('sanitize-html');


const lf = new Intl.ListFormat('en');

const Description = ({title,edition}) => {
    const [description, setDescription] = useState(false)

    useEffect(() => {
	fetch(`${process.env.GATSBY_INVENTORY_SERVER}/editions/${edition.key}.json`)
	    .then(response => response.json()) // parse JSON from request
	    .then(resultData => {
		setDescription(sanitizeHtml(resultData.description))
	    }) 
    }, [])

    return (
	<div dangerouslySetInnerHTML={ {__html: description} } />

    )
}

export default Description



