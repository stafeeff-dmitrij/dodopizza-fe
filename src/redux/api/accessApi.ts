import { baseApi } from './baseApi.ts';
import { AccessFormValues } from '../../features/access/components/AccessForm/FormSchema.ts';


/**
 * @function
 * @description Отправка запроса на доступ к сайту
 */
export const accessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendRequest: builder.mutation<void, AccessFormValues>({
      query: (body) => ({
        url: 'access/request/',
        method: 'POST',
        body,
        headers: {
          'X-CSRFToken': 'Cin3qVaoBDcMsl70Td88kduI0F1jEjS7',
        },
      }),
    }),
  }),
});

export const { useSendRequestMutation } = accessApi;