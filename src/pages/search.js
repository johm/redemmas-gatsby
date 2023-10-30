import React, { useState,useEffect } from "react"


import InnerLayout from "../components/InnerLayout.js"
import Book from "../components/Book.js"



const spinner = () => {
    return (
	<div role="status">
	    <svg aria-hidden="true" class="mr-2 w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
		<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
	    </svg>
	    <span class="sr-only">Loading...</span>
	</div>
    )
}


const SearchPage = ({location}) => {

    const [formData, setFormData] = useState({
	query: location.state ? location.state.query : "",
    })

    const [resultData, setResultData] = useState({
	results:[]
    })

    const [status, setStatus] = useState(spinner())


    const [bookshop,setBookshop] = useState(false)
    
    const [url, setUrl] = useState(`https://redemmas.org/search`)

    
    const doSearch = () => {
	fetch(`${process.env.GATSBY_INVENTORY_SERVER}/titles.json?searchquery=${formData.query}`)
	 .then(response => response.json()) // parse JSON from request
	 .then(responseData => {
	     setResultData({...resultData,results: responseData})
	     if (responseData.length===1){
		 setStatus(" " + responseData.length + " result found.")
		 setBookshop(false)
	     }
	     else if (responseData.length===0){
		 setStatus("Sorry, no results found.")
		 setBookshop(true)
	     }
	    else {
		 setStatus(" " + responseData.length + " results found.")
				 setBookshop(false)
	    }
	      })
	
    }
    
    
    const handleChange = (e) => {
	setFormData({...formData, query: e.target.value})
    }
    
    const handleSubmit = (e) => {
	e.preventDefault()
	setStatus(spinner())
	setUrl(`https://redemmas.org/search?query=${formData}`)
	doSearch()
    }

    useEffect(() => {
	doSearch()
    },[url,status]);


    return (
	<InnerLayout>
	    <div className="text-6xl font-text text-stone-900 border-b border-yellow-700">Search for a book</div>

	    <form className="mt-6" onSubmit={handleSubmit}>

		<input className="shadow appearance-none border font-text text-4xl rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={formData.query} onChange={handleChange} type="text" name="query" id="query" />
		
		<div className="text-left">
		    <input className="mt-6 text-2xl w-full md:w-2/3 lg:w-1/3 bg-yellow-900  hover:bg-yellow-700 text-white font-subhed uppercase py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Search 🔎" />
		</div>
	    </form>


	    <div className="mt-2 font-text text-2xl" >{status}</div>

	    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8 mt-4 auto-rows-fr">

		    {resultData.results.map ((result,index) => {
			return (
			    <Book title={result.the_title} edition={result.the_edition} />
			)
		    }
					    )
		    }

		
	    </div>

	    <div className={bookshop ? "" : "hidden" } >
		<div className="font-text text-2xl mt-3 mb-3">But don't worry! You can buy most books in print and support Red Emma's via <a className="underline" href="https://bookshop.org/shop/redemmas">bookshop.org</a>:</div>  
		<iframe width="300px" src="https://bookshop.org/widgets/search/3323" />
	    </div>
	</InnerLayout>
    )
}

export default SearchPage;
