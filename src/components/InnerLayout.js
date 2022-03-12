import React from "react"
import PageTitle from "../components/pagetitle.js"


const InnerLayout = ({ children }) => (
    <div>
    <PageTitle />
    <div className="pt-24 pl-4 pr-4">
    
    {children}
    </div>
    </div>
)


export default InnerLayout
