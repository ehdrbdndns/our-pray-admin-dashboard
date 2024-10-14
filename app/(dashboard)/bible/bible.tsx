import { TableCell, TableRow } from "@/components/ui/table";
import BibleFormModal from "./bible-form-modal";

export default function Bible() {
  return (
    <TableRow>
      <TableCell className="hidden md:table-cell">ID</TableCell>
      <TableCell className="font-medium">창세기 1장 1절</TableCell>
      <TableCell className="hidden md:table-cell">블라블라블라블라</TableCell>
      <TableCell className="hidden md:table-cell">2024.01.01</TableCell>
      <TableCell>
        <BibleFormModal />
      </TableCell>
    </TableRow>
  )
}