export const convertFileToBase64 = (file: any) => {
  try {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (event: any) => {
        resolve(event.target.result);
      };
    });
  } catch (_) {
    return null;
  }
};
