export const isAvatarTypeValid = (file: File): boolean => {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    return false;
  }
  return true;
};

export const isAvatarSizeValid = (file: File): boolean => {
  if (file.size > 5 * 1024 * 1024) {
    return false;
  }
  return true;
};

export const isPassvordLengthValid = (
  first: string,
  second?: string
): boolean => {
  if (!second) return first.length > 5;
  return first.length === second.length && first.length > 5;
};

export const isPasswordMarch = (first: string, second: string): boolean => {
  return first === second;
};

export const isNameValid = (name: string): boolean => {
  return name.length > 2;
};

export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
