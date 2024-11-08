import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { PlanType } from "@/lib/db/type";
import { getFullDateFromDate } from "@/lib/utils";
import Link from "next/link";

export default function Plan({ plan }: { plan: PlanType }) {
  const { plan_id, title, updated_date, created_date, is_active } = plan;

  return (
    <TableRow>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell className="hidden md:table-cell">
        {
          is_active ?
            <Badge variant="default" className="capitalize">
              활성화
            </Badge> :
            <Badge variant="destructive" className="capitalize">
              비활성화
            </Badge>
        }
      </TableCell>
      <TableCell className="hidden md:table-cell">{getFullDateFromDate(new Date(updated_date))}</TableCell>
      <TableCell className="hidden md:table-cell">{getFullDateFromDate(new Date(created_date))}</TableCell>
      <TableCell>
        {/* Button */}
        <Link href={`/plan/${plan_id}`}>
          <Button>
            수정
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  )
}