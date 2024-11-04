import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { QuestionType } from "@/lib/db/type";
import { getFullDateFromDate } from "@/lib/utils";
import Link from "next/link";

export default function Question({ question }: { question: QuestionType }) {
  const { question_id, user_name, content, updated_date, is_answered } = question;

  return (
    <TableRow>
      <TableCell className="font-medium">{user_name}</TableCell>
      <TableCell className="font-medium">{content}</TableCell>
      <TableCell className="hidden md:table-cell">{getFullDateFromDate(new Date(updated_date))}</TableCell>
      <TableCell className="font-medium">
        <Badge variant="default" className="capitalize">
          {is_answered ? '답변완료' : '답변대기'}
        </Badge>
      </TableCell>
      <TableCell>
        {/* Button */}
        <Link href={`/question/${question_id}`}>
          <Button>
            답변
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  )
}