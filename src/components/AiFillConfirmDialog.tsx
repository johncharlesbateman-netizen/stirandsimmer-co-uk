import { Sparkles, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type {
  AIFieldKey,
  AIFieldPreview,
} from "@/lib/useAiFillRecipeMetadata";

interface Props {
  open: boolean;
  previews: AIFieldPreview[];
  selected: Record<AIFieldKey, boolean>;
  loading: boolean;
  onToggle: (key: AIFieldKey) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function AiFillConfirmDialog({
  open,
  previews,
  selected,
  loading,
  onToggle,
  onCancel,
  onConfirm,
}: Props) {
  const anySelected = previews.some((p) => selected[p.key]);

  return (
    <Dialog open={open} onOpenChange={(o) => (!o ? onCancel() : undefined)}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Review AI suggestions
          </DialogTitle>
          <DialogDescription>
            Only the fields ticked below will be filled. Author fields are never touched.
            Untick anything you don't want applied.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-[50vh] overflow-y-auto">
          {previews.map((p) => (
            <label
              key={p.key}
              className={`flex items-start gap-3 p-3 border rounded-md cursor-pointer transition-colors ${
                selected[p.key]
                  ? "border-primary/50 bg-primary/5"
                  : "border-border hover:bg-secondary/50"
              }`}
            >
              <input
                type="checkbox"
                checked={selected[p.key]}
                onChange={() => onToggle(p.key)}
                className="mt-1"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{p.label}</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words mt-1">
                  {p.preview}
                </p>
              </div>
            </label>
          ))}
        </div>

        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="button" onClick={onConfirm} disabled={loading || !anySelected}>
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Apply selected
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
