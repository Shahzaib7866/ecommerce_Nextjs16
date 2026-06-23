import { CldImage } from 'next-cloudinary';

const CustomImage = ({ publicId, alt, ...props }) => {
  return (
    <CldImage
      src={publicId}
      alt={alt}
      // Cloudinary se image resize/optimize karne ke liye
      crop="fill"
      {...props}
    />
  );
};

export default CustomImage;