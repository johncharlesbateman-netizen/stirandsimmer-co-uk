import { CUISINE_REGIONS, cuisineRegionLabels, type CuisineRegion } from "@/lib/cuisine-regions";

interface Props {
  value: CuisineRegion[];
  onChange: (next: CuisineRegion[]) => void;
}

const CuisineRegionPicker = ({ value, onChange }: Props) => {
  const toggle = (region: CuisineRegion) => {
    if (value.includes(region)) {
      onChange(value.filter((r) => r !== region));
    } else {
      onChange([...value, region]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {CUISINE_REGIONS.map((region) => {
        const active = value.includes(region);
        return (
          <button
            key={region}
            type="button"
            onClick={() => toggle(region)}
            aria-pressed={active}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              active
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:bg-secondary"
            }`}
          >
            {cuisineRegionLabels[region]}
          </button>
        );
      })}
    </div>
  );
};

export default CuisineRegionPicker;
