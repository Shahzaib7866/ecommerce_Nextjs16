// src/constants/cloudinary.js

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

export const getImageUrl = (imageName) => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${imageName}`
}

