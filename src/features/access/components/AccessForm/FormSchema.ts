import { z } from 'zod';

/**
 * Валидация формы запроса доступа к сайту
 */
export const accessFormSchema = z.object({
  email: z.string().email({ message: 'Введите корректный email' }),
  comment: z.string().min(1, { message: 'Укажите причину запроса доступа' }).max(250, { message: 'Не более 250 символов' }),
});

export type AccessFormValues = z.infer<typeof accessFormSchema>;