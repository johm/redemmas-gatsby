
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
      siteUrl: "https://www.yourdomain.tld",
      title: "redemmas-gatsby",
      titleTemplate: " -- %s --",
      description: "Description goes here",
      url: "https://redemmas.org",
      image: "TK",
      twitterUsername: "@redemmas",
	  
  },
    
    plugins: [
	{
	    resolve: `gatsby-plugin-theme-ui`,
	},
	{resolve: `./source-borges`,
	 options: {inventoryServer: process.env.GATSBY_INVENTORY_SERVER},
	},
    {

	

	resolve: `gatsby-plugin-snipcart-advanced`,
	options: {
		version: "3.0.29",
		publicApiKey: process.env.GATSBY_SNIPCART_API_KEY, // use public api key here or in environment variable
		useSideCart: true,
	    }
	},
	{
	    resolve: "gatsby-plugin-google-analytics",
	    options: {
		trackingId: process.env.GOOGLE_TRACKING_ID,
	    },
	},
	"gatsby-plugin-postcss",
	"gatsby-plugin-react-helmet",
	"gatsby-plugin-sitemap",
	"gatsby-plugin-sharp",
	"gatsby-transformer-sharp",
	{
	    resolve: "gatsby-source-filesystem",
	    options: {
             name: "images",
              path: "./src/images",
	  },
	  __key: "images", 
     },
      {
	  resolve: 'gatsby-source-prismic',
	  options: {
              repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
              accessToken: process.env.PRISMIC_ACCESS_TOKEN,
              customTypesApiToken: process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN,
              linkResolver: require('./src/utils/linkResolver').linkResolver,
	  },
      },
	"gatsby-plugin-image",
	{
	    resolve: `gatsby-source-airtable`,
	    options: {
      apiKey: process.env.AIRTABLE_API_KEY, // may instead specify via env, see below
      concurrency: 5, // default, see using markdown and attachments for more information
      tables: [
        {
            baseId: `appOaw16vByTK29YK`,
            tableName: `Events`,
	    mapping: { Image: `fileNode` },

	},
      ]
    }
      }
  ],
};

