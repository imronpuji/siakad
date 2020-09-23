<template>

  <div class="test">

    <el-row style="margin-bottom: 10px">
    
        
    <el-col :span="10">
        <el-select placeholder="Pilih Semester" v-model="filters[0].value" multiple="multiple">
          <el-option label="SMT 1" value="1"></el-option>
          <el-option label="SMT 2" value="2"></el-option>
          <el-option label="SMT 3" value="3"></el-option>
          <el-option label="SMT 4" value="4"></el-option>
          <el-option label="SMT 5" value="5"></el-option>
          <el-option label="SMT 6" value="6"></el-option>
          <el-option label="SMT 7" value="7"></el-option>
          <el-option label="SMT 8" value="8"></el-option>
        </el-select>
    </el-col>
    </el-row>

    <data-tables 
      :data="data"
      :pagination-props="{ pageSizes: [6, 10, 15] }"
      :filters="filters"
      >
      <el-table-column v-for="title in titles" 
        :prop="title.prop" :label="title.label" :key="title.label">
      </el-table-column>
    </data-tables>


    <sweet-modal icon="success" ref="success">
        success!
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

    prop: "semester",

    label: "Semester"
  },
  
  {
    
    prop: "nama_makul",
    
    label: "Mata Kuliah"
  
  },
  {
    
    prop: "sks",
    
    label: "SKS"
  
  },
  {
    
    prop: "nama",
    
    label: "Dosen"
  
  },

  
  
]

export default {

  computed : {
  data(){
       return this.$store.state.mhs_kurikulum.data
    },
  },

  created(){
    
    if(this.data.length < 1)
      {
        const token = this.$store.state.auth.token
        this.$store.dispatch('mhs_kurikulum/actGetData', token)
        
        this.$store.dispatch('components/setLoad')

      } else {
                this.$store.dispatch('components/setLoadFalse')
      }

  },

  data() {

    return {
    
      
      titles,
      
      filters: [{
        
        value: '',
        
        prop: 'semester',
        
        }, 

        {
          
          value: []
        
      }],
        
 
    }
  },
  methods : {

    handleClick(command){
      const data = this.$store.state.mhs_transkip.data
      const table = document.getElementById('Table')
      if(command == 'transkip')

        {
            this.$store.dispatch('mhs_transkip/cetakTranskip')
        }
    
    },

  


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
  #Table {
    width:100%;
    height : 0px;
    visibility: hidden;

    table {
        width : 100%;
        border-collapse: collapse;
    }

th, td {
  border: 1px solid black;
  padding:10px
}
.jumlah {
    border:none;
    padding-right:100px
}
  }
#TableTranskip {
    width:100%;
    height : 0px;
    visibility:  hidden;
    table {
        width : 100%;
    }
    table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
}
.dekan {
    width:50%;
    .hr {
    margin-bottom :20px}
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
    .tab1{
    margin:50px !important}
    .tab2{
    margin:49px !important}
    .tab3{
    margin:103px !important}
    .spinner-border {
      color : #92c5ff;
      height: 80px;
      width: 80px;
      z-index: 99;
    }
   
  
  }
</style>