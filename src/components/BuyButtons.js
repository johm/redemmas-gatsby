import React, { useState, useEffect } from "react"


const lf = new Intl.ListFormat('en');

const BuyButtons = ({title,edition}) => {
    const [instock, setInstock] = useState(false)
    const [libro, setLibro] = useState(false)
    useEffect(() => {
	fetch(`${process.env.GATSBY_INVENTORY_SERVER}/editions/${edition.key}.json`)
	    .then(response => response.json()) // parse JSON from request
	    .then(resultData => {
		setInstock(resultData.instock)
		setLibro(resultData.libro_url)
	    }) 
    }, [])

    return (
	<>
	    { ! instock &&
<button className="w-full snipcart-add-item rounded-full bg-stone-100 text-stone-300 font-subhed px-3 py-0.5 uppercase "
		      data-item-id={edition.key}
		      data-item-price={edition.list_price}
		      data-item-url={"https://redemmas.org/titles/"+title.slug}
		      data-item-weight="750"	
		      data-item-description={edition.isbn13}
		      data-item-image={'https://old.redemmas.org'+ edition.cover_image_url}
		      data-item-categories="notloadedyet" 
		      data-item-name={ title.title }>
<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    CHECKING INVENTORY 
	      </button>
	      }
	    
	{ (instock !== "UNAVAILABLE" && instock !== "OUT OF PRINT" && instock ) && 
	      <button className="w-full snipcart-add-item rounded-full bg-red-400 text-stone-100 font-subhed px-3 py-0.5 uppercase hover:bg-stone-800 transition-colors duration-500"
		      data-item-id={edition.key}
		      data-item-price={edition.list_price}
		      data-item-url={"https://redemmas.org/titles/"+title.slug}
		      data-item-weight="750"	
		      data-item-description={edition.isbn13}
		      data-item-image={'https://old.redemmas.org'+ edition.cover_image_url}
		      data-item-categories={ instock === "IN STOCK" ? "instock" : "" }
		      data-item-name={ instock === "PREORDER" ? title.title + " [PREORDER]" : title.title }>
		  {instock === "IN STOCK" &&  <>Add to cart</>}
		  {instock === "PREORDER" &&  <>Preorder</>}
		  {(instock !== "PREORDER" && instock !== "IN STOCK") &&  <>Backorder</>}
	      </button>
	}
	{ (instock === "UNAVAILABLE" || instock === "OUT OF PRINT") &&
	      <button className="w-full rounded-full bg-stone-400 text-stone-100 font-subhed px-3 py-0.5 uppercase">
		  Unavailable
	      </button>
	    }
	{edition.isbn13 && 
	<a target="_blank" href={"https://bookshop.org/a/3323/"+edition.isbn13} className="block mt-1 text-center w-full  rounded-full bg-yellow-900 text-stone-100 font-subhed px-3 py-0.5 uppercase hover:bg-stone-800 transition-colors text-xs">Order via bookshop.org</a>
}
	{libro !== null &&

	 <a target="_blank" href={libro} className="block mt-1 text-center w-full  rounded-full bg-stone-600 text-stone-100 font-subhed px-3 py-0.5 uppercase hover:bg-yellow-300 transition-colors text-xs">Purchase audio book at libro.fm</a>
	}
	</>
    )
	}

export default BuyButtons



