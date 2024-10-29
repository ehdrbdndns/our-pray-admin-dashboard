"use client"

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersTable from "./users-table";
import { UserType } from "@/lib/db/type";
import { UserContext } from "./user-provider";

export default function UsersPage() {

  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user', {
          method: 'GET'
        })

        const users = await res.json();

        setUsers(users);
      } catch (e) {
        console.error(e);
        alert('사용자 정보를 가져오는데 실패했습니다. 관리자에게 문의하세요.');
      }

      setIsLoading(false);
    }

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }

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
        <UserContext.Provider value={{ users, setUsers }}>
          <TabsContent value="all">
            <UsersTable users={users} />
          </TabsContent>
          <TabsContent value="active">
            <UsersTable users={users.filter(user => user.status === 'active')} />
          </TabsContent>
          <TabsContent value="banned">
            <UsersTable users={users.filter(user => user.status !== 'active')} />
          </TabsContent>
        </UserContext.Provider>
      </Tabs>
    </>
  )
}