import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import CmpWrapper from '../../wrappers/CmpWrapper';
import { Item } from '../../types/app-types';
import { createItem, deleteItem, getItems, updateItem } from '../../services/item.service';
import ItemElement from '../../components/items/ItemElement';
import ItemModal from '../../components/items/ItemModal';
import { useAsync } from '../../hooks/useAsync';

function MainPage({ initialItems }: { initialItems: Item[] }) {
  const { t } = useTranslation();
  const [items, setItems] = useState<Item[]>([...initialItems]);
  const [selectedItem, setSelectedItem] = useState<Item>(null);
  const [modalMode, setModalMode] = useState<'edit' | 'create'>(null);
  const [sortBy, setSortBy] = useState<'category' | 'updatedAt'>(null);
  const [filterBy, setFilterBy] = useState<{ name: string; category: string }>({
    name: '',
    category: '',
  });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { executeAuthFunction } = useAsync();

  const filterItems = (itemsData: Item[]) => {
    return itemsData.filter(
      (item) =>
        (!filterBy.name || item.name.toLowerCase().startsWith(filterBy.name.toLowerCase())) &&
        (!filterBy.category ||
          item.category.toLowerCase().startsWith(filterBy.category.toLowerCase()))
    );
  };

  const createFunc = async (newItemData: Omit<Item, 'id'>) => {
    const newItem = await executeAuthFunction({
      asyncOperation: () => createItem(newItemData),
    });
    setItems((prev) => [...prev, newItem]);
  };

  const updateFunc = async (item: Item) => {
    const updatedItem = await executeAuthFunction({
      asyncOperation: () => updateItem(item),
    });
    const itemIdx = items.findIndex((item) => item.id === updatedItem.id);
    const newItems = [...items];
    newItems[itemIdx] = updatedItem;
    setItems(newItems);
  };

  const handleSave = async (item: Item) => {
    if (modalMode === 'create') await createFunc({ ...item });
    else await updateFunc(item);
  };

  const deleteFunc = async (id: string) => {
    await executeAuthFunction({
      asyncOperation: () => deleteItem({ id }),
    });
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSortCategory = () => {
    if (sortBy === 'category') setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    else {
      setSortBy('category');
      setSortOrder('asc');
    }
  };

  const handleSortDate = () => {
    if (sortBy === 'updatedAt') setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    else {
      setSortBy('updatedAt');
      setSortOrder('desc');
    }
  };

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setModalMode('edit');
  };

  const handleCreate = () => {
    setModalMode('create');
    setSelectedItem(null);
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedItem(null);
  };

  const sortedItems = [...items].sort((a, b) => {
    if (!sortBy) return 0;
    if (sortBy === 'category') {
      const cmp = a.category.localeCompare(b.category);
      return sortOrder === 'asc' ? cmp : -cmp;
    }
    if (sortBy === 'updatedAt') {
      const cmp = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      return sortOrder === 'asc' ? cmp : -cmp;
    }
    return 0;
  });

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-4xl font-bold text-center">{t('main-page-header')}</h1>
      <button className="btn btn-primary my-4" onClick={handleCreate}>
        {t('create-item')}
      </button>
      <label className="flex max-w-fit flex-col">
        <span>{t('filter-name')}</span>
        <input
          type="text"
          className="input input-bordered "
          value={filterBy.name}
          onChange={(e) => setFilterBy({ ...filterBy, name: e.target.value })}
        />
      </label>
      <label className="flex max-w-fit flex-col">
        <span>{t('filter-category')}</span>
        <input
          type="text"
          className="input input-bordered "
          value={filterBy.category}
          onChange={(e) => setFilterBy({ ...filterBy, category: e.target.value })}
        />
      </label>
      <div className="w-full tablet:overflow-scroll mobile:overflow-scroll overflow-y-scroll max-h-[33vh]">
        <table className="table table-zebra" style={{ position: 'unset' }}>
          <thead>
            <tr className="table-row">
              <th>{t('name')}</th>
              <th className="cursor-pointer" onClick={handleSortCategory}>
                {t('category')}
                {sortBy === 'category' &&
                  (sortOrder === 'asc' ? (
                    <ChevronUpIcon className="w-4 h-4 inline ml-1 absolute" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4 inline ml-1 absolute" />
                  ))}
              </th>
              <th className="cursor-pointer" onClick={handleSortDate}>
                {t('update-date')}
                {sortBy === 'updatedAt' &&
                  (sortOrder === 'asc' ? (
                    <ChevronUpIcon className="w-4 h-4 inline ml-1 absolute" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4 inline ml-1 absolute" />
                  ))}
              </th>
              <th>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filterItems(sortedItems).length ? (
              filterItems(sortedItems).map((item) => (
                <ItemElement
                  key={item.id}
                  item={item}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => deleteFunc(item.id)}
                />
              ))
            ) : (
              <tr className="hover:bg-base-200">
                <td>
                  <p className="text-xl">{t('no-info')}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {modalMode && <ItemModal item={selectedItem} onClose={closeModal} handleSave={handleSave} />}
    </div>
  );
}

const MainPageWrapper = CmpWrapper<[Item[]]>({
  dataPromises: [getItems],
  Component: (props) => <MainPage initialItems={props.data[0]} />,
});

export default MainPageWrapper;
