import styles from "./PhotosGalleryItem.module.css";
import type { Photos } from "../../types/photo";

interface PhotosGalleryItemProps {
  photo: Photos;
}

export default function PhotosGalleryItem({
  photo: { src, alt, avg_color },
}: PhotosGalleryItemProps) {
  return (
    <div
      className={styles.thumb}
      style={{ backgroundColor: avg_color, borderColor: avg_color }}
    >
      <img src={src.original} alt={alt} loading="lazy" />
    </div>
  );
}
