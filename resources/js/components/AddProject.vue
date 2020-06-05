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
    projectName: "",
    valid: true
  }),
  computed: { ...mapGetters(["getMessage"]) },
  methods: {
    ...mapActions(["fetchByName", "postProject","fetchAll"]),
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
              .catch(error => {
                console.log(error);
              })
              .finally(() => {
                      $(vm.$refs.modal).modal("hide")
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
