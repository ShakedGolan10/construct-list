import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { closeModal } from "../../store/systemSlice";
import { RootState } from "../../store/store";

export default function SystemModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.system.modal);
  const isSuccess = Boolean(modal.successMsg);
  const isError = Boolean(modal.errorMsg);

  return (
    <dialog className={`modal ${modal.isModalOpen ? "modal-open" : ""} fixed inset-0 z-[100] backdrop-blur-md`}>
      <div 
        className="modal-overlay absolute inset-0 bg-black/50" 
        onClick={() => dispatch(closeModal())}
      />
      <div className="modal-box relative text-center p-6 bg-base-100 shadow-lg rounded-lg">
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {isSuccess && (
          <div className="flex flex-col items-center gap-3 text-green-600">
            <CheckCircleIcon className="w-16 h-16 text-green-500" />
            <h2 className="text-xl font-bold">{t("success")}</h2>
            <p className="text-md">{t("success-msg")}</p>
          </div>
        )}
        {isError && (
          <div className="flex flex-col items-center gap-3 text-red-600">
            <XCircleIcon className="w-16 h-16 text-red-500" />
            <h2 className="text-xl font-bold">{t("error-msg")}</h2>
            <p className="text-md">{t("try-again")}</p>
          </div>
        )}
        <div className="modal-action justify-center">
          <button
            className="btn btn-primary w-32"
            onClick={() => dispatch(closeModal())}
          >
            {t("OK")}
          </button>
        </div>
      </div>
    </dialog>
  );
}
