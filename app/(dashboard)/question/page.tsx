import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QuestionTable from "./question-table"

export default function QuestionPage() {
  return (
    <>
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="pend">답변 대기</TabsTrigger>
            <TabsTrigger value="reply">답변 완료</TabsTrigger>
          </TabsList>
          <div>
            {/* Search Bar */}
          </div>
        </div>
        <TabsContent value="all">
          <QuestionTable />
        </TabsContent>
      </Tabs>
    </>
  )
}