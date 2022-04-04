import React from "react"
import Logo from '../components/logo'


class PageTitle extends React.Component {
    componentDidMount() {
	window.addEventListener("scroll", this.resizeHeaderOnScroll);
    }
    resizeHeaderOnScroll() {
	const headerEl = document.getElementById("indextitle");
	const rect = headerEl.getBoundingClientRect();
	
	if (rect.y < 10) {
	    headerEl.classList.remove("absolute");
	    headerEl.classList.add("fixed");
	    headerEl.classList.add("top-0");
	    headerEl.classList.remove("text-stone-900");
	    headerEl.classList.add("text-stone-100");
	    headerEl.classList.add("bg-stone-900");
	} 
    }

    render (){
	return (
    	    <div id="indextitle" className="z-40 transition-colors text-stone-900 ease-in duration-500  flex absolute top-0 pl-2 items-center gap-2 w-screen h-16 ">
		<a href="/"><Logo /></a>
		    <h1 className="font-text text-2xl md:text-3xl flex-1" >
			<a href="/">Red Emma&#8217;s</a> </h1>
	    </div>
	)
    }
}

export default PageTitle
