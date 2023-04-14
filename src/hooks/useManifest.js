import { manifestFetcher } from "../api/api";
import useSWRImmutable from "swr/immutable";

export const useManifest = (manifestUrl) => {
  const { data: manifest, isLoading: isLoadingManifest } = useSWRImmutable(manifestUrl, manifestFetcher);

  return [manifest, isLoadingManifest];
};
