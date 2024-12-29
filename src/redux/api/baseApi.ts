import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getEnvVariables } from '../../lib';


const envVariables = getEnvVariables();

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: `${envVariables.BASE_URL}`,
		headers: {
			'Content-Type': 'application/json',
		},
	}),
	tagTypes: ['categories', 'all_products', 'products', 'product_detail'],
	endpoints: () => ({}),
});