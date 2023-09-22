<template>
 <div class="container">
  <div class="row mb-2">
    <div class="col-md-6">

    </div>
    <div class="col-md-6 text-end ">
      <button class="btn btn-sm btn-primary mr-2" title="Add new User" @click="addUserDetails">Add user</button>
    </div>
  </div>
  
  <div class="table-container" style="height: 400px; overflow-y: scroll;">
  <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
    <tbody v-if="results != null">            
      <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
          <tr v-for="(user, i) in filterUsers" :key="i" v-if="users.length">
              <td>{{user.buyer_id}}</td>
              <td >{{user.name}}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.status == 1 ? 'Active' : 'Disabled'  }}</td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-sm btn-primary  mr-2" title="View details" @click="viewUserDetails(user)">View</button>
                    <button class="btn btn-sm btn-warning mr-2" @click="showEditUser(user, i)">Update</button> 

                </div>
            </td>
          </tr>
    </tbody>
</table>
</div>

<fieldset  v-if="addUser" class="mt-5">
  <hr>
  <div class="container">
    <h3>Add Buyer</h3>
    <div class="row">
    <div class="col-md-6">
      <div class="form-group">
        <label for="exampleInputEmail1" class="form-label mt-4">Email address</label>
        <input type="email" class="form-control" v-model="data.email" placeholder="Enter email">
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <label for="exampleInputEmail1" class="form-label mt-4">Name</label>
        <input type="email" class="form-control" v-model="data.name" placeholder="Enter Name">
      </div>
    </div>
  </div>
</div>
<div class="col-md-12 text-end"> <button class="btn btn-sm btn-primary text-end" @click="addBuyer">Submit</button></div>
</fieldset>

<fieldset  v-if="editUser" class="mt-5">
  <hr>
  <div class="container">
    <h3>Update Buyer</h3>
    <div class="row">
    <div class="col-md-6">
      <div class="form-group">
        <label class="form-label mt-4">Email address</label>
        <input type="email" class="form-control" v-model="editData.email" :disabled="editData.status === 0" placeholder="Enter email">
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <label for="exampleInputEmail1" class="form-label mt-4">Name</label>
        <input type="email" class="form-control" v-model="editData.name" :disabled="editData.status === 0" placeholder="Enter Name">
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <label class="form-label mt-4">Status</label>
        <select v-model="editData.status" class="form-control" :disabled="editData.status === 0">
            <option disabled selected>Select --</option>
            <option value="1">Active</option>
            <option value="0">Disabled</option>
        </select>
      </div>
    </div>
  </div>
</div>
<div class="col-md-12 text-end"> <button class="btn btn-sm btn-primary text-end" @click="updateBuyer">Update Buyer</button></div>
</fieldset>


<fieldset  v-if="viewUser" class="mt-5">
  <hr>
  <div class="container">
    <h3>User's Details</h3>
    <div class="row">
      <div class="col-md-6">
      <div class="form-group">
        <label class="form-label mt-4">Buyer's ID</label>
        <input type="email" class="form-control" v-model="data.buyer_id" disabled placeholder="Buyer's ID">
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <label class="form-label mt-4">Email address</label>
        <input type="email" class="form-control" v-model="data.email" disabled placeholder="Enter email">
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <label for="exampleInputEmail1" class="form-label mt-4">Name</label>
        <input type="email" class="form-control" v-model="data.name" disabled placeholder="Enter Name">
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <label class="form-label mt-4">Status</label>
        <select v-model="data.status" class="form-control" disabled>
            <option disabled selected>Select --</option>
            <option value="1">Active</option>
            <option value="0">Disabled</option>
        </select>
      </div>
    </div>
  </div>
</div>

</fieldset>

 </div>
</template>

<script>
import axios from 'axios'
const proxy = "http://localhost:5000"

export default {
  name: 'HomePage',

  mounted() {
      this.getUsers();
  },
  data() {
    return {
      results: null,
      users: {
        name: '',
        email: '',
        status: '',
        buyer_id: ''
      },
      data: {
        name: '',
        email: '',
        status: '',
        buyer_id: ''
      },
      addUser: false,
      editUser: false,
      viewUser: false,
      editData: {
        name: '',
        email: '',
        status: '',
        buyer_id: ''
      },
      keyword:'',
      index: -1,
    }

  },
  computed: {
        filterUsers() {
          return this.users;
        }
    },
    
  methods: {
    getUsers: async function(){
      axios.get(`${proxy}/api/users`)
          .then(response => {
            this.results = response.data
            this.users = response.data
          
          })   
    
    },
    async addBuyer() {
      if(this.data.name.trim() == '')
          return alert('Name is required')
      if(this.data.email.trim() == '')
          return alert('Email is required')
      if(!this.isValidEmail(this.data.email))
          return alert("Please input a valid email")
    try{
      const res = await axios.post(`${proxy}/api/users`, this.data);
      if(res.status == 200) {
          this.users.unshift(res.data);
          alert('User has been added successfully');
          this.addUser = false;

          this.data = { name: '', email: '', buyer_id: ''};
          this.keyword = ''
          window.location.href = "/"
      }else{
        if(res.status == 400){
            if(res.data.errors.title){
              return alert(res.data.errors.title[0])
            }
              if(res.data.errors.body){
                return alert(res.data.errors.body[0])
            }
            }else{
              return alert("Something went wrong")
            }
      }
    }catch(e) {
      return alert(e.response.data.msg)
    }

    },
    async updateBuyer() {
      if(this.editData.email.trim() == '')
          return alert('Email is required')
      if(!this.isValidEmail(this.editData.email))
          return alert("Please input a valid email")
    try{
      const res = await axios.patch(`${proxy}/api/users/`+this.editData.buyer_id, this.editData);
      if(res.status == 200) {
          this.users.unshift(res.data);
          alert('You have successfully updated  details');
          this.addUser = false;

          this.editData = { name: '', email: '', buyer_id: ''};
          this.keyword = ''
          window.location.href = "/"
      }else{
        if(res.status == 400){
            if(res.data.errors.title){
              return alert(res.data.errors.title[0])
            }
              if(res.data.errors.body){
                return alert(res.data.errors.body[0])
            }
            }else{
              return alert("Something went wrong")
            }
      }
    }catch(e) {
      return alert(e.response.data.msg)
    }

    },
    addUserDetails() {
      this.editUser = false;
      this.addUser = true;
      this.viewUser = false;
    },
    showEditUser(user, index) {
      let obj = {
					buyer_id: user.buyer_id,
          name: user.name,
          status: user.status,
          email: user.email
				};

      this.editData = obj;
      this.editUser = true;
      this.addUser = false;
      this.viewUser = false;
      this.index = index;
    },
    viewUserDetails(user, index) {
      let obj = {
					buyer_id: user.buyer_id,
          name: user.name,
          status: user.status,
          email: user.email
				};
      this.data = obj;
      this.viewUser = true;
      this.editUser = false;
      this.addUser = false;
      this.index = index;
    },
    isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    }
  }
}
</script>

<style scoped>

</style>
