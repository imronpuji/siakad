<template>
<div class="test">

    <el-row style="margin-bottom: 10px">
        <el-col :span="5">
            <FormulateInput placeholder="Pencarian" v-model="filters[0].value" />
        </el-col>
        <el-col :span="5" :offset="1">
            <el-button @click="cetakTranskip" type="primary">Cetak Transkip Nilai</el-button>
        </el-col>
        <el-col :span="2">
            <!-- <select class="select-css" required v-model="semester">
              <option v-for="data in $store.state.mhs_transkip.semester" :key="data.semester" :value="{semester : data.semester}">
                <h1>{{data.semester}}</h1>
              </option>
                </select> -->
            <el-dropdown @command="cetakKhs">
                <el-button v-if="$store.state.auth.profile[0]['status_khs'] == 'buka'" type="primary">Cetak KHS<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                <el-button disabled v-else type="primary">Cetak KHS<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="data in $store.state.mhs_transkip.semester" :key="data.semester" :command="data.semester">SMT {{data.semester}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>

        <!-- <el-col :span="5" :offset="5">
        <FormulateInput placeholder="Pencarian" v-model="filters[0].value"/>
      </el-col> -->

    </el-row>

    <data-tables :data="data" :pagination-props="{ pageSizes: [6, 10, 15] }" :table-props="tableProps" :filters="filters">
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

    <div id="Table">

        <table>
            <tr>
                <th rowspan="2">NO</th>
                <th rowspan="2">KODE MK</th>
                <th rowspan="2">MATA KULIAH</th>
                <th colspan="2">NILAI</th>
                <th rowspan="2">SKS</th>
                <th rowspan="2">HASIL</th>
            </tr>
            <tr>
                <th>HURUF</th>
                <th>BOBOT</th>
            </tr>
            <tr v-for="(data, index) in khs" :key="index">
                <td style="text-align:center; border:2px solid black">{{index + 1}}</td>
                <td>{{data.id_makul}}</td>
                <td>{{data.nama_makul}}</td>
                <td style="text-align:center">{{data.huruf}}</td>
                <td style="text-align:center">{{data.bobot}}</td>
                <td style="text-align:center">{{data.sks}}</td>
                <td style="text-align:center">{{parseFloat(data.bobot) * parseInt(data.sks)}}</td>
            </tr>
            <tr style="border:0px solid; text-align:center">

                <th class="jumlah" colspan="5">JUMLAH</th>
                <th>{{allSks}}</th>
                <th>{{allHasil}}</th>
            </tr>
        </table>

        <div class="desk-hasil">
            <p>Index Prestasi Semester (IPS) <span class="tab1"></span> : <b>{{($store.state.mhs_transkip.allHasil / $store.state.mhs_transkip.allSks).toFixed(2)}}</b></p>
            <p>Index Prestasi Kumulatif (IPK) <span class="tab2"></span> : -</p>
            <p>SKS Kumulatif <span class="tab3"></span> : {{$store.state.mhs_transkip.allSks}}</p>
        </div>
        <div class="dekan">
            <p>Kendal, {{new Date().getDate() + ' ' + new Date().toLocaleString('default', { month: 'long' }) + ' ' + new Date().getFullYear()}}</p>
            <p class="status">Kaprodi</p>

            <p class="hr"><b><u>{{this.$store.state.auth.profile[0].jurusan == 'dkv' ? 'Anik Rahmawati, M.Pd' : 'Yusuf Wahyu Setya Putra, S.Kom, M.Kom '}}</u></b></p>
            <p>{{this.$store.state.auth.profile[0].jurusan == 'dkv' ? 'NIDN 0602059401' : 'NIDN 0621089103'}}</p>

        </div>
    </div>

    <div id="TableTranskip">

        <table>
            <tr>
                <th rowspan="2">NO</th>
                <th rowspan="2">KODE MK</th>
                <th rowspan="2">MATA KULIAH</th>
                <th colspan="2">NILAI</th>
                <th rowspan="2">SKS</th>
                <th rowspan="2">HASIL</th>
            </tr>
            <tr>
                <th>HURUF</th>
                <th>BOBOT</th>
            </tr>
            <tr v-for="(data, index) in khs" :key="index">
                <td style="text-align:center; border:2px solid black">{{index + 1}}</td>
                <td>{{data.id_makul}}</td>
                <td>{{data.nama_makul}}</td>
                <td style="text-align:center">{{data.huruf}}</td>
                <td style="text-align:center">{{data.bobot}}</td>
                <td style="text-align:center">{{data.sks}}</td>
                <td style="text-align:center">{{parseFloat(data.bobot) * parseInt(data.sks)}}</td>
            </tr>
            <tr style="border:0px solid; text-align:center">

                <th class="jumlah" colspan="5">JUMLAH</th>
                <th>{{allSks}}</th>
                <th>{{allHasil}}</th>
            </tr>
        </table>

        <div class="desk-hasil">
            <p>Index Prestasi Semester (IPS) <span class="tab1"></span> : -</p>
            <p>Index Prestasi Kumulatif (IPK) <span class="tab2"></span> : <b>{{($store.state.mhs_transkip.allHasil / $store.state.mhs_transkip.allSks).toFixed(2)}}</b></p>
            <p>SKS Kumulatif <span class="tab3"></span> : {{$store.state.mhs_transkip.allSks}}</p>
        </div>
        <div class="dekan">
            <p>Kendal, {{new Date().getDate() + ' ' + new Date().toLocaleString('default', { month: 'long' }) + ' ' + new Date().getFullYear()}}</p>
            <p class="status">Kaprodi</p>

            <p class="hr"><b><u>{{this.$store.state.auth.profile[0].jurusan == 'dkv' ? 'Anik Rahmawati, M.Pd' : 'Yusuf Wahyu Setya Putra, S.Kom, M.Kom '}}</u></b></p>
            <p>{{this.$store.state.auth.profile[0].jurusan == 'dkv' ? 'NIDN 0602059401' : 'NIDN 0621089103'}}</p>

        </div>
    </div>

    <!-- <div id="TableTranskip">

        <table border="1">
            <tr>
                <th rowspan="2">NO</th>
                <th rowspan="2">KODE MK</th>
                <th rowspan="2">MATA KULIAH</th>
                <th colspan="2">NILAI</th>
                <th rowspan="2">SKS</th>
                <th rowspan="2">HASIL</th>
            </tr>
            <tr>
                <th>HURUF</th>
                <th>BOBOT</th>
            </tr>
            <tr v-for="(data, index) in khs" :key="index">
                <td style="text-align:center">{{index + 1}}</td>
                <td>{{data.id_makul}}</td>
                <td>{{data.nama_makul}}</td>
                <td style="text-align:center">{{data.nilai_huruf}}</td>
                <td style="text-align:center">{{data.nilai_angka}}</td>
                <td style="text-align:center">{{data.sks}}</td>
                <td style="text-align:center">{{parseInt(data.nilai_angka) * parseInt(data.sks)}}</td>
            </tr>
            <tr style="border:0px solid" align="center">
                <th class="jumlah" colspan="5">JUMLAH</th>
                <th>{{allSks}}</th>
                <th>{{allHasil}}</th>
            </tr>
        </table>

        <div class="desk-hasil">
            <p>Index Prestasi Semester (IPS) <span class="tab1"></span> : -</p>
            <p>Index Prestasi Kumulatif (IPK) <span class="tab2"></span> : <b>{{($store.state.mhs_transkip.allHasil / $store.state.mhs_transkip.allSks).toFixed(2)}}</b></p>
            <p>SKS Kumulatif <span class="tab3"></span> : {{$store.state.mhs_transkip.allSks}}</p>
        </div>
        <div class="dekan">
            <p></p>
            <p class="status">Kaprodi</p>

            <p class="hr"><b><u>Yusuf Wahyu Setya Putra, S.Kom, M.Kom</u></b></p>
            <p>NIDN 0602059401</p>

        </div>
    </div> -->
</div>
</template>

<script>
import {
    mapState
} from 'vuex'
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

        prop: "huruf",

        label: "Huruf"

    },

    {

        prop: "bobot",

        label: "Bobot"

    },
    {

        prop: "keterangan",

        label: "Keterangan"

    },

]

export default {

    computed: {
        data() {
            return this.$store.state.mhs_transkip.data
        },
        khs() {
            return this.$store.state.mhs_transkip.khs
        },
        allSks() {
            return this.$store.state.mhs_transkip.allSks
        },

        allHasil() {
            return this.$store.state.mhs_transkip.allHasil
        },

        semester: {
            get() {
                return this.$store.state.mhs_transkip.semester
            },
            set(value) {
                this.$store.dispatch('mhs_transkip/cetakKhs', value)
            }
        }
    },

    created() {

        console.log(this.$store.state.auth.profile)

        if (this.data.length < 1) {
            const token = this.$store.state.auth.token
            this.$store.dispatch('mhs_transkip/actGetData', token)

            this.$store.dispatch('components/setLoad')

        } else {
            this.$store.dispatch('components/setLoadFalse')
        }

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

            filters: [{
                value: '',
                filterFn: (row, filter) => {
                    return Object.keys(row).some(prop => {
                        if (prop === 'date') {
                            return this.getDate(row.date).indexOf(filter.value) > -1
                        } else {
                            return row[prop].toLowerCase().indexOf(filter.value.toLowerCase()) > -1
                        }
                    })
                }
            }],

        }
    },
    methods: {
        cetakKhs(value) {
            const id_mahasiswa = this.$store.state.auth.profile[0]['id_mahasiswa']
            axios.get(`/mahasiswa/checkstatus/${id_mahasiswa}`)
                .then((res) => {
                    if (res.data[0]['status_khs'] == 'buka') {
                        this.$store.dispatch('mhs_transkip/cetakKhs', value)

                    } else {
                        this.$swal('Status Khs Tutup')
                        this.$store.dispatch('auth/setStatus', 'status_uts')
                    }
                })
                .catch((err) => console.log(err))
        },

        cetakTranskip(command) {
            const data = this.$store.state.mhs_transkip.data
            const table = document.getElementById('Table')

            this.$store.dispatch('mhs_transkip/cetakTranskip')

        },

    },

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

    th,
    td {
        border: 2px solid black;
        border-collapse: collapse;
        padding: 10px;
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
</style>
