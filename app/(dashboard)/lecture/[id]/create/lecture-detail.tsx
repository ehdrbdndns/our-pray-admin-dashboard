"use client"

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { lectureFormSchema } from "@/lib/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { uploadFileToS3 } from "@/lib/s3";

export default function LectureDetail({ plan_id }: { plan_id: string }) {

  const [isLoading, setIsLoading] = useState(false);
  const [lectureCount, setLectureCount] = useState(0);
  const [audioName, setAudioName] = useState('');
  const [audioFile, setAudioFile] = useState<File>();
  const audioFileRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState('');
  const [startTime, setStartTime] = useState('');

  const form = useForm<z.infer<typeof lectureFormSchema>>({
    resolver: zodResolver(lectureFormSchema),
    defaultValues: {
      title: '',
      description: '',
      minute: '',
      bgm: undefined,
      startTimeList: [],
      audioNameList: [],
      captionList: [],
      audioFileList: [],
    }
  })

  const onChangeAudioName = (e: React.ChangeEvent<HTMLInputElement>) => setAudioName(e.target.value);
  const onChangeCaption = (e: React.ChangeEvent<HTMLTextAreaElement>) => setCaption(e.target.value);
  const onChangeAudioFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      return;
    }

    if (file.size > 314572800) {
      alert('300MB 이하의 파일만 업로드 가능합니다.');
      return;
    }

    setAudioFile(file);
  };
  const onChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value);

  const onClickAddAudio = () => {
    if (!audioFile) {
      alert('오디오 파일을 등록해주세요.');
      return;
    }

    if (!audioName) {
      alert('오디오 파일 이름을 입력해주세요.');
      return;
    }

    if (!caption) {
      alert('자막을 입력해주세요.');
      return;
    }

    form.setValue('audioFileList', [...form.getValues().audioFileList, audioFile]);
    form.setValue('audioNameList', [...form.getValues().audioNameList, audioName]);
    form.setValue('captionList', [...form.getValues().captionList, caption]);
    form.setValue('startTimeList', [...form.getValues().startTimeList, startTime]);

    setAudioName('');
    setAudioFile(undefined);
    setCaption('');
    setStartTime('');

    if (audioFileRef.current) {
      audioFileRef.current.value = '';
    }

    setLectureCount(lectureCount + 1);
  }

  const onClickDeleteAudio = (index: number) => {
    const audioFileList = form.getValues().audioFileList;
    const audioNameList = form.getValues().audioNameList;
    const captionList = form.getValues().captionList;
    const startTimeList = form.getValues().startTimeList;

    audioFileList.splice(index, 1);
    audioNameList.splice(index, 1);
    captionList.splice(index, 1);
    startTimeList.splice(index, 1);

    form.setValue('audioFileList', audioFileList);
    form.setValue('audioNameList', audioNameList);
    form.setValue('captionList', captionList);
    form.setValue('startTimeList', startTimeList);

    setAudioName('');
    setAudioFile(undefined);
    setCaption('');
    setStartTime('');

    if (audioFileRef.current) {
      audioFileRef.current.value = '';
    }

    setLectureCount(lectureCount - 1);
  }

  const onSubmitLecture = async (values: z.infer<typeof lectureFormSchema>) => {

    // if (!window.confirm('강의를 생성하시겠습니까?')) {
    //   return;
    // }

    setIsLoading(true);

    const formData = new FormData();

    try {
      const bgm = await uploadFileToS3('lecture/bgm', values.bgm);
      const audioList = [];

      for (let i = 0; i < values.audioFileList.length; i++) {
        const audio = await uploadFileToS3(`lecture/audio`, values.audioFileList[i]);
        audioList.push(audio);
      }

      formData.append('plan_id', plan_id);

      formData.append('title', values.title);
      formData.append('bgm', bgm);
      formData.append('description', values.description);
      formData.append('time', values.minute);

      formData.append('audioList', JSON.stringify(audioList));
      formData.append('startTimeList', JSON.stringify(values.startTimeList));
      formData.append('audioNameList', JSON.stringify(values.audioNameList));
      formData.append('captionList', JSON.stringify(values.captionList));

      const res = await fetch('/api/lecture', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error);
        throw new Error(data.error);
      }

      alert('강의가 성공적으로 저장되었습니다.');

      window.location.href = `/lecture/${plan_id}`;

    } catch (e) {
      console.error(e);
      alert('강의 생성에 실패했습니다.');
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitLecture)}>
        {/* 강의 기본 설정 */}
        <Card>
          <CardHeader>
            <CardTitle>강의 내용</CardTitle>
            <CardDescription>강의 내용을 입력하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between gap-5">
              {/* 제목, 기도 시간, 배경음악 */}
              <div className="w-full">
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
                  name="bgm"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>배경음악(300MB 크기 제한)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="audio/*"
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
                  name="minute"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>기도 분량(분 단위)</FormLabel>
                      <FormControl>
                        <Input placeholder="00" {...field} />
                      </FormControl>
                      <FormDescription>
                        {/* TODO description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* 강의 설명 */}
            <div className="w-full">
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
            </div>
          </CardContent>
        </Card>
        {/* 강의 오디오 등록 */}
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>오디오 등록</CardTitle>
            <CardDescription>강의 오디오를 등록하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>파일 제목</TableHead>
                  <TableHead className="hidden md:table-cell">시작 시간(분 단위)</TableHead>
                  <TableHead>오디오</TableHead>
                  <TableHead>자막</TableHead>
                  <TableHead>삭제</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Content */}
                {form.getValues().audioFileList.map((_, index) => {
                  const caption = form.getValues().captionList[index];
                  const audioName = form.getValues().audioNameList[index];
                  const audioFile = form.getValues().audioFileList[index];
                  const audioStartTime = form.getValues().startTimeList[index];

                  return (
                    <TableRow key={`lecture_file_${index}`}>
                      <TableCell className="font-medium">{audioName}</TableCell>
                      <TableCell className="hidden md:table-cell">{audioStartTime}</TableCell>
                      <TableCell>
                        <audio controls src={URL.createObjectURL(audioFile)} />
                      </TableCell>
                      <TableCell>
                        {/* TODO dialog for caption */}
                        {caption}
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => onClickDeleteAudio(index)}
                        >
                          삭제
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
                <TableRow>
                  <TableCell className="font-medium">
                    <Input placeholder="파일 제목을 입력하세요" value={audioName} onChange={onChangeAudioName} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Input placeholder="분" value={startTime} onChange={onChangeStartTime} />
                  </TableCell>
                  <TableCell>
                    <Input type="file" accept="audio/*" onChange={onChangeAudioFile} ref={audioFileRef} />
                  </TableCell>
                  <TableCell>
                    <Textarea placeholder="자막을 입력하세요" value={caption} onChange={onChangeCaption} />
                  </TableCell>
                  <TableCell>
                    <Button type="button" variant="default" onClick={onClickAddAudio}>등록</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="w-full flex justify-end mt-5">
          <Button type="submit">
            {
              isLoading
                ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                : '강의 생성'
            }
          </Button>
        </div>
      </form>
    </Form >
  )
}