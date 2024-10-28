import UserStatusModal from "./user-status-modal";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserType } from "@/lib/db/type";

export default function User({ user }: { user: UserType }) {
  return (
    <TableRow>
      <TableCell className="hidden md:table-cell">{user.user_id}</TableCell>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell className="font-medium">{user.email}</TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline" className="capitalize">
          {user.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline" className="capitalize">
          {user.alarm ? 'ON' : 'OFF'}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline" className="capitalize">
          {/* 일반 사용자 or 관리자 */}
          {user.role === 'admin' ? '관리자' : user.role === 'counselor' ? '상담가' : '일반 사용자'}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{user.created_date.getFullYear()}-{user.created_date.getMonth()}-{user.created_date.getDate()}</TableCell>
      <TableCell>
        <UserStatusModal user={user} />
      </TableCell>
    </TableRow>
  )
}