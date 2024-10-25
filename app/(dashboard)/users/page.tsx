import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersTable from "./users-table";
import { getAllUsers } from "app/api/user/user";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <>
      {/* Content */}
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="active">활동중인 사용자</TabsTrigger>
            <TabsTrigger value="banned">정지된 사용자</TabsTrigger>
          </TabsList>
          <div>
            {/* Search Bar */}
          </div>
        </div>
        <TabsContent value="all">
          <UsersTable users={users} />
        </TabsContent>
        <TabsContent value="active">
          <UsersTable users={users.filter(user => user.status === 'active')} />
        </TabsContent>
        <TabsContent value="banned">
          <UsersTable users={users.filter(user => user.status !== 'active')} />
        </TabsContent>
      </Tabs>
    </>
  )
}