import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import LogoutBtn from './LogoutBtn';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import LanguageSwitcher from './system/LangSwitcher';
import ThemeSwitcher from './system/ThemeSwitcher';

export default function MainNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <nav className="flex items-center justify-between px-6 py-4 top-0 bg-base-100 fixed w-full">
      <div className="font-bold text-xl">Logo</div>
      <div className="flex items-center gap-4 tablet:hidden">
        <LanguageSwitcher />
        <ThemeSwitcher />
        {user.id && <LogoutBtn />}
      </div>
      <button onClick={() => setIsOpen(true)} className="hidden tablet:block">
        <Bars3Icon className="w-6 h-6" />
      </button>
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 backdrop-blur-md z-[999]">
          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-0 right-4">
              <XMarkIcon className="w-10 h-10" />
            </button>
            <div className="mt-10 flex flex-col items-center gap-4">
              <LanguageSwitcher />
              <ThemeSwitcher />
              {user.id && <LogoutBtn />}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
