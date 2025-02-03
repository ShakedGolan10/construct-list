import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkAuth } from '../store/userSlice'
import { AppDispatch, RootState } from '../store/store'
import Loader from '../components/Loader'

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
        navigate('/main')
      } else {
        navigate('/')
      }
    }
  }, [authChecked, user.id])

  if (!authChecked) {
    return <Loader />
  }

  return <>
            {children}
        </>
}
