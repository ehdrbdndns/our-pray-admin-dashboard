import LectureDetail from "./lecture-detail";

export default function LectureDetailPage({ params }: { params: { id: string } }) {

  const { id } = params;

  return (
    <LectureDetail plan_id={id} />
  )
}