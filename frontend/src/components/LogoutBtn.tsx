import { useDispatch } from 'react-redux';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';
import { logout } from '../services/auth.service';
import { clearUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const logoutUser = async () => {
    await logout()
    dispatch(clearUser())
    navigate('/')
  };

  return (
    <button className='btn-ghost'>
      <ArrowLeftStartOnRectangleIcon onClick={logoutUser} className="h-10 w-10" />
      </button>
  );
};

export default LogoutBtn;
