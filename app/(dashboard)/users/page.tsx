import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersTable from "./users-table";

export default function UsersPage() {
  return (
    <>
      {/* Content */}
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="active">활동중인 사용자</TabsTrigger>
            <TabsTrigger value="draft">정지된 사용자</TabsTrigger>
          </TabsList>
          <div>
            {/* Search Bar */}
          </div>
        </div>
        <TabsContent value="all">
          <UsersTable />
        </TabsContent>
      </Tabs>
    </>
  )
}