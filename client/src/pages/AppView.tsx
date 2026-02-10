import { MapContainer } from "@/components/MapContainer";
import PlatformSwitcher from "@/components/PlatformSwitcher";
import RegionDetails from "@/components/RegionDetails";
import { useMapSelection } from "@/hooks/useMapSelection";
import { ArrowLeft, Map as MapIcon, Smartphone } from "lucide-react";

export default function AppView() {
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
      <header className="flex items-center justify-between gap-3 border-b border-[var(--color-swiss-border)] bg-white/90 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {canGoBack ? (
            <button
              onClick={goBackAndClear}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-swiss-border)] bg-white shadow-sm"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-swiss-border)] bg-white/70">
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">App Mode</p>
            <h1 className="flex items-center gap-2 text-lg font-bold text-[var(--color-swiss-fg)]">
              <MapIcon className="h-4 w-4" />
              GeoAtlas
            </h1>
          </div>
        </div>
        <PlatformSwitcher />
      </header>

      <div className="relative flex-1">
        <div className="absolute left-4 top-4 z-10">
          <div className="rounded-full border border-[var(--color-swiss-border)] bg-white/90 px-3 py-1 text-xs font-medium shadow-sm">
            {currentRegionName}{" "}
            <span className="text-muted-foreground uppercase">({currentLevel})</span>
          </div>
        </div>
        <MapContainer
          dataUrl={currentDataUrl}
          level={currentLevel}
          onRegionClick={handleRegionClick}
          selectedRegionId={selectedRegionId}
          pois={regionPOIs}
        />
      </div>

      <div className="max-h-[45vh] space-y-4 overflow-y-auto border-t border-[var(--color-swiss-border)] bg-white p-4 shadow-inner">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Selection</h2>
            <button
              onClick={resetAndClear}
              className="rounded-full border border-[var(--color-swiss-border)] px-3 py-1 text-xs font-medium text-muted-foreground hover:text-[var(--color-swiss-fg)]"
            >
              Reset
            </button>
          </div>
          {selectedRegion ? (
            <div className="space-y-4">
              <RegionDetails
                selectedRegion={selectedRegion}
                currentLevel={currentLevel}
                regionPOIs={regionPOIs}
              />
              <button
                onClick={drillDownSelected}
                className="w-full rounded-lg bg-[var(--color-swiss-fg)] py-3 text-sm font-medium text-white"
              >
                Explore Region
              </button>
            </div>
          ) : (
            <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-[var(--color-swiss-border)] bg-gray-50 text-sm text-muted-foreground">
              Tap a region on the map to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
