import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReplyType } from "@/lib/db/type";
import ReplyFormModal from "./reply-form-modal";

export default function Reply({ reply }: { reply: ReplyType }) {

  const { question_id, question_reply_id, content, is_replier, created_date, updated_date } = reply;

  return (
    <div className={`flex my-6 ${is_replier && 'justify-between'}`}>
      {
        is_replier
          ? (
            <div className="w-[40%]"></div>
          ) : (
            <Avatar className="mr-3">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )
      }
      {/* Text Area */}
      <div className="rounded-md border p-4 bg-slate-200">
        <p className="whitespace-pre-line">
          {content}
        </p>
        <div className="flex flex-col w-[100%] text-end mt-3">
          <span className="text-xs text-slate-500">생성날짜: {created_date}</span>
          <span className="text-xs text-slate-500">수정날짜: {updated_date}</span>
        </div>
        {is_replier ? (
          <div className="flex justify-between mt-1">
            <div />
            <div className="flex">
              <ReplyFormModal question_id={question_id} question_reply_id={question_reply_id} initValue={content} />
            </div>
          </div>
        ) : ''}
      </div>
    </div >
  )
}