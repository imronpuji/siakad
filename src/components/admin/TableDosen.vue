<template>
  <div class="test">
    <el-row style="margin-bottom: 10px">
        <el-col :span="5">
            <el-dropdown @command="handleClick">
            <el-button type="primary">Actions<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="new">new</el-dropdown-item>
              <el-dropdown-item command="import">import</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="5" :offset="13">
          <FormulateInput placeholder="Pencarian" type="search" v-model="filters[0].value"/>
        </el-col>
    </el-row>

    <data-tables :data="data"
        :pagination-props="{ pageSizes: [8, 10, 15] }"
        :action-col="actionCol"
        :filters="filters"
        >
        <el-table-column v-for="title in titles" 
        :prop="title.prop" :label="title.label" :key="title.label">
        </el-table-column>
    </data-tables>

    <!-- <sweet-modal ref="modal">
      <div>
        <FormulateForm @submit="edit">
          <CRow>
            <CCol sm="12">
              <FormulateInput v-model="editByName" placeholder="Nama" type="text" name="nama" validation="required"/>
            </CCol>
          </CRow>
          <CRow class="mt-3">
            <CCol sm="6">
              <FormulateInput v-model="editByNik" placeholder="NIY" type="text" name="niy" validation="required"/>
            </CCol>
            <CCol sm="6">
              <FormulateInput v-model="editByKontak" placeholder="Kontak" type="text" name="kontak" validation="required|number"/>
            </CCol>
          </CRow>
          <CRow class="mt-4">
            <CCol sm="12">
              <b-button type="submit" class="w-100">Edit</b-button>
            </CCol>
          </CRow>
        </FormulateForm>
      </div>
    </sweet-modal> -->
    
    <sweet-modal icon="success" ref="success">
        success!
    </sweet-modal>

    <sweet-modal icon="failed" ref="gagal">
        gagal!
    </sweet-modal>

    <sweet-modal ref="modalAdd">
      <div>
        <FormulateForm v-model="formValues" @submit="buat" name="buat">
          <CRow>
            <CCol sm="6" class="mt-3">
              <FormulateInput placeholder="Nama" type="text" name="nama" validation="required"/>
            </CCol>
            <CCol sm="6" class="mt-3">
              <FormulateInput placeholder="NIY" type="number" name="niy" validation="required"/>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" class="mt-3">
              <FormulateInput placeholder="Email" type="email" name="email" validation="required|email"/>
            </CCol>
            <CCol sm="6">
              <b-button type="submit" class="w-100 mt-3">Buat</b-button>
            </CCol>
          </CRow>
        </FormulateForm>
      </div>
    </sweet-modal>

    <sweet-modal ref="modalDelete">
      <div>
          <h3>are you sure ?</h3>
      </div>
      <b-button @click="del">next</b-button>
    </sweet-modal>
    
    <div class="overlay" v-if="$store.state.components.loading">
      <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'


var titles = [{
        prop: "niy",
        label: "NIY"
    }, 
    {
        prop: "nama",
        label: "Nama"
    }, 
    {
        prop: "email",
        label: "Email"
    },
    {
        prop: "foto",
        label: "Foto"
    }]

export default {
  computed : mapState({
    data : state => state.admin_dosen.data
  }),
  created(){
    if(this.data.length < 1){
      this.$store.dispatch('admin_dosen/actGetData')
      this.$store.dispatch('components/setLoad')
    } else {
      this.$store.dispatch('components/setLoadFalse')
    }
  },

  data() {
     return {
       filters: [{
        
        value: '',
        
        prop: 'nama',
        
        }, 

        {
          
          value: []
        
        }],
        formValues : {},   
        editById : '',
        editByName : '',
        editByNik : '',
        editByKontak : '',
        deleteById : '',
        deleteByDosen : '',
        titles,
       actionCol: {
        label: 'Actions',
        props: {
          align: 'center',
        },
        buttons: [{
          props: {
            type: 'primary',
            icon: 'el-icon-delete'
          },
           handler: row => {
            this.deleteById = row.user_id
            this.deleteByDosen = row.id_dosen
            this.$refs.modalDelete.open()
          },
          label: 'delete'
        }]
      }
     
     
     
     }
   },
   methods : {
       handleClick(command){
         if(command == 'new'){
           this.$refs.modalAdd.open()
           const errors = {
            fieldErrors: { username: 'Sorry, no such username exists!' },
            formErrors: ['Incorrect login, please try again.']
          }
          this.$formulate.handle(errors, 'buat')
          this.$formulate.reset('buat')
         }

       },
        //  edit(){
        //    const data = {
        //      nama : this.editByName,
        //      kontak : this.editByKontak,
        //      nik : this.editByNik,
        //      user_id : this.editById
        //    }
        //    this.$refs.modal.close()
        //     this.$store.dispatch('admin_dosen/actEdit', data).then(() => {
        //     this.$refs.success.open()
        //   })
        //   this.$store.dispatch('admin_dosen/setLoad')
        //  },
       del(){
         const data = {id_dosen : this.deleteByDosen, user_id:this.deleteById}
          
            this.$store.dispatch('admin_dosen/dels', data)
              .then(() => this.$refs.success.open() )
              .catch(() => this.$refs.gagal.open())

            this.$store.dispatch('components/setLoad')
            this.$refs.modalDelete.close()
       },
       buat(){
           this.$store.dispatch('admin_dosen/actAdd', this.formValues).then(() => {
            this.$refs.success.open()
           })
           this.$store.dispatch('components/setLoad')
           this.$refs.modalAdd.close()
      
       }
   }
  }
</script>
<style lang="scss">
  #addMhs {
    background:rgb(63, 178, 255) !important;
    border : none;
    color : white;
    border-radius: 4px;
    height : 40px;
    width: 80px;
  }
  .test {
    box-shadow: 0px 1px 4px rgb(214, 214, 214) ;
    padding : 30px;
    position : relative;
    .error {
      color : red;
      font-size: 12px;
      position: relative;
    }
    .formulate-input-error {
      color : red;
      font-size: 10px;
      position: relative;
      list-style-type: none;
    }
    .formulate-input-errors { 
      display : flex;
      margin : 8px;
      padding : 0
    }
    input {
      border : none;
      border-radius: 6px;
      background: rgb(236, 236, 236);
      width: 100%;
      padding : 8px;
      color : rgb(114, 114, 114)
    }
    .overlay {
      background: rgba(255, 255, 255, 0.582);
      position : absolute;
      height : 100%;
      top : 0;
      width : 100%;
      left : 0;
      display : flex;
      justify-content: center;
      align-items: center;
    }
    .spinner-border {
      color : #92c5ff;
      height: 80px;
      width: 80px;
      z-index: 99;
    }
   
  
  }
</style>