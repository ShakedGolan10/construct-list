import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/systemSlice';
import { RootState } from '../store/store';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.system.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      className="btn btn-ghost"
      onClick={handleToggle}
      aria-label="Toggle Theme"
    >
      {theme === 'autumn' ? (
        <div className="flex items-center gap-2">
          <SunIcon />
          <span>Light Mode</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <MoonIcon />
          <span>Dark Mode</span>
        </div>
      )}
    </button>
  );
};

export default ThemeSwitcher;
