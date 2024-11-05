import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { PlanType } from "@/lib/db/type";
import { getFullDateFromDate } from "@/lib/utils";
import Link from "next/link";

export default function Plan({ plan }: { plan: PlanType }) {
  const { title, updated_date, created_date } = plan;

  return (
    <TableRow>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell className="hidden md:table-cell">{getFullDateFromDate(new Date(updated_date))}</TableCell>
      <TableCell className="hidden md:table-cell">{getFullDateFromDate(new Date(created_date))}</TableCell>
      <TableCell>
        {/* Button */}
        <Link href="/plan/1">
          <Button>
            수정
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  )
}