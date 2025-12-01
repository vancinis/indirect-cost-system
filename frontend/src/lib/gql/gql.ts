/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment IndirectCostFields on IndirectCost {\n  id\n  operationId\n  volumeRange\n  cost\n  createdAt\n  updatedAt\n}\n\nfragment OperationFields on Operation {\n  id\n  name\n  description\n  plantId\n  costs {\n    ...IndirectCostFields\n  }\n  createdAt\n  updatedAt\n}\n\nfragment PlantFields on Plant {\n  id\n  name\n  code\n  description\n  createdAt\n  updatedAt\n}\n\nfragment PlantWithOperations on Plant {\n  ...PlantFields\n  operations {\n    ...OperationFields\n  }\n}\n\nquery GetPlants {\n  plants {\n    ...PlantFields\n  }\n}\n\nquery GetPlant($id: ID!) {\n  plant(id: $id) {\n    ...PlantWithOperations\n  }\n}\n\nquery GetOperationsByPlant($plantId: ID!) {\n  operationsByPlant(plantId: $plantId) {\n    ...OperationFields\n  }\n}\n\nquery GetOperation($id: ID!) {\n  operation(id: $id) {\n    ...OperationFields\n  }\n}\n\nmutation CreatePlant($input: CreatePlantInput!) {\n  createPlant(createPlantInput: $input) {\n    ...PlantFields\n  }\n}\n\nmutation UpdatePlant($input: UpdatePlantInput!) {\n  updatePlant(updatePlantInput: $input) {\n    ...PlantFields\n  }\n}\n\nmutation RemovePlant($id: ID!) {\n  removePlant(id: $id) {\n    id\n  }\n}\n\nmutation CreateOperation($input: CreateOperationInput!) {\n  createOperation(createOperationInput: $input) {\n    ...OperationFields\n  }\n}\n\nmutation UpdateOperation($input: UpdateOperationInput!) {\n  updateOperation(updateOperationInput: $input) {\n    ...OperationFields\n  }\n}\n\nmutation RemoveOperation($id: ID!) {\n  removeOperation(id: $id) {\n    id\n  }\n}": typeof types.IndirectCostFieldsFragmentDoc,
};
const documents: Documents = {
    "fragment IndirectCostFields on IndirectCost {\n  id\n  operationId\n  volumeRange\n  cost\n  createdAt\n  updatedAt\n}\n\nfragment OperationFields on Operation {\n  id\n  name\n  description\n  plantId\n  costs {\n    ...IndirectCostFields\n  }\n  createdAt\n  updatedAt\n}\n\nfragment PlantFields on Plant {\n  id\n  name\n  code\n  description\n  createdAt\n  updatedAt\n}\n\nfragment PlantWithOperations on Plant {\n  ...PlantFields\n  operations {\n    ...OperationFields\n  }\n}\n\nquery GetPlants {\n  plants {\n    ...PlantFields\n  }\n}\n\nquery GetPlant($id: ID!) {\n  plant(id: $id) {\n    ...PlantWithOperations\n  }\n}\n\nquery GetOperationsByPlant($plantId: ID!) {\n  operationsByPlant(plantId: $plantId) {\n    ...OperationFields\n  }\n}\n\nquery GetOperation($id: ID!) {\n  operation(id: $id) {\n    ...OperationFields\n  }\n}\n\nmutation CreatePlant($input: CreatePlantInput!) {\n  createPlant(createPlantInput: $input) {\n    ...PlantFields\n  }\n}\n\nmutation UpdatePlant($input: UpdatePlantInput!) {\n  updatePlant(updatePlantInput: $input) {\n    ...PlantFields\n  }\n}\n\nmutation RemovePlant($id: ID!) {\n  removePlant(id: $id) {\n    id\n  }\n}\n\nmutation CreateOperation($input: CreateOperationInput!) {\n  createOperation(createOperationInput: $input) {\n    ...OperationFields\n  }\n}\n\nmutation UpdateOperation($input: UpdateOperationInput!) {\n  updateOperation(updateOperationInput: $input) {\n    ...OperationFields\n  }\n}\n\nmutation RemoveOperation($id: ID!) {\n  removeOperation(id: $id) {\n    id\n  }\n}": types.IndirectCostFieldsFragmentDoc,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment IndirectCostFields on IndirectCost {\n  id\n  operationId\n  volumeRange\n  cost\n  createdAt\n  updatedAt\n}\n\nfragment OperationFields on Operation {\n  id\n  name\n  description\n  plantId\n  costs {\n    ...IndirectCostFields\n  }\n  createdAt\n  updatedAt\n}\n\nfragment PlantFields on Plant {\n  id\n  name\n  code\n  description\n  createdAt\n  updatedAt\n}\n\nfragment PlantWithOperations on Plant {\n  ...PlantFields\n  operations {\n    ...OperationFields\n  }\n}\n\nquery GetPlants {\n  plants {\n    ...PlantFields\n  }\n}\n\nquery GetPlant($id: ID!) {\n  plant(id: $id) {\n    ...PlantWithOperations\n  }\n}\n\nquery GetOperationsByPlant($plantId: ID!) {\n  operationsByPlant(plantId: $plantId) {\n    ...OperationFields\n  }\n}\n\nquery GetOperation($id: ID!) {\n  operation(id: $id) {\n    ...OperationFields\n  }\n}\n\nmutation CreatePlant($input: CreatePlantInput!) {\n  createPlant(createPlantInput: $input) {\n    ...PlantFields\n  }\n}\n\nmutation UpdatePlant($input: UpdatePlantInput!) {\n  updatePlant(updatePlantInput: $input) {\n    ...PlantFields\n  }\n}\n\nmutation RemovePlant($id: ID!) {\n  removePlant(id: $id) {\n    id\n  }\n}\n\nmutation CreateOperation($input: CreateOperationInput!) {\n  createOperation(createOperationInput: $input) {\n    ...OperationFields\n  }\n}\n\nmutation UpdateOperation($input: UpdateOperationInput!) {\n  updateOperation(updateOperationInput: $input) {\n    ...OperationFields\n  }\n}\n\nmutation RemoveOperation($id: ID!) {\n  removeOperation(id: $id) {\n    id\n  }\n}"): (typeof documents)["fragment IndirectCostFields on IndirectCost {\n  id\n  operationId\n  volumeRange\n  cost\n  createdAt\n  updatedAt\n}\n\nfragment OperationFields on Operation {\n  id\n  name\n  description\n  plantId\n  costs {\n    ...IndirectCostFields\n  }\n  createdAt\n  updatedAt\n}\n\nfragment PlantFields on Plant {\n  id\n  name\n  code\n  description\n  createdAt\n  updatedAt\n}\n\nfragment PlantWithOperations on Plant {\n  ...PlantFields\n  operations {\n    ...OperationFields\n  }\n}\n\nquery GetPlants {\n  plants {\n    ...PlantFields\n  }\n}\n\nquery GetPlant($id: ID!) {\n  plant(id: $id) {\n    ...PlantWithOperations\n  }\n}\n\nquery GetOperationsByPlant($plantId: ID!) {\n  operationsByPlant(plantId: $plantId) {\n    ...OperationFields\n  }\n}\n\nquery GetOperation($id: ID!) {\n  operation(id: $id) {\n    ...OperationFields\n  }\n}\n\nmutation CreatePlant($input: CreatePlantInput!) {\n  createPlant(createPlantInput: $input) {\n    ...PlantFields\n  }\n}\n\nmutation UpdatePlant($input: UpdatePlantInput!) {\n  updatePlant(updatePlantInput: $input) {\n    ...PlantFields\n  }\n}\n\nmutation RemovePlant($id: ID!) {\n  removePlant(id: $id) {\n    id\n  }\n}\n\nmutation CreateOperation($input: CreateOperationInput!) {\n  createOperation(createOperationInput: $input) {\n    ...OperationFields\n  }\n}\n\nmutation UpdateOperation($input: UpdateOperationInput!) {\n  updateOperation(updateOperationInput: $input) {\n    ...OperationFields\n  }\n}\n\nmutation RemoveOperation($id: ID!) {\n  removeOperation(id: $id) {\n    id\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;