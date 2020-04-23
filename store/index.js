export const state = () => ({
  profileProgress: {
    golland: false,
    klimov: false,
    belbin: false,
    disk: false,
  },
  guestFirstTest: null,
  promocode: false,
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
  activatePromocode(state, val) {
    state.promocode = val;
  }
};

export const getters = {
  allTestsDone(state) {
    return Object.values(state.profileProgress).every(Boolean);
  }
};
