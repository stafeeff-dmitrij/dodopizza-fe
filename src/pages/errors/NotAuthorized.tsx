import { LockBlock } from '../../components/layout';

/**
 * @component
 * @description Страница заглушка, когда пользователь не авторизован
 */
export function NotAuthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <LockBlock
        title="Требуется авторизация"
        description="Данную страницу могут просматривать только авторизованные пользователи"
        imageUrl="/images/locked.svg"
      />
    </div>
  );
}