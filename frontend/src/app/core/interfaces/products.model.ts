export const productTypes = [
  'macarons',
  'patisseries',
  'chocolats',
  'gateaux',
] as const;

export interface ProductModel {
  id: number;
  name: string;
  image: string;
  description: string;
  type: (typeof productTypes)[number];
}

