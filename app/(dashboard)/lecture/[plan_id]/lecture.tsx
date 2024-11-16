import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { LectureType } from "@/lib/db/type";
import { getFullDateFromDate } from "@/lib/utils";
import Link from "next/link";

export default function Lecture({ lecture }: { lecture: LectureType }) {
  const { lecture_id, plan_id, title, time, is_active, updated_date } = lecture;

  return (
    <TableRow>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell className="hidden md:table-cell">{time} 분</TableCell>
      <TableCell className="hidden md:table-cell">
        {
          is_active
            ?
            <Badge variant="default" className="capitalize">
              활성화
            </Badge>
            :
            <Badge variant="destructive" className="capitalize">
              비활성화
            </Badge>
        }
      </TableCell>
      <TableCell className="hidden md:table-cell">{getFullDateFromDate(new Date(updated_date))}</TableCell>
      <TableCell>
        <Link href={`${plan_id}/update/${lecture_id}`}>
          <Button>수정</Button>
        </Link>
      </TableCell>
    </TableRow>
  )
}