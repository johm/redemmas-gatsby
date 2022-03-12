import React, {useState} from "react"
import { navigate } from "gatsby"




const BookSearchForm = () => {
    const [formData, setFormData] = useState({
	searchquery: "",
    })
    
    const handleChange = (e) => {
	setFormData({...formData, searchquery: e.target.value})
    }
    
    
    
    const handleSubmit = (e) => {
	e.preventDefault()
	console.log(formData.searchquery)
	navigate("/search/",
	{state: {query: formData.searchquery}})
	
    }


	
	return (
	    <div>
		<div className="text-3xl font-text text-stone-900 border-b border-yellow-700">Search for a book</div>
		<form className="mt-6" onSubmit={handleSubmit}>
		    <input className="shadow appearance-none border font-text text-xl rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={formData.searchquery} onChange={handleChange} type="text" name="searchquery" id="searchquery" />
		    
		    <div className="text-left">
			<input className="mt-6 text-xl w-full md:w-2/3 lg:w-1/3 bg-yellow-900  hover:bg-yellow-700 text-white font-subhed uppercase py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Search 🔎" />
		    </div>
		</form>
	    </div>
	)
}


export default BookSearchForm
