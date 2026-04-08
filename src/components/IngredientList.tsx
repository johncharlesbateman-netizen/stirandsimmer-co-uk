import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { isSectionHeader } from "@/lib/ingredient-utils";

interface Section {
  header: string | null;
  headerIndex: number | null;
  items: { text: string; originalIndex: number }[];
}

const IngredientList = ({ ingredients, checkedIngredients, onToggle }: IngredientListProps) => {
  const sections = useMemo(() => {
    const result: Section[] = [];
    let current: Section = { header: null, headerIndex: null, items: [] };

    ingredients.forEach((item, i) => {
      if (isSectionHeader(item)) {
        // Push previous section if it has items
        if (current.items.length > 0 || current.header) {
          result.push(current);
        }
        current = { header: item, headerIndex: i, items: [] };
      } else {
        current.items.push({ text: item, originalIndex: i });
      }
    });

    // Push last section
    if (current.items.length > 0 || current.header) {
      result.push(current);
    }

    return result;
  }, [ingredients]);

  // All sections expanded by default
  const [collapsed, setCollapsed] = useState<Set<number>>(new Set());

  const toggleSection = (sectionIndex: number) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(sectionIndex)) next.delete(sectionIndex);
      else next.add(sectionIndex);
      return next;
    });
  };

  return (
    <div className="space-y-1">
      {sections.map((section, sIdx) => {
        const isExpanded = !collapsed.has(sIdx);

        return (
          <div key={sIdx}>
            {section.header && (
              <button
                onClick={() => toggleSection(sIdx)}
                className="flex items-center justify-between w-full py-2 mt-3 first:mt-0 cursor-pointer group"
              >
                <span className="text-sm font-semibold text-foreground">
                  {section.header.replace(/:$/, "")}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform duration-200",
                    !isExpanded && "-rotate-90"
                  )}
                />
              </button>
            )}

            {isExpanded && (
              <ul className="space-y-3 py-1">
                {section.items.map(({ text, originalIndex }) => (
                  <li key={originalIndex} className="flex items-start gap-3">
                    <Checkbox
                      id={`ingredient-${originalIndex}`}
                      checked={checkedIngredients.has(originalIndex)}
                      onCheckedChange={() => onToggle(originalIndex)}
                      className="mt-0.5"
                    />
                    <label
                      htmlFor={`ingredient-${originalIndex}`}
                      className={cn(
                        "text-sm cursor-pointer transition-colors",
                        checkedIngredients.has(originalIndex)
                          ? "line-through text-muted-foreground/40"
                          : "text-muted-foreground"
                      )}
                    >
                      {text}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IngredientList;
