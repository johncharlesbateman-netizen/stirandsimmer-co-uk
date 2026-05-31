import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface QuickPasteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  placeholder: string;
  buttonLabel: string;
  onSubmit: (items: string[]) => void;
  stripNumbers?: boolean;
}

// Bullets / numbered prefixes that indicate a new item
const NEW_ITEM_PREFIX =
  /^\s*(?:[-*+•·–—]|\d+\s*[.\):\-]|step\s*\d+\b)/i;

// Lines starting with a quantity/measurement strongly suggest a new ingredient
const QUANTITY_PREFIX =
  /^\s*(?:\d+[\d/.,\s]*|[½¼¾⅓⅔⅛⅜⅝⅞⅙⅚])\s*(?:[a-zA-Z]|$)/;

function stripPrefix(line: string): string {
  return line.replace(/^\s*(?:[-*+•·–—]|\d+\s*[.\):\-]|step\s*\d+[.\):\-]?)\s*/i, "").trim();
}

export function parsePastedItems(text: string, stripNumbers: boolean): string[] {
  const rawLines = text.replace(/\r\n/g, "\n").split("\n");
  const items: string[] = [];
  let current = "";

  const flush = () => {
    const trimmed = current.trim().replace(/\s+/g, " ");
    if (trimmed) items.push(trimmed);
    current = "";
  };

  for (const raw of rawLines) {
    const line = raw.trim();
    if (!line) {
      // Blank line = hard boundary
      flush();
      continue;
    }

    const startsNew =
      NEW_ITEM_PREFIX.test(line) || (!stripNumbers && QUANTITY_PREFIX.test(line));

    if (startsNew && current.trim()) {
      flush();
    }

    const cleaned = stripNumbers || NEW_ITEM_PREFIX.test(line) ? stripPrefix(line) : line;
    current = current ? `${current} ${cleaned}` : cleaned;
  }
  flush();

  return items;
}



export default function QuickPasteDialog({
  open,
  onOpenChange,
  title,
  description,
  placeholder,
  buttonLabel,
  onSubmit,
  stripNumbers = false,
}: QuickPasteDialogProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const items = parsePastedItems(text, stripNumbers);
    if (items.length === 0) return;
    onSubmit(items);
    setText("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          rows={10}
          className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-y"
        />
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={!text.trim()}>
            {buttonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
