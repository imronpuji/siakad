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
        <FormulateInput placeholder="Pencarian" v-model="filters[0].value"/>
      </el-col>

    </el-row>

    <data-tables 
      :data="data"
      :pagination-props="{ pageSizes: [6, 10, 15] }"
      :action-col="actionCol"
      :filters="filters"
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
              <FormulateInput v-model="editByEmail" placeholder="Email" type="text" name="email" validation="required|email"/>
            </CCol>
          </CRow>

          <CRow class="mt-4">
            <CCol sm="6" class="mt-3">
              <FormulateInput v-model="editByJurusan" placeholder="Jurusan" type="text" name="jurusan" validation="required"/>
            </CCol>
            <CCol sm="6" class="mt-3">
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
             <FormulateInput
                type="file"
                @change="previewFiles"
             />
            </CCol>
            </CRow>
          <CRow>
            <CCol sm="6" class="mt-3">
              <FormulateInput placeholder="Nama" type="text" name="judul" validation="required"/>
            </CCol>
            <CCol sm="6" class="mt-3">
                <select class="select-css" v-model="selectedMakul" required >
                    <option v-for="data in $store.state.dosen_nilai.dataMakul" :key="data.id_makul" :value="{id_makul:data.id_makul, semester:data.semester, nama_makul:data.nama_makul}">
                        <h1>{{data.nama_makul}}</h1>
                    </option>
                </select>
            </CCol>
          </CRow>

          <CRow>
            <CCol sm="12" class="mt-3">
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
    
    <div class="overlay" v-if="$store.state.components.loading">
      <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
      </div>
    </div>

  </div>

</template>
<script>

import { mapState } from 'vuex'
import XLSX from 'xlsx'
import axios from '../../api/axios/axios'
import qs from 'querystring'

var titles = [
  {
    
    prop: "judul",
    
    label: "Judul"

  },

  {

    prop: "file",

    label: "File"
  },
  {

    prop: "nama_makul",

    label: "Mata Kuliah"
  },
  
]

export default {

  computed :{
    data(){
       return this.$store.state.dosen_materi.data
    },
  },

  created(){
    
        const token = this.$store.state.auth.token
        this.$store.dispatch('dosen_materi/actGetData', token)
        this.$store.dispatch('dosen_nilai/actGetDataMakul')

        this.$store.dispatch('components/setLoad')

  },
  

  data() {

    return {
      selectedMakul : null,

      formValues : {},   
      
      editById : '',
      
      editByName : '',

      editByJurusan : '',
      
      editByNim : '',
      
      editByEmail : '',

      editByTahunMasuk : '',
      
      deleteById : '',
      
      metaDataFile : '',
      
      titles,
      
      filters: [{
        
        value: '',
        
        prop: 'nama',
        
        }, 

        {
          
          value: []
        
      }],
        
      actionCol: {
          
        label: 'Actions',
          
        props: {
          
          align: 'center',

        },
        
        buttons: [{
          //   props: {
          //     type: 'primary',
          //     icon: 'el-icon-edit'
          //   },
          //   handler: row => {
          //     this.$refs.modal.open()
          //     this.editByName = row.nama
          //     this.editByEmail = row.email
          //     this.editByNim = row.nim
          //     this.editById = row.id_mahasiswa
            
          //   },
          //   label: 'Edit'
          // }, {
          props: {

            type: 'primary',

            icon: 'el-icon-delete'

          },

          handler: row => {

            this.deleteById = row.user_id

            this.$refs.modalDelete.open()

          },

          label: 'delete'
          
        }]

      } 
    }
  },
  methods : {

    handleClick(command){
      
      if(command == 'import')

        {
          this.$refs.modalImport.open()
          this.$formulate.reset('import')
        
        }

      else 
        
        {
          
          this.$refs.modalAdd.open()
          this.$formulate.reset('buat')
        }
    
    },

    imports() {
      
      this.$refs.modalImport.open()
    
    },
    
    edit(){
    
      const data = {
        
        nama : this.editByName,
        
        email : this.editByEmail,
        
        nim : this.editByNim,
        
        id_mahasiswa : this.editById
      
      }
    
      this.$refs.modal.close()
      
      this.$store.dispatch('dosen_materi/actEdit', data).then(() => {
      
        this.$refs.success.open()
      
      })

      this.$store.dispatch('dosen_materi/setLoad')
      
    },
    
    del(){
      this.$store.dispatch('components/setLoad')
      
      this.$store.dispatch('dosen_materi/dels', this.deleteById)
      
        .then(() => this.$refs.success.open() )
        
        .catch(() => {
          
          this.$refs.gagal.open()
        
      })
      
      
      
      this.$refs.modalDelete.close()
    
    },
    
    buat(){

      const data = {
          ...this.formValues,
          file : this.metaDataFile,
          makul_id : this.selectedMakul.id_makul,
          nama_makul : this.selectedMakul.nama_makul

      }
      this.$store.dispatch('dosen_materi/actAdd', data)
      
        .then(() => {
          
          this.$refs.success.open()
        
      })
      
      this.$store.dispatch('components/setLoad')
      
      this.$refs.modalAdd.close()
      
      const errors = {
        
        fieldErrors: { username: 'Sorry, no such username exists!' },
        
        formErrors: ['Incorrect login, please try again.']
      
      }
      
      this.$formulate.handle(errors, 'buat')
      
      this.$formulate.reset('buat')
 
    
    },
    previewFiles(oEvent) {
        var oFile = oEvent.target.files[0];
        this.metaDataFile = oFile   
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
    overflow: hidden;
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
      width: 100% !important;
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