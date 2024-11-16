import LectureDetail from "./lecture-detail";

export default function LectureDetailPage({ params }: { params: { plan_id: string } }) {

  const { plan_id } = params;

  return (
    <LectureDetail plan_id={plan_id} />
  )
}