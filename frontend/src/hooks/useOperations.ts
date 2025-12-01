import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client/core';
import { useCallback } from 'react';

// ==========================================
// FRAGMENTS
// ==========================================

export const INDIRECT_COST_FIELDS = gql`
  fragment IndirectCostFields on IndirectCost {
    id
    operationId
    volumeRange
    cost
    createdAt
    updatedAt
  }
`;

export const OPERATION_FIELDS = gql`
  ${INDIRECT_COST_FIELDS}
  fragment OperationFields on Operation {
    id
    name
    description
    plantId
    costs {
      ...IndirectCostFields
    }
    createdAt
    updatedAt
  }
`;

// ==========================================
// QUERIES
// ==========================================

export const GET_OPERATIONS_BY_PLANT = gql`
  ${OPERATION_FIELDS}
  query GetOperationsByPlant($plantId: ID!) {
    operationsByPlant(plantId: $plantId) {
      ...OperationFields
    }
  }
`;

export const GET_OPERATION = gql`
  ${OPERATION_FIELDS}
  query GetOperation($id: ID!) {
    operation(id: $id) {
      ...OperationFields
    }
  }
`;

// ==========================================
// MUTATIONS
// ==========================================

export const CREATE_OPERATION = gql`
  ${OPERATION_FIELDS}
  mutation CreateOperation($input: CreateOperationInput!) {
    createOperation(createOperationInput: $input) {
      ...OperationFields
    }
  }
`;

export const UPDATE_OPERATION = gql`
  ${OPERATION_FIELDS}
  mutation UpdateOperation($input: UpdateOperationInput!) {
    updateOperation(updateOperationInput: $input) {
      ...OperationFields
    }
  }
`;

export const REMOVE_OPERATION = gql`
  mutation RemoveOperation($id: ID!) {
    removeOperation(id: $id) {
      id
    }
  }
`;

// ==========================================
// TYPES
// ==========================================

import { VolumeRange, transformOperation, type IndirectCost, type Operation } from '../types';

// Re-exportar tipos desde types/index.ts
export type { Operation, IndirectCost };

export interface CostInput {
  volumeRange: VolumeRange;
  cost: number;
}

export interface CreateOperationInput {
  name: string;
  description?: string;
  plantId: string;
  costs?: CostInput[];
}

export interface UpdateOperationInput {
  id: string;
  name?: string;
  description?: string;
  costs?: CostInput[];
}

// ==========================================
// HOOK
// ==========================================

export function useOperationsByPlant(plantId: string | null) {
  const { data, loading, error, refetch } = useQuery<{
    operationsByPlant: Operation[];
  }>(GET_OPERATIONS_BY_PLANT, {
    variables: { plantId },
    skip: !plantId,
    fetchPolicy: 'cache-and-network',
  });

  const [createOperationMutation, { loading: isCreating }] = useMutation<
    { createOperation: Operation },
    { input: CreateOperationInput }
  >(CREATE_OPERATION, {
    refetchQueries: plantId
      ? [{ query: GET_OPERATIONS_BY_PLANT, variables: { plantId } }]
      : [],
  });

  const [updateOperationMutation, { loading: isUpdating }] = useMutation<
    { updateOperation: Operation },
    { input: UpdateOperationInput }
  >(UPDATE_OPERATION);

  const [removeOperationMutation, { loading: isRemoving }] = useMutation<
    { removeOperation: { id: string } },
    { id: string }
  >(REMOVE_OPERATION, {
    refetchQueries: plantId
      ? [{ query: GET_OPERATIONS_BY_PLANT, variables: { plantId } }]
      : [],
  });

  const createOperation = useCallback(
    async (input: CreateOperationInput) => {
      const result = await createOperationMutation({ variables: { input } });
      return result.data?.createOperation;
    },
    [createOperationMutation]
  );

  const updateOperation = useCallback(
    async (input: UpdateOperationInput) => {
      const result = await updateOperationMutation({ variables: { input } });
      return result.data?.updateOperation;
    },
    [updateOperationMutation]
  );

  const removeOperation = useCallback(
    async (id: string) => {
      const result = await removeOperationMutation({ variables: { id } });
      return result.data?.removeOperation;
    },
    [removeOperationMutation]
  );

  // Transformar datos de GraphQL (cost como string) a nuestros tipos (cost como number)
  const operations = (data?.operationsByPlant ?? []).map(transformOperation);

  return {
    operations,
    isLoading: loading,
    error,
    refetch,
    // Mutations
    createOperation,
    updateOperation,
    removeOperation,
    isCreating,
    isUpdating,
    isRemoving,
    isMutating: isCreating || isUpdating || isRemoving,
  };
}

