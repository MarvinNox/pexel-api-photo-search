import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Form from "../Form/Form";
import { fetchPhotosDate } from "../../services/photos";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import type { Photos } from "../../types/photo";
import Modal from "../Modal/Modal";

export default function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [photo, setPhoto] = useState<Photos | null>(null);
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["photos", query, page],
    queryFn: () => fetchPhotosDate({ query, page }),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const totalPages =
    data?.total_results && data?.per_page
      ? Math.ceil(data.total_results / data.per_page)
      : 0;

  useEffect(() => {
    if (isSuccess && data.total_results == 0) {
      toast.error("No movies found for your request.");
    }
  }, [data, isSuccess]);

  const handleSearch = (query: string) => {
    setQuery(query);
    setPage(1);
  };
  const closeModal = () => setPhoto(null);
  const selectPhoto = (photo: Photos) => setPhoto(photo);
  return (
    <>
      <Toaster position="top-center" />
      <Form onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && (
        <PhotosGallery onSelect={selectPhoto} photos={data.photos} />
      )}
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={4}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          disabledClassName={css.disabled}
          nextLabel={<MdOutlineKeyboardArrowRight size={24} />}
          previousLabel={<MdOutlineKeyboardArrowLeft size={24} />}
        />
      )}
      {photo !== null && <Modal onClose={closeModal} photo={photo} />}
    </>
  );
}
