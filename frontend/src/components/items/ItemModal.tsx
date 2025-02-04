import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'
import { Item } from '../../types/app-types';

interface ItemModalProps {
  mode: "create" | "edit";
  item?: Item;
  onClose: () => void;
  createItem: (newItemData: Partial<Item>) => Promise<void>;
  updateItem: (updatedItem: Item) => Promise<void>;
}

export default function ItemModal({ mode, item, onClose, createItem, updateItem }: ItemModalProps) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: mode === "edit" && item ? item.name : "",
    category: mode === "edit" && item ? item.category : ""
  })

  const handleSave = async () => {
    if (mode === "create") await createItem({ name: formData.name, category: formData.category })
    else {
      const updated = { ...item!, name: formData.name, category: formData.category }
      await updateItem(updated)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center backdrop-blur-md bg-black/50" onClick={onClose}>
      <div className="relative bg-base-100 p-6 rounded shadow-lg" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <XMarkIcon className="w-6 h-6" />
        </button>
          <>
            <div className="flex flex-col gap-4">
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
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button className="btn btn-primary" onClick={handleSave}>{t("save")}</button>
              <button className="btn btn-secondary" onClick={onClose}>{t("cancel")}</button>
            </div>
          </>
      </div>
    </div>
  )
}
