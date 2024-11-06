"use client"

import { z } from "zod";
import Lecture from "./lecture";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import LectureFormModal from "./lecture-form-modal";
import { Button } from "@/components/ui/button";
import { PlanType } from "@/lib/db/type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zfd } from "zod-form-data";

const formSchema = z.object({
  title: z.string()
    .min(2, { message: '제목은 2자 이상 32자 이하로 입력해주세요.' })
    .max(32, { message: '제목은 2자 이상 32자 이하로 입력해주세요.' }),

  description: z.string()
    .min(2, { message: '설명은 2자 이상 1300자 이하로 입력해주세요.' })
    .max(512, { message: '설명은 2자 이상 1300자 이하로 입력해주세요.' }),

  author_name: z.string()
    .min(2, { message: '저자 이름은 2자 이상 32자 이하로 입력해주세요.' })
    .max(32, { message: '저자 이름은 2자 이상 32자 이하로 입력해주세요.' }),

  author_description: z.string()
    .min(2, { message: '저자 소개는 2자 이상 1300자 이하로 입력해주세요.' })
    .max(1300, { message: '저자 소개는 2자 이상 1300자 이하로 입력해주세요.' }),

  is_active: z.boolean(),

  thumbnail: zfd.file()
    .refine((file: File) => file !== undefined, { message: "파일을 등록해야 합니다." })
    .refine((file: File) => file.size < 1000000, { message: "파일 크기가 1MB 보다 작아야 합니다." })
    .refine((file: File) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), { message: "(jpeg, png, jpg) 파일만 업로드 가능합니다." }),

  author_profile: zfd.file()
    .refine((file: File) => file !== undefined, { message: "파일을 등록해야 합니다." })
    .refine((file: File) => file.size < 1000000, { message: "파일 크기가 1MB 보다 작아야 합니다." })
    .refine((file: File) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), { message: "(jpeg, png, jpg) 파일만 업로드 가능합니다." })
})

export default function PlanDetail({ plan, mode }: { plan: PlanType, mode: string }) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: plan.title,
      description: plan.description,
      author_name: plan.author_name,
      author_description: plan.author_description,
      is_active: plan.is_active,
    }
  })

  function onSubmitPlan(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitPlan)}>
            <div className="flex justify-between gap-5">
              {/* 기도 플랜 정보 */}
              <Card className="w-[50%]">
                <CardHeader>
                  <CardTitle>기도 플랜 정보</CardTitle>
                  <CardDescription>기도 플랜 정보를 입력하세요.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>플랜 제목</FormLabel>
                        <FormControl>
                          <Input placeholder="플랜 제목을 입력하세요" {...field} />
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
                    name="thumbnail"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>썸네일</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            {...fieldProps}
                            onChange={(event) =>
                              onChange(event.target.files && event.target.files[0])
                            }
                          />
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
                        <FormLabel>소개</FormLabel>
                        <FormControl>
                          <Textarea placeholder="플랜 소개 글을 입력하세요" {...field} />
                        </FormControl>
                        <FormDescription>
                          {/* TODO description */}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              {/* 저자 정보 */}
              <Card className="w-[50%]">
                <CardHeader>
                  <CardTitle>저자 정보</CardTitle>
                  <CardDescription>저자 정보를 입력하세요.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="author_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>저자 이름</FormLabel>
                        <FormControl>
                          <Input placeholder="저자 이름을 입력하세요" {...field} />
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
                    name="author_profile"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>프로필</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            {...fieldProps}
                            onChange={(event) =>
                              onChange(event.target.files && event.target.files[0])
                            }
                          />
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
                    name="author_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>저자 소개</FormLabel>
                        <FormControl>
                          <Textarea placeholder="저자에 대한 소개를 적어주세요." {...field} />
                        </FormControl>
                        <FormDescription>
                          {/* TODO description */}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end mt-1">
              <div className="flex">
                <Button variant={'destructive'}>비활성화</Button>
                <Button className="ml-2">저장</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <hr />
      {/* 강의 정보 */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>강의 정보</CardTitle>
            <CardDescription>기도 플랜에 대한 강의를 관리합니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden md:table-cell">ID</TableHead>
                  <TableHead>강의 제목</TableHead>
                  <TableHead className="hidden md:table-cell">생성 날짜</TableHead>
                  <TableHead className="hidden md:table-cell">수정 날짜</TableHead>
                  <TableHead>수정</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Content */}
                <Lecture />
                <Lecture />
                <Lecture />
                <Lecture />
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            {/* Create Lecture Brn */}
            <div className="flex justify-between w-full">
              <div></div>
              <LectureFormModal />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div >
  )
}