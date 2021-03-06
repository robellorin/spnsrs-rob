<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Share Banner - {{banner.title}}</h4>
        </md-card-header>
        <md-card-content>
          <div>
            <md-field
                :class="[
                  { 'md-form-group': true },
                ]"
              >
                <md-icon>how_to_reg</md-icon>
                <label>Type username or email you want to share this banner</label>
                <md-input v-model="shareuser" type="text"></md-input>
                <slide-y-down-transition>
                  <md-button class="md-primary md-sm textbutton md-round md-dense"  @click="clearUserInput" v-show="shareuser!=''">
                    <md-icon>close</md-icon>
                  </md-button>
                </slide-y-down-transition>
            </md-field>
            <md-button class="fullwidth lowercase md-dense" @click="shareBanner" :class="searchedUser?'success':'md-primary'" :disabled="!searchedUser">{{getButtonText()}}</md-button>
          </div>
          <md-table
            :value="queriedData"
            :md-sort.sync="currentSort"
            :md-sort-order.sync="currentSortOrder"
            :md-sort-fn="customSort"
            class="paginated-table table-striped table-hover"
          >
            <md-table-toolbar>
              <md-field>
                <label for="pages">Per page</label>
                <md-select v-model="pagination.perPage" name="pages">
                  <md-option
                    v-for="item in pagination.perPageOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                    {{ item }}
                  </md-option>
                </md-select>
              </md-field>

              <md-field>
                <md-input
                  type="search"
                  class="mb-3"
                  clearable
                  style="width: 200px"
                  placeholder="Search records"
                  v-model="searchQuery"
                >
                </md-input>
              </md-field>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Name" md-sort-by="name">{{
                item.name
              }}</md-table-cell>
              <md-table-cell md-label="Email" md-align="left" md-sort-by="email">{{
                item.email
              }}</md-table-cell>
              <md-table-cell md-label="Actions" class="text-center">
                <md-button
                  class="md-just-icon md-danger md-simple"
                  @click.native="handleDelete(item)"
                >
                  <md-icon>close</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>
        <md-card-actions md-alignment="space-between">
          <div class="">
            <p class="card-category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
            </p>
          </div>
          <pagination
            class="pagination-no-border pagination-success"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="total"
          >
          </pagination>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
import { Pagination } from "@/components";
import firebaseUtilFuncs from "@/utils/firebase/firebaseUtil.js";
import { SlideYDownTransition } from "vue2-transitions";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import { mapGetters } from "vuex";

