import { useDispatch, useSelector } from 'react-redux';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { RootState } from '../../store/store';
import { toggleTheme } from '../../store/systemSlice';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.system.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <label className="swap swap-rotate cursor-pointer w-10">
      <input
        type="checkbox"
        className="theme-controller"
        onChange={handleToggle}
        checked={theme === 'night'}
      />
      <MoonIcon className="swap-on h-10 w-10 fill-current" />
      <SunIcon className="swap-off h-10 w-10 fill-current" />
    </label>
  );
};

export default ThemeSwitcher;
