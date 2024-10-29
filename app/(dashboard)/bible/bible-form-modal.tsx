"use client"

import { useContext, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BibleType } from "@/lib/db/type";
import { Loader2 } from "lucide-react";
import { BibleContext } from "./bible-provider";

export default function BibleFormModal({
  bible, mode
}: {
  bible?: BibleType, mode: 'create' | 'update'
}) {
  const { bibles, setBibles } = useContext(BibleContext);

  const [title, setTitle] = useState<string>(bible?.title || '');
  const [content, setContent] = useState<string>(bible?.content || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const triggerBtn = useRef<HTMLButtonElement>(null);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const onClickSubmitButton = async () => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/bible', {
        method: mode === 'create' ? 'POST' : 'PATCH',
        body: JSON.stringify({
          title,
          content,
          bible_quote_id: bible?.bible_quote_id
        })
      });

      const { bible_quote_id }: { bible_quote_id: string } = await res.json();

      if (mode === 'create') {
        const newBible = { bible_quote_id, title, content, created_date: new Date() } as BibleType;
        setBibles([newBible, ...bibles]);
      } else {
        const updatedBibles = bibles.map(b => {
          if (b.bible_quote_id === bible_quote_id) {
            return { ...b, title, content }
          }
          return b;
        });

        setBibles(updatedBibles)
      }

      alert('성공적으로 저장되었습니다.');
    } catch (e) {
      alert(e);
    }

    setIsLoading(false);
    triggerBtn.current?.click();
  }

  const onClickDeleteButton = async () => {
    const isDelete = confirm('정말로 삭제하시겠습니까?');

    if (!isDelete) return;

    setIsLoading(true);

    try {
      await fetch('/api/bible', {
        method: 'DELETE',
        body: JSON.stringify({
          bible_quote_id: bible?.bible_quote_id
        })
      })

      const updatedBibles = bibles.filter(b => b.bible_quote_id !== bible?.bible_quote_id);
      setBibles(updatedBibles);

      alert('성공적으로 삭제되었습니다.');
    } catch (e) {
      alert(e);
    }

    setIsLoading(false);
    triggerBtn.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={triggerBtn}>{mode === 'create' ? '생성' : '수정'}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>성경 문구 {mode === 'create' ? '생성' : '수정'}</DialogTitle>
          <DialogDescription>
            {mode === 'create' ? '생성할 성경 문구를 입력하세요' : '수정할 성경 문구를 입력하세요'}
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="title">제목</Label>
          <Input
            type="text"
            id="title"
            className="mb-3"
            value={title}
            onChange={onTitleChange}
          />
          <Label htmlFor="content">내용</Label>
          <Textarea
            placeholder="성경 문구 내용을 적어주세요"
            id="content"
            value={content}
            onChange={onContentChange}
          />
        </div>
        <DialogFooter>
          <Button onClick={onClickDeleteButton} variant={'destructive'} disabled={isLoading}>
            {
              isLoading
                ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                : '삭제'
            }
          </Button>
          <Button onClick={onClickSubmitButton} disabled={isLoading}>
            {
              isLoading
                ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                : mode === 'create' ? '생성' : '수정'
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}