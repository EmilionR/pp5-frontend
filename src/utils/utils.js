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


export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? // update the follower count of this profile and set its following id
      {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ? // Update the following count of the signed-in user
      // update its following count
      { ...profile, following_count: profile.following_count + 1 }
    : // user cannot follow self, return unchanged
      profile;
};