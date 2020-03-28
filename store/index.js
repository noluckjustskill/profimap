export const state = () => ({
  profileProgress: {
    golland: false,
    klimov: false,
    belbin: false,
    disk: false,
  },
  guestFirstTest: null,
});

export const mutations = {
  updateProfileProgress(state, name) {
    state.profileProgress[name] = true;
  },
  updateGuestFirstTest(state, name) {
    if (!state.guestFirstTest) {
      state.guestFirstTest = name;
    }
  },
};

export const getters = {
  allTestsDone(state) {
    return Object.values(state.profileProgress).every(Boolean);
  }
};
