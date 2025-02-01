import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/systemSlice';
import { RootState } from '../store/store';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.system.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <label className="flex cursor-pointer items-center gap-2 absolute top-0 left-2/4">
      {/* Sun Icon (Light Mode) */}
      <SunIcon className="w-6 h-6 text-yellow-500" />
      
      {/* Toggle Switch */}
      <input
        type="checkbox"
        className="toggle theme-controller"
        onChange={handleToggle}
        checked={theme === "night"} // Checked when in dark mode
      />
      
      {/* Moon Icon (Dark Mode) */}
      <MoonIcon className="w-6 h-6 text-gray-500" />
    </label>
  );
};

export default ThemeSwitcher;
