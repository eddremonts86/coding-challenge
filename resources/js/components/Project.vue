<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-10">
          <h4 v-text="project.name"></h4>
        </div>
        <div class="col-2">
          <div class="text-right" v-if="getProject">
            <button
              v-show="isClosed()"
              type="button"
              class="btn btn-sm btn-danger"
              @click.prevent="stopTimer"
            >Stop</button>
            <button
              v-show="!isClosed()"
              type="button"
              class="btn btn-sm btn-success"
              @click.prevent="startTimer"
            >Start</button>
          </div>
        </div>
      </div>
    </div>
    <table class="card-table table">
      <thead>
        <tr>
          <th>Start date</th>
          <th>End date</th>
          <th>Time spent (H:m:s)</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="getProject.entries">
        <tr v-for="entry in getProject.entries" :key="entry.id">
          <td v-text="entry.start"></td>
          <td v-text="entry.end"></td>
          <td v-text="entry.total"></td>
          <td>
            <button
              type="button"
              class="btn btn-sm btn-danger"
              @click.prevent="deleteEntry(entry.id)"
            >Delete</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr><td colspan="4">
          <a type="button" class="btn btn-sm btn-none" href="/home">Go back</a></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import globalMixin from "../mixins/globalMixin.js";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Project",
  props: ["project"],
  data: () => ({
    start: 0,
    end: 0
  }),
  mixins: [globalMixin],
  computed: {
    ...mapGetters(["getProject","getAlertState"])
  },
  created() {
    this.fetchById(this.project.id);
  },
  methods: {
    ...mapActions(["putEntry", "postEntry", "entryDelete", "fetchById"]),
    startTimer() {
      this.postEntry({ projectId: this.getProject.id });
      this.fetchById(this.project.id);
    },
    stopTimer() {
      this.putEntry({
        id: this.getProject.entries[this.getProject.entries.length - 1].id
      });
      this.fetchById(this.project.id);
    },
    deleteEntry(id) {
      this.entryDelete({ id: id });
      this.fetchById(this.getProject.id);
    },
    isClosed() {
      if (this.getProject.entries.length > 0) {
        let length = this.getProject.entries.length - 1;
        return this.getProject.entries[length].status ? true : false;
      } else return false;
    }
  }
};
</script>
