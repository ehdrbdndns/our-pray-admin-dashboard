"use client"

import { z } from "zod";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { planFormSchema } from "@/lib/form";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { uploadFileToS3 } from "@/lib/s3";

export default function PlanDetail() {

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof planFormSchema>>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      title: '',
      description: '',
      author_name: '',
      author_description: '',
      is_active: false,
    }
  })

  const onSubmitPlan = async (values: z.infer<typeof planFormSchema>) => {
    setIsLoading(true);

    const formData = new FormData();

    try {
      const thumbnail = await uploadFileToS3('plan/thumbnail', values.thumbnail);
      const s_thumbnail = await uploadFileToS3('plan/s_thumbnail', values.s_thumbnail);
      const author_profile = await uploadFileToS3('plan/author_profile', values.author_profile);

      formData.append('thumbnail', thumbnail);
      formData.append('s_thumbnail', s_thumbnail);
      formData.append('author_profile', author_profile);

      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('author_name', values.author_name);
      formData.append('author_description', values.author_description);
      formData.append('is_active', values.is_active.toString());

      const res = await fetch('/api/plan', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      alert('플랜이 성공적으로 저장되었습니다.');

      window.location.href = '/plan';

    } catch (e) {
      console.error(e);
      alert(e);
    }

    setIsLoading(false);
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
              <Button className="ml-2" disabled={isLoading} type="submit">
                {
                  isLoading
                    ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    : '저장'
                }
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div >
  )
}