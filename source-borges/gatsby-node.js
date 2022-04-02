const { ApolloClient, HttpLink,InMemoryCache, gql} = require("@apollo/client")
const fetch = require("cross-fetch")


/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */

var inventoryServer=""

exports.onPreInit = (_, pluginOptions) => {
    console.log("Loaded gatsby-source-borges")
    inventoryServer=pluginOptions.inventoryServer
    console.log("Setting inventory server to " + inventoryServer)
}




const TITLE_NODE_TYPE = `Title`
const EDITION_NODE_TYPE = `Edition`
const CATEGORY_NODE_TYPE = `Category`
const TITLELIST_NODE_TYPE = `Titlelist`
const AUTHOR_NODE_TYPE = `Author`




exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
    getNodesByType,
    cache,
}) => {
    const { createNode } = actions

const client = new ApolloClient({
    link: new HttpLink({ uri:inventoryServer+"/graphql", fetch }),
    cache: new InMemoryCache(),
})

    
    const categoriesSet=new Set();
    const authorsSet=new Set();
    const titlelistsSet=new Set();
    
    const updated_at = await cache.get(`timestamped`)


//make publisherName not a method call so can be eager loaded
    const { data } = await client.query({

	query: 		   gql`
	    query GetBorges {
		titles  {
		    id
		    key
		    title
		    slug
		    updatedAt
		    lpe
		    editions {
			id
			key
			cover_image_url
			opengraph_image_url
			list_price
			isbn13
			year_of_publication
			publisher_name
		    }
		 		    
		    contributions {
			author {
			    id 
			    key
			    slug
			    fullName
			}
			what
		    }
		    
		    categories {
			id
			key
			name
			description
			slug
			image_url
		    }

		    title_lists {
			id
			key
			name
			description
			slug
		    }
		}
	    }
	`
    })

    
    
    // loop through data and create Gatsby nodes
    data.titles.forEach(title =>
	{ createNode({
	    ...title,
	    id: createNodeId(`${TITLE_NODE_TYPE}-${title.id}`),
	    parent: null,
	    children: [],
	    internal: {
		type: TITLE_NODE_TYPE,
		content: JSON.stringify(title),
		contentDigest: createContentDigest(title),
	    },
	})
//	    console.log("Created title " + title.title)
	    
	    title.categories.forEach(category =>
		categoriesSet.add(category)
	    )
	    title.contributions.forEach(c =>
		authorsSet.add(c.author)
	    )
	    title.title_lists.forEach(titlelist =>
		titlelistsSet.add(titlelist)
	    )
	}
    )
    
    
    Array.from(categoriesSet).forEach(category =>
	{
//	console.log("Creating category " + category.name )
	createNode({
	    ...category,
	    id: createNodeId(`${CATEGORY_NODE_TYPE}-${category.id}`),
	    parent: null,
	    children: [],
	    internal: {
		type: CATEGORY_NODE_TYPE,
		content: JSON.stringify(category),
		contentDigest: createContentDigest(category),
	    },
	})
	}
    )

    Array.from(titlelistsSet).forEach(titlelist =>
	{
	createNode({
	    ...titlelist,
	    id: createNodeId(`${TITLELIST_NODE_TYPE}-${titlelist.id}`),
	    parent: null,
	    children: [],
	    internal: {
		type: TITLELIST_NODE_TYPE,
		content: JSON.stringify(titlelist),
		contentDigest: createContentDigest(titlelist),
	    },
	})
//	    console.log("Created title_list " + titlelist.name )
	}
    )

    
    Array.from(authorsSet).filter(a => a !== null).forEach(author =>
	{
	createNode({
	    ...author,
	    id: createNodeId(`${AUTHOR_NODE_TYPE}-${author.id}`),
	    parent: null,
	    children: [],
	    internal: {
		type: AUTHOR_NODE_TYPE,
		content: JSON.stringify(author),
		contentDigest: createContentDigest(author),
	    },
	})
//	    console.log("Created author " + author.fullName)
	}
    )

    return
    
}


exports.createResolvers = ({ createResolvers }) => {
    const resolvers = {
	Title: {
	    latest_published_edition: {
		type: "Edition",
		resolve (source,args,context,info) {
//		    const editions = context.nodeModel.getAllNodes({
//			type: "Edition",
//		    })
		    return source.editions.find(x => x.key === source.lpe)
		}

	    }
	},
	Category: {
	    titles: {
		type: ["Title"],
		resolve: async (source, args, context, info) => {
		    const { entries } = await context.nodeModel.findAll({
			query: {
			    filter: {
				categories: {elemMatch: {key: {eq: source.key}}}
			    },
			},
			type: "Title",
		    })
		    return entries
		},
	    },
	},
		    Titlelist: {
			titles: {
		type: ["Title"],
		resolve: async (source, args, context, info) => {
		    const { entries } = await context.nodeModel.findAll({
			query: {
			    filter: {
				title_lists: {elemMatch: {key: {eq: source.key}}}
			    },
			},
			type: "Title",
		    })
		    return entries
		},
	    },
	},
	TitleTitle_lists: {
	    titles: {
		type: ["Title"],
		resolve: async (source, args, context, info) => {
		    const { entries } = await context.nodeModel.findAll({
			query: {
			    filter: {
				title_lists: {elemMatch: {key: {eq: source.key}}}
			    },
			},
			type: "Title",
		    })
		    return entries
		},
	    },
	},
		    

		    Author: {
			titles: {
		type: ["Title"],
		resolve: async (source, args, context, info) => {
		    const { entries } = await context.nodeModel.findAll({
			query: {
			    filter: {
				contributions: {elemMatch: {author: {key: {eq: source.key}}}}
			    },
			},
			type: "Title",
		    })
		    return entries
		},
	    },
	},
	TitleContributionsAuthor: {
	    titles: {
		type: ["Title"],
		resolve: async (source, args, context, info) => {
		    const { entries } = await context.nodeModel.findAll({
			query: {
			    filter: {
				contributions: {elemMatch: {author: {key: {eq: source.key}}}}
			    },
			},
			type: "Title",
		    })
		    return entries
		},
	    },
	},   
    }
    createResolvers(resolvers)
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
    type Edition implements Node {
id: ID,
      key: Int,
isbn13: String,
publisher_name: String,
year_of_publication: String,
list_price: String,
cover_image_url: String,
opengraph_image_url: String

    }
    `
    createTypes(typeDefs)
}


exports.onPostBuild = async ({ cache }) => {
    // set a timestamp at the end of the build
    const thedate=new Date().toISOString()
    await cache.set("timestamped", thedate)
    console.log("borges finished")
}
