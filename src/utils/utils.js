import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    // Fetch the next page of results
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      // Loop through results and remove duplicates
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          // If the current result is already in the accumulator, just return the accumulator
          ? acc
          // If the current result is not in the accumulator, append the current result
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};