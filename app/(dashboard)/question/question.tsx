import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function Question() {
  return (
    <TableRow>
      <TableCell className="hidden md:table-cell">01</TableCell>
      <TableCell className="font-medium">양동균</TableCell>
      <TableCell className="font-medium">기도는 왜 하루에 1시간 이상 해야하나요?</TableCell>
      <TableCell className="hidden md:table-cell">2024.01.01</TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="default" className="capitalize">
          {/* 일반 사용자 or 관리자 */}
          답변 완료
        </Badge>
      </TableCell>
      <TableCell>
        {/* Button */}
        <Link href="/question/1">
          <Button>
            수정
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  )
}