import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useLanguageDir = () => {
  const language = useSelector((state: RootState) => state.system.language);

  useEffect(() => {
    document.documentElement.setAttribute('dir', language);
  }, [language]);

  return language;
};
