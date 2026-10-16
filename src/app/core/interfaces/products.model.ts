export const productTypes = [
  'macarons',
  'patisseries',
  'chocolats',
  'gateaux',
] as const;

export interface ProductModel {
  id: string;
  name: string;
  image: string;
  description: string;
  type: (typeof productTypes)[number];
}
