import React, {useState} from "react"
import ReactDOM from 'react-dom';
import { graphql, useStaticQuery } from 'gatsby'
import { PrismicLink } from '@prismicio/react'
import SnipcartItems from '../components/SnipcartItems'
import { Link } from "gatsby"




const Header = () => {

    const queryData = useStaticQuery(graphql`
	{
	    prismicMainMenu {
		data {
		    menu_links {
			url {
			    url
			}
			title {
			    text
			}
		    }
		    footer {text}
		}
	    }
	}
    `)
    
    const mainMenu=queryData.prismicMainMenu
    const menuLinks=mainMenu.data.menus_links
    
    const [toggle, setToggle] = useState(false);
    
    return (
	<>
	    <div id="js-header" className="z-50 fixed top-0 right-0 bg-stone-900 w-[160px] md:w-[400px] h-16 flex p-1 md:p-3 md:gap-3 items-center font-subhed uppercase text-stone-100 ">
		<div className="md:flex flex-1 md:gap-3 text-xs md:text-base">
		    <a href="https://www.toasttab.com/red-emma-s/v3/?mode=fulfillment" className="block md:inline md:flex-1 border-2 rounded p-[3px] mb-[3px] md:mb-[0px] md:p-2  border-yellow-700  text-center leading-none hover:border-gray-400 focus:outline-none focus:border-gray-500 transition duration-150 ease-in-out"><span className="hidden md:inline" >Order</span> food</a>
		    <Link to="/books" className="block md:inline md:flex-1 border-2 border-yellow-700 rounded mt-[8px] md:mt-0 p-[3px] md:p-2   text-center leading-none hover:border-gray-400 focus:outline-none focus:border-gray-500 transition duration-150 ease-in-out"><span className="hidden md:inline" >Shop</span> books</Link>
		</div>
		<div className="md:flex w-7 h-12  md:w-auto">
		    <button className="snipcart-checkout  md:px-1 border-2 border-transparent text-yellow-700 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Cart">
			<svg className="md:h-6 md:w-6 ml-[3px] h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
			    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
			</svg>
			<SnipcartItems />
		    </button>

		    <div className="flex-none md:pt-2">
			<button class="outline-none menu-button" onClick={() => setToggle(!toggle)}>
			    <svg
				class="w-5 md:w-6 ml-1 md:pt-1 text-yellow-700 hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
				x-show="!showMenu"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				viewBox="0 0 24 24"
				stroke="currentColor"
			    >
				<path d="M4 6h16M4 12h16M4 18h16"></path>
			    </svg>
			</button>
		    </div>
		</div>
		
	    </div>


	    <div id="mainmenu" className={"text-stone-100 transition-all ease-in duration-700 fixed  w-full md:w-[400px] h-screen p-3  bg-stone-900 top-16  border-2 border-stone-900 border-t-yellow-700   right-0 z-10 " + (toggle ? 'opacity-100 translate-x-0' : 'opacity-90 translate-x-full  md:translate-x-[400px] ')}>
		<ul className="font-bold font-subhed uppercase">
		    {mainMenu.data.menu_links.map((menuLink, index) => {
			return(
			    <li>
				<a href={menuLink.url.url}>
				    {menuLink.title.text}
				</a>
			    </li>
			)
		    })}
		</ul>
		<div className="font-text" >{mainMenu.data.footer.text}</div>
	    </div>
	</>

    )
}

export default Header
