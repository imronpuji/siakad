<template>
  <div class="test">
    <el-row style="margin-bottom: 10px">
        <el-col :span="5">
            <FormulateInput
          type="button"
          label="add"
          data-ghost
          @click="handleClick"
          id="addMhs"
        />
        </el-col>
    </el-row>

    <data-tables :data="data"
        :pagination-props="{ pageSizes: [8, 10, 15] }"
        :action-col="actionCol"
        >
        <el-table-column v-for="title in titles" 
        :prop="title.prop" :label="title.label" :key="title.label">
        </el-table-column>
    </data-tables>

    <sweet-modal ref="modal">
      <div>
        <FormulateForm @submit="edit">
          <CRow>
            <CCol sm="12">
              <FormulateInput v-model="editByName" placeholder="Nama" type="text" name="nama" validation="required"/>
            </CCol>
          </CRow>
          <CRow class="mt-3">
            <CCol sm="6">
              <FormulateInput v-model="editByNim" placeholder="NIM" type="text" name="nim" validation="required"/>
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
    </sweet-modal>
    
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
            <CCol sm="6">
              <FormulateInput placeholder="Nama" type="text" name="nama" validation="required"/>
            </CCol>
            <CCol sm="6">
              <FormulateInput placeholder="NIM" type="number" name="nim" validation="required"/>
            </CCol>
          </CRow>
          <CRow class="mt-4">
            <CCol sm="12">
              <FormulateInput placeholder="Kontak" type="number" name="kontak" validation="required|number"/>
            </CCol>
          </CRow>
          <CRow class="mt-4">
            <CCol sm="6">
              <FormulateInput
                name="password"
                type="password"
                placeholder="Your password"
                validation="required"
              />
            </CCol>
            <CCol sm="6">
              <FormulateInput
                type="password"
                name="password_confirm"
                placeholder="Confirm password"
                validation="required|confirm"
                validation-name="Confirmation"
              />
            </CCol>
          </CRow>
          <CRow class="mt-4">
            <CCol sm="12">
              <b-button type="submit" class="w-100">Buat</b-button>
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
    
    <div class="overlay" v-if="$store.state.admin_mahasiswa.loading">
      <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'


var titles = [{
    prop: "nim",
    label: "NIM"
    }, {
    prop: "nama",
    label: "Nama"
    }, {
    prop: "kontak",
    label: "Kontak"
    },
    {
        prop: "photo",
        label: "Foto"
    }]

export default {
  computed : mapState({
    data : state => state.admin_mahasiswa.data
  }),
  created(){
    if(this.data.length < 1){
    this.$store.dispatch('admin_mahasiswa/actGetData')
    this.$store.dispatch('admin_mahasiswa/setLoad')
    }
  },

  data() {
     return {
        formValues : {},   
        editById : '',
        editByName : '',
        editByNim : '',
        editByKontak : '',
        deleteById : '',
        titles,
       actionCol: {
        label: 'Actions',
        props: {
          align: 'center',
        },
        buttons: [{
          props: {
            type: 'primary',
            icon: 'el-icon-edit'
          },
          handler: row => {
            this.$refs.modal.open()
            this.editByName = row.nama
            this.editByKontak = row.kontak
            this.editByNim = row.nim
            this.editById = row.user_id
          },
          label: 'Edit'
        }, {
          handler: row => {
            this.deleteById = row.nim
            this.$refs.modalDelete.open()
          },
          label: 'delete'
        }]
      }
     
     
     
     }
   },
   methods : {
       handleClick(){
           this.$refs.modalAdd.open()
           const errors = {
            fieldErrors: { username: 'Sorry, no such username exists!' },
            formErrors: ['Incorrect login, please try again.']
          }
          this.$formulate.handle(errors, 'buat')
           this.$formulate.reset('buat')
       },
       edit(){
         const data = {
           nama : this.editByName,
           kontak : this.editByKontak,
           nim : this.editByNim,
           user_id : this.editById
         }
         this.$refs.modal.close()
          this.$store.dispatch('admin_mahasiswa/actEdit', data).then(() => {
          this.$refs.success.open()
        })
        this.$store.dispatch('admin_mahasiswa/setLoad')
       },
       del(){
          
            this.$store.dispatch('admin_mahasiswa/dels', this.deleteById)
              .then(() => this.$refs.success.open() )
              .catch(() => this.$refs.gagal.open())

            this.$store.dispatch('admin_mahasiswa/setLoad')
            this.$refs.modalDelete.close()
       },
       buat(){
           this.$store.dispatch('admin_mahasiswa/actAdd', this.formValues).then(() => {
            this.$refs.success.open()
           })
           this.$store.dispatch('admin_mahasiswa/setLoad')
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