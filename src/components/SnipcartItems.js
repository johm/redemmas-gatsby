import React, {useState, useContext} from "react"
import { SnipcartContext } from "gatsby-plugin-snipcart-advanced/context";

const SnipcartItems = () => {
    const { state } = useContext(SnipcartContext);
    const { userStatus, cartQuantity } = state;
    if (cartQuantity > 0){
	return (
	    <span class=" absolute inset-0 object-right-top -mr-6">
	    
	    <div class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-yellow-700 text-stone-100">

	    {cartQuantity}
	    </div>
	    </span>
	)
    }
    else {
	return (
	    <></>
	)
    }
}



export default SnipcartItems;
