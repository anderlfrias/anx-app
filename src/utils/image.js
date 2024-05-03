const { fromBlob } = require('image-resize-compress');

export const resizeImage = async ({ image, format, quality = 80, width = 0, height = 0 }) => {
  const newImage = await fromBlob(image, quality, width, height, format)
    .then((blog) => {
      return blog;
    });

  return newImage;
};

export const imageToBase64 = async (imagen, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(imagen);
  reader.onload = async () => {
    await callback(reader.result);
  };
  reader.onerror = (error) => {
    console.log('Error: ', error);
  };
};