/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CostInput = {
  cost: Scalars['Float']['input'];
  volumeRange: VolumeRange;
};

export type CreateOperationInput = {
  costs?: InputMaybe<Array<CostInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  plantId: Scalars['ID']['input'];
};

export type CreatePlantInput = {
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type IndirectCost = {
  __typename?: 'IndirectCost';
  cost: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  operationId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  volumeRange: VolumeRange;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOperation: Operation;
  createPlant: Plant;
  removeOperation: Operation;
  removePlant: Plant;
  updateOperation: Operation;
  updatePlant: Plant;
};


export type MutationCreateOperationArgs = {
  createOperationInput: CreateOperationInput;
};


export type MutationCreatePlantArgs = {
  createPlantInput: CreatePlantInput;
};


export type MutationRemoveOperationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemovePlantArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateOperationArgs = {
  updateOperationInput: UpdateOperationInput;
};


export type MutationUpdatePlantArgs = {
  updatePlantInput: UpdatePlantInput;
};

export type Operation = {
  __typename?: 'Operation';
  costs?: Maybe<Array<IndirectCost>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  plantId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Plant = {
  __typename?: 'Plant';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  operations?: Maybe<Array<Operation>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  operation: Operation;
  operations: Array<Operation>;
  operationsByPlant: Array<Operation>;
  plant: Plant;
  plants: Array<Plant>;
};


export type QueryOperationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOperationsByPlantArgs = {
  plantId: Scalars['ID']['input'];
};


export type QueryPlantArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateOperationInput = {
  costs?: InputMaybe<Array<CostInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePlantInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Rangos de volumen para costos indirectos */
export enum VolumeRange {
  Range_1T = 'RANGE_1T',
  Range_3T = 'RANGE_3T',
  Range_5T = 'RANGE_5T',
  Range_10T = 'RANGE_10T',
  Range_20T = 'RANGE_20T',
  Range_30T = 'RANGE_30T',
  Range_300Kg = 'RANGE_300KG',
  Range_500Kg = 'RANGE_500KG'
}

export type IndirectCostFieldsFragment = { __typename?: 'IndirectCost', id: string, operationId: string, volumeRange: VolumeRange, cost: string, createdAt: any, updatedAt: any };

export type OperationFieldsFragment = { __typename?: 'Operation', id: string, name: string, description?: string | null, plantId: string, createdAt: any, updatedAt: any, costs?: Array<{ __typename?: 'IndirectCost', id: string, operationId: string, volumeRange: VolumeRange, cost: string, createdAt: any, updatedAt: any }> | null };

export type PlantFieldsFragment = { __typename?: 'Plant', id: string, name: string, code: string, description?: string | null, createdAt: any, updatedAt: any };

export type PlantWithOperationsFragment = { __typename?: 'Plant', id: string, name: string, code: string, description?: string | null, createdAt: any, updatedAt: any, operations?: Array<{ __typename?: 'Operation', id: string, name: string, description?: string | null, plantId: string, createdAt: any, updatedAt: any, costs?: Array<{ __typename?: 'IndirectCost', id: string, operationId: string, volumeRange: VolumeRange, cost: string, createdAt: any, updatedAt: any }> | null }> | null };

export type GetPlantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlantsQuery = { __typename?: 'Query', plants: Array<{ __typename?: 'Plant', id: string, name: string, code: string, description?: string | null, createdAt: any, updatedAt: any }> };

export type GetPlantQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPlantQuery = { __typename?: 'Query', plant: { __typename?: 'Plant', id: string, name: string, code: string, description?: string | null, createdAt: any, updatedAt: any, operations?: Array<{ __typename?: 'Operation', id: string, name: string, description?: string | null, plantId: string, createdAt: any, updatedAt: any, costs?: Array<{ __typename?: 'IndirectCost', id: string, operationId: string, volumeRange: VolumeRange, cost: string, createdAt: any, updatedAt: any }> | null }> | null } };

export type GetOperationsByPlantQueryVariables = Exact<{
  plantId: Scalars['ID']['input'];
}>;


export type GetOperationsByPlantQuery = { __typename?: 'Query', operationsByPlant: Array<{ __typename?: 'Operation', id: string, name: string, description?: string | null, plantId: string, createdAt: any, updatedAt: any, costs?: Array<{ __typename?: 'IndirectCost', id: string, operationId: string, volumeRange: VolumeRange, cost: string, createdAt: any, updatedAt: any }> | null }> };

export type GetOperationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetOperationQuery = { __typename?: 'Query', operation: { __typename?: 'Operation', id: string, name: string, description?: string | null, plantId: string, createdAt: any, updatedAt: any, costs?: Array<{ __typename?: 'IndirectCost', id: string, operationId: string, volumeRange: VolumeRange, cost: string, createdAt: any, updatedAt: any }> | null } };

export type CreatePlantMutationVariables = Exact<{
  input: CreatePlantInput;
}>;


export type CreatePlantMutation = { __typename?: 'Mutation', createPlant: { __typename?: 'Plant', id: string, name: string, code: string, description?: string | null, createdAt: any, updatedAt: any } };

export type UpdatePlantMutationVariables = Exact<{
  input: UpdatePlantInput;
}>;


export type UpdatePlantMutation = { __typename?: 'Mutation', updatePlant: { __typename?: 'Plant', id: string, name: string, code: string, description?: string | null, createdAt: any, updatedAt: any } };

export type RemovePlantMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemovePlantMutation = { __typename?: 'Mutation', removePlant: { __typename?: 'Plant', id: string } };

export type CreateOperationMutationVariables = Exact<{
  input: CreateOperationInput;
}>;


export type CreateOperationMutation = { __typename?: 'Mutation', createOperation: { __typename?: 'Operation', id: string, name: string, description?: string | null, plantId: string, createdAt: any, updatedAt: any, costs?: Array<{ __typename?: 'IndirectCost', id: string, operationId: string, volumeRange: VolumeRange, cost: string, createdAt: any, updatedAt: any }> | null } };

export type UpdateOperationMutationVariables = Exact<{
  input: UpdateOperationInput;
}>;


export type UpdateOperationMutation = { __typename?: 'Mutation', updateOperation: { __typename?: 'Operation', id: string, name: string, description?: string | null, plantId: string, createdAt: any, updatedAt: any, costs?: Array<{ __typename?: 'IndirectCost', id: string, operationId: string, volumeRange: VolumeRange, cost: string, createdAt: any, updatedAt: any }> | null } };

export type RemoveOperationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveOperationMutation = { __typename?: 'Mutation', removeOperation: { __typename?: 'Operation', id: string } };

export const PlantFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlantFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<PlantFieldsFragment, unknown>;
export const IndirectCostFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IndirectCostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IndirectCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"operationId"}},{"kind":"Field","name":{"kind":"Name","value":"volumeRange"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<IndirectCostFieldsFragment, unknown>;
export const OperationFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OperationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Operation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"plantId"}},{"kind":"Field","name":{"kind":"Name","value":"costs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IndirectCostFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IndirectCostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IndirectCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"operationId"}},{"kind":"Field","name":{"kind":"Name","value":"volumeRange"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<OperationFieldsFragment, unknown>;
export const PlantWithOperationsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlantWithOperations"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlantFields"}},{"kind":"Field","name":{"kind":"Name","value":"operations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OperationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IndirectCostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IndirectCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"operationId"}},{"kind":"Field","name":{"kind":"Name","value":"volumeRange"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlantFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OperationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Operation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"plantId"}},{"kind":"Field","name":{"kind":"Name","value":"costs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IndirectCostFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<PlantWithOperationsFragment, unknown>;
export const GetPlantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlantFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlantFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetPlantsQuery, GetPlantsQueryVariables>;
export const GetPlantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlantWithOperations"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlantFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IndirectCostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IndirectCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"operationId"}},{"kind":"Field","name":{"kind":"Name","value":"volumeRange"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OperationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Operation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"plantId"}},{"kind":"Field","name":{"kind":"Name","value":"costs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IndirectCostFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlantWithOperations"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlantFields"}},{"kind":"Field","name":{"kind":"Name","value":"operations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OperationFields"}}]}}]}}]} as unknown as DocumentNode<GetPlantQuery, GetPlantQueryVariables>;
export const GetOperationsByPlantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOperationsByPlant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"plantId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"operationsByPlant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"plantId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"plantId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OperationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IndirectCostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IndirectCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"operationId"}},{"kind":"Field","name":{"kind":"Name","value":"volumeRange"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OperationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Operation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"plantId"}},{"kind":"Field","name":{"kind":"Name","value":"costs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IndirectCostFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetOperationsByPlantQuery, GetOperationsByPlantQueryVariables>;
export const GetOperationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOperation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"operation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OperationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IndirectCostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IndirectCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"operationId"}},{"kind":"Field","name":{"kind":"Name","value":"volumeRange"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OperationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Operation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"plantId"}},{"kind":"Field","name":{"kind":"Name","value":"costs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IndirectCostFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetOperationQuery, GetOperationQueryVariables>;
export const CreatePlantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePlant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePlantInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPlantInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlantFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlantFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreatePlantMutation, CreatePlantMutationVariables>;
export const UpdatePlantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePlant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePlantInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePlantInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlantFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlantFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UpdatePlantMutation, UpdatePlantMutationVariables>;
export const RemovePlantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemovePlant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePlant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemovePlantMutation, RemovePlantMutationVariables>;
export const CreateOperationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOperation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOperationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOperation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOperationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OperationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IndirectCostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IndirectCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"operationId"}},{"kind":"Field","name":{"kind":"Name","value":"volumeRange"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OperationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Operation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"plantId"}},{"kind":"Field","name":{"kind":"Name","value":"costs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IndirectCostFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreateOperationMutation, CreateOperationMutationVariables>;
export const UpdateOperationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOperation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOperationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOperation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateOperationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OperationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IndirectCostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IndirectCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"operationId"}},{"kind":"Field","name":{"kind":"Name","value":"volumeRange"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OperationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Operation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"plantId"}},{"kind":"Field","name":{"kind":"Name","value":"costs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IndirectCostFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UpdateOperationMutation, UpdateOperationMutationVariables>;
export const RemoveOperationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveOperation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeOperation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveOperationMutation, RemoveOperationMutationVariables>;