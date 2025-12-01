import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client/core';
import { useCallback } from 'react';

// ==========================================
// FRAGMENTS
// ==========================================

export const PLANT_FIELDS = gql`
  fragment PlantFields on Plant {
    id
    name
    code
    description
    createdAt
    updatedAt
  }
`;

// ==========================================
// QUERIES
// ==========================================

export const GET_PLANTS = gql`
  ${PLANT_FIELDS}
  query GetPlants {
    plants {
      ...PlantFields
    }
  }
`;

export const GET_PLANT = gql`
  ${PLANT_FIELDS}
  query GetPlant($id: ID!) {
    plant(id: $id) {
      ...PlantFields
      operations {
        id
        name
        description
        plantId
        costs {
          id
          operationId
          volumeRange
          cost
        }
      }
    }
  }
`;

// ==========================================
// MUTATIONS
// ==========================================

export const CREATE_PLANT = gql`
  ${PLANT_FIELDS}
  mutation CreatePlant($input: CreatePlantInput!) {
    createPlant(createPlantInput: $input) {
      ...PlantFields
    }
  }
`;

export const UPDATE_PLANT = gql`
  ${PLANT_FIELDS}
  mutation UpdatePlant($input: UpdatePlantInput!) {
    updatePlant(updatePlantInput: $input) {
      ...PlantFields
    }
  }
`;

export const REMOVE_PLANT = gql`
  mutation RemovePlant($id: ID!) {
    removePlant(id: $id) {
      id
    }
  }
`;

// ==========================================
// TYPES
// ==========================================

export interface Plant {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

import { transformOperation, type IndirectCost, type Operation } from '../types';

export interface PlantWithOperations extends Plant {
  operations: Operation[];
}

// Re-exportar tipos
export type { IndirectCost, Operation };

export interface CreatePlantInput {
  name: string;
  code: string;
  description?: string;
}

export interface UpdatePlantInput {
  id: string;
  name?: string;
  code?: string;
  description?: string;
}

// ==========================================
// HOOK
// ==========================================

export function usePlants() {
  const { data, loading, error, refetch } = useQuery<{ plants: Plant[] }>(
    GET_PLANTS
  );

  const [createPlantMutation, { loading: isCreating }] = useMutation<
    { createPlant: Plant },
    { input: CreatePlantInput }
  >(CREATE_PLANT, {
    refetchQueries: [{ query: GET_PLANTS }],
  });

  const [updatePlantMutation, { loading: isUpdating }] = useMutation<
    { updatePlant: Plant },
    { input: UpdatePlantInput }
  >(UPDATE_PLANT);

  const [removePlantMutation, { loading: isRemoving }] = useMutation<
    { removePlant: { id: string } },
    { id: string }
  >(REMOVE_PLANT, {
    refetchQueries: [{ query: GET_PLANTS }],
  });

  const createPlant = useCallback(
    async (input: CreatePlantInput) => {
      const result = await createPlantMutation({ variables: { input } });
      return result.data?.createPlant;
    },
    [createPlantMutation]
  );

  const updatePlant = useCallback(
    async (input: UpdatePlantInput) => {
      const result = await updatePlantMutation({ variables: { input } });
      return result.data?.updatePlant;
    },
    [updatePlantMutation]
  );

  const removePlant = useCallback(
    async (id: string) => {
      const result = await removePlantMutation({ variables: { id } });
      return result.data?.removePlant;
    },
    [removePlantMutation]
  );

  return {
    plants: data?.plants ?? [],
    isLoading: loading,
    error,
    refetch,
    // Mutations
    createPlant,
    updatePlant,
    removePlant,
    isCreating,
    isUpdating,
    isRemoving,
    isMutating: isCreating || isUpdating || isRemoving,
  };
}

export function usePlant(id: string | null) {
  const { data, loading, error, refetch } = useQuery<{
    plant: PlantWithOperations;
  }>(GET_PLANT, {
    variables: { id },
    skip: !id,
  });

  // Transformar datos de GraphQL (cost como string) a nuestros tipos (cost como number)
  const plant = data?.plant
    ? {
        ...data.plant,
        operations: (data.plant.operations || []).map(transformOperation),
      }
    : null;

  return {
    plant,
    isLoading: loading,
    error,
    refetch,
  };
}

