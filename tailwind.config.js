module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
	extend: {
	    height: {
		'50vw' : '50vw',
	    }
	},
	fontFamily: {'text':['"EB Garamond"'],
		     'subhed':['"Jost"'],},
    }, 
    variants: {},
    plugins: [
	require('@tailwindcss/aspect-ratio'),
    ],
}
