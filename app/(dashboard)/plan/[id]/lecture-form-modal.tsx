"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod";

// https://ui.shadcn.com/docs/components/form
// Todo add audio file, hymn file
const formSchema = z.object({
  title: z.string().min(2, { message: '제목은 2자 이상 32자 이하로 입력해주세요.' }).max(32, { message: '제목은 2자 이상 32자 이하로 입력해주세요.' }),
  description: z.string().min(2, { message: '설명은 2자 이상 512자 이하로 입력해주세요.' }).max(512, { message: '설명은 2자 이상 512자 이하로 입력해주세요.' }),
  audioCaption: z.string(),
  time: z.number().int().min(1, { message: '시간은 1 이상으로 입력해주세요.' }),
})

export default function LectureFormModal() {

  // Todo add audio file, hymn file
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      audioCaption: '',
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">생성 or 수정</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>강의 생성</DialogTitle>
          <DialogDescription>
            기도 플랜에 들어갈 강의를 생성하세요.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              {/* // Todo add audio file, hymn file */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목</FormLabel>
                    <FormControl>
                      <Input placeholder="제목을 입력하세요" {...field} />
                    </FormControl>
                    <FormDescription>
                      {/* TODO description */}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>설명</FormLabel>
                    <FormControl>
                      <Textarea placeholder="설명을 입력하세요" {...field} />
                    </FormControl>
                    <FormDescription>
                      {/* TODO description */}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="audioCaption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>오디오 자막</FormLabel>
                    <FormControl>
                      <Textarea placeholder="오디오 자막을 입력하세요" {...field} />
                    </FormControl>
                    <FormDescription>
                      {/* TODO description */}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>기도 시간(초)</FormLabel>
                    <FormControl>
                      <Input placeholder="기도 시간(초)을 입력하세요" type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      {/* TODO description */}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
          <DialogFooter className="w-full flex justify-between">
            <DialogClose asChild>
              <Button variant="secondary">취소</Button>
            </DialogClose>
            <Button>생성</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog >
  )
}