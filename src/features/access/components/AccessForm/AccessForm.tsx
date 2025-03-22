import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { accessFormSchema, AccessFormValues } from './FormSchema.ts';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../components/ui/form.tsx';
import { Button, Input } from '../../../../components/ui';
import { Textarea } from '../../../../components/ui/textarea.tsx';
import { useSendRequestMutation } from '../../../../redux/api/accessApi.ts';
import { getErrorToast, getSuccessToast } from '../../../../lib';


interface Props {
  className?: string;
}

/**
 * @component
 * @description Форма запроса доступа на сайт
 */
export const AccessForm: React.FC<Props> = () => {

  const [sendRequest, { isLoading, isSuccess, isError }] = useSendRequestMutation();

  const form = useForm<AccessFormValues>({
    resolver: zodResolver(accessFormSchema),
    defaultValues: {
      email: "",
      comment: "",
    },
  })

  React.useEffect(() => {
    if (isSuccess) {
      getSuccessToast('Запрос успешно отправлен');
    }
    if (isError) {
      getErrorToast('При запросе доступа произошла ошибка!');
    }
  }, [isSuccess, isError])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(sendRequest)} className="w-[420px] space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="rounded-2xl hover:border-gray-300"
                  placeholder="Email"
                  disabled={isLoading || isSuccess}
                  {...field}
                />
              </FormControl>
              {fieldState.error
                ? <FormMessage className='text-[13px]'/>
                : <FormDescription className='text-[13px] text-[#5c6370] font-light'>
                  На указанный email придет уведомление при открытии доступа
                </FormDescription>
              }
            </FormItem>
          )}>
        </FormField>
        <FormField
          control={form.control}
          name="comment"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Комментарий</FormLabel>
              <FormControl>
                <Textarea
                  className="rounded-2xl hover:border-gray-300"
                  placeholder="Комментарий"
                  disabled={isLoading || isSuccess}
                  {...field}
                />
              </FormControl>
              {fieldState.error
                ? <FormMessage className='text-[13px]'/>
                : <FormDescription className='text-[13px] text-[#5c6370] font-light'>
                  Укажите причину запроса доступа
                </FormDescription>
              }
            </FormItem>
          )}>
        </FormField>
        <Button
          type="submit"
          disabled={isLoading || isSuccess}>
          {isSuccess ? 'Доступ запрошен' : 'Запросить доступ'}
        </Button>
      </form>
    </Form>
  );
};
