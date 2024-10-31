import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QuestionTable from "./question-table"
import { getAllQuestions } from "@/lib/serverActions/question"

export default async function QuestionPage() {

  const questions = await getAllQuestions();

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
          <QuestionTable questions={questions} />
        </TabsContent>
        <TabsContent value="pend">
          <QuestionTable questions={questions.filter((row) => !row.is_answered)} />
        </TabsContent>
        <TabsContent value="reply">
          <QuestionTable questions={questions.filter((row) => row.is_answered)} />
        </TabsContent>
      </Tabs>
    </>
  )
}