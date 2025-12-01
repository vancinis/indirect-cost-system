import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Input } from "../ui";

interface AddOperationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export const AddOperationModal = ({
  isOpen,
  onClose,
  onAdd,
}: AddOperationModalProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setError("");
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const trimmedName = name.trim();
      if (!trimmedName) {
        setError("El nombre es requerido");
        return;
      }

      if (trimmedName.length < 2) {
        setError("El nombre debe tener al menos 2 caracteres");
        return;
      }

      if (trimmedName.length > 255) {
        setError("El nombre no puede exceder 255 caracteres");
        return;
      }

      onAdd(trimmedName);
      onClose();
    },
    [name, onAdd, onClose]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        role="button"
        tabIndex={0}
        aria-label="Cerrar modal"
      />

      {/* Modal */}
      <div className="relative bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-100">
            Nueva Operación
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5">
            <label
              htmlFor="operation-name"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Nombre de la operación
            </label>
            <Input
              id="operation-name"
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="Ej: Impresión, Laminado, Embolsado..."
              error={!!error}
            />
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
            <p className="mt-3 text-xs text-slate-500">
              Los costos por rango de volumen podrán ser configurados después de
              crear la operación.
            </p>
          </div>

          <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-700 flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Agregar Operación
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
