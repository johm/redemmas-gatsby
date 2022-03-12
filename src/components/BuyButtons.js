import React, { useState, useEffect } from "react"


const lf = new Intl.ListFormat('en');

const BuyButtons = ({title,edition}) => {
    const [instock, setInstock] = useState(false)
    useEffect(() => {
	fetch(`${process.env.GATSBY_INVENTORY_SERVER}/editions/${edition.key}.json`)
	    .then(response => response.json()) // parse JSON from request
	    .then(resultData => {
		setInstock(resultData.instock)
	    }) 
    }, [])

    return (
	<>
	{ (instock !== "UNAVAILABLE") && 
	  <button className="w-full snipcart-add-item rounded-full bg-red-400 text-stone-100 font-subhed px-3 py-0.5 uppercase hover:bg-stone-800 transition-colors duration-500"
	    data-item-id={edition.key}
	    data-item-price={edition.list_price}
	    data-item-url={"https://redemmas.org/titles/"+title.slug}
	    data-item-weight="750"	
	    data-item-description={edition.isbn13}
	    data-item-image={'https://redemmas.org'+ edition.cover_image_url}
	    data-item-name={title.title}>
	    {instock === "IN STOCK" &&  <>Add to cart</>}
	    {instock === "PREORDER" &&  <>Preorder</>}
	    {(instock !== "PREORDER" && instock !== "IN STOCK") &&  <>Backorder</>}
	      </button>
	}
	{ (instock === "UNAVAILABLE") &&
	  <button className="w-full rounded-full bg-stone-400 text-stone-100 font-subhed px-3 py-0.5 uppercase">
	      Unavailable
	  </button>
	      }
	      <a className="block mt-1 text-center w-full snipcart-add-item rounded-full bg-yellow-900 text-stone-100 font-subhed px-3 py-0.5 uppercase hover:bg-stone-800 transition-colors text-xs">Order via bookshop.org</a>
	</>
    )
	}

export default BuyButtons



