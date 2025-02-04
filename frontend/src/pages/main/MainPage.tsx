import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import CmpWrapper from '../../wrappers/CmpWrapper'
import { Item } from '../../types/app-types'
import { createItem, deleteItem, getItems, updateItem } from '../../services/item.service'
import ItemElement from '../../components/items/ItemElement'
import ItemModal from '../../components/items/ItemModal'
import { useAsync } from '../../hooks/useAsync'

function MainPage({ initialItems }: { initialItems: Item[] }) {
  const { t } = useTranslation()
  const [items, setItems] = useState<Item[]>(initialItems)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [modalMode, setModalMode] = useState<"edit" | "create" | null>(null)
  const [sortBy, setSortBy] = useState<"category" | "updatedAt" | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const {executeAuthFunction} = useAsync()

  const createFunc = async (newItemData: Omit<Item, "id">) => {
    const newItem = await executeAuthFunction({
      asyncOperation: () => createItem(newItemData),
    })
    setItems(prev => [...prev, newItem])
  }

  const updateFunc = async (updatedItem: Item) => {
    await updateItem(updatedItem)
    setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item))
  }

  const deleteFunc = async (id: string) => {
    await deleteItem({id})
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const handleSortCategory = () => {
    if (sortBy === "category") setSortOrder(prev => prev === "asc" ? "desc" : "asc")
    else { setSortBy("category"); setSortOrder("asc") }
  }

  const handleSortDate = () => {
    if (sortBy === "updatedAt") setSortOrder(prev => prev === "asc" ? "desc" : "asc")
    else { setSortBy("updatedAt"); setSortOrder("desc") }
  }

  const sortedItems = [...items].sort((a, b) => {
    if (!sortBy) return 0
    if (sortBy === "category") {
      const cmp = a.category.localeCompare(b.category)
      return sortOrder === "asc" ? cmp : -cmp
    }
    if (sortBy === "updatedAt") {
      const cmp = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      return sortOrder === "asc" ? cmp : -cmp
    }
    return 0
  })

  const handleEdit = (item: Item) => { setSelectedItem(item); setModalMode("edit") }
  const handleCreate = () => { setModalMode("create"); setSelectedItem(null) }
  const closeModal = () => { setModalMode(null); setSelectedItem(null) }

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-4xl font-bold text-center">{t("main-page-header")}</h1>
      <button className="btn btn-primary my-4" onClick={handleCreate}>
        {t("create-item")}
      </button>
      <div className='w-full tablet:overflow-scroll mobile:overflow-scroll'>
        <table className="table table-zebra">
          <thead>
            <tr className="table-row">
              <th>{t("name")}</th>
              <th className="cursor-pointer relative" onClick={handleSortCategory}>
                {t("category")}
                {sortBy === "category" && (sortOrder === "asc" ? <ChevronUpIcon className="w-4 h-4 inline ml-1 absolute" /> : <ChevronDownIcon className="w-4 h-4 inline ml-1 absolute" />)}
              </th>
              <th className="cursor-pointer" onClick={handleSortDate}>
                {t("update-date")}
                {sortBy === "updatedAt" && (sortOrder === "asc" ? <ChevronUpIcon className="w-4 h-4 inline ml-1 absolute" /> : <ChevronDownIcon className="w-4 h-4 inline ml-1 absolute" />)}
              </th>
              <th>{t("edit")}</th>
              <th>{t("delete")}</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map(item => (
              <ItemElement key={item.id} item={item} onEdit={() => handleEdit(item)} onDelete={() => deleteFunc(item.id)}/>
            ))}
          </tbody>
        </table>
        </div>
      {modalMode && (
        <ItemModal
          mode={modalMode}
          item={modalMode === "edit" && selectedItem ? selectedItem : undefined}
          onClose={closeModal}
          createItem={createFunc}
          updateItem={updateFunc}
        />
      )}
    </div>
  )
}


const MainPageWrapper = CmpWrapper<[Item[]]>({
    dataPromises: [getItems],
    Component: (props) => <MainPage initialItems={props.data[0]}  />, 
  });

  export default MainPageWrapper