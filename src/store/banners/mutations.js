export function addNewBanner(state, banner) {
  state.banners = [banner, ...state.banners];
}

export function updateBanner(state, updatedBanner) {
  var foundIndex = state.banners.findIndex(
    banner => banner.id == updatedBanner.id
  );
  console.log(foundIndex, updatedBanner);
  Object.assign(state.banners[foundIndex], updatedBanner);
}

export function setBanners(state, banners) {
  state.banners = banners;
}

export function removeBanner(state, bannerId) {
  state.banners = state.banners.filter(banner => banner.id !== bannerId);
}

export function setEditableBanner(state, banner) {
  state.editableBanner = banner;
}

export function removeEditableBanner(state) {
  state.editableBanner = {
    image: null
  };
}
