import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { VOLUME_RANGES, type CostsByRange, type VolumeRange } from "../types";
import {
  useOperationsByPlant,
  type CostInput,
  type Operation,
} from "./useOperations";
import { usePlants, type Plant } from "./usePlants";

interface UseIndirectCostsReturn {
  // Data
  plants: Plant[];
  selectedPlant: Plant | null;
  operations: Operation[];
  isLoading: boolean;
  isSaving: boolean;
  hasChanges: boolean;
  error: Error | null;

  // Actions
  selectPlant: (plantId: string) => void;
  updateOperationCost: (
    operationId: string,
    volumeRange: VolumeRange,
    cost: number
  ) => void;
  addOperation: (name: string) => Promise<void>;
  removeOperation: (operationId: string) => Promise<void>;
  saveChanges: () => Promise<boolean>;
  resetChanges: () => void;
}

// Helper para obtener costos como objeto
const getCostsByRange = (operation: Operation): CostsByRange => {
  const costs: CostsByRange = {} as CostsByRange;
  VOLUME_RANGES.forEach((range) => {
    const costEntry = operation.costs.find((c) => c.volumeRange === range);
    costs[range] = costEntry?.cost ?? 0;
  });
  return costs;
};

// Helper para convertir costos locales a input de API
const costsToInput = (operation: Operation): CostInput[] => {
  return VOLUME_RANGES.map((range) => {
    const costEntry = operation.costs.find((c) => c.volumeRange === range);
    return {
      volumeRange: range,
      cost: costEntry?.cost ?? 0,
    };
  });
};

