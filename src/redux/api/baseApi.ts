import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getCsrfToken, getEnvVariables } from '../../lib';


const envVariables = getEnvVariables();

const baseQuery = fetchBaseQuery({
	baseUrl: `${envVariables.BASE_URL}`,
	prepareHeaders: (headers) => {
		const csrfToken = getCsrfToken();
		if (csrfToken) {
			headers.set('X-XSRF-TOKEN', csrfToken);
		}
		return headers;
	},
});

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery,
	tagTypes: ['categories', 'ingredients', 'all_products', 'products', 'product_detail'],
	endpoints: () => ({}),
});
