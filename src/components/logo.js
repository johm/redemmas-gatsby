import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import MyLogo from "../images/logo.png"


const  Logo = ({children}) => (
	<div ><img height="64" width="64" src={MyLogo} alt=""  /></div>
)

export default Logo

    //<StaticImage loading="eager"
    //src="../images/logo.png" alt="Emma Goldman profile, as a logo"
    //width={64}
    //height={64}
    //layout="fixed"
// />
