<template>
<div class="test">

    <el-row style="margin-bottom: 10px">

        <el-col :span="4">
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

        <el-col :span="4" :offset="1">
            <el-dropdown @command="handleClick">
                <el-button v-if="$store.state.auth.profile[0]['status_krs'] == 'buka'" type="primary">Cetak KRS<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                <el-button disabled v-else type="primary">Cetak KRS<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="A">Kelas A</el-dropdown-item>
                    <el-dropdown-item command="B">Kelas B</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <!-- <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="$store.state.auth.profile[0].semester">SMT {{$store.state.auth.profile[0].semester}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown> -->
        </el-col>

        <el-col :span="4">

            <el-button v-if="$store.state.auth.profile[0]['status_uts'] == 'buka'" type="primary" @click="cetakUts">Cetak UTS</el-button>
            <el-button disabled v-else type="primary">Cetak UTS</el-button>

        </el-col>
        <el-col :span="4">

            <el-button v-if="$store.state.auth.profile[0]['status_uas'] == 'buka'" type="primary" @click="cetakUas">Cetak UAS</el-button>
            <el-button disabled v-else type="primary">Cetak UAS</el-button>

        </el-col>

    </el-row>

    <data-tables :data="data" :table-props="tableProps" :pagination-props="{ pageSizes: [6, 10, 15] }" :filters="filters">
        <el-table-column v-for="title in titles" sortable="custom" :prop="title.prop" :label="title.label" :key="title.label">
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

    <div id="kartuKrs" class="containerUas">

        <div class="header">
            <img src="https://uniss.ac.id/wp-content/uploads/2018/07/cropped-LOGO-UNISS-PNG.png" alt="">
            <h3 class="title-card">
                KARTU RENCANA STUDI
            </h3>
            <h3 class="tahun-ajaran">
                TA 2019/2020
            </h3>
        </div>
        <div class="header-bio">
            <table class="table-nama">
                <tr>
                    <td>Nama</td>
                    <td>:</td>
                    <th class="setTh">{{$store.state.auth.profile[0].nama}}</th>
                </tr>
                <tr>
                    <td>NIM</td>
                    <td>:</td>
                    <th class="setTh">{{$store.state.auth.profile[0].nim}}</th>
                </tr>
                <tr>
                    <td>Fakultas</td>
                    <td>:</td>
                    <th class="setFilkom"> Ilmu Komputer</th>
                </tr>

            </table>
            <table class="table-kelas">
                <tr>
                    <td class="setTd">Kelas</td>
                    <td>:</td>
                    <th class="setTh">{{kelasKrs}}</th>
                </tr>
                <tr>
                    <td class="setTd">Semester</td>
                    <td>:</td>
                    <th class="setTh">{{parseInt($store.state.auth.profile[0].semester) + 1}}</th>
                </tr>
                <tr>
                    <td class="setTd">Progam Studi</td>
                    <td>:</td>
                    <th class="setTh">S-1 {{$store.state.auth.profile[0].jurusan}}</th>
                </tr>

            </table>
        </div>
        <div class="makul-table">

            <table border="2" class="table-makul">
                <tr>
                    <th>No</th>
                    <th>Kode Makul</th>
                    <th>Mata Kuliah</th>
                    <th>SKS</th>
                </tr>
                <tr v-for="(dataKrs, index) in $store.state.mhs_kurikulum.dataKrs" :key="index">
                    <td class="nomor">{{index + 1}}</td>
                    <td class="kodemakul">{{dataKrs.id_makul}}</td>
                    <td class="namamakul">{{dataKrs.nama_makul}}</td>
                    <td class="sks">{{dataKrs.sks}}</td>
                </tr>

            </table>
        </div>
        <div v-if="$store.state.auth.profile[0].jurusan == 'informatika'" class="footer">
            <div class="keterangan">
                <h4>Mahasiswa</h4>

            </div>
            <div class="ttd">
                <h4>Dosen Wali</h4>
                <h4 class="user">Hasnan Afif, S.kom. ,M.Kom.</h4>

            </div>

            <div class="ttd">
                <h4>Ketua Program Studi</h4>
                <h4 class="user">Yusuf Wahyu Setia Putra S.kom. ,M.Kom.</h4>

            </div>

        </div>
        
        <div v-else class="footer">
            <div class="keterangan">
                <h4>Mahasiswa</h4>

            </div>
            <div class="ttd">
                <h4>Dosen Wali</h4>
                <h4 v-if="$store.state.auth.profile[0].semester == '1'" class="user">
                     Pradnya Paramitha, S.Sn., M.A.
                </h4>
                <h4 v-if="$store.state.auth.profile[0].semester == '3' || $store.state.auth.profile[0].semester == '5' " class="user">
                     Rahmawati S.Pd., M.Pd
                </h4>
                <h4 v-if="$store.state.auth.profile[0].semester == '7'" class="user">
                     Juni Amanullah, S.Pd., M.Pd.
                </h4>

            </div>

            <div class="ttd">
                <h4>Ketua Program Studi</h4>
                <h4 class="user">Rahmawati S.Pd., M.Pd</h4>

            </div>

        </div>

    </div>

    <div id="kartuUas" class="containerUas">
        <img class="img-banner" src="https://uniss.ac.id/wp-content/uploads/2018/07/cropped-LOGO-UNISS-PNG.png" alt="">

        <div class="header">
            <img src="https://uniss.ac.id/wp-content/uploads/2018/07/cropped-LOGO-UNISS-PNG.png" alt="">
            <h3 class="title-card-test">
                KARTU UJIAN AKHIR SEMESTER
            </h3>
            <h3 class="tahun-ajaran">
                TA 2019/2020
            </h3>
        </div>
        <!-- <hr class="hr-header"> -->
        <div class="header-bio">
            <table class="table-nama">
                <tr>
                    <td>Nama</td>
                    <td class="titik-dua">:</td>
                    <th class="setTh">{{$store.state.auth.profile[0].nama}}</th>
                </tr>
                <tr>
                    <td>NIM</td>
                    <td class="titik-dua">:</td>
                    <th class="setTh">{{$store.state.auth.profile[0].nim}}</th>
                </tr>
                <tr>
                    <td>Fakultas</td>
                    <td class="titik-dua">:</td>
                    <th class="setTh">Ilmu Komputer lkjlkjlkjlkjlkjlkjlkj</th>
                </tr>

            </table>
            <table class="table-kelas">
                <tr>
                    <td>Kelas</td>
                    <td class="titik-dua">:</td>
                    <th>{{$store.state.auth.profile[0].kelas}}</th>
                </tr>
                <tr>
                    <td>Semester</td>
                    <td class="titik-dua">:</td>
                    <th>{{$store.state.auth.profile[0].semester}}</th>
                </tr>
                <tr>
                    <td>Progam Studi</td>
                    <td class="titik-dua">:</td>
                    <th>{{$store.state.auth.profile[0].jurusan}}</th>
                </tr>

            </table>
        </div>
        <div class="makul-table">

            <table border="2" class="table-makul">
                <tr>
                    <th>No</th>
                    <th>Mata Kuliah</th>
                    <th>SKS</th>
                    <th>Dosen Pengampu</th>
                    <th>Ttd Pengawas</th>
                </tr>
                <tr v-for="(number, index) in 9" :key="index">
                    <td class="nomor">{{index + 1}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

            </table>
        </div>
        <div class="footer">
            <div class="keterangan">
                <h4>Kartu WAJIB dibawa Selama ujian</h4>
                <h4>Berlaku Sampai Selesai</h4>
            </div>
            <div class="ttd">
                <h4>Kendal, {{new Date().getDate() + ' ' + new Date().toLocaleString('default', { month: 'long' }) + ' ' + new Date().getFullYear()}}</h4>
                <h4>Ketua Panitia</h4>
                <h4 class="user">Abdul Majid, S.Si., M.Sc.</h4>
            </div>
        </div>
    </div>
    <div id="kartuUts" class="containerUas">
        <img class="img-banner" src="https://uniss.ac.id/wp-content/uploads/2018/07/cropped-LOGO-UNISS-PNG.png" alt="">

        <div class="header">
            <img src="https://uniss.ac.id/wp-content/uploads/2018/07/cropped-LOGO-UNISS-PNG.png" alt="">
            <h3 class="title-card-test">
                KARTU UJIAN TENGAH SEMESTER
            </h3>
            <h3 class="tahun-ajaran">
                TA 2019/2020
            </h3>
        </div>
        <!-- <hr class="hr-header"> -->
        <div class="header-bio">
            <table class="table-nama">
                <tr>
                    <td>Nama</td>
                    <td class="titik-dua">:</td>
                    <th class="setTh">{{$store.state.auth.profile[0].nama}}</th>
                </tr>
                <tr>
                    <td>NIM</td>
                    <td class="titik-dua">:</td>
                    <th class="setTh">{{$store.state.auth.profile[0].nim}}</th>
                </tr>
                <tr>
                    <td>Fakultas</td>
                    <td class="titik-dua">:</td>
                    <th class="setTh">Ilmu Komputer </th>
                </tr>

            </table>
            <table class="table-kelas">
                <tr>
                    <td>Kelas</td>
                    <td class="titik-dua">:</td>
                    <th>{{$store.state.auth.profile[0].kelas}}</th>
                </tr>
                <tr>
                    <td>Semester</td>
                    <td class="titik-dua">:</td>
                    <th>{{$store.state.auth.profile[0].semester}}</th>
                </tr>
                <tr>
                    <td>Progam Studi</td>
                    <td class="titik-dua">:</td>
                    <th>{{$store.state.auth.profile[0].jurusan}}</th>
                </tr>

            </table>
        </div>
        <div class="makul-table">

            <table border="2" class="table-makul">
                <tr>
                    <th>No</th>
                    <th>Mata Kuliah</th>
                    <th>SKS</th>
                    <th>Dosen Pengampu</th>
                    <th>Ttd Pengawas</th>
                </tr>
                <tr v-for="(number, index) in 9" :key="index">
                    <td class="nomor">{{index + 1}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

            </table>
        </div>
        <div class="footer">
            <div class="keterangan">
                <h4>Kartu WAJIB dibawa Selama ujian</h4>
                <h4>Berlaku Sampai Selesai</h4>
            </div>
            <div class="ttd">
                <h4>Kendal, {{new Date().getDate() + ' ' + new Date().toLocaleString('default', { month: 'long' }) + ' ' + new Date().getFullYear()}}</h4>
                <h4>Ketua Panitia</h4>
                <h4 class="user">Abdul Majid, S.Si., M.Sc.</h4>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState
} from 'vuex'
import XLSX from 'xlsx'
import axios from '../../api/axios/axios'
import qs from 'querystring'
import fileDownload from 'js-file-download'
import printJS from 'print-js'

var titles = [

    {

        prop: "nama_makul",

        label: "Mata Kuliah"

    },
    {

        prop: "semester",

        label: "Semester"
    },

    {

        prop: "sks",

        label: "SKS"

    },
    {

        prop: "mulai",

        label: "Waktu Mulai"

    },
    {

        prop: "selesai",

        label: "Waktu Selesai"

    },
        {
    
            prop: "hari",
    
            label: "Hari"
    
        },
    {

        prop: "kelas",

        label: "Kelas"

    },
    {

        prop: "nama_dosen",

        label: "Dosen"

    },

]

export default {

    computed: {
        data() {
            return this.$store.state.mhs_kurikulum.data
        },
    },

    created() {
        const beforeAkademik = new Date()
        beforeAkademik.setFullYear(beforeAkademik.getFullYear() - 1)

        const afterAkademik = new Date()
        afterAkademik.setFullYear(afterAkademik.getFullYear() + 1)

        this.dataProfile = {
            afterAkademik,
            beforeAkademik,

        }
        const token = this.$store.state.auth.token
        this.$store.dispatch('mhs_kurikulum/actGetData', token)

        this.$store.dispatch('components/setLoad')

    },

    data() {

        return {
            tableProps: {
                border: true,
                stripe: true,
                defaultSort: {
                    prop: 'flow_no',
                    order: 'descending'
                }
            },

            titles,

            dataProfile: [],

            kelasKrs: '',

            filters: [{

                    value: '',

                    prop: 'semester',

                },

                {

                    value: []

                }
            ],

        }
    },

    methods: {

        handleClick(val) {

            const id_mahasiswa = this.$store.state.auth.profile[0]['id_mahasiswa']

            axios.get(`/mahasiswa/checkstatus/${id_mahasiswa}`)
                .then((res) => {
                    if (res.data[0]['status_krs'] == 'buka') {
                        this.$store.dispatch('mhs_kurikulum/getKrs', val).then(() => {

                        })
                        this.kelasKrs = val

                    } else {
                        this.$swal('Status Krs Tutup')
                        this.$store.dispatch('auth/setStatus', 'status_krs')
                    }
                })
                .catch((err) => console.log(err))

        },

        cetakUas() {
            this.$store.dispatch('components/setLoad')

            const id_mahasiswa = this.$store.state.auth.profile[0]['id_mahasiswa']
            const jurusan_mhs = this.$store.state.auth.profile[0]['jurusan']

            axios.get(`/mahasiswa/checkstatus/${id_mahasiswa}`)
                .then((res) => {
                    this.$store.dispatch('components/setLoadFalse')

                    if (res.data[0]['status_uas'] == 'buka') {
                        axios.get(`/mahasiswa/cetak/${id_mahasiswa}/uas/${jurusan_mhs}`, {
                                responseType: 'blob'
                            })
                            .then((result) => {
                                fileDownload(result.data, 'kartu_uas.pdf')
                            })
                    } else {
                        this.$swal('Status Uas Tutup')
                        this.$store.dispatch('auth/setStatus', 'status_uas')
                    }
                })
                .catch((err) => console.log(err))

        },

        cetakUts() {
            this.$store.dispatch('components/setLoad')

            const id_mahasiswa = this.$store.state.auth.profile[0]['id_mahasiswa']
            const jurusan_mhs = this.$store.state.auth.profile[0]['jurusan']

            axios.get(`/mahasiswa/checkstatus/${id_mahasiswa}`)
                .then((res) => {
                    this.$store.dispatch('components/setLoadFalse')

                    if (res.data[0]['status_uts'] == 'buka') {
                        axios.get(`/mahasiswa/cetak/${id_mahasiswa}/uts/${jurusan_mhs}`, {
                                responseType: 'blob'
                            })
                            .then((result) => {
                                fileDownload(result.data, 'kartu_uts.pdf')
                            })
                    } else {
                        this.$swal('Status Uts Tutup')
                        this.$store.dispatch('auth/setStatus', 'status_uts')
                    }
                })
                .catch((err) => console.log(err))
        }

    }
}
</script>

<style lang="scss">
#addMhs {
    background: rgb(63, 178, 255) !important;
    border: none;
    color: white;
    border-radius: 4px;
    height: 40px;
    width: 80px;
}

#Table {
    width: 100%;
    height: 0px;
    visibility: hidden;

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid black;
        padding: 10px
    }

    .jumlah {
        border: none;
        padding-right: 100px
    }
}

