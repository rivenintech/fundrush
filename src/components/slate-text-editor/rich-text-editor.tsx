import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import isHotkey from "is-hotkey";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading,
  Italic,
  List,
  ListOrdered,
  LucideIcon,
  Quote,
  Underline,
} from "lucide-react";
import React, { KeyboardEvent, MouseEvent, useCallback, useMemo } from "react";
import { Editor, Element as SlateElement, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, RenderElementProps, RenderLeafProps, Slate, useSlate, withReact } from "slate-react";
import { CustomEditor, CustomElement, CustomElementType, CustomElementWithAlign, CustomTextKey } from "./types";

const HOTKEYS: Record<string, CustomTextKey> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"] as const;
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"] as const;

type AlignType = (typeof TEXT_ALIGN_TYPES)[number];
type ListType = (typeof LIST_TYPES)[number];
type CustomElementFormat = CustomElementType | AlignType | ListType;

const emptyEditorValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export function RichTextReader({ content, className }: { content: unknown; className?: string }) {
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} initialValue={content}>
      <Editable
        readOnly
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        className={cn("prose prose-neutral dark:prose-invert w-full max-w-full", className)}
      />
    </Slate>
  );
}

type RichTextEditorProps = {
  className?: string;
  initialContent?: unknown;
  onChange: (value: string) => void;
};

export function RichTextEditor({ className, initialContent, onChange }: RichTextEditorProps) {
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const initialValue = initialContent || emptyEditorValue;

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some((op) => "set_selection" !== op.type);
        if (isAstChange) {
          onChange(JSON.stringify(value));
        }
      }}
    >
      <div>
        <MarkButton format="bold" Icon={Bold} />
        <MarkButton format="italic" Icon={Italic} />
        <MarkButton format="underline" Icon={Underline} />
        <MarkButton format="code" Icon={Code} />
        <BlockButton format="heading-three" Icon={Heading} />
        <BlockButton format="block-quote" Icon={Quote} />
        <BlockButton format="numbered-list" Icon={ListOrdered} />
        <BlockButton format="bulleted-list" Icon={List} />
        <BlockButton format="left" Icon={AlignLeft} />
        <BlockButton format="center" Icon={AlignCenter} />
        <BlockButton format="right" Icon={AlignRight} />
        <BlockButton format="justify" Icon={AlignJustify} />
      </div>
      <Editable
        renderElement={renderElement}
        className={cn(
          "prose prose-neutral dark:prose-invert border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 min-h-16 w-full max-w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        renderLeaf={renderLeaf}
        spellCheck
        onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
}

const toggleBlock = (editor: CustomEditor, format: CustomElementFormat) => {
  const isActive = isBlockActive(editor, format, isAlignType(format) ? "align" : "type");
  const isList = isListType(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && isListType(n.type) && !isAlignType(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (isAlignType(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: CustomEditor, format: CustomTextKey) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: CustomEditor, format: CustomElementFormat, blockType: "type" | "align" = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
          if (blockType === "align" && isAlignElement(n)) {
            return n.align === format;
          }
          return n.type === format;
        }
        return false;
      },
    }),
  );

  return !!match;
};

const isMarkActive = (editor: CustomEditor, format: CustomTextKey) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const style: React.CSSProperties = {};
  if (isAlignElement(element)) {
    style.textAlign = element.align as AlignType;
  }
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-three":
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

interface BlockButtonProps {
  format: CustomElementFormat;
  Icon: LucideIcon;
}

const BlockButton = ({ format, Icon }: BlockButtonProps) => {
  const editor = useSlate();
  return (
    <Toggle
      data-state={isBlockActive(editor, format, isAlignType(format) ? "align" : "type") ? "on" : "off"}
      onMouseDown={(event: MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon />
    </Toggle>
  );
};

interface MarkButtonProps {
  format: CustomTextKey;
  Icon: LucideIcon;
}

const MarkButton = ({ format, Icon }: MarkButtonProps) => {
  const editor = useSlate();
  return (
    <Toggle
      data-state={isMarkActive(editor, format) ? "on" : "off"}
      onMouseDown={(event: MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon />
    </Toggle>
  );
};

const isAlignType = (format: CustomElementFormat): format is AlignType => {
  return TEXT_ALIGN_TYPES.includes(format as AlignType);
};

const isListType = (format: CustomElementFormat): format is ListType => {
  return LIST_TYPES.includes(format as ListType);
};

const isAlignElement = (element: CustomElement): element is CustomElementWithAlign => {
  return "align" in element;
};
