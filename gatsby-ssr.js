import "./src/css/index.css"
import * as React from 'react'
import  Layout  from './src/components/Layout'
import "@fontsource/eb-garamond" // Defaults to weight 400 with all styles included.
import "@fontsource/jost" // Defaults to weight 400 with all styles included.





// Wraps every page in a component
 export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
