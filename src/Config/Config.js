const prod = {
	url: {
		API_URL: // https://afternoon-ridge-35420.herokuapp.com was used to bypass the CORS ERROR 
			'https://fakestoreapi.com',

	},
};
const dev = {
	url: {
		API_URL:
			'https://fakestoreapi.com',

	},
};

export const Config = process.env.NODE_ENV === 'development' ? dev : prod;
