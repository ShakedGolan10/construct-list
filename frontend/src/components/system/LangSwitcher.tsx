import { useDispatch, useSelector } from 'react-redux';
import { GlobeAltIcon, LanguageIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store/store';
import { setLanguage } from '../../store/systemSlice';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.system.language);

  const handleToggle = () => {
    if (language === 'ltr') {
      dispatch(setLanguage('rtl'));
      i18n.changeLanguage('he');
    } else {
      dispatch(setLanguage('ltr'));
      i18n.changeLanguage('en');
    }
  };

  return (
    <label className="swap swap-rotate cursor-pointer w-10">
      <input type="checkbox" onChange={handleToggle} checked={language === 'rtl'} />
      <GlobeAltIcon className="swap-off h-10 w-10 fill-current" />
      <LanguageIcon className="swap-on h-10 w-10 fill-current" />
    </label>
  );
};

export default LanguageSwitcher;