#TableTranskip {
    width: 100%;
    height: 0px;
    visibility: hidden;

    table {
        width: 100%;
    }

    table,
    th,
    td {
        border: 1px solid black;
        border-collapse: collapse;
    }
}

.dekan {
    width: 50%;

    .hr {
        margin-bottom: 20px
    }
}

.test {
    box-shadow: 0px 1px 4px rgb(214, 214, 214);
    padding: 30px;
    position: relative;
    overflow: hidden;

    .error {
        color: red;
        font-size: 12px;
        position: relative;
    }

    .formulate-input-error {
        color: red;
        font-size: 10px;
        position: relative;
        list-style-type: none;
    }

    .formulate-input-errors {
        display: flex;
        margin: 8px;
        padding: 0
    }

    input {
        border: none;
        border-radius: 6px;
        background: rgb(236, 236, 236);
        width: 100% !important;
        padding: 8px;
        color: rgb(114, 114, 114)
    }

    .overlay {
        background: rgba(255, 255, 255, 0.582);
        position: absolute;
        height: 100%;
        top: 0;
        width: 100%;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tab1 {
        margin: 50px !important
    }

    .tab2 {
        margin: 49px !important
    }

    .tab3 {
        margin: 103px !important
    }

    .spinner-border {
        color: #92c5ff;
        height: 80px;
        width: 80px;
        z-index: 99;
    }

}

table.blueTable {
    visibility: hidden;
    font-family: Arial, Helvetica, sans-serif;
    border: 2px solid #000000;
    background-color: white;
    width: 100%;
    text-align: center;
    border-collapse: collapse;
}

.containerUas {
    border: 2px solid;
    position: relative;
    height: 0;
    width: 100%;
    visibility: hidden
}

.header {
    display: flex;
    padding: 8px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border-bottom: 2px solid;
    margin-bottom: 6px;
}

.header img {
    width: 50px;
    height: 50px
}

.header .title-card {
    position: absolute;
    left: 36%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);

}

.header .tahun-ajaran {
    border: 2px solid;
    width: 200px;
    text-align: center;
    margin: 0;
    font-size: 20px;
}

.hr-header {
    border: 1px solid !important;
    width: 100%;
    position: relative;
    top: -3px
}

.header-bio th {
    text-align: left
}

.header-bio {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
}

.table-makul {
    width: 100%;
    border-collapse: collapse;
}

.titik-dua {
    padding: 0 20px
}

.makul-table {
    padding: 20px
}

.makul-table th {
    border: 2px solid;
    background-color: rgba(100, 100, 100, 0.4)
}

.makul-table td {
    border: 2px solid;
}

.makul-table .nomor {
    text-align: center
}

.footer {
    height: 100px;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;

}

.keterangan {
    padding-top: 10px
}

.keterangan h4 {
    margin: 5px 0;
    font-size: 16px
}

.ttd {
    padding-top: 0px;
    padding-right: 50px
}

.ttd h4 {
    margin: 0;
    font-size: 16px
}

.ttd .user {
    margin-top: 20px
}

.img-banner {
    position: absolute;
    opacity: 0.2;
    width: 43%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.ttds {
    position: absolute;
    border: 2px solid;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 100%;
    left: -2px;
    padding-top: 0px;
}
</style>