export const useIndirectCosts = (): UseIndirectCostsReturn => {
  // Hooks de API
  const {
    plants,
    isLoading: isPlantsLoading,
    error: plantsError,
  } = usePlants();

  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  const {
    operations: serverOperations,
    isLoading: isOperationsLoading,
    error: operationsError,
    createOperation,
    updateOperation,
    removeOperation: removeOperationMutation,
    isMutating,
    refetch: refetchOperations,
  } = useOperationsByPlant(selectedPlantId);

  // Estado local para ediciones
  const [localOperations, setLocalOperations] = useState<Operation[]>([]);
  const [originalOperations, setOriginalOperations] = useState<Operation[]>([]);
  const [pendingNewOperations, setPendingNewOperations] = useState<Operation[]>(
    []
  );
  const [pendingRemovals, setPendingRemovals] = useState<Set<string>>(
    new Set()
  );
  const [isSaving, setIsSaving] = useState(false);

  // Usar ref para trackear cambios y evitar loops infinitos
  const lastSelectedPlantIdRef = useRef<string | null>(null);
  const lastOperationsIdsRef = useRef<string>("");
  const lastOperationsLengthRef = useRef<number>(0);

  // Helper para clonar operaciones
  const cloneOperations = useCallback((ops: Operation[]): Operation[] => {
    if (typeof structuredClone !== "undefined") {
      return structuredClone(ops);
    }
    return JSON.parse(JSON.stringify(ops)) as Operation[];
  }, []);

  // Sincronizar operaciones del servidor con estado local
  useEffect(() => {
    // Crear una key simple basada en IDs para comparar
    const operationsIds = serverOperations.map((op) => op.id).join(",");
    const plantChanged = lastSelectedPlantIdRef.current !== selectedPlantId;
    const operationsChanged = lastOperationsIdsRef.current !== operationsIds;

    // Solo actualizar si realmente cambió algo
    if (!plantChanged && !operationsChanged) {
      return;
    }

    // Solo actualizar si hay operaciones o si cambió la planta
    const shouldUpdate =
      serverOperations.length > 0 || (selectedPlantId && plantChanged);

    if (shouldUpdate) {
      const cloned = cloneOperations(serverOperations);
      setLocalOperations(cloned);
      setOriginalOperations(cloneOperations(cloned));

      // Limpiar pendientes si cambió la planta O si las operaciones del servidor aumentaron
      // (esto indica que se guardaron operaciones nuevas)
      const serverOpsIncreased =
        serverOperations.length > lastOperationsLengthRef.current;
      if (plantChanged || (operationsChanged && serverOpsIncreased)) {
        setPendingNewOperations([]);
        setPendingRemovals(new Set());
      }
    }

    // Actualizar refs
    lastSelectedPlantIdRef.current = selectedPlantId;
    lastOperationsIdsRef.current = operationsIds;
    lastOperationsLengthRef.current = serverOperations.length;
  }, [serverOperations, selectedPlantId, cloneOperations]);

  const selectedPlant = useMemo(
    () => plants.find((p: Plant) => p.id === selectedPlantId) ?? null,
    [plants, selectedPlantId]
  );

  // Combinar operaciones locales con pendientes, excluyendo eliminadas
  const allOperations = useMemo(() => {
    const existing = localOperations.filter(
      (op) => !pendingRemovals.has(op.id)
    );
    return [...existing, ...pendingNewOperations];
  }, [localOperations, pendingNewOperations, pendingRemovals]);

  // Detectar cambios
  const hasChanges = useMemo(() => {
    if (pendingNewOperations.length > 0) return true;
    if (pendingRemovals.size > 0) return true;

    const compareOperations = localOperations.filter(
      (op) => !pendingRemovals.has(op.id)
    );

    if (compareOperations.length !== originalOperations.length) return true;

    return compareOperations.some((op) => {
      const original = originalOperations.find((o) => o.id === op.id);
      if (!original) return true;
      if (op.name !== original.name) return true;

      const localCosts = getCostsByRange(op);
      const originalCosts = getCostsByRange(original);

      return VOLUME_RANGES.some(
        (range) => localCosts[range] !== originalCosts[range]
      );
    });
  }, [
    localOperations,
    originalOperations,
    pendingNewOperations,
    pendingRemovals,
  ]);

  const selectPlant = useCallback((plantId: string) => {
    setSelectedPlantId(plantId);
    // Reset local state
    setLocalOperations([]);
    setOriginalOperations([]);
    setPendingNewOperations([]);
    setPendingRemovals(new Set());
  }, []);

  const updateOperationCost = useCallback(
    (operationId: string, volumeRange: VolumeRange, cost: number) => {
      // Check if it's a pending new operation
      const isPending = pendingNewOperations.some(
        (op) => op.id === operationId
      );

      if (isPending) {
        setPendingNewOperations((prev) =>
          prev.map((op) => {
            if (op.id !== operationId) return op;
            const existingCostIndex = op.costs.findIndex(
              (c) => c.volumeRange === volumeRange
            );
            if (existingCostIndex >= 0) {
              const newCosts = [...op.costs];
              newCosts[existingCostIndex] = {
                ...newCosts[existingCostIndex],
                cost,
              };
              return { ...op, costs: newCosts };
            }
            return op;
          })
        );
      } else {
        setLocalOperations((prev) =>
          prev.map((op) => {
            if (op.id !== operationId) return op;

            const existingCostIndex = op.costs.findIndex(
              (c) => c.volumeRange === volumeRange
            );

            if (existingCostIndex >= 0) {
              const newCosts = [...op.costs];
              newCosts[existingCostIndex] = {
                ...newCosts[existingCostIndex],
                cost,
              };
              return { ...op, costs: newCosts };
            } else {
              return {
                ...op,
                costs: [
                  ...op.costs,
                  {
                    id: `temp-${Date.now()}`,
                    operationId,
                    volumeRange,
                    cost,
                  },
                ],
              };
            }
          })
        );
      }
    },
    [pendingNewOperations]
  );

  const addOperation = useCallback(
    async (name: string) => {
      if (!selectedPlantId) return;

      const tempId = `temp-${Date.now()}`;

      if (!VOLUME_RANGES || VOLUME_RANGES.length === 0) {
        return;
      }

      const costs = VOLUME_RANGES.map((range, index) => ({
        id: `temp-cost-${tempId}-${index}-${String(range)}`,
        operationId: tempId,
        volumeRange: range,
        cost: 0,
      }));

      const newOperation: Operation = {
        id: tempId,
        name,
        plantId: selectedPlantId,
        costs,
      };

      setPendingNewOperations((prev) => [...prev, newOperation]);
    },
    [selectedPlantId]
  );

  const handleRemoveOperation = useCallback(
    async (operationId: string) => {
      // Check if it's a pending new operation (not yet saved)
      const isPending = pendingNewOperations.some(
        (op) => op.id === operationId
      );

      if (isPending) {
        setPendingNewOperations((prev) =>
          prev.filter((op) => op.id !== operationId)
        );
      } else {
        // Mark for deletion
        setPendingRemovals((prev) => new Set(prev).add(operationId));
      }
    },
    [pendingNewOperations]
  );

  const saveChanges = useCallback(async (): Promise<boolean> => {
    if (!selectedPlantId) return false;

    setIsSaving(true);

    try {
      // 1. Create new operations
      for (const newOp of pendingNewOperations) {
        await createOperation({
          name: newOp.name,
          plantId: selectedPlantId,
          costs: costsToInput(newOp),
        });
      }

      // 2. Update existing operations with changes
      for (const op of localOperations) {
        if (pendingRemovals.has(op.id)) continue;

        const original = originalOperations.find((o) => o.id === op.id);
        if (!original) continue;

        // Check if there are changes
        const localCosts = getCostsByRange(op);
        const originalCosts = getCostsByRange(original);
        const hasChanges = VOLUME_RANGES.some(
          (range) => localCosts[range] !== originalCosts[range]
        );

        if (hasChanges || op.name !== original.name) {
          await updateOperation({
            id: op.id,
            name: op.name,
            costs: costsToInput(op),
          });
        }
      }

      // 3. Remove operations marked for deletion
      for (const id of pendingRemovals) {
        await removeOperationMutation(id);
      }

      // 4. Limpiar operaciones pendientes ANTES del refetch para evitar duplicados
      setPendingNewOperations([]);
      setPendingRemovals(new Set());

      // 5. Refetch to get fresh data
      await refetchOperations();

      setIsSaving(false);
      return true;
    } catch (error) {
      setIsSaving(false);
      return false;
    }
  }, [
    selectedPlantId,
    pendingNewOperations,
    localOperations,
    originalOperations,
    pendingRemovals,
    createOperation,
    updateOperation,
    removeOperationMutation,
    refetchOperations,
  ]);

  const resetChanges = useCallback(() => {
    setLocalOperations(JSON.parse(JSON.stringify(originalOperations)));
    setPendingNewOperations([]);
    setPendingRemovals(new Set());
  }, [originalOperations]);

  const isLoading = isPlantsLoading || isOperationsLoading;
  const error = plantsError || operationsError || null;

  return {
    plants,
    selectedPlant,
    operations: allOperations,
    isLoading,
    isSaving: isSaving || isMutating,
    hasChanges,
    error,
    selectPlant,
    updateOperationCost,
    addOperation,
    removeOperation: handleRemoveOperation,
    saveChanges,
    resetChanges,
  };
};
