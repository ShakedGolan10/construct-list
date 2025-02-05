import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setUser } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/auth.service';
import { useAsync } from '../../hooks/useAsync';

export default function Register() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<{ fullname: string; email: string; password: string }>({
    fullname: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ fullname?: boolean; email?: boolean; password?: boolean }>(
    {}
  );
  const navigate = useNavigate();
  const validateName = (val: string) => val.trim().length >= 2;
  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const validatePassword = (val: string) => val.length >= 6 && /[a-zA-Z]/.test(val);
  const { executeAuthFunction } = useAsync();

  const handleBlur = (field: keyof typeof formData) => {
    setErrors((prev) => ({
      ...prev,
      [field]:
        field === 'fullname' && !validateName(formData.fullname)
          ? true
          : field === 'email' && !validateEmail(formData.email)
            ? true
            : field === 'password' && !validatePassword(formData.password)
              ? true
              : undefined,
    }));
  };

  const isFormInvalid = () =>
    !!errors.email ||
    !!errors.fullname ||
    !!errors.password ||
    !formData.email.trim() ||
    !formData.fullname.trim() ||
    !formData.password.trim();

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: !validateName(formData.fullname) ? true : undefined,
      email: !validateEmail(formData.email) ? true : undefined,
      password: !validatePassword(formData.password) ? true : undefined,
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    const user = await executeAuthFunction({
      asyncOperation: () => register(formData),
    });

    dispatch(setUser({ user, authChecked: true }));
    navigate('/main');
  };

  return (
    <form className="flex flex-col gap-4 min-w-[300px]" onSubmit={onSubmit}>
      <label className="flex flex-col">
        <span>{t('name')}</span>
        <input
          className="input input-bordered"
          type="text"
          value={formData.fullname}
          onBlur={() => handleBlur('fullname')}
          onChange={(e) => handleChange('fullname', e.target.value)}
        />
      </label>
      {errors.fullname && <span className="text-red-500 text-xs ">{t('name-invalid')}</span>}

      <label className="flex flex-col">
        <span>{t('email')}</span>
        <input
          className="input input-bordered"
          type="email"
          value={formData.email}
          onBlur={() => handleBlur('email')}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </label>
      {errors.email && <span className="text-red-500 text-xs ">{t('email-invalid')}</span>}

      <label className="flex flex-col">
        <span>{t('password')}</span>
        <input
          className="input input-bordered"
          type="password"
          value={formData.password}
          onBlur={() => handleBlur('password')}
          onChange={(e) => handleChange('password', e.target.value)}
        />
      </label>
      {errors.password && <span className="text-red-500 text-xs ">{t('password-invalid')}</span>}
      <button type="submit" disabled={isFormInvalid()} className="btn btn-accent">
        {t('register')}
      </button>
    </form>
  );
}
