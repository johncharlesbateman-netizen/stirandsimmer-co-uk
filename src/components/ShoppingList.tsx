import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Check, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SupermarketBasket from "@/components/SupermarketBasket";

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
    const checkedItems = ingredients.filter((_, i) => checked.has(i));
    const text = checkedItems.length > 0 ? checkedItems.join("\n") : ingredients.join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ title: "Copied!", description: checkedItems.length > 0 ? "Checked items copied to clipboard." : "All items copied to clipboard." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Couldn't copy", variant: "destructive" });
    }
  };

  const handlePrint = () => {
    const checkedItems = ingredients.filter((_, i) => checked.has(i));
    const items = checkedItems.length > 0 ? checkedItems : ingredients;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Shopping List</title>
      <style>
        body { font-family: system-ui, sans-serif; padding: 2rem; }
        h1 { font-size: 1.25rem; margin-bottom: 1rem; }
        ul { list-style: none; padding: 0; }
        li { padding: 0.35rem 0; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 0.5rem; }
        li::before { content: "☐"; }
      </style></head><body>
      <h1>Shopping List</h1>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="mt-8 p-5 bg-secondary border border-border">
      <p className="micro-caption mb-4">Shopping List</p>
      <div className="flex items-center justify-center gap-4 mb-5 py-3 border-y border-border">
        <button
          onClick={() => {
            if (checked.size === ingredients.length) {
              setChecked(new Set());
            } else {
              setChecked(new Set(ingredients.map((_, i) => i)));
            }
          }}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {checked.size === ingredients.length ? "Clear all" : "Select all"}
        </button>
        <span className="text-border">|</span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy checked"}
        </button>
        <span className="text-border">|</span>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
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
