import { TableCell, TableRow } from "@/components/ui/table";
import AlarmSendModal from "./alarmSendModal";
import AlarmFromModal from "./alarm-form-modal";

export default function Alarm() {
  return (
    <TableRow>
      <TableCell className="hidden md:table-cell">ID</TableCell>
      <TableCell className="font-medium">기도 하셨나요?</TableCell>
      <TableCell className="hidden md:table-cell">지금 앱에 접속하셔서 기도해보세요</TableCell>
      <TableCell className="hidden md:table-cell">2024.01.01</TableCell>
      <TableCell>
        <AlarmSendModal />
      </TableCell>
      <TableCell>
        <AlarmFromModal />
      </TableCell>
    </TableRow>
  )
}