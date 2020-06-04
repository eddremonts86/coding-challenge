import { mapActions, mapMutations } from "vuex";
export const globalMixins = {
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
        validateProjectName(projectName) {
            if(projectName.length > 0){
                this.fetchByName(projectName)
                .then(response => {
                    let test = response.data.data;
                    if(!test[0]){ this.setMessage(false)}
                    else{this.setMessage(true)}
                    
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }
  };
  