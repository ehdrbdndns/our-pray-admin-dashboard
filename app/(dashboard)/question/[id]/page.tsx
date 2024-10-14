import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserQuestion from "./user-question";
import AdminReply from "./admin-reply";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function QuestionDetailPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{"{사용자}님의 질문입니다."}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* record of question */}
          <ScrollArea className="h-[60vh] rounded-md border p-4">
            <UserQuestion />
            <AdminReply />
            <UserQuestion />
            <AdminReply />
            <UserQuestion />
            <AdminReply />
            <UserQuestion />
            <AdminReply />
          </ScrollArea>

          <hr className="mt-4 mb-4" />

          {/* Input for reply */}
          <div>
            <Textarea placeholder="답변을 입력하세요." />
            <div className="flex justify-between mt-3">
              <div></div>
              <Button>답변하기</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}