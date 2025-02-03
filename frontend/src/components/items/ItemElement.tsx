import { useTranslation } from "react-i18next";
import { Item } from "../../types/app-types";

export default function ItemElement({ item, onEdit }: { item: Item; onEdit: () => void }) {
  const {t} = useTranslation()
  return (
    <tr className="hover:bg-base-200">
      <td>{item.name}</td>
      <td>{item.category}</td>
      <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
      <td>
        <button className="btn btn-sm btn-primary" onClick={onEdit}>
          {t("edit")}
        </button>
      </td>
    </tr>
  )
}
