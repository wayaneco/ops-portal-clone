export const convertBase64toFile = (url: string = "", fileName: string) => {
  try {
    if (url) {
      const arr: any = url.split(",");
      const mime = arr?.[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], fileName, { type: mime });
    }

    return null;
  } catch (_) {
    return null;
  }
};
