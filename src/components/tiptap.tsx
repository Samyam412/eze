import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./toolbar";
import { Heading } from "@tiptap/extension-heading";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { ScrollArea } from "./ui/scroll-area";

export default function Tiptap({
  description,

  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        HTMLAttributes: {
          class: "text-2xl font-semibold text-black ",
          levels: [2],
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-4",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-4",
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: " rounded-md border border-gray-300 h-[280px] ",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editable: true,
  });

  return (
    <div className="flex size-full  flex-col  ">
      <Toolbar editor={editor} />
      <ScrollArea className="h-full w-full  ">
        <EditorContent editor={editor} className="h-full w-full text-start  " />
      </ScrollArea>
    </div>
  );
}
