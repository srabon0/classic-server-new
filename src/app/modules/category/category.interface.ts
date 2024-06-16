export type TSubCategory = {
  name: string;
  isDeleted?: boolean;
};

export type TImage = {
  fieldName?: string;
  originalName?: string;
  encoding?: string;
  mimeType?: string;
  imageUrl?: string;
  size?: number;
  destination?: string;
  filename?: string;
  path?: string;
  folder?: string;
};

export type TCategory = {
  name: string;
  description?: string;
  subCategories: TSubCategory[];
  image?: TImage;
  isDeleted?: boolean;
};
