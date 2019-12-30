export const state = () => ({
  profileProgress: {
    golland: false,
    klimov: false,
    belbin: false,
    disk: false,
  },
});

export const mutations = {
  updateProfileProgress(state, name) {
    state.profileProgress[name] = true;
  }
};
