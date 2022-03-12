import React from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/seo'




const Layout = ({ children }) => (
    
    <div >
    <div
    hidden
    id="snipcart"
    data-api-key={process.env.SNIPCART_API_KEY}
    data-config-modal-style="side"
    ></div>
    <SEO />
    <Header />
    
    <div >
    {children}
    </div>
    <div className="bg-stone-900 text-stone-200 p-6 flex flex-wrap" id="theFooter">
	<Footer/>
    </div>
    </div>


)


export default Layout
