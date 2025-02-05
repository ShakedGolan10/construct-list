'use client';

import { useDispatch } from 'react-redux';
import { openModal, setLoading } from '../store/systemSlice';

interface AsyncOpArgs<T> {
  asyncOperation: () => Promise<T>;
  successMsg?: boolean;
  errorMsg?: boolean;
}

export const useAsync = () => {
  const dispatch = useDispatch();
  const executeAuthFunction = async <T>(args: AsyncOpArgs<T>): Promise<T> => {
    const { asyncOperation } = args;
    try {
      dispatch(setLoading(true));
      const res = await asyncOperation();
      dispatch(openModal({ successMsg: 'success' }));
      return res;
    } catch (error: any) {
      dispatch(openModal({ errorMsg: 'failed' }));
      throw new Error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { executeAuthFunction };
};
