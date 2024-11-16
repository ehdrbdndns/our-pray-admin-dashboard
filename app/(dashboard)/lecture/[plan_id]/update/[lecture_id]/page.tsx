"use client"

import { useEffect, useState } from "react";
import LectureDetail from "./lecture-detail";
import { LectureAudioType, LectureType } from "@/lib/db/type";

export default function LectureDetailPage({ params }: { params: { plan_id: string, lecture_id: string } }) {

  const [isLoading, setIsLoading] = useState(true);
  const [lecture, setLecture] = useState<LectureType>({
    lecture_id: '',
    plan_id: '',
    title: '',
    description: '',
    time: '',
    bgm: '',
    is_active: false,
    updated_date: '',
    created_date: '',
  } as LectureType);
  const [audios, setAudios] = useState<LectureAudioType[]>([]);

  const { plan_id, lecture_id } = params;

  useEffect(() => {
    const fetchLecture = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(`/api/lecture/${lecture_id}`);

        const { lecture, audios }: { lecture: LectureType, audios: LectureAudioType[] } = await res.json();

        if (res.status !== 200) {
          alert('Failed to fetch lecture');
          return;
        }

        const upadtedAudios = await Promise.all(
          audios.map(async (row) => {
            let file = await fetch(row.audio);
            let blob = await file.blob();

            return {
              ...row,
              audioFile: new File([blob], row.audio, { type: blob.type })
            } as LectureAudioType;
          })
        );

        // do not need to fetch bgm file
        // const updatedLecture = await (async () => {
        //   let file = await fetch(lecture.bgm);
        //   let blob = await file.blob();

        //   return {
        //     ...lecture,
        //     bgmFile: new File([blob], lecture.bgm, { type: blob.type })
        //   } as LectureType;
        // })();
        // setLecture(updatedLecture);

        setLecture(lecture);
        setAudios(upadtedAudios);
      } catch (e) {
        console.error(e);
        alert('Failed to fetch lecture');
      }

      setIsLoading(false);
    }

    fetchLecture();
  }, [])


  if (isLoading) { return <div>Loading...</div> }

  return (
    <LectureDetail
      plan_id={plan_id}
      lecture={lecture}
      audios={audios}
    />
  )
}