export const ImageSplit = (image: string | null) => {
  const response = image ? image.split(",") : [];

  return response;
};

export const ImageSplitFirst = (image: string | null | undefined) => {
  const response = image ? image.split(",") : "";

  return response[0];
};
