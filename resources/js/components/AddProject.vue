<template>
  <div class="modal" tabindex="-1" role="dialog" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Project</h5>
          <button type="button" class="close" @click.prevent="closeModal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="alert alert-warning" role="alert" v-if="getMessage">
            <p>Proyect {{projectName}} is already in the list.</p>
          </div>

          <div class="form-group">
            <label for="project_name">Project name</label>
            <input
              type="text"
              name="project_name"
              id="project_name"
              class="form-control"
              data-cy="cy-projectName"
              v-model="projectName"
              @keyup="validateProjectName"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-cy="cy-projectAddProjectButtonCancel"
            @click.prevent="closeModal"
          >Cancel</button>
          <button
            type="button"
            class="btn btn-success"
            @click.prevent="submit"
            :disabled="getMessage"
            data-cy="cy-projectAddProjectButtonSave"
          >Save project</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import globalMixin from "../mixins/globalMixin.js";

export default {
  data: () => ({
    projectName: "",
    valid: true
  }),
  mixins: [globalMixin],
  computed: { ...mapGetters(["getMessage"]) },
  methods: {
    ...mapActions(["fetchByName", "postProject", "fetchAll"]),
    ...mapMutations(["setMessage"]),
    open() {
      $(this.$refs.modal).modal("show");
    },
    closeModal() {
      $(this.$refs.modal).modal("hide");
      this.projectName = "";
    },
    submit() {
      const vm = this;
      this.fetchByName(this.projectName)
        .then(response => {
          let test = response.data.data;
          if (!test[0]) {
            this.postProject({ name: this.projectName })
              .then(function(response) {
                if (response) {
                  vm.$swal({
                    title: "Added Project!",
                    text: "Operation has been done!",
                    type: "success"
                  });
                }
              })
              .catch(function(error) {
                vm.$swal({
                  title: "Problem with adding the project",
                  text: error,
                  type: "error"
                });
              })
              .finally(() => {
                $(vm.$refs.modal).modal("hide");
                this.projectName = "";
                this.fetchAll();
              });
          } else {
            this.setMessage(true);
          }
        })
        .catch(error => {
          console.log(error);
          this.Message = error;
        });
    },
    validateProjectName() {
      if (this.projectName.length > 0) {
        this.fetchByName(this.projectName)
          .then(response => {
            let test = response.data.data;
            if (!test[0]) {
              this.setMessage(false);
            } else {
              this.setMessage(true);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
