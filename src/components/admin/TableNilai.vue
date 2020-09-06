<template>
  <div class="test">
    
    <data-tables :data="data"
        :pagination-props="{ pageSizes: [8, 10, 15] }"
        >
        <el-table-column v-for="title in titles" 
        :prop="title.prop" 
        :label="title.label" 
        :key="title.label">
        </el-table-column>
    </data-tables>
    
    <sweet-modal icon="success" ref="success">
        success!
    </sweet-modal>

    <sweet-modal icon="failed" ref="gagal">
        gagal!
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
// import _ from 'loda'
var titles = [{
        prop: "nama",
        label: "Mahasiswa"
    }, 
    {
        prop: "nama_makul",
        label: "Mata Kuliah"
    }, 
    {
        prop: "nilai_huruf",
        label: "Nilai Huruf"
    },
    {
        prop: "nilai_angka",
        label: "Nilai Angka"
    }]

export default {
  computed : mapState({
    data : state => state.admin_nilai.data,
  }),
  created(){
   
      this.$store.dispatch('admin_nilai/actGetData')
      this.$store.dispatch('components/setLoad')
 
 
  },

  data() {
     return {

        titles,
        
     }
   },
 
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
      background: rgb(172, 72, 72);
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
    select {
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