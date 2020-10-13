import store from '../../store'
import qs from 'querystring'
import _ from 'lodash'
import fileDownload from 'js-file-download'
import axios from '../../api/axios/axios'
import print from 'print-js'
const token = localStorage.getItem('token')
const state = () => ({
    data :  [],
    dataKrs : [],
    dataMakul : [],
    selectedMakul : null,
    allSks : [],
    allHasil : [],
    semester : {}, khs : []

  })
 
  const actions = {
  cetakKhs({commit}, vals){
 
 commit('cetakKhs', vals)
    // print({
	// 	printable: 'Table',
	// 	type: 'html',
	// 	header: `
	// 	<div class="container">
	// 	<img src="https://uniss.ac.id/wp-content/uploads/2016/10/logo-uniss-512.jpg"/>
	// 	<div class="title">
	// 	    <h4>YAYASAN WAKAF SELAMAT RAHAYU</h4>
	// 	    <h2>UNIVERSITAS SELAMAT SRI (UNISS)</h2>
	// 	    <h2>FAKULTAS ILMU KOMPUTER</h2>
	// 	    <p>SK MENRISTEKDIKTI NOMOR 156/KPT/1/2016</p>
	// 	    <p>Kampus : Jl, Raya Soekarno-Hatta Km : 3 Kendal Telp (0294) 3690057</p>
	// 	    <p>Website : www.uniss.ac.id - Email : admin@uniss.ac.id</p>
		    
	// 	</div>
	// 	<div class="space">
	// 	</div>
		
	// 	</div>
	// 	<hr>
	// 	<h2 class="title-card">KARTU HASIL STUDI</h2>
	// 	<div class="user-card">
	// 	    <div>
	// 	        <p class="profil">${'NAMA' + '&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + '<b>IMRON</b>'}  </p>
	// 	        <p class="profil">${'NIM' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + '<b>20117035</b>'}  </p>
	// 	        <p class="profil">${'PRODI' + '&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + 'S1 - TEKNIK INFORMATIKA'}  </p>  
	// 	    </div>
		    
	// 	    <div>
	// 	        <p class="profil">${'TAHUN MASUK' + '&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + '2017'}  </p>
	// 	        <p class="profil">${'SEMESTER' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + '6'}  </p>
	// 	        <p class="profil">${'TH, AKADEMIK' + '&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + '2019 / 2020'}  </p>  
	// 	    </div>
	// 	</div>
	// 	`,
	// 	style: '.status {margin-bottom : 80px} .hr { margin-bottom:8px} .dekan {width:50%; position:absolute; bottom: 10%; left:50%;}  .tab1{margin:50px !important} .tab2{margin:45px !important} .tab3{margin:96px !important} .desk-hasil {margin-top:50px} table {border-collapse : collapse; border:2px solid} td {text-align:center; border-collapse:collapse} .profil {margin:10px 0px 10px 2px; margin-left:2px;} .user-card{ padding-right:10px;display:flex;justify-content:space-between;border-top:2px solid;border-right:2px solid; border-left:2px solid; margin-top:8px } .title-card {margin:auto; width:100%; text-align:center} hr {border-top:2px solid; width:100%} p {margin:0; color : rgba(100, 100, 100, 0.9)} h2 {margin:0} h4 {margin:0} img {width:15%; height: 110px} .container {width : 100%;display:flex; justify-content:space-between} .title {width:70%; text-align:center} .space{width:15%} '
	//   })
	
	// alert('cetak khs')
  },
  getKrs({commit}, val){
  const user = store.state.auth.profile[0].semester
  const semester = parseInt(user) + 1
  const jurusan = store.state.auth.profile[0].jurusan
  axios.get(`/mahasiswa/cetak/krs/${semester}/${jurusan}/${val}`)
  .then(values => commit('cetakKrs', values.data))
  .catch(err => console.log(err))
  
    
   
  
  },

    actGetData({commit, state}){
        const user_id = store.state.auth.user[0].data.id
        const user = store.state.auth.profile[0]

        
        axios.get(`/mahasiswa/kurikulum/${user.jurusan}`, {
            
          headers : {'Authorization': `Bearer ${token}`
        
        }}).then((res) => {
        // console.log('id_mhs', res)
        
        commit('getData', res.data)
        
        // axios.get(`/dosen/makul/${res.data[0].id_dosen}/dosen_id`, {
            
        //     headers : {'Authorization': `Bearer ${token}`
          
        //   }})
          // .then(result => {
          // console.log(result)
          //   if(result.data.length > 0){
          //   result.data.map(values => {
          //     axios.get(`/dosen/materi/${values.id_makul}/makul_id`)
          //     .then(results => {
          //     console.log(results)
          //       commit('getData', results.data)
          //       resolve()
              
          //     })
          //     .catch(err => err)
          //   })
            
          //   }
           
          //   commit('getMakul', result.data)
          // })
        })
 
 
    },
    

    

    setLoad({commit}){
        commit('setLoading','')
    },
    
  }
  
  const mutations = {
  
  

 
  
 
    
  

    getData(state, val){
      state.data = val
      store.dispatch('components/setLoadFalse')

    },
    
    cetakKrs(state, val){
    if(val.length > 0){
      const sks = []
      val.map((values) => sks.push(values.sks) );

      const allSks =  sks.reduce((a, b) => parseInt(a) + parseInt(b))
      state.allSks = allSks
    state.dataKrs = val
    setTimeout(() => {
    print({
      printable: 'kartuKrs',
      type: 'html',
      maxWidth: 2000,
      style: `

.containerUas {
    border : 2px solid;  
    position:relative;
    overflow:hidden;
    height:630px !important;

}
.setTh {
    width:500px !important;
}

.table-nama {
    width:400px !important;
}

.border {
    border:1px solid
}

.header {
    display: flex;
    padding:8px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border-bottom:2px solid;
    margin-bottom:6px;
}
.header img {
    width:50px;
    height:50px

}
.header .title-card {
    position: absolute;
    width:500px !important ;
    left:50%;
    text-align:center;
    top:25%;
    font-size:24px;
    transform: translate(-50%,-50%);

}
.header .tahun-ajaran {
border:2px solid;
    width:200px;
    text-align : center;
    position:relative;
    right:28px;
    margin:0;
    line-height : 30px;
    font-size:20px;
}
.hr-header {
    border : 1px solid !important;
    width : 100%;
    position:relative;
    top:-3px
}
.header-bio th {
    text-align : left;
}
.header-bio {
    display: flex;
    padding:0 20px;
    justify-content : space-between
}
.table-makul {
    width:100%;
    border-collapse: collapse;
}
.table-nama {

}
.titik-dua {
text-align:right;
padding-right:8px;
}
.makul-table {
    padding : 20px
}
.makul-table th {
    border : 2px solid;
    background-color:rgba(100, 100, 100, 0.4)
}
.makul-table td {
    border : 2px solid;
}
.makul-table .nomor {
    text-align:center
}

.footer {
    height : 100px;
    display: flex;
    padding:0 20px;
    justify-content: space-between;

}
.table-kelas {
    position:relative;
    right : 35px;
    width:400px !important;

}

.keterangan h4 {
    margin:5px 0;
    font-size:16px
}
.ttd {
    padding-top:0px;
}

.ttd h4 {
margin : 0;
font-size:16px

}
.ttd .user {
    margin-top:20px
}
`}, 2000)})
    
  
    } else {
    return false}

    }
   

  }
  export default {
      namespaced : true,
      state,
      actions,
      mutations,
  }
  
  