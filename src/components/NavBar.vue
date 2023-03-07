<template>
  <MDBNavbar expand="lg" color="primary" class="p-3">
    <MDBNavbarBrand href="#">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"
        height="30"
        alt=""
        loading="lazy"
      />
      <h5 class="fw-bold">{{ customTitle }}<span class="text-warning">Quiziz</span></h5>
    </MDBNavbarBrand>
    <MDBNavbarToggler
      @click="collapse1 = !collapse1"
      target="#navbarSupportedContent"
    ></MDBNavbarToggler>
    <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
      <MDBNavbarNav right>
        <MDBNavbarItem href="#">My Scores <MDBBadge pill color="danger">1</MDBBadge></MDBNavbarItem>
        <MDBNavbarItem href="#">Quizes</MDBNavbarItem>
        <MDBNavbarItem href="#">Profil</MDBNavbarItem>
        <MDBNavbarItem href="#">Settings</MDBNavbarItem>
        <MDBNavbarItem href="#">Logout <MDBIcon fas icon="sign-out-alt" /></MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>
  </MDBNavbar>
</template>
<script>
import {
  MDBCollapse,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbarToggler
} from 'mdb-vue-ui-kit'
import { ref } from 'vue'

export default {
  components: {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse
  },
  setup() {
    const collapse1 = ref(false)
    return {
      collapse1
    }
  },
  props: {
    customTitle: {
      type: String,
      required: true
    }
  }
}
</script>
