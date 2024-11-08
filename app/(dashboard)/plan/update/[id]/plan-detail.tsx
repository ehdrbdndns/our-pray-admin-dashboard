"use client"

import { z } from "zod";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlanType } from "@/lib/db/type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { updatePlanFormSchema } from "@/lib/form";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { uploadFileToS3 } from "@/lib/s3";

export default function PlanDetail({ plan }: { plan: PlanType }) {

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof updatePlanFormSchema>>({
    resolver: zodResolver(updatePlanFormSchema),
    defaultValues: {
      title: plan.title,
      description: plan.description,
      author_name: plan.author_name,
      author_description: plan.author_description,
      is_active: plan.is_active,
    }
  })

  const onSubmitPlan = async (values: z.infer<typeof updatePlanFormSchema>) => {
    setIsLoading(true);

    const formData = new FormData();

    try {
      let thumbnail = plan.thumbnail;
      let s_thumbnail = plan.s_thumbnail;
      let author_profile = plan.author_profile;

      if (values.thumbnail !== undefined) {
        thumbnail = await uploadFileToS3('plan/thumbnail', values.thumbnail)
      }

      if (values.s_thumbnail !== undefined) {
        s_thumbnail = await uploadFileToS3('plan/s_thumbnail', values.s_thumbnail)
      }

      if (values.author_profile !== undefined) {
        author_profile = await uploadFileToS3('plan/author_profile', values.author_profile)
      }

      formData.append('thumbnail', thumbnail);
      formData.append('s_thumbnail', s_thumbnail);
      formData.append('author_profile', author_profile);

      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('author_name', values.author_name);
      formData.append('author_description', values.author_description);
      formData.append('is_active', values.is_active.toString());
      formData.append('plan_id', plan.plan_id)

      const res = await fetch('/api/plan', {
        method: 'PUT',
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      alert('플랜이 성공적으로 수정되었습니다.');

      // move to /plan
      window.location.href = '/plan';

    } catch (e) {
      console.error(e);
      alert(e);
    }

    setIsLoading(false);
  }

  const onClickSaveButton = () => {
    const value = form.getValues();
    onSubmitPlan(value);
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Form {...form}>
          <form onSubmit={(e) => {
            onClickSaveButton();
            e.preventDefault();
          }}>
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
                        <FormLabel>썸네일(686px * 360px)</FormLabel>
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
                    name="s_thumbnail"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>작은 썸네일(320px * 320px)</FormLabel>
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
                        <FormLabel>프로필(52px * 52px)</FormLabel>
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
                <Button variant={'destructive'} disabled={isLoading}>
                  {
                    isLoading
                      ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      : '비활성화'
                  }
                </Button>
                <Button className="ml-2" disabled={isLoading} type="submit">
                  {
                    isLoading
                      ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      : '저장'
                  }
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div >
  )
}