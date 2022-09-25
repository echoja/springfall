import type {
  IImageUploadPlaceholder,
  IContentElementProps,
} from "@modules/content/types";

const ImageUploadPlaceholder: React.FC<
  IContentElementProps<IImageUploadPlaceholder>
> = ({ children, element }) => {
  return (
    <div className="flex items-center justify-center w-full h-20 text-sm bg-slate-100">
      {children}
      이미지 업로드 중입니다: {element.id}
    </div>
  );
};

export default ImageUploadPlaceholder;
