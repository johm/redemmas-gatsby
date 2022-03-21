import React, { useState,useEffect } from "react"


import InnerLayout from "../components/InnerLayout.js"
import Book from "../components/Book.js"




const SearchPage = ({location}) => {

    const [formData, setFormData] = useState({
	query: location.state ? location.state.query : "",
    })

    const [resultData, setResultData] = useState({
	results:[]
    })

    const [url, setUrl] = useState(`https://redemmas.org/search`)

    
    const doSearch = () => {
	fetch(`${process.env.GATSBY_INVENTORY_SERVER}/titles.json?searchquery=${formData.query}`)
	 .then(response => response.json()) // parse JSON from request
	 .then(responseData => {
	     setResultData({...resultData,results: responseData})
	 })
	
    }
    
    
    const handleChange = (e) => {
	setFormData({...formData, query: e.target.value})
    }
    
    const handleSubmit = (e) => {
	e.preventDefault()
	setUrl(`https://redemmas.org/search?query=${formData}`)
	doSearch()
    }

    useEffect(() => {
	doSearch()
    },[url]);


    return (
	<InnerLayout>
	    <div className="text-6xl font-text text-stone-900 border-b border-yellow-700">Search for a book</div>

	    <form className="mt-6" onSubmit={handleSubmit}>

		<input className="shadow appearance-none border font-text text-4xl rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={formData.query} onChange={handleChange} type="text" name="query" id="query" />
		
		<div className="text-left">
		    <input className="mt-6 text-2xl w-full md:w-2/3 lg:w-1/3 bg-yellow-900  hover:bg-yellow-700 text-white font-subhed uppercase py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Search 🔎" />
		</div>
	    </form>




	    <div className="grid md:grid-cols-2 lg:grid-cols-4  gap-8 mt-12 auto-rows-fr">
		{resultData.results.map ((result,index) => {
		    return (
			<Book title={result.the_title} edition={result.the_edition} />
		    )
		}
		)
		}
		
	    </div>
	    
	</InnerLayout>
    )
}

export default SearchPage;
