import axios from "axios";
import type { Photos } from "../types/photo";

const API_KEY = import.meta.env.VITE_PEXELS_TOKEN;

interface FetchPhotosDateProps {
  query: string;
  page: number;
}

interface PhotosHTTPResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photos[];
}
export async function fetchPhotosDate({
  query,
  page,
}: FetchPhotosDateProps): Promise<PhotosHTTPResponse> {
  const response = await axios.get<PhotosHTTPResponse>(
    "https://api.pexels.com/v1/search",
    {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        orientation: "landscape",
        query: query,
        page: page,
        per_page: 15,
      },
    }
  );
  return response.data;
}
