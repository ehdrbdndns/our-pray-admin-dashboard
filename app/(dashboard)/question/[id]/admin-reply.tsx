import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminReply() {
  return (
    <div className="flex my-6">
      <div className="rounded-md border p-4 bg-slate-200">
        기도는 이렇게 하는 겁니다. 따라해보세요. 하늘에 계신 우리 아버지여
        이름이 거룩히 여김을 받으시오며 나라에 임하시오며 뜻이 하늘에서 이루어진 것 같이
        땅에서도 이루어지리다. 오늘날 우리에게 일용할 양식을 주시고 우리가 우리에게
        죄 지은 자를 사하여 준 것 같이 우리 죄를 사하여 주시고 우리를 시험에 들게 하지 마옵시고
        다만 악에서 구하소서. 대게 나라와 권세와 영광이 아버지께 영원히 있사옵나이다. 아멘
      </div>
      {/* Avatar */}
      <Avatar className="ml-3">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {/* Text Area */}
    </div>
  )
}