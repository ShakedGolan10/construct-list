import { useState, useEffect } from 'react';
import { User } from '../types/app-types';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader';

interface WrapperProps<T extends unknown[]> {
  dataPromises?: ((user: User) => Promise<T[number]>)[];
  Component: React.ComponentType<{ user: any; data: T }>;
}

export default function CmpWrapper<T extends unknown[]>({
  dataPromises,
  Component,
}: WrapperProps<T>) {
  return function WrappedComponent() {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();
    const { user } = useSelector((state: RootState) => state.user);
    const { t } = useTranslation();

    useEffect(() => {
      if (user) {
        if (dataPromises.length) {
          setData(null);
          setLoading(true);
          const promises = dataPromises.map((func) => func(user));
          Promise.all(promises)
            .then((result) => {
              setData(result as T);
            })
            .catch((err) => {
              setError(err);
            })
            .finally(() => setLoading(false));
        } else setLoading(false);
      }
    }, [user]);

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <p className="text-4xl font-bold text-center">{t('error-page')}</p>;
    }

    if ((!dataPromises && user) || (!data && user)) {
      return <Component user={user} data={undefined} />;
    }

    if (data && user) {
      return <Component user={user} data={data} />;
    }
  };
}
