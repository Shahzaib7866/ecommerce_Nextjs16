
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

export const getImageUrl = (imageName) => {
  // 'assets/' ko hata diya kyunke images root par hain
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${imageName}`
}





