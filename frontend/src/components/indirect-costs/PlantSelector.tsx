import { Select } from "../ui";

interface PlantForSelector {
  id: string;
  name: string;
  code: string;
  description?: string | null;
}

interface PlantSelectorProps {
  plants: PlantForSelector[];
  selectedPlantId: string | null;
  onSelect: (plantId: string) => void;
  disabled?: boolean;
}

export const PlantSelector = ({
  plants,
  selectedPlantId,
  onSelect,
  disabled = false,
}: PlantSelectorProps) => {
  const options = plants.map((plant) => ({
    value: plant.id,
    label: `${plant.code} - ${plant.name}`,
  }));

  return (
    <div className="flex items-center gap-4">
      <label className="text-sm font-medium text-slate-300 whitespace-nowrap">
        Planta:
      </label>
      <div className="w-72">
        <Select
          options={options}
          value={selectedPlantId ?? ""}
          onChange={(e) => onSelect(e.target.value)}
          placeholder="Seleccionar planta..."
          disabled={disabled}
        />
      </div>
      {selectedPlantId && (
        <span className="text-xs text-slate-500">
          {plants.find((p) => p.id === selectedPlantId)?.description}
        </span>
      )}
    </div>
  );
};
