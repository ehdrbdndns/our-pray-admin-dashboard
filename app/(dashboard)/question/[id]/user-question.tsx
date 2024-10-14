import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserQuestion() {
  return (
    <div className="flex my-6">
      {/* Avatar */}
      <Avatar className="mr-3">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {/* Text Area */}
      <div className="rounded-md border p-4 bg-slate-200">
        기도는 어떻게 하는 건가요? 이렇게? 저렇게? 기도는 어떻게 하는 건가요? 이렇게? 저렇게? 기도는 어떻게 하는 건가요? 이렇게? 저렇게? 기도는 어떻게 하는 건가요? 이렇게? 저렇게?
      </div>
    </div>
  )
}