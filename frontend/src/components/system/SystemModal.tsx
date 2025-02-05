import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { closeModal } from '../../store/systemSlice';
import { RootState } from '../../store/store';
import Modal from './Modal';

export default function SystemModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.system.modal);
  const isSuccess = Boolean(modal.successMsg);
  const isError = Boolean(modal.errorMsg);

  return (
    <Modal onClose={() => dispatch(closeModal())} isOpen={modal.isModalOpen}>
      {isSuccess && (
        <div className="flex flex-col items-center gap-3 text-green-600">
          <CheckCircleIcon className="w-16 h-16 text-green-500" />
          <h2 className="text-xl font-bold">{t('success')}</h2>
          <p className="text-md">{t('success-msg')}</p>
        </div>
      )}
      {isError && (
        <div className="flex flex-col items-center gap-3 text-red-600">
          <XCircleIcon className="w-16 h-16 text-red-500" />
          <h2 className="text-xl font-bold">{t('error-msg')}</h2>
          <p className="text-md">{t('try-again')}</p>
        </div>
      )}
      <div className="modal-action justify-center">
        <button className="btn btn-primary w-32" onClick={() => dispatch(closeModal())}>
          {t('OK')}
        </button>
      </div>
    </Modal>
  );
}
