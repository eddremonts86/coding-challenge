<template>
  <div>
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-10">
            <h4 data-cy="cy-projects">Projects</h4>
          </div>
          <div class="col-2">
            <div class="text-right">
              <button
                type="button"
                class="btn btn-sm btn-success"
                @click.prevent="addProject"
                data-cy="cy-addProject"
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
            <td v-text="project.name"  @click.prevent="editProject(project)"></td>
            <td v-text="project.entries"></td>
           <td v-text="project.TotalHours"></td>
            <td class="text-right">
              <button
                type="button"
                class="btn btn-sm btn-dark"
                :data-cy="`cy-edit-${project.name}`"
                @click.prevent="editProject(project)"
              >Edit</button>

              <a :href="`/projects/${project.id}`" :data-cy="`cy-ditails-${project.name}`" class="btn btn-sm btn-secondary">Details</a>

              <button
                type="button"
                class="btn btn-sm btn-danger"
                :data-cy="`cy-delete-${project.name}`"
                @click.prevent="deleteProjectById(project.id , project.name )"
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
import globalMixin from "../mixins/globalMixin.js";

export default {
  name: "Projects",
 props: ['projects'],
  components: {
    "add-project": AddProject,
    "edit-project": EditProject
  },
  mixins: [globalMixin],
  computed: {
    ...mapGetters(["getProjects","getAlertState"])
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
    deleteProjectById(id,name) {
      let vue=this;

      this.delete("projetc", name).finally(() => {
        if (!this.getAlertState) {return true;}
        this.deleteProject({ id: id })
        .then(function(response) {
            if (response) {
               vue.$swal({
                title: "Deleted Project!",
                text: "Operation has been done!",
                type: "success"
              });
            }
          })
          .catch(function(error) {
            vue.$swal({
              title: "Problem with deleting the project",
              text: error,
              type: "error"
            });
          })
        .finally(() => {
             this.fetchAll()}
            );

    });
   }
 }
};
</script>
