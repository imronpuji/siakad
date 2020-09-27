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
  const jurusan = store.state.auth.profile[0].jurusan
  axios.get(`/mahasiswa/cetak/krs/${user}/${jurusan}/${val}`)
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
      printable: 'TableKrs',
      type: 'html',
      style: `

      .inbioP {position:relative; width:50%;margin:0px ;}

      .biograph {padding-left:5px;width:100%;border:2px solid; margin-top:15px !important;padding-top:2px; height:140px !important;}

      .inBios {margin-top:8px !important; display:flex; flex-direction:row; }

      .inBio {margin-top:0px; display:flex; flex-direction:row; padding : 0px !important; }

.wrapTh { display:flex; flex-direction:row}
.rest { text-align:center !important}
.wrapSmt {display:flex; flex-direction:row; margin:0px 0px;}
table.bodyTable {
border: 2px solid;
width: 100%;
text-align: left;
border-collapse: collapse;
font-size:10px;

}

table.bodyTables {
border: 2px solid;
width: 100%;
text-align: left;
margin-top:15px;
border-collapse: collapse;
font-size:10px;

}
.jadwal {
text-align:center !important}
.prop {
width:200px !important;
padding-left:5px
}
.bodyTable td {
height:-20px !important;
}
      .titlesBody {margin:0; position:relative !important; width:50%;; height:200px !important; font-size:10px !important;}

.tittlesBodyP {font-size:10px !important; margin:0px !important; !important; position:relative;  } 

.titlesBodySpan {position:absolute !important; right:0 !important; top:0; padding-right:20px !important;}

.signatureMhs {margin-top:15px !important;display:flex; width:100%; justify-content:space-between;}

.titles {text-align:center; width:100%; margin:0 !important;padding:0 !important; line-height:25px; font-size:12px;}

.titleBody.title {text-align:center}

.ketua {margin-bottom:70px; margin-top:20px !important; font-size:10px}

.titleBody {width:100%;border:2px solid; padding-left:5px;height:50px !important; padding-top:2px;}

.mhsP {text-align:center !important;  font-size:10px; width:100% !important; margin-left:5px }
.titleBody.wrapSmt{ display:flex; flex-direction:row;}
.dosenP3 {text-align:center;position:absolute; bottom:5px; left:0; right:0}
.dosenP {text-align:center;position:absolute; bottom:-10px; left:0; right:0; font-size:10px !important}
.titleHeader.title {margin:0;width:100%; text-align:center !important; font-weight:bold;}
.lembar {width:100%; text-align:right; font-size:10px}
.titleHeader img {width:50px !important; height:50px !important; margin-bottom:10px; margin-left:auto; margin-right:auto;}
.signatureKrs {width:100%; display:flex; justify-content:flex-end; margin-top:5px; border:1px}
.titleHeader {width:48% !important; margin-right:30px; display:flex; flex-direction:column} 
.signatureDosen {width:70px !important%;height:60px !important; border:2px solid; position:relative;  padding-top:6px}

table.blueTable {font-size : font-size:10px !important; font-family: Arial, Helvetica, sans-serif;border: 2px solid #000000;background-color: white;width: 100%;text-align: center;border-collapse: collapse; height:10px} 

.boxMhs {width:45% !important;height:60px !important; border:2px solid; margin-right:0px; padding-top:6px; text-align:center}
table.blueTable td, table.blueTable th {white-space: nowrap; border: 2px solid #000000;  font-size:10px !important; } 
.blueTable tr {line-height:5px}
.number { width: 15px; text-align: center !important; } 
.makul {padding-left:4px }
table.blueTable tbody td { height:2px !important; }
.boxKrs {width:48%; position:relative;  display:flex; flex-direction:column; justify-content:flex-end}
p { margin: 0px !important; }
table.blueTable thead { background: #D5D6F7; border-bottom: 2px solid #444444; }
.signature {width:70%; text-align:center}

table.blueTable {
padding:0 !important;
font-family: Arial, Helvetica, sans-serif;
border: 2px solid #000000;
background-color: white;
width: 100%;
text-align: center;
border-collapse: collapse;
}

table.blueTable td,
table.blueTable th {
border: 2px solid #000000;
}

.number {
width: 15px;
text-align: center !important;
}

table.blueTable tbody td {
font-size: 10px;

}

table.blueTable thead {
background: #D5D6F7;
border-bottom: 2px solid #444444;
}


table.blueTable thead th {
font-size: 15px;
font-weight: bold;
color: #000000;
text-align: left;
border-left: 2px solid #000000;

}

table.blueTable thead th:first-child {
border-left: none;
}

.containerss {
position:relative;
z-index:999;
display: flex;
width: 100%;
justify-content: space-between;
flex-direction:row-reverse;

}
.kode {
width: 100px;
padding-left:5px
}

.MK {
text-align: left !important;

padding-left:5px !important;

}





.namaDosen {
font-size : 10px;
font-weight:bold;
margin-top:40px !important;}
table.blueTable thead th { font-size: 15px; font-weight: bold; color: #000000; text-align: left; border-left: 2px solid #000000; } table.blueTable thead th:first-child { border-left: none; } .container { display: flex; width: 100%; justify-content: center; } .kode { width: 100px; } .MK { text-align: left !important } table.blueTable tfoot td { font-size: 14px; } table.blueTable tfoot .links { text-align: right; } table.blueTable tfoot .links a { display: inline-block; background: #1C6EA4; color: #FFFFFF; padding: 2px 8px; border-radius: 5px; }`,
      maxWidth: 2000,
  })
}, 2000)
    
  
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
  