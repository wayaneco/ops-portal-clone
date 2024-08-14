export const getMimeType = (base64: string) => {
  return base64.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)![0];
};
