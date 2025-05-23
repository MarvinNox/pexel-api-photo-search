import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Form from "../Form/Form";
import { fetchPhotosDate } from "../../services/photos";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["photos", query, page],
    queryFn: () => fetchPhotosDate({ query, page }),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  // const totalPages = data.total_results / data?.per_page;

  useEffect(() => {
    if (isSuccess && data.total_results == 0) {
      toast.error("No movies found for your request.");
    }
  }, [data, isSuccess]);

  const handleSearch = (query: string) => {
    setQuery(query);
    setPage(1);
  };

  return (
    <>
      <Toaster position="top-center" />
      <Form onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && <PhotosGallery onSelect={() => {}} photos={data.photos} />}
    </>
  );
}
