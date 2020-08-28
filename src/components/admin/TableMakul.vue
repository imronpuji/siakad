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
              <FormulateInput v-model="editBySks" placeholder="SKS" type="text" name="sks" validation="required"/>
            </CCol>
            <CCol sm="6">
              <FormulateInput v-model="editBySmt" placeholder="Semester" type="text" name="semester" validation="required|number"/>
            </CCol>
          </CRow>
          <CRow class="mt-3">
            <CCol>
              <select required v-model="selectedDosen">
              <option v-for="data in $store.state.admin_dosen.data" :key="data.id" :value="{nama:data.nama, id:data.id}">{{data.nama}}</option>
            </select>
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
              <FormulateInput placeholder="SKS" type="number" name="sks" validation="required"/>
            </CCol>
          </CRow>
          <CRow class="mt-4">
            <CCol sm="12">
              <FormulateInput placeholder="Semester" type="number" name="semester" validation="required|number"/>
            </CCol>
          </CRow>
          <CRow  class="mt-3">
            <CCol>
              <select required v-model="selectedDosen">
              <option v-for="data in $store.state.admin_dosen.data" :key="data.id" :value="{nama:data.nama, id:data.id}">
                <h1>{{data.nama}}</h1>
              </option>
                </select>
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
    
    <div class="overlay" v-if="$store.state.admin_makul.loading">
      <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
      </div>
    </div>

    <sweet-modal ref="openDosen">
        <b-input placeholder="Cari Dosen"/>
         <data-tables :data="$store.state.admin_dosen.data"
        :pagination-props="{ pageSizes: [8, 10, 15] }"
        :action-col="actionColDosen"
        >
        <el-table-column v-for="title in titlesDosen" 
        :prop="title.prop" :label="title.label" :key="title.label">
        </el-table-column>
    </data-tables>

    </sweet-modal>
  </div>
</template>
<script>

import { mapState } from 'vuex'
var titles = [{
        prop: "nama",
        label: "Nama"
    }, 
    {
        prop: "sks",
        label: "SKS"
    }, 
    {
        prop: "semester",
        label: "Semester"
    },
    {
        prop: "id_dosen",
        label: "id_dosen"
    }]

var titlesDosen = [{
        prop: "nama",
        label: "Nama"
    }, 
    {
        prop: "nik",
        label: "NIK"
    }, 
    {
        prop: "kontak",
        label: "Kontak"
    }]

export default {
  computed : mapState({
    data : state => state.admin_makul.data,
  }),
  created(){
    if(this.data.length < 1){
    this.$store.dispatch('admin_makul/actGetData')
    this.$store.dispatch('admin_dosen/actGetData')
    this.$store.dispatch('admin_makul/setLoad')

    } 
  },

  data() {
     return {
        selectedDosen : '',
        id_dosen : '',
        formValues : {},   
        editById : '',
        editByName : '',
        editBySks : '',
        editBySmt : '',
        deleteById : '',
        titles,
        titlesDosen,
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
              this.editBySks = row.sks
              this.editBySmt= row.semester
              this.editById = row.id
            },
            label: 'Edit'
          }, {
            handler: row => {
              this.deleteById = row.id
              this.$refs.modalDelete.open()
            },
            label: 'delete'
          }]
        },
        actionColDosen: {
        label: 'Actions',
        props: {
          align: 'center',
        },
        buttons: [{
          props: {
            type: 'primary',
            icon: 'el-icon-plus'
          },
          handler: row => {
            this.selectedDosen = row.nama
            this.id_dosen = row.id
            this.$refs.openDosen.close()
          },
          label : 'Pilih'}]}
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
       openDosen(){
        this.$store.dispatch('admin_makul/actGetData')
         this.$refs.openDosen.open()
       },
       edit(){
         console.log(this.selectedDosen)
         const data = {
           nama : this.editByName,
           id : this.editById,
           semester : this.editBySmt,
           sks : this.editBySks,
           id_dosen : this.id_dosen
         }
         console.log(data)
         this.$refs.modal.close()
          this.$store.dispatch('admin_makul/actEdit', data).then(() => {
          this.$refs.success.open()
        })
        this.$store.dispatch('admin_makul/setLoad')
       },
       del(){
          
            this.$store.dispatch('admin_makul/dels', this.deleteById)
              .then(() => this.$refs.success.open() )
              .catch(() => this.$refs.gagal.open())

            this.$store.dispatch('admin_makul/setLoad')
            this.$refs.modalDelete.close()
       },
       buat(){
         const data = {
           ...this.formValues,
           id_dosen : this.id_dosen
         }
           this.$store.dispatch('admin_makul/actAdd', data).then(() => {
            this.$refs.success.open()
           })
           this.$store.dispatch('admin_makul/setLoad')
           this.$refs.modalAdd.close()
      
       }
   }
  }
</script>
<style lang="scss">
  .dosen-btn:hover {
    cursor : ns-resize !important;
    border : 0px solid
  }
  #addMhs {
    background:rgb(63, 178, 255) !important;
    border : none;
    color : white;
    border-radius: 4px;
    height : 40px;
    width: 80px;
  }
  select {
     border : none;
      border-radius: 6px;
      background: rgb(236, 236, 236);
      width: 100%;
      padding : 8px;
      color : rgb(114, 114, 114)
  }
  optgroup, option {
    border : 100px solid !important
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