import { TableCell, TableRow } from "@/components/ui/table";
import BibleFormModal from "./bible-form-modal";
import { BibleType } from "@/lib/db/type";
import { getFullDateFromDate } from "@/lib/utils";

export default function Bible({ bible }: { bible: BibleType }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{bible.title}</TableCell>
      <TableCell className="hidden md:table-cell">{bible.content}</TableCell>
      <TableCell className="hidden md:table-cell">{getFullDateFromDate(new Date(bible.created_date))}</TableCell>
      <TableCell>
        <BibleFormModal bible={bible} mode="update" />
      </TableCell>
    </TableRow>
  )
}