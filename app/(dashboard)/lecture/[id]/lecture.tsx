import { TableCell, TableRow } from "@/components/ui/table";
import LectureFormModal from "./lecture-form-modal";

export default function Lecture() {
  return (
    <TableRow>
      <TableCell className="hidden md:table-cell">01</TableCell>
      <TableCell className="font-medium">1장. 우리 왜 기도를 해야 하는가?</TableCell>
      <TableCell className="hidden md:table-cell">2024.01.01</TableCell>
      <TableCell className="hidden md:table-cell">2024.01.02</TableCell>
      <TableCell  >
        {/* Modal */}
        <LectureFormModal />
      </TableCell>
    </TableRow>
  )
}