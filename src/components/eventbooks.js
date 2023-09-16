import React, { useState, useEffect } from "react"
import Book from "../components/Book.js"



const lf = new Intl.ListFormat('en');

const EventBook = ({isbn}) => {
    const [resultData, setResultData] = useState(false)

    useEffect(() => {
	fetch(`${process.env.GATSBY_INVENTORY_SERVER}/titles.json?searchquery=${isbn}`)
	 .then(response => response.json()) // parse JSON from request
	    .then(responseData => {
		setResultData({...resultData,results: responseData})
	    }) 
    }, [])
    
    return (
	<>
	    {resultData.results.map ((result,index) => {
		return (
		    <Book title={result.the_title} edition={result.the_edition} />
		)
	    }
				    )
	    }
	</>
    )
}

export default EventBook



