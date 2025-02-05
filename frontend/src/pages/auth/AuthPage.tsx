import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Login from './Login';
import Register from './Register';

export default function AuthPage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  return (
    <div className="max-w-md mx-auto flex flex-col items-center gap-10">
      <h1 className="text-4xl font-extrabold text-center">{t('login-page-title')}</h1>
      <p className="text-lg text-center text-gray-500">{t('login-page-subtitle')}</p>
      <div className="flex gap-6">
        <button className="btn btn-primary" onClick={() => setMode('login')}>
          {t('login')}
        </button>
        <button className="btn btn-secondary" onClick={() => setMode('register')}>
          {t('register')}
        </button>
      </div>
      {mode === 'login' ? <Login /> : <Register />}
    </div>
  );
}
