import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setUser } from '../../store/userSlice'
import { login } from '../../services/auth.service'
import { useNavigate } from 'react-router-dom'
import { useAsync } from '../../hooks/useAsync'

export default function Login() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [creds, setCreds] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState<{ email?: boolean; password?: boolean }>({})
  const navigate = useNavigate()
  const {executeAuthFunction} = useAsync()
  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  const validatePassword = (val: string) => val.length >= 6 && /[a-zA-Z]/.test(val)

  const handleBlur = (field: keyof typeof creds) => {
    setErrors(prev => ({
      ...prev,
      [field]: field === 'email' && !validateEmail(creds.email)
        ? true
        : field === 'password' && !validatePassword(creds.password)
        ? true
        : undefined
    }))
  }

  const isFormInvalid = () => 
    !!errors.email || !!errors.password ||
    !creds.email.trim() || !creds.password.trim();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreds(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = {
      email: !validateEmail(creds.email) ? true : undefined,
      password: !validatePassword(creds.password) ? true : undefined
    }
    if (newErrors.email || newErrors.password) {
        setErrors(newErrors)
        return
    }
    const user = await executeAuthFunction({
      asyncOperation: () => login(creds),
    })
    dispatch(setUser({ user: {...user}, authChecked: false }))
    navigate('/main')
  }

  return (
    <form className="flex flex-col gap-4 min-w-[300px]" onSubmit={onSubmit}>
      <label className="flex flex-col">
        <span>{t("email")}</span>
        <input
          className="input input-bordered"
          type="email"
          name="email"
          value={creds.email}
          onBlur={() => handleBlur('email')}
          onChange={handleChange}
        />
      </label>
        {errors.email && <span className="text-red-500 text-xs ">{t("email-invalid")}</span>}

      <label className="flex flex-col">
        <span>{t("password")}</span>
        <input
          className="input input-bordered"
          type="password"
          name="password"
          value={creds.password}
          onBlur={() => handleBlur('password')}
          onChange={handleChange}
        />
      </label>
        {errors.password && <span className="text-red-500 text-xs ">{t("password-invalid")}</span>}

      <button type="submit" className="btn btn-accent" disabled={isFormInvalid()}>
        {t("login")}
      </button>
    </form>
  )
}
