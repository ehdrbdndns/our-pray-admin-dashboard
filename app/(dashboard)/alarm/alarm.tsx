import { TableCell, TableRow } from "@/components/ui/table";
import AlarmSendModal from "./alarmSendModal";
import AlarmFromModal from "./alarm-form-modal";
import { AlarmType } from "@/lib/db/type";
import { getFullDateTimeFromDate } from "@/lib/utils";

export default function Alarm({ alarm }: { alarm: AlarmType }) {
  const { title, message, last_notification_date, next_notification_date } = alarm;

  return (
    <TableRow>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell className="hidden md:table-cell">{message}</TableCell>
      <TableCell className="hidden md:table-cell">
        {
          last_notification_date === null || last_notification_date === ''
            ? '최근 알림 없음'
            : getFullDateTimeFromDate(new Date(last_notification_date))
        }
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {
          next_notification_date === null || next_notification_date === ''
            ? '예약 알림 없음'
            : getFullDateTimeFromDate(new Date(next_notification_date))
        }
      </TableCell>
      <TableCell>
        <AlarmSendModal />
      </TableCell>
      <TableCell>
        <AlarmFromModal alarm={alarm} mode="update" />
      </TableCell>
    </TableRow>
  )
}