export const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength - 3) + '...';
  }

  return text;
};

export const appendFormData = (
  formData: FormData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  parentKey: string = '',
) => {
  if (data && typeof data === 'object' && !(data instanceof File)) {
    Object.entries(data).forEach(([key, value]) => {
      appendFormData(formData, value, parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    formData.append(parentKey, data);
  }
};
