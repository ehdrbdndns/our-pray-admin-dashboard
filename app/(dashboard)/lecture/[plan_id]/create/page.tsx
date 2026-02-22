import LectureDetail from "./lecture-detail";

export default async function LectureDetailPage({ params }: { params: Promise<{ plan_id: string }> }) {

  const { plan_id } = await params;

  return (
    <LectureDetail plan_id={plan_id} />
  )
}
