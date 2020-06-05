import { mapActions} from "vuex";
const globalMixin = {
    methods: {
        ...mapActions(["fetchAlertState"]),
         delete(target, targetName) {
            return this.$swal
                ({
                    title: "Are you sure?",
                    text:
                        "Do you want to delete the " +
                        target +
                        " called " +
                        targetName +
                        " ? ",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel!",
                    reverseButtons: true
                })
                .then(result => {
                    if (result.value) {
                        this.fetchAlertState(true);
                        this.$swal(
                            "Deleted!",
                            "Your " + target + " has been deleted.",
                            "success"
                        );
                    }
                    else if (result.dismiss === this.$swal.DismissReason.cancel) {
                        this.fetchAlertState(false);
                        this.$swal(
                            "Cancelled",
                            "Your " + target + " item is safe.",
                            "error"
                        );
                    }
                });
        },
        info(infoText, infoTitle) {
            this.$swal({
                title: infoTitle,
                text: infoText,
                type: "info"
            });
        },
        error(errorText, errorTitle) {
            this.$swal({
                title: errorTitle ? errorTitle : "You have an error",
                text: errorText,
                type: "error"
            });
        }
    }
};
export default globalMixin;
