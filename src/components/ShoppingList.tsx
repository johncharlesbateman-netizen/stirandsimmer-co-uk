import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShoppingListProps {
  ingredients: string[];
}

const ShoppingList = ({ ingredients }: ShoppingListProps) => {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleCopy = async () => {
    const unchecked = ingredients.filter((_, i) => !checked.has(i));
    const text = unchecked.length > 0 ? unchecked.join("\n") : ingredients.join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ title: "Copied!", description: "Shopping list copied to clipboard." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Couldn't copy", variant: "destructive" });
    }
  };

  return (
    <div className="mt-8 p-5 bg-secondary border border-border">
      <div className="flex items-center justify-between mb-4">
        <p className="micro-caption">Shopping List</p>
        <div className="flex items-center gap-3">
          {checked.size > 0 && (
            <button
              onClick={() => setChecked(new Set())}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          )}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy unchecked"}
          </button>
        </div>
      </div>
      <ul className="space-y-3">
        {ingredients.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <Checkbox
              id={`ingredient-${i}`}
              checked={checked.has(i)}
              onCheckedChange={() => toggle(i)}
              className="mt-0.5"
            />
            <label
              htmlFor={`ingredient-${i}`}
              className={`text-sm cursor-pointer transition-colors ${
                checked.has(i) ? "line-through text-muted-foreground/50" : "text-muted-foreground"
              }`}
            >
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
