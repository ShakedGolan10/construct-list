import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Item } from '../../types/app-types';
import Modal from '../system/Modal';

interface ItemModalProps {
  item?: Item;
  onClose: () => void;
  handleSave: (itemData: Partial<Item>) => Promise<void>;
}

export default function ItemModal({ item, onClose, handleSave }: ItemModalProps) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: item ? item.name : "",
    category: item ? item.category : ""
  })

  const handleSaveFunc = async () => {
    await handleSave({...item,...formData})
    onClose()
  }

  return (
    <Modal onClose={onClose} isOpen={undefined}>
              <h1 className='text-xl font-bold'>{item ? t("update-item") : t("create-item")}</h1>
              <label className="flex flex-col">
                <span>{t("name")}</span>
                <input 
                  type="text" 
                  className="input input-bordered"
                  value={formData.name} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </label>
              <label className="flex flex-col">
                <span>{t("category")}</span>
                <input 
                  type="text" 
                  className="input input-bordered"
                  value={formData.category} 
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                />
              </label>
            <div className="flex justify-center gap-4 mt-4">
              <button className="btn btn-primary" onClick={handleSaveFunc}>{t("save")}</button>
              <button className="btn btn-secondary" onClick={onClose}>{t("cancel")}</button>
            </div>
        </Modal>
  )
}
