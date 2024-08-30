import { format } from "date-fns";
import { getNote } from "../actions/action";
import { notFound } from "next/navigation";

export default async function NotePage({ params }: { params: { id: string } }) {
  const note = await getNote(params.id);

  if (!note) notFound();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{note.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        <p>Folder: {note.folder?.name}</p>
        <p>Created: {format(new Date(note.createdAt), "PPpp")}</p>
        <p>Updated: {format(new Date(note.updatedAt), "PPpp")}</p>
        <p>Tags: {note.tags.map((tag) => tag.name).join(", ")}</p>
      </div>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
    </div>
  );
}
