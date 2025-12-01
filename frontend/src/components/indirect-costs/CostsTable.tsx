import type { Operation, VolumeRange } from "../../types";
import { VOLUME_RANGES, getVolumeRangeLabel } from "../../types";
import { OperationRow } from "./OperationRow";

interface CostsTableProps {
  operations: Operation[];
  onCostChange: (
    operationId: string,
    volumeRange: VolumeRange,
    cost: number
  ) => void;
  onRemoveOperation: (operationId: string) => void;
  isLoading?: boolean;
}

export const CostsTable = ({
  operations,
  onCostChange,
  onRemoveOperation,
  isLoading = false,
}: CostsTableProps) => {
  if (isLoading) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3 text-slate-400">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Cargando operaciones...</span>
          </div>
        </div>
      </div>
    );
  }

  if (operations.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <svg
            className="h-12 w-12 mb-4 text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-lg font-medium">No hay operaciones configuradas</p>
          <p className="text-sm text-slate-500 mt-1">
            Agrega una nueva operación para comenzar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-slate-800/80 border-b border-slate-700">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider sticky left-0 bg-slate-800/80 z-20 min-w-[180px]">
                Operación
              </th>
              {VOLUME_RANGES.map((range) => (
                <th
                  key={range}
                  className="px-2 py-3 text-center text-xs font-semibold text-slate-300 uppercase tracking-wider min-w-[90px]"
                >
                  {getVolumeRangeLabel(range)}
                </th>
              ))}
              <th className="px-2 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {operations.map((operation) => (
              <OperationRow
                key={operation.id}
                operation={operation}
                onCostChange={onCostChange}
                onRemove={onRemoveOperation}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 bg-slate-800/50 border-t border-slate-700 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {operations.length} operación{operations.length === 1 ? "" : "es"}{" "}
          configurada{operations.length === 1 ? "" : "s"}
        </span>
      </div>
    </div>
  );
};
