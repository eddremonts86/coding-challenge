const actions = {
  fetchAlertState(context, data) {
    context.commit("setAlertState", data);
  },
};

export default actions;
