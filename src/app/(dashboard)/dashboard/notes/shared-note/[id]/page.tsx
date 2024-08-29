
export default async function SharedNotePage({ params }: { params: { id: string } }) {
  const note = await getSharedNote(params.id)
  

  if (!note) {
    return <div>Note not found or not publicly accessible.</div>
  }

