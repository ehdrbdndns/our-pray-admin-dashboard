import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function Plan() {
  return (
    <TableRow>
      <TableCell className="hidden md:table-cell">01</TableCell>
      <TableCell className="font-medium">기도 습관이 잘 잡히지 않는 사람을 위한</TableCell>
      <TableCell className="hidden md:table-cell">2024.01.01</TableCell>
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