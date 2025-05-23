import type { Photos } from "../../types/photo";
import Grid from "../Grid/Grid";
import GridItem from "../GridItem/GridItem";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotosGalleryProps {
  onSelect: (movie: Photos) => void;
  photos: Photos[] | undefined;
}

export default function PhotosGallery({
  onSelect,
  photos,
}: PhotosGalleryProps) {
  return (
    <Grid>
      {photos?.map((photo) => (
        <GridItem photo={photo} onSelect={() => onSelect(photo)}>
          <PhotosGalleryItem photo={photo} />
        </GridItem>
      ))}
    </Grid>
  );
}
