// example theme with Typography.js
import { toTheme } from '@theme-ui/typography'
import merge from "deepmerge"



import usWebDesignStandardsTheme from 'typography-theme-us-web-design-standards'

const typography = toTheme(usWebDesignStandardsTheme)

export default merge(typography, {
colors: {
	text: "#333",
	background: "#fff",
    },})

