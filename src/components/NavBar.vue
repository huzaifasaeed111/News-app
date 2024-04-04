<template>
   <div class="container-fluid">
       <div class="row">
         <div class="col-12 bg-light">
            <b-navbar toggleable="md">
               <!-- Logo is here  -->
               <b-navbar-brand class="mx-2 font-weight-bold">News App</b-navbar-brand>
               <!-- menus are here... -->
               <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
               <b-collapse id="nav-text-collapse" is-nav class="justify-content-end">
                 <b-navbar-nav>
                   <b-nav-text class="text-center">
                     <b-button variant="outline-secondary" @click="ClearData">Reset News</b-button>
                   </b-nav-text>
                   <b-nav-text class="text-center mx-lg-2 mx-md-2">
                     <b-button variant="outline-secondary" @click="ShowNews">All News</b-button>
                   </b-nav-text>
                   <b-nav-text class="text-center mx-lg-1 mx-md-1">
                     <b-button @click="showModal">Add New News</b-button>
                     <!-- Modal slot is used here.... -->
                     <ModalComp :modalId="modalId" @close="closeModal">
                      <template #title>
                        Add New News
                      </template>
                         <!-- Input field for Add new News -->
                         <div class="container">
                              <div class="row my-2" v-for="(type,index) in types" :key="index">
                                 <div class="col-3">
                                   <label>{{labels[index]}}</label>
                                 </div>
                                 <div class="col-9" v-if="type === 'text'">
                                   <b-form-input :id="`type-${type}`" v-model="formData[index]" :type="type" :placeholder="labels[index]" required></b-form-input>
                                 </div>
                                 <div class="col-9" v-else>
                                  <b-form-textarea :id="`type-${type}`" v-model="formData[index]" :placeholder="labels[index]" required></b-form-textarea>
                                </div>
                              </div>
                              <b-button @click="saveFormData">Submit</b-button>
                         </div>
                    </ModalComp>
                   </b-nav-text>
                 </b-navbar-nav>
               </b-collapse>
            </b-navbar>
         </div>
       </div>
   </div>
</template>
<script>
import ModalComp from './ModalComp.vue';
import {bus} from '../main';
import Swal from 'sweetalert2';
export default{
  components:{
    ModalComp
  },
  data(){
    return{
      types: ['text', 'text-area', 'text'],
      labels: ['News Name', 'Description', 'category'],
     modalId: 'bv-modal-example',
     formData:[]
    }
  },
  methods: {
    showModal() {
      this.$root.$emit('bv::show::modal', this.modalId);
      bus.$emit('HideApiData', true);
    },
    closeModal() {
      this.$root.$emit('bv::hide::modal', this.modalId);
    },
    saveFormData() {
      let savedFormData = JSON.parse(localStorage.getItem('formData')) || [];
      savedFormData.push(this.formData);
      localStorage.setItem('formData', JSON.stringify(savedFormData));
      bus.$emit('formDataSaved', savedFormData);
      this.closeModal();
      Swal.fire({
         title: "Good job!",
         text: "You clicked the button!",
         icon: "success"
      });
    },
    ShowNews(){
      bus.$emit('ShowNewsApi', true);
      console.log("======", )
    },
    ClearData(){
      Swal.fire({
           title: "Are you sure?",
           text: "You won't be able to revert this!",
           icon: "warning",
           showCancelButton: true,
           confirmButtonColor: "#3085d6",
           cancelButtonColor: "#d33",
           confirmButtonText: "Yes, delete it!"
           }).then((result) => {
           if (result.isConfirmed) {
             Swal.fire({
             title: "Deleted!",
             text: "Your file has been deleted.",
             icon: "success"
             });
           }
          });
      localStorage.clear();
      bus.$emit('clearList', true);
    }
  },
  beforeDestroy(){
    Swal.close();
  }
}

</script>

<style>
.modal-title{
  width: 95%;
  text-align: center;
}
.close{
  background-color: white;
  font-size: 16px;
  border-radius: 3px;
}
</style>