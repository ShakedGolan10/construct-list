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
      <SunIcon className="w-6 h-6 text-yellow-500" />
      
      <input
        type="checkbox"
        className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
        onChange={handleToggle}
        checked={theme === "night"} 
      />
      
      <MoonIcon className="w-6 h-6 text-gray-500" />
    </label>
  );
};

export default ThemeSwitcher;
