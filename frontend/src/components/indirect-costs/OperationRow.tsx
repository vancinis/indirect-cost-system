import { useCallback, useState } from "react";
import type { VolumeRange } from "../../types";
import { VOLUME_RANGES } from "../../types";

interface IndirectCost {
  id: string;
  operationId: string;
  volumeRange: VolumeRange;
  cost: number;
}

interface Operation {
  id: string;
  name: string;
  description?: string | null;
  plantId: string;
  costs: IndirectCost[];
}

interface OperationRowProps {
  operation: Operation;
  onCostChange: (
    operationId: string,
    volumeRange: VolumeRange,
    cost: number
  ) => void;
  onRemove: (operationId: string) => void;
}

export const OperationRow = ({
  operation,
  onCostChange,
  onRemove,
}: OperationRowProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [editingValues, setEditingValues] = useState<
    Record<VolumeRange, string | null>
  >({} as Record<VolumeRange, string | null>);

  // Obtener el costo para un rango específico
  const getCost = useCallback(
    (range: VolumeRange): number => {
      const cost = operation.costs.find(
        (c) =>
          c.volumeRange === range || String(c.volumeRange) === String(range)
      );
      return cost?.cost ?? 0;
    },
    [operation.costs]
  );

  // Obtener el valor a mostrar en el input
  const getDisplayValue = useCallback(
    (range: VolumeRange): string => {
      const editingValue = editingValues[range];
      if (editingValue !== null && editingValue !== undefined) {
        return editingValue;
      }
      const cost = getCost(range);
      return cost === 0 ? "" : cost.toString();
    },
    [editingValues, getCost]
  );

  // Manejar cambio de valor
  const handleCostChange = useCallback(
    (range: VolumeRange, value: string) => {
      setEditingValues((prev) => ({ ...prev, [range]: value }));

      if (value === "" || value === "." || value === "0.") {
        onCostChange(operation.id, range, 0);
        return;
      }

      const numValue = Number.parseFloat(value);
      if (!Number.isNaN(numValue) && numValue >= 0) {
        onCostChange(operation.id, range, numValue);
      }
    },
    [operation.id, onCostChange]
  );

  // Manejar blur para limpiar el estado de edición
  const handleBlur = useCallback((range: VolumeRange) => {
    setEditingValues((prev) => ({ ...prev, [range]: null }));
  }, []);

  const isNewOperation = operation.id.startsWith("temp-");

  return (
    <tr
      className={`border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors group ${
        isNewOperation ? "bg-blue-900/10" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Nombre de la operación */}
      <td className="px-4 py-3 sticky left-0 bg-slate-900 group-hover:bg-slate-800/80 transition-colors z-10">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-200">{operation.name}</span>
          {isNewOperation && (
            <span className="px-1.5 py-0.5 bg-blue-900/50 text-blue-400 text-xs rounded border border-blue-700">
              Nuevo
            </span>
          )}
          {operation.description && (
            <span className="text-xs text-slate-500 hidden lg:inline">
              ({operation.description})
            </span>
          )}
        </div>
      </td>

      {/* Inputs de costos por rango */}
      {VOLUME_RANGES.map((range) => (
        <td key={range} className="px-2 py-2">
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500 text-xs">
              $
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={getDisplayValue(range)}
              onChange={(e) => {
                const value = e.target.value;
                if (
                  value === "" ||
                  value === "." ||
                  /^\d*\.?\d*$/.test(value)
                ) {
                  handleCostChange(range, value);
                }
              }}
              onBlur={() => handleBlur(range)}
              placeholder="0.00"
              className="w-full bg-slate-800 border border-slate-600 text-slate-100 text-sm
                         px-2 pl-5 py-1.5 rounded text-right
                         focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                         hover:border-slate-500 transition-colors
                         placeholder:text-slate-600"
            />
          </div>
        </td>
      ))}

      {/* Botón eliminar */}
      <td className="px-2 py-2 w-12">
        <button
          onClick={() => onRemove(operation.id)}
          className={`p-1.5 rounded text-slate-500 hover:text-red-400 hover:bg-red-900/30
                     transition-all duration-200 ${
                       isHovered ? "opacity-100" : "opacity-0"
                     }`}
          title="Eliminar operación"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};
