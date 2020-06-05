<template>
  <div>
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-10">
            <h4>Projects</h4>
          </div>
          <div class="col-2">
            <div class="text-right">
              <button
                type="button"
                class="btn btn-sm btn-success"
                @click.prevent="addProject"
              >Add project</button>
            </div>
          </div>
        </div>
      </div>
      <table class="card-table table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Entries</th>
            <th>Total hours</th>
            <th></th>
          </tr>
        </thead>

        <tbody v-if="getProjects">
          <tr v-for="project in getProjects.data"   :key="project.id">
            <td v-text="project.name"></td>
            <td v-text="project.entries"></td>
            <td>
              <!-- TODO: Calculate total hours spent -->
              0 hours
            </td>
            <td class="text-right">
              <button
                type="button"
                class="btn btn-sm btn-dark"
                @click.prevent="editProject(project)"
              >Edit</button>
              <a :href="`/projects/${project.id}`" class="btn btn-sm btn-secondary">Details</a>
              <button
                type="button"
                class="btn btn-sm btn-danger"
                @click.prevent="deleteProjectById(project.id)"
              >Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <add-project ref="add"></add-project>
    <edit-project ref="edit"></edit-project>
  </div>
</template>

<script>
import AddProject from "./AddProject";
import EditProject from "./EditProject";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Projects",
 props: ['projects'],
  components: {
    "add-project": AddProject,
    "edit-project": EditProject
  },
  computed: {
    ...mapGetters(["getProjects"])
  },
  created() {
    this.fetchAll();
  },
  methods: {
    ...mapActions(["deleteProject", "fetchAll"]),
    addProject() {
      this.$refs.add.open();
    },
    editProject(project) {
      this.$refs.edit.open(project);
    },
    deleteProjectById(id) {
      this.deleteProject({ id: id })
        .then(response => {
          //mostrar
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => this.fetchAll());
    }
  }
};
</script>
