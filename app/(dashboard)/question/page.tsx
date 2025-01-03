"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QuestionTable from "./question-table"
import { useEffect, useState } from "react"
import { QuestionType } from "@/lib/db/type"

export default function QuestionPage() {

  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/api/question', {
          method: 'GET'
        })

        const questions = await res.json();

        setQuestions(questions.filter((row: any) => row.is_active));
      } catch (e) {
        console.error(e);
        alert('문의사항을 가져오는데 실패했습니다. 관리자에게 문의하세요.');
      }

      setIsLoading(false);
    }

    fetchQuestions();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }

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