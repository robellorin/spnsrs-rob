<template>
  <ul class="nav nav-mobile-menu">
    <li>
      <md-field>
        <label>Search</label>
        <md-input v-model="search" type="text"></md-input>
      </md-field>
    </li>
    <!-- <li>
      <router-link to="/dashboard" class="dropdown-toggle" data-toggle="dropdown">
        <i class="material-icons">dashboard</i>
        <p>Dashboard</p>
      </router-link>
    </li> -->
    <li>
      <drop-down>
        <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
          <i class="material-icons">notifications</i>
          <span class="notification">5</span>
          <p>Some Actions</p>
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
          <li><a href="#">Mike John responded to your email</a></li>
          <li><a href="#">You have 5 new tasks</a></li>
          <li><a href="#">You're now friend with Andrew</a></li>
          <li><a href="#">Another Notification</a></li>
          <li><a href="#">Another One</a></li>
        </ul>
      </drop-down>
    </li>
    <li>
      <router-link to="/profile/editprofile" data-toggle="dropdown" class="dropdown-toggle"
        ><i class="material-icons">person</i>
        <p>Account</p>
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      search: null,
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ]
    };
  }
};
</script>