export default {
  name: "banner-users",
  props: {
    banner: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    Pagination,
    SlideYDownTransition,
  },
  data() {
    return {
      shareuser: "",
      sharedUsers: [],
      searchedUser: null,
      buttontext: "",
      currentSort: "name",
      currentSortOrder: "asc",
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      footerTable: ["Name", "Email", "Actions"],
      searchQuery: "",
      propsToSearch: ["name", "email", "age"],
      searchedData: [],
      fuseSearch: null
    };
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    ...mapGetters({
      authUser: "auth/getAuthUser",
    }),
    queriedData() {
      let result = this.sharedUsers;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.sharedUsers.length;
    }
  },
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    searchQuery(value) {
      let result = this.sharedUsers;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    },
    shareuser: async function(val) {
      let usersRef = this.$firebaseGlobDB.collection("users");
      let snapshot1 = await usersRef
        .where("username", "==", this.shareuser)
        .where("influencer", "==", true)
        .get();
      
      let snapshot2 = await usersRef
        .where("email", "==", this.shareuser)
        .where("influencer", "==", true)
        .get();

      if (!snapshot1.empty) {
        snapshot1.forEach((doc) => {
          if (doc.id != this.authUser.id){
            this.searchedUser = {...doc.data()}
          }
        });
      } else {
        this.searchedUser = null
      }

      if (!snapshot2.empty && !this.searchedUser) {
        snapshot2.forEach((doc) => {
          if (doc.id != this.authUser.id){
            this.searchedUser = {...doc.data()}
          }
        });
      }
    }
  },
  async created() {
    this.sharedUsers = await this.$firebaseGlobDB
      .collection("shares")
      .where("bannerId", "==", this.banner.id)
      .where("sponsorId", "==", this.authUser.id)
      .get()
      .then(async (sharesSnapshot) => {
        let influencerIdList = [];
        sharesSnapshot.forEach((doc) => {
          influencerIdList.push(doc.data().influencerId);
        });
        let sharedInfluencersList = [];
        if (influencerIdList.length==0) {
          return sharedInfluencersList;
        }
        sharedInfluencersList = await this.$firebaseGlobDB
        .collection("users")
        .where("id", "in", influencerIdList)
        .get()
        .then((snapshot2) => {
          let internalSharedInfuluencers = [];
          snapshot2.forEach((doc) => {
            let docData = doc.data();
            let name = docData.firstname + ' ' + docData.lastname;
            name = name.trim();
            internalSharedInfuluencers.push({ id: doc.id, name: name, ...doc.data() });
          });
          return internalSharedInfuluencers;
        });
        return sharedInfluencersList;
      });
  },
  methods: {
    notifyVue(message) {
      var color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        timeout: 2500,
        message: message,
        icon: "add_alert",
        horizontalAlign: 'right',
        verticalAlign: 'top',
        type: 'success'
      });
    },
    async shareBanner() {
      let sharesRef = this.$firebaseGlobDB.collection("shares");
      let snapshot = await sharesRef
        .where("sponsorId", "==", this.authUser.id)
        .where("influencerId", "==", this.searchedUser.id)
        .where("bannerId", "==", this.banner.id)
        .get();

      if (snapshot.empty) {
        var newShare = await firebaseUtilFuncs.createData('shares', {
          sponsorId: this.authUser.id,
          influencerId: this.searchedUser.id,
          bannerId: this.banner.id
          }
        )
        let name = this.searchedUser.firstname + ' ' + this.searchedUser.lastname;
        this.sharedUsers.push({
          name: name,
          email: this.searchedUser.email
        })
        this.notifyVue(`Shared with ${this.searchedUser.username}.`)
      } else {
        this.notifyVue("The banner is already shared with this user.")
      }
    },
    clearUserInput() {
      this.searchedUser = null;
      this.shareuser = "";
    },
    getButtonText() {
      if (this.searchedUser) {
        this.buttontext = `Share this banner to ${this.searchedUser.username}(${this.searchedUser.email}).`
      } else {
        this.buttontext = "Select a username or email to share this banner"
      }
      return this.buttontext;
    },
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    },
    handleLike(item) {
      Swal.fire({
        title: `You liked ${item.name}`,
        buttonsStyling: false,
        type: "success",
        confirmButtonClass: "md-button md-success"
      });
    },
    handleEdit(item) {
      Swal.fire({
        title: `You want to edit ${item.name}`,
        buttonsStyling: false,
        confirmButtonClass: "md-button md-info"
      });
    },
    handleDelete(item) {
      this.deleteRow(item);
    },
    async deleteRow(item) {
      let removeDocId = await this.$firebaseGlobDB
        .collection("shares")
        .where("bannerId", "==", this.banner.id)
        .where("sponsorId", "==", this.authUser.id)
        .where("influencerId", "==", item.id)
        .get()
        .then(async (sharesSnapshot) => {
          let docId = null;
          sharesSnapshot.forEach((doc) => {
            docId = doc.id
          });
          return docId;
        });
      if (removeDocId) {
        await firebaseUtilFuncs.deleteData('shares', removeDocId);
        let indexToDelete = this.sharedUsers.findIndex(
          tableRow => tableRow.id === item.id
        );
        if (indexToDelete >= 0) {
          this.sharedUsers.splice(indexToDelete, 1);
        }
      }
    }
  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.sharedUsers, {
      keys: ["name", "email"],
      threshold: 0.3
    });
  },
  
};
</script>

<style lang="css" scoped>
.md-card .md-card-actions {
  border: 0;
  margin-left: 20px;
  margin-right: 20px;
}
.fullwidth {
  width: 100%;
}
.lowercase {
  text-transform: none
}
.textbutton {
  width: 40px;
  padding: 0!important;
  margin: 0!important;
  min-width: unset;
}
.success {
  background-color: green!important;
  color: white!important;
}
</style>
