import React from "react"


const lf = new Intl.ListFormat('en');

const Contributors = ({title}) => {
    
    //make these links to author pages
    const l=lf.format(title.contributions.map(x => x.author.fullName  + ((x.what != "" && x.what ) ?  (" ("+x.what+")") : ""  )))
    
    return ( 
	l
    )
}

export default Contributors



