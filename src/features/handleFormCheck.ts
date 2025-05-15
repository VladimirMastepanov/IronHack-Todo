export const isAvatarTypeValid = (file: File): boolean => {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    return false;
  }
  return true;
};

export const isAvatarSizeValid = (file: File): boolean => {
  if (file.size > 5 * 1024 *1024) {
    return false;
  }
  return true;
}