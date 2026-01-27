import { MapContainer } from "@/components/MapContainer";
import PlatformSwitcher from "@/components/PlatformSwitcher";
import RegionDetails from "@/components/RegionDetails";
import { useMapSelection } from "@/hooks/useMapSelection";
import { ArrowLeft, BadgeCheck, Compass } from "lucide-react";

export default function MiniProgram() {
  const {
    currentLevel,
    currentDataUrl,
    currentRegionName,
    canGoBack,
    handleRegionClick,
    selectedRegion,
    selectedRegionId,
    regionPOIs,
    goBackAndClear,
    resetAndClear,
    drillDownSelected,
  } = useMapSelection();

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[var(--color-swiss-bg)]">
      <header className="flex items-center justify-between border-b border-[var(--color-swiss-border)] bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          {canGoBack && (
            <button
              onClick={goBackAndClear}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-swiss-border)] bg-white shadow-sm"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Mini Program</p>
            <h1 className="flex items-center gap-2 text-base font-semibold text-[var(--color-swiss-fg)]">
              <Compass className="h-4 w-4" />
              GeoAtlas Explorer
            </h1>
          </div>
        </div>
        <PlatformSwitcher />
      </header>

      <div className="relative flex-1">
        <div className="absolute left-4 top-4 z-10 rounded-xl border border-[var(--color-swiss-border)] bg-white/90 px-3 py-2 text-xs shadow-sm">
          <div className="flex items-center gap-2 text-[var(--color-swiss-fg)]">
            <BadgeCheck className="h-4 w-4 text-emerald-500" />
            <span className="font-medium">{currentRegionName}</span>
          </div>
          <p className="mt-1 text-[11px] uppercase text-muted-foreground">Level: {currentLevel}</p>
        </div>
        <MapContainer
          dataUrl={currentDataUrl}
          level={currentLevel}
          onRegionClick={handleRegionClick}
          selectedRegionId={selectedRegionId}
          pois={regionPOIs}
        />
      </div>

      <div className="border-t border-[var(--color-swiss-border)] bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Region Details</h2>
          <button
            onClick={resetAndClear}
            className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
          >
            Reset View
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {selectedRegion ? (
            <>
              <RegionDetails
                selectedRegion={selectedRegion}
                currentLevel={currentLevel}
                regionPOIs={regionPOIs}
              />
              <button
                onClick={drillDownSelected}
                className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
              >
                Drill Down
              </button>
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-[var(--color-swiss-border)] bg-gray-50 p-4 text-sm text-muted-foreground">
              Choose a region on the map to see key information and drill down.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
