export function SET_NAV_TITLE(state, payload) {
  state.navTitle = payload;
}

export function PUSH_STACK(state, route) {
  state.backTo.push(route);
  state.isTopLevel = false;
}

export function CLEAR_STACK(state) {
  state.backTo = [];
  state.isTopLevel = true;
}
