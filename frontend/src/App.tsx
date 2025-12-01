import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AddOperationModal,
  CostsTable,
  PlantSelector,
} from "./components/indirect-costs";
import { Button, ToastContainer, useToast } from "./components/ui";
import { useIndirectCosts } from "./hooks";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const {
    plants,
    selectedPlant,
    operations,
    isLoading,
    isSaving,
    hasChanges,
    error,
    selectPlant,
    updateOperationCost,
    addOperation,
    removeOperation,
    saveChanges,
    resetChanges,
  } = useIndirectCosts();

  // Mostrar errores de conexión
  const errorRef = useRef<Error | null>(null);
  useEffect(() => {
    // Solo mostrar el error si es diferente al anterior para evitar duplicados
    if (error && error !== errorRef.current) {
      errorRef.current = error;
      addToast(error.message || "Error de conexión con el servidor", "error");
    }
  }, [error, addToast]);

  const handleSave = useCallback(async () => {
    const success = await saveChanges();
    if (success) {
      addToast("Cambios guardados exitosamente", "success");
    } else {
      addToast("Error al guardar los cambios", "error");
    }
  }, [saveChanges, addToast]);

  const handleAddOperation = useCallback(
    async (name: string) => {
      await addOperation(name);
      addToast(`Operación "${name}" agregada`, "success");
    },
    [addOperation, addToast]
  );

  const handleRemoveOperation = useCallback(
    async (operationId: string) => {
      const operation = operations.find((op) => op.id === operationId);
      await removeOperation(operationId);
      if (operation) {
        addToast(`Operación "${operation.name}" eliminada`, "info");
      }
    },
    [operations, removeOperation, addToast]
  );

  const plantsForSelector = useMemo(
    () =>
      plants.map((p) => ({
    id: p.id,
    name: p.name,
    code: p.code,
    description: p.description ?? undefined,
    operations: [],
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
      })),
    [plants]
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-100">
                  Configuración de Cotización
                </h1>
                <p className="text-xs text-slate-400">
                  Sistema de Costos Indirectos
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">
                Costos Indirectos
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Configure los costos por operación según rangos de volumen
              </p>
            </div>
            <PlantSelector
              plants={plantsForSelector}
              selectedPlantId={selectedPlant?.id ?? null}
              onSelect={selectPlant}
              disabled={isSaving}
            />
          </div>
        </div>

        {error && !selectedPlant && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-red-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-red-400">
                  Error de conexión
                </h3>
                <p className="text-sm text-red-300 mt-1">
                  No se pudo conectar con el servidor. Verifica que el backend
                  esté corriendo en{" "}
                  <code className="bg-red-900/50 px-1 rounded">
                    localhost:4000
                  </code>
                  .
                </p>
              </div>
            </div>
          </div>
        )}

        {!selectedPlant ? (
          <div className="bg-slate-900 border border-slate-700 rounded-lg">
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-300 mb-2">
                {plants.length === 0 && !error
                  ? "Cargando plantas..."
                  : plants.length === 0 && error
                  ? "No hay plantas disponibles"
                  : "Seleccione una planta"}
              </h3>
              <p className="text-sm text-slate-500 max-w-md">
                {plants.length > 0
                  ? "Elija una planta del selector superior para ver y configurar los costos indirectos de sus operaciones."
                  : error
                  ? "Verifica la conexión con el servidor o ejecuta el seed para crear datos iniciales."
                  : "Espere mientras se cargan las plantas disponibles..."}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">
                  Planta seleccionada:
                </span>
                <span className="text-sm font-medium text-blue-400">
                  {selectedPlant.name}
                </span>
                {hasChanges && (
                  <span className="px-2 py-0.5 bg-amber-900/50 text-amber-400 text-xs rounded-full border border-amber-700">
                    Sin guardar
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {hasChanges && (
                  <Button variant="ghost" size="sm" onClick={resetChanges}>
                    Descartar cambios
                  </Button>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                  disabled={isSaving}
                >
                  <svg
                    className="w-4 h-4 mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Agregar Operación
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSave}
                  disabled={!hasChanges}
                  isLoading={isSaving}
                >
                  <svg
                    className="w-4 h-4 mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Guardar Cambios
                </Button>
              </div>
            </div>

            <CostsTable
              operations={operations}
              onCostChange={updateOperationCost}
              onRemoveOperation={handleRemoveOperation}
              isLoading={isLoading}
            />

            <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-slate-200">
                    Rangos de Volumen
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Los costos indirectos se definen por rangos de volumen:
                    300kg, 500kg, 1T, 3T, 5T, 10T, 20T, 30T. A mayor volumen,
                    generalmente el costo unitario es menor.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-xs text-slate-500 text-center">
            Sistema de Configuración de Cotización • Costos Indirectos por
            Planta
          </p>
        </div>
      </footer>

      <AddOperationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddOperation}
      />

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}

export default App;
