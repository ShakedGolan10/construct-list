import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkAuth } from '../store/userSlice'
import { AppDispatch, RootState } from '../store/store'

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { authChecked, user } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  useEffect(() => {
    if (authChecked) {
      if (user.id) {
        navigate('/main', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    }
  }, [authChecked, user.id])

  if (!authChecked) {
    return <div>Loading user...</div>
  }

  return <>
            {children}
        </>
}
