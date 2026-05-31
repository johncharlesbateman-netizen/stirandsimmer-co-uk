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
