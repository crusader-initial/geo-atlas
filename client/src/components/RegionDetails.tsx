import { Landmark, Mountain, Train } from "lucide-react";
import type { POI } from "@/data/pois";

type RegionDetailsProps = {
  selectedRegion: {
    properties?: {
      name?: string;
      id?: string;
      code?: string;
      adcode?: string;
      childNum?: number;
    };
  };
  currentLevel: string;
  regionPOIs: POI[];
};

const getLevelLabel = (currentLevel: string) => {
  if (currentLevel === "country") return "Province";
  if (currentLevel === "province") return "City";
  return "District";
};

export default function RegionDetails({
  selectedRegion,
  currentLevel,
  regionPOIs,
}: RegionDetailsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl font-bold text-[var(--color-swiss-fg)]">
          {selectedRegion.properties?.name || "Unknown Region"}
        </h3>
        <div className="grid grid-cols-2 gap-4 pt-3 text-sm">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Code</span>
            <span className="font-mono text-base text-[var(--color-swiss-fg)]">
              {selectedRegion.properties?.id || selectedRegion.properties?.code || "N/A"}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Level</span>
            <span className="text-base text-[var(--color-swiss-fg)]">{getLevelLabel(currentLevel)}</span>
          </div>
          {selectedRegion.properties?.childNum && (
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Subdivisions</span>
              <span className="text-base text-[var(--color-swiss-fg)]">
                {selectedRegion.properties.childNum}
              </span>
            </div>
          )}
        </div>
      </div>

      {regionPOIs.length > 0 && (
        <div className="border-t border-[var(--color-swiss-border)] pt-3">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
            Key Locations
          </h4>
          <ul className="space-y-2 text-sm">
            {regionPOIs.map((poi, index) => (
              <li key={`${poi.name}-${index}`} className="flex items-start gap-2">
                <span className="mt-0.5 text-muted-foreground">
                  {poi.type === "transport" && <Train className="h-4 w-4" />}
                  {poi.type === "landmark" && <Landmark className="h-4 w-4" />}
                  {poi.type === "nature" && <Mountain className="h-4 w-4" />}
                </span>
                <span className="text-[var(--color-swiss-fg)]">{poi.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
