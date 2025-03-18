import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { NotFound } from './NotFound.tsx';
import { ErrorRender } from './ErrorRender.tsx';
import { HTTP_STATUS } from '../../constants.ts';
import { baseApi } from '../../redux/api';
import { NotAuthorized } from './NotAuthorized.tsx';


interface Props {
  error: FetchBaseQueryError | SerializedError ;
}

/**
 * @component
 * @description Возврат страницы, соответствующей типу ошибки
 *
 * @prop error - ошибка
 */
export const ErrorPage: React.FC<Props> = ({ error }) => {

  const dispatch = useDispatch();

  if ('status' in error && error.status === HTTP_STATUS.UNAUTHORIZED) {
    return <NotAuthorized/>;
  } else if ('status' in error && error.status === HTTP_STATUS.FORBIDDEN) {
    dispatch(baseApi.util.resetApiState());  // сброс кэша RTQ
    return <Navigate to="not-allowed" replace />;
  } else if ('status' in error && error.status === HTTP_STATUS.NOT_FOUND) {
    return <NotFound/>;
  } else {
    return <ErrorRender className='h-[70vh]'/>;
  }

}