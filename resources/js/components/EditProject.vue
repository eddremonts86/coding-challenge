<template>
  <div class="modal" tabindex="-1" role="dialog" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit {{ name }}</h5>
          <button type="button" class="close" @click.prevent="closeModal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="project_name">Project name</label>
            <div class="alert alert-warning" role="alert" v-if="getMessage">
              <p>Proyect {{projectName}} is already in the list.</p>
            </div>
            <input
              type="text"
              name="project_name"
              id="project_name"
              class="form-control"
             data-cy="cy-EditProject"
              v-model="projectName"
              @keyup="validateProjectName"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click.prevent="closeModal">Cancel</button>
          <button
            type="button"
            class="btn btn-success"
            @click.prevent="submit"
            :disabled="getMessage"
data-cy="cy-projectEditProjectSave"
          >Save project</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({
    project: null,
    projectName: ""
  }),
  computed: {
    name() {
      if (this.project) {
        return this.project.name;
      }
      return "";
    },
    ...mapGetters(["getMessage"])
  },
  methods: {
    ...mapActions(["fetchByName", "putProject", "fetchAll"]),
    ...mapMutations(["setMessage"]),
    open(project) {
      this.project = project;
      this.projectName = this.project.name;
      $(this.$refs.modal).modal("show");
    },
    closeModal() {
      $(this.$refs.modal).modal("hide");
      this.projectName = "";
    },
    submit() {
 const vm = this;
      this.putProject({
        id: this.project.id,
        name: this.projectName
      })
        .then(function(response) {
          if (response) {
            vm.$swal({
              title: "Edited Project!",
              text: "Operation has been done!",
              type: "success"
            });
          }
        })
        .catch(function(error) {
          vm.$swal({
            title: "Problem with editing the project",
            text: error,
            type: "error"
          });
        })

        .finally(() => this.fetchAll());
      $(this.$refs.modal).modal("hide");
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
