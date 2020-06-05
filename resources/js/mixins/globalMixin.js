import { mapActions, mapMutations } from "vuex";
const globalMixin = {
    methods: {
        ...mapActions(["postIngredient",]),
        ...mapMutations(["setMessage",]),
        delete(target, targetName) {
            return this.$swal
            .fire({
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
                this.$store.dispatch("fetchAlertState", true);
                this.$swal.fire(
                    "Deleted!",
                    "Your " + target + " has been deleted.",
                    "success"
                );
                } else if (result.dismiss === this.$swal.DismissReason.cancel) {
                this.$store.dispatch("fetchAlertState", false);
                this.$swal.fire(
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
            },
    }
  };
export default globalMixin;
