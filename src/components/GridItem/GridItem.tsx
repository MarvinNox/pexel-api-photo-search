import type { Photos } from "../../types/photo";

interface GridItemProps {
  onSelect: (movie: Photos) => void;
  photo: Photos;
  children: React.ReactNode;
}

export default function GridItem({ onSelect, photo, children }: GridItemProps) {
  return (
    <>
      <li key={photo.id} onClick={() => onSelect(photo)}>
        {children}
      </li>
    </>
  );
}
