import { useTranslation } from "react-i18next";
import { Item } from "../../types/app-types";


interface ItemElementProps {
  item: Item;
  onEdit: () => void;
  onDelete: () => void;
}
export default function ItemElement({ item, onEdit, onDelete }: ItemElementProps) {
  const {t} = useTranslation()
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.category}</td>
      <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
      <td className="flex gap-2">
        <button className="btn btn-sm btn-success" onClick={onEdit}>
          {t("edit")}
        </button>
        <button className="btn btn-sm btn-error" onClick={onDelete}>
          {t("delete")}
        </button>
      </td>
    </tr>
  )
}
