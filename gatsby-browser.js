import "./src/css/index.css"
import * as React from 'react'
import  Layout  from './src/components/Layout'
import "@fontsource/eb-garamond" // Defaults to weight 400 with all styles included.
import "@fontsource/eb-garamond/700.css" 
import "@fontsource/jost" // Defaults to weight 400 with all styles included.



// Logs when the client route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
    console.log("new pathname", location.pathname)
  console.log("old pathname", prevLocation ? prevLocation.pathname : null)
}

// Wraps every page in a component
 export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
