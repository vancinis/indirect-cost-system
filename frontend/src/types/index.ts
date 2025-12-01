// Re-exportar el enum generado por GraphQL Codegen
// Importar directamente desde graphql.ts para evitar problemas de path
import { VolumeRange } from '../lib/gql/graphql';
export { VolumeRange };

// Función helper para obtener los rangos de volumen de forma segura
const getVolumeRanges = (): VolumeRange[] => {
  try {
    return [
      VolumeRange.Range_300Kg,
      VolumeRange.Range_500Kg,
      VolumeRange.Range_1T,
      VolumeRange.Range_3T,
      VolumeRange.Range_5T,
      VolumeRange.Range_10T,
      VolumeRange.Range_20T,
      VolumeRange.Range_30T,
    ];
  } catch {
    return Object.values(VolumeRange) as VolumeRange[];
  }
};

// Array de valores del enum para iterar (ordenado como aparece en el backend)
export const VOLUME_RANGES: VolumeRange[] = getVolumeRanges();

// Mapeo de enum a etiqueta legible para mostrar en UI
// Nota: El enum generado usa PascalCase (Range_300Kg), pero los valores son strings correctos
export const VOLUME_RANGE_LABELS: Record<VolumeRange, string> = {
  [VolumeRange.Range_300Kg]: '300kg',
  [VolumeRange.Range_500Kg]: '500kg',
  [VolumeRange.Range_1T]: '1T',
  [VolumeRange.Range_3T]: '3T',
  [VolumeRange.Range_5T]: '5T',
  [VolumeRange.Range_10T]: '10T',
  [VolumeRange.Range_20T]: '20T',
  [VolumeRange.Range_30T]: '30T',
};

// Función helper para obtener la etiqueta legible
export const getVolumeRangeLabel = (range: VolumeRange): string => {
  return VOLUME_RANGE_LABELS[range] || range;
};

// Costo indirecto por rango de volumen
export interface IndirectCost {
  id: string;
  operationId: string;
  volumeRange: VolumeRange;
  cost: number; // Convertido de string (Decimal del backend) a number
  createdAt?: string;
  updatedAt?: string;
}

// Operación (ej: impresión, laminado, embolsado)
export interface Operation {
  id: string;
  name: string;
  description?: string;
  plantId: string;
  costs: IndirectCost[];
  createdAt?: string;
  updatedAt?: string;
}

// Planta o Sede
export interface Plant {
  id: string;
  name: string;
  code: string;
  description?: string;
  operations: Operation[];
  createdAt?: string;
  updatedAt?: string;
}

// Tipo para costos agrupados por rango de volumen
export type CostsByRange = Record<VolumeRange, number>;

// Input para crear/actualizar operación
export interface OperationInput {
  name: string;
  description?: string;
  costs: CostsByRange;
}

interface GraphQLIndirectCost {
  cost: string | number;
  volumeRange: VolumeRange;
  id?: string;
  operationId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

interface GraphQLOperation {
  id: string;
  name: string;
  description?: string | null;
  plantId: string;
  costs?: Array<GraphQLIndirectCost> | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export const transformIndirectCost = (cost: GraphQLIndirectCost): IndirectCost => {
  return {
    id: cost.id || '',
    operationId: cost.operationId || '',
    volumeRange: cost.volumeRange,
    cost: typeof cost.cost === 'string' ? parseFloat(cost.cost) : cost.cost,
    createdAt: cost.createdAt ? String(cost.createdAt) : undefined,
    updatedAt: cost.updatedAt ? String(cost.updatedAt) : undefined,
  };
};

export const transformOperation = (operation: GraphQLOperation): Operation => {
  return {
    id: operation.id,
    name: operation.name,
    description: operation.description || undefined,
    plantId: operation.plantId,
    costs: (operation.costs || []).map(transformIndirectCost),
    createdAt: operation.createdAt ? String(operation.createdAt) : undefined,
    updatedAt: operation.updatedAt ? String(operation.updatedAt) : undefined,
  };
};
