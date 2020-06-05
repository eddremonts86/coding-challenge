<template>
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-10">
                    <h4 v-text="project.name"></h4>
                </div>
                <div class="col-2">
                    <div class="text-right">
                        <button v-show="running" type="button" class="btn btn-sm btn-danger" @click.prevent="stopTimer">Stop</button>
                        <button v-show="!running" type="button" class="btn btn-sm btn-success" @click.prevent="startTimer">Start</button>
                    </div>
                </div>
            </div>
        </div>
        <table class="card-table table">
            <thead>
                <tr>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Time spent</th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-if="getProject.entries">
                <tr v-for="entry in getProject.entries">
                    <td v-text="entry.start"></td>
                    <td v-text="entry.end"></td>
                    <td>
                        <!-- TODO: Calculate time spent -->
                        0 hours
                    </td>
                    <td><button type="button" class="btn btn-sm btn-success" @click.prevent="deleteEntry(entry.id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapActions,mapGetters} from "vuex";
export default {
    name: "Project",
    props: ['project'],
    data: () => ({
        running: false,
        start:0,
        end:0,
    }),
    computed: {
        ...mapGetters(["getProject"])
    },
    created() {
        this.fetchById(this.project.id);
    },
    methods: {
        ...mapActions(['putEntry' , 'postEntry','entryDelete','fetchById']),
        startTimer() {
            this.running = true;
            this.postEntry({projectId:this.getProject.id})
            this.fetchById(this.project.id);
        },
        stopTimer() {
            this.putEntry({id:this.getProject.entries[this.getProject.entries.length - 1].id})
            this.running = false;
            this.fetchById(this.project.id);
        },
        deleteEntry(id) {
            this.entryDelete({id:id})
            this.fetchById(this.getProject.id);
          },
    }
}
</script>
