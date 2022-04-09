import React from "react"
import Contributors from '../components/contributors'
import BuyButtons from '../components/BuyButtons'
import { Link } from "gatsby"


const Book = ({title,edition}) => (


    edition !== null && 	
     <div className="flex flex-wrap mb-6 "> 
	 <div className="w-1/2  pr-4">
	     <Link to={"/titles/"+title.slug}> <img  className="w-full hover:drop-shadow object-contain object-left-top" src={`${process.env.GATSBY_IMAGE_SERVER}/${edition.cover_image_url}`} /></Link>
	 </div>
	 
	 <div className="w-1/2" >
	     <div className="mb-2"><Link to={"/titles/"+title.slug} className="font-text text-lg leading-3 text-stone-900 hover:text-yellow-900">{title.title}</Link></div>
	     <div className="mb-2 font-subhed leading-tight uppercase text-xs"><Contributors title={title} /></div>
	     <div className="font-subhed text-sm text-red-400">${edition.list_price}</div>
	 </div>
	 
	 <div className="self-end w-full mt-2">
	     <BuyButtons title={title} edition={edition}/>
	 </div>
     </div>
    

)


export default Book
