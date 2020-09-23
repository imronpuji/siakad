import store from '../../store'
import qs from 'querystring'
import _ from 'lodash'
import fileDownload from 'js-file-download'
import axios from '../../api/axios/axios'
import print from 'print-js'
const token = localStorage.getItem('token')
const state = () => ({
    data :  [],
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
  
  cetakTranskip({commit}, val){
    commit('cetakTranskip', '')
  },

 
    actGetData({commit, state}){
        const user = store.state.auth.profile[0]
       
        // console.log('id_mhs', res)
        
        axios.get(`/mahasiswa/cetak/khs/${user.id_mahasiswa}`)
        .then((result) => {
            console.log(result)
            let semester = _.unionBy(result.data.data, 'semester');
            
              
            const hasil = []
        
            const sks = []
            result.data.data.map((val) => sks.push(val.sks) );
    
            result.data.data.map(val => hasil.push(parseInt(val.sks) * parseInt(val.nilai_angka)))
            const allHasil =  hasil.reduce((a, b) => a + b)
            const allSks =  sks.reduce((a, b) => parseInt(a) + parseInt(b))
            const data = {
            allSks, allHasil}
            commit('setSksHasil', data)
            commit('setSmt', semester)
            commit('getData', [...result.data.data ])
        }).catch(err =>      store.dispatch('components/setLoadFalse')
        )
        
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
        
 
    },
    

    

    setLoad({commit}){
        commit('setLoading','')
    },
    
  }
  
  const mutations = {
  
  
    cetakTranskip(state, values){
          
         if(state.data.length < 1){
         return false } else {
          const hasil = []
              
                  const sks = []
                  state.data.map((val) => sks.push(val.sks) );
          
                  state.data.map(val => hasil.push(parseInt(val.sks) * parseInt(val.nilai_angka)))
                  const allHasil =  hasil.reduce((a, b) => a + b)
                  const allSks =  sks.reduce((a, b) => parseInt(a) + parseInt(b))
                  
                  state.allHasil = allHasil
                  state.allSks = allSks

                  const user = store.state.auth.profile[0]
                  
                  const beforeAkademik = new Date()
                  beforeAkademik.setFullYear(beforeAkademik.getFullYear() - 1)
                  
                  const afterAkademik = new Date()
                  afterAkademik.setFullYear(afterAkademik.getFullYear() + 1)
                  
                  setTimeout(() => {
                  
                      print({
                          printable: 'TableTranskip',
                          type: 'html',
                          maxWidth : 2000,
                          header: `
                          <div class="container">
                          <img src="https://uniss.ac.id/wp-content/uploads/2016/10/logo-uniss-512.jpg"/>
                          <div class="title">
                              <h4>YAYASAN WAKAF SELAMAT RAHAYU</h4>
                              <h2>UNIVERSITAS SELAMAT SRI (UNISS)</h2>
                              <h2>FAKULTAS ILMU KOMPUTER</h2>
                              <p>SK MENRISTEKDIKTI NOMOR 156/KPT/1/2016</p>
                              <p>Kampus : Jl, Raya Soekarno-Hatta Km : 3 Kendal Telp (0294) 3690057</p>
                              <p>Website : www.uniss.ac.id - Email : admin@uniss.ac.id</p>
                              
                          </div>
                          <div class="space">
                          </div>
                          
                          </div>
                          <hr>
                          <h2 class="title-card">TRANSKIP NILAI</h2>
                          <div class="user-card">
                              <div>
                      <p class="profil">${'NAMA' + '&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + `<b>${user.nama} </b>`}  </p>
                                  <p class="profil">${'NIM' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + `<b>${user.nim}</b>`}  </p>
                                  <p class="profil">${'PRODI' + '&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + `S1 - ${user.jurusan}`}  </p>  
                              </div>
                              
                              <div>
                                  <p class="profil">${'TAHUN MASUK' + '&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + `${user.tahun_masuk}`}  </p>
                                  <p class="profil">${'SEMESTER' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + `${user.semester}`}  </p>
                                  <p class="profil">${'TH, AKADEMIK' + '&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + `${user.semester % 2 == 0 ? beforeAkademik.getFullYear() + '/' +  new Date().getFullYear() : new Date().getFullYear() + '/' +  afterAkademik.getFullYear()}`}  </p>  
                              </div>
                          </div>
                          `,
                          style: '#TableTranskip {width:100%} .status {margin-bottom : 80px} .hr { margin-bottom:8px} .dekan {width:30%; position:relative; bottom: 10%; left:50%;}  .tab1{margin:50px !important} .tab2{margin:45px !important} .tab3{margin:96px !important} .desk-hasil {margin-top:50px} table {border-collapse : collapse; border:2px solid; width:100%} td {text-align:center; border-collapse:collapse} .profil {margin:10px 0px 10px 2px; margin-left:2px;} .user-card{ padding-right:10px;display:flex;justify-content:space-between;border-top:2px solid;border-right:2px solid; border-left:2px solid; margin-top:8px } .title-card {margin:auto; width:100%; text-align:center} hr {border-top:2px solid; width:100%} p {margin:0; color : rgba(100, 100, 100, 0.9)} h2 {margin:0} h4 {margin:0} img {width:15%; height: 140px} .container {width : 100%;display:flex; justify-content:space-between;} .title {width:70%; text-align:center} .space{width:15%} '
                        })
                  }, 2000)
                }
          
        },
  
  cetakKhs(state, values){
  console.log(values)
    if(values != undefined){
    let data = state.data.filter(val => val.semester == values)
    
   
    const hasil = []
        
            const sks = []
            data.map((val) => sks.push(val.sks) );
    
            data.map(val => hasil.push(parseInt(val.sks) * parseInt(val.nilai_angka)))
            const allHasil =  hasil.reduce((a, b) => a + b)
            const allSks =  sks.reduce((a, b) => parseInt(a) + parseInt(b))
            
            state.allHasil = allHasil
            state.allSks = allSks
            state.khs = data
            const user = store.state.auth.profile[0]
            
            const beforeAkademik = new Date()
            beforeAkademik.setFullYear(beforeAkademik.getFullYear() - 1)
            
            const afterAkademik = new Date()
            afterAkademik.setFullYear(afterAkademik.getFullYear() + 1)
            
            setTimeout(() => {
            
                print({
                    printable: 'Table',
                    type: 'html',
                    maxWidth : 2000,
                    header: `
                    <div class="container">
                    <img src="https://uniss.ac.id/wp-content/uploads/2016/10/logo-uniss-512.jpg"/>
                    <div class="title">
                        <h4>YAYASAN WAKAF SELAMAT RAHAYU</h4>
                        <h2>UNIVERSITAS SELAMAT SRI (UNISS)</h2>
                        <h2>FAKULTAS ILMU KOMPUTER</h2>
                        <p>SK MENRISTEKDIKTI NOMOR 156/KPT/1/2016</p>
                        <p>Kampus : Jl, Raya Soekarno-Hatta Km : 3 Kendal Telp (0294) 3690057</p>
                        <p>Website : www.uniss.ac.id - Email : admin@uniss.ac.id</p>
                        
                    </div>
                    <div class="space">
                    </div>
                    
                    </div>
                    <hr>
                    <h2 class="title-card">KARTU HASIL STUDI</h2>
                    <div class="user-card">
                        <div>
                <p class="profil">${'NAMA' + '&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + `<b>${user.nama} </b>`}  </p>
                            <p class="profil">${'NIM' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + `<b>${user.nim}</b>`}  </p>
                            <p class="profil">${'PRODI' + '&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + `S1 - ${user.jurusan}`}  </p>  
                        </div>
                        
                        <div>
                            <p class="profil">${'TAHUN MASUK' + '&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + `${user.tahun_masuk}`}  </p>
                            <p class="profil">${'SEMESTER' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + `${user.semester}`}  </p>
                            <p class="profil">${'TH, AKADEMIK' + '&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;' + `${user.semester % 2 == 0 ? beforeAkademik.getFullYear() + '/' +  new Date().getFullYear() : new Date().getFullYear() + '/' +  afterAkademik.getFullYear()}`}  </p>  
                        </div>
                    </div>
                    `,
                    style: ' .jumlah {text-align:center}  #Table{width:100%; border:none}  .status {margin-bottom : 80px} .hr { margin-bottom:8px} .dekan {width:30%; position:relative; bottom: 10%; left:50%;}  .tab1{margin:50px !important} .tab2{margin:45px !important} .tab3{margin:96px !important} .desk-hasil {margin-top:50px} table {border-collapse : collapse; border:2px solid; width:1000px} td, th {text-align:center; border-collapse:collapse; border:1px solid} .profil {margin:10px 0px 10px 2px; margin-left:2px;} .user-card{ padding-right:10px;display:flex;justify-content:space-between;border-top:2px solid;border-right:2px solid; border-left:2px solid; margin-top:8px } .title-card {margin:auto; width:100%; text-align:center} hr {border-top:2px solid; width:100%} p {margin:0; color : rgba(100, 100, 100, 0.9)} h2 {margin:0} h4 {margin:0} img {width:15%; height: 140px} .container {width : 100%;display:flex; justify-content:space-between;} .title {width:70%; text-align:center} .space{width:15%} '
                  })
            }, 2000)
    
    }
    
  },
  
  
 
    
    setSmt(state, val){
        const smt = []
        val.filter(values => smt.push({semester : values.semester}))
        state.semester = smt
    },

  
    setSksHasil(state, val){
        state.allHasil = val.allHasil
        state.allSks = val.allSks
    },

    getData(state, val){
      state.data = val
      store.dispatch('components/setLoadFalse')

    },
   

  }
  export default {
      namespaced : true,
      state,
      actions,
      mutations,
  }
  