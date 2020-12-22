<template>
<div class="test">

    <el-row style="margin-bottom: 10px">

        <el-col :span="4">
            <el-dropdown @command="handleClick">
                <el-button type="primary">Tambah Mahasiswa<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="new">Manual</el-dropdown-item>
                    <el-dropdown-item command="import">import</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>

        <el-col :span="4" :offset="2">
            <el-dropdown @command="handleCloseAll">
                <el-button type="primary">Tutup Semua<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="krs">KRS</el-dropdown-item>
                    <el-dropdown-item command="khs">KHS</el-dropdown-item>
                    <el-dropdown-item command="uas">UAS</el-dropdown-item>
                    <el-dropdown-item command="uts">UTS</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>

        <el-col :span="5" :offset="8">
            <FormulateInput placeholder="Pencarian" v-model="filters[0].value" />
        </el-col>

    </el-row>

    <data-tables :data="data" :table-props="tableProps" :pagination-props="{ pageSizes: [6, 10, 15] }" :action-col="actionCol" :filters="filters">
        <el-table-column v-for="title in titles" sortable="costum" :prop="title.prop" :label="title.label" :key="title.label">
        </el-table-column>
        <el-table-column label="Foto" min-width="100px">
            <template slot-scope="scope">
                <img style="width:100px; height:100px" :src="scope.row.foto" />
            </template>
        </el-table-column>
    </data-tables>

    <sweet-modal ref="modal">
        <CToaster :autohide="1000" style="z-index:999; width:100px ">
            <template v-for="toast in fixedToasts">
                <CToast :key="'toast' + toast" :show="true" header="Sukses">
                    <b>sukses</b>
                </CToast>
            </template>
        </CToaster>
        <sweet-modal-tab title="Semester" id="tab1">
            <div>
                <FormulateForm @submit="edit">

                    <CRow>
                        <CCol sm="6">
                            <FormulateInput disabled label="Nama" v-model="editByName" placeholder="Nama" type="text" name="nama" validation="required" />
                        </CCol>
                        <CCol sm="6">
                            <FormulateInput disabled label="Jurusan" v-model="editByJurusan" placeholder="Jurusan" type="text" name="jurusan" validation="required" />
                        </CCol>
                    </CRow>

                    <CRow class="mt-3">
                        <CCol sm="6">
                            <FormulateInput disabled label="NIM" v-model="editByNim" placeholder="NIM" type="text" name="nim" validation="required" />
                        </CCol>
                        <CCol sm="6">
                            <FormulateInput label="Semester" v-model="editBySemester" placeholder="Semester" type="text" name="semester" validation="required" />
                        </CCol>
                    </CRow>

                    <CRow class="mt-3">
                        <CCol sm="6">
                            <FormulateInput v-model="editByKelas" :options="{A: 'A', B: 'B'}" type="select" placeholder="Pilih Kelas" label="Kelas" />
                        </CCol>
                        <CCol sm="6" class="mt-4">
                            <b-button type="submit" class="w-100">Edit</b-button>
                        </CCol>
                    </CRow>

                </FormulateForm>

            </div>
        </sweet-modal-tab>

        <sweet-modal-tab title="UAS" id="tab2">
            <CRow>
                <div class="overlay" v-if="$store.state.admin_mahasiswa.load">
                    <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <CCol sm="4">
                    <div class="overlay" v-if="$store.state.admin_mahasiswa.load">

                    </div>
                    <FormulateForm name="setting">
                        <label style="width:280px">{{'status mahasiswa saat ini ' + ' ' + uasStatus}} </label>
                        <FormulateInput v-model="uas" :options="{buka: 'Buka', tutup:'Tutup'}" type="radio" />
                    </FormulateForm>

                </CCol>
            </CRow>

        </sweet-modal-tab>
        <sweet-modal-tab title="UTS" id="tab3">
            <CRow>
                <div class="overlay" v-if="$store.state.admin_mahasiswa.load">
                    <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <CCol sm="4">
                    <div class="overlay" v-if="$store.state.admin_mahasiswa.load">

                    </div>
                    <label style="width:280px">{{'status mahasiswa saat ini ' + ' ' + utsStatus}} </label>

                    <FormulateInput v-model="uts" :options="{buka: 'Buka', tutup:'Tutup'}" type="radio" />
                </CCol>
            </CRow>

        </sweet-modal-tab>
        <sweet-modal-tab title="KRS" id="tab4">
            <CRow>
                <div class="overlay" v-if="$store.state.admin_mahasiswa.load">
                    <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <CCol sm="4">
                    <div class="overlay" v-if="$store.state.admin_mahasiswa.load">

                    </div>
                    <label style="width:280px">{{'status mahasiswa saat ini ' + ' ' + krsStatus}} </label>

                    <FormulateInput v-model="krs" :options="{buka: 'Buka', tutup:'Tutup'}" type="radio" />
                </CCol>
            </CRow>

        </sweet-modal-tab>
        <sweet-modal-tab title="KHS" id="tab5">
            <CRow>
                <div class="overlay" v-if="$store.state.admin_mahasiswa.load">
                    <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <CCol sm="4">
                    <div class="overlay" v-if="$store.state.admin_mahasiswa.load">

                    </div>
                    <label style="width:280px">{{'status mahasiswa saat ini ' + ' ' + khsStatus}} </label>

                    <FormulateInput v-model="khs" :options="{buka: 'Buka', tutup:'Tutup'}" type="radio" />
                </CCol>
            </CRow>

        </sweet-modal-tab>
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
                        <FormulateInput label="Nama" placeholder="Nama" type="text" name="nama" validation="required" />
                    </CCol>
                    <CCol sm="6">
                        <FormulateInput label="NIM" placeholder="NIM" type="number" name="nim" validation="required" />
                    </CCol>
                </CRow>

                <CRow class="mt-3">
                    <CCol sm="6">
                        <FormulateInput label="Email" placeholder="Email" type="email" name="email" validation="required|email" />
                    </CCol>
                    <CCol sm="6">
                        <FormulateInput label="Tahun Masuk" placeholder="Tahun Masuk" type="number" name="tahun_masuk" validation="required" />
                    </CCol>
                </CRow>

                <CRow class="mt-3">
                    <CCol sm="6">
                        <FormulateInput v-model="jurusan" :options="{informatika: 'Teknik Informatika', dkv: 'Desain Komunikasi Visual'}" type="select" placeholder="Pilih Prodi" label="Prodi" />
                    </CCol>
                    <CCol sm="6">
                        <FormulateInput label="Semester" placeholder="Semester" type="text" name="semester" validation="required" />
                    </CCol>
                </CRow>
                <CRow class="mt-3">
                    <CCol sm="6">
                        <FormulateInput v-model="jenis_kelamin" :options="{P: 'Perempuan', L: 'Laki-Laki'}" type="select" placeholder="Jenis Kelamin" label="Jenis Kelamin" />
                    </CCol>
                    <CCol sm="6">
                        <FormulateInput v-model="kelas" :options="{A: 'A', B: 'B'}" type="select" placeholder="Pilih Kelas" label="Kelas" />
                    </CCol>

                </CRow>
                <CRow>

                    <CCol sm="12" class="mt-4">
                        <b-button type="submit" class="w-100">Buat</b-button>
                    </CCol>
                </CRow>

            </FormulateForm>

        </div>

    </sweet-modal>

    <sweet-modal ref="modalImport">
        <FormulateForm class="w-100" @submit="upload" name="import">
            <div class="border-1 d-flex justify-center flex-column align-items-center">

                <FormulateInput validation="required" class="w-50" ref="metaDataFile" @change="previewFiles" type="file" />
                <FormulateInput class="w-50" type="submit" />

            </div>
        </FormulateForm>
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
import {
    mapState
} from 'vuex'
import XLSX from 'xlsx'
import axios from '../../api/axios/axios'
import axioss from 'axios'
import qs from 'querystring'
import downloadFile from 'js-file-download'

var titles = [{

        prop: "nim",

        label: "NIM"

    },

    {

        prop: "nama",

        label: "Nama"
    },
    {

        prop: "jenis_kelamin",

        label: "Gender"
    },

    {

        prop: "tahun_masuk",

        label: "Tahun Masuk"

    },
    {

        prop: "jurusan",

        label: "Prodi"

    },
    {

        prop: "semester",

        label: "Semester"

    },
    {
        prop: 'kelas',
        label: 'Kelas'
    }
]

export default {

    computed: {

        data() {
            return this.$store.state.admin_mahasiswa.data
        },
        uas: {
            get() {
                this.uasStatus = this.$store.state.admin_mahasiswa.uas
                return this.$store.state.admin_mahasiswa.uas
            },
            set(value) {
                console.log(value)
                const data = {
                    uas: value,
                    khs: this.khsStatus,
                    uts: this.utsStatus,
                    krs: this.krsStatus,
                    id_mahasiswa: this.id_mhs
                }
                this.$store.dispatch('admin_mahasiswa/setLoad')

                this.$store.dispatch('admin_mahasiswa/uas', data)
            }
        },
        khs: {
            get() {
                this.khsStatus = this.$store.state.admin_mahasiswa.khs

                return this.$store.state.admin_mahasiswa.khs
            },
            set(value) {
                console.log(value)

                const data = {
                    uas: this.uasStatus,
                    khs: value,
                    uts: this.utsStatus,
                    krs: this.krsStatus,
                    id_mahasiswa: this.id_mhs
                }
                this.$store.dispatch('admin_mahasiswa/setLoad')

                this.$store.dispatch('admin_mahasiswa/khs', data)
            }
        },
        uts: {
            get() {
                this.utsStatus = this.$store.state.admin_mahasiswa.uts

                return this.$store.state.admin_mahasiswa.uts

            },
            set(value) {
                const data = {
                    uts: value,
                    khs: this.khsStatus,
                    uas: this.utsStatus,
                    krs: this.krsStatus,
                    id_mahasiswa: this.id_mhs
                }

                this.$store.dispatch('admin_mahasiswa/setLoad')

                this.$store.dispatch('admin_mahasiswa/uts', data)
            }
        },
        krs: {
            get() {
                this.krsStatus = this.$store.state.admin_mahasiswa.krs

                return this.$store.state.admin_mahasiswa.krs

            },
            set(value) {
                const data = {
                    krs: value,
                    khs: this.khsStatus,
                    uas: this.uasStatus,
                    uts: this.utsStatus,
                    id_mahasiswa: this.id_mhs
                }

                this.$store.dispatch('admin_mahasiswa/setLoad')

                this.$store.dispatch('admin_mahasiswa/krs', data)
            }
        }

    },

    created() {

        if (this.data.length < 1) {
            const token = this.$store.state.auth.token
            this.$store.dispatch('admin_mahasiswa/actGetData', token)

            this.$store.dispatch('components/setLoad')

        } else {
            this.$store.dispatch('components/setLoadFalse')
        }

    },

    data() {

        return {
            kelas: '',
            fixedToasts: 0,
            uasStatus: '',
            utsStatus: '',
            khsStatus: '',
            jenis_kelamin: '',
            id_mhs: '',
            krsStatus: '',
            tableProps: {
                border: true,
                stripe: true,
                defaultSort: {
                    prop: 'flow_no',
                    order: 'descending'
                }
            },

            editByKelas: '',

            formValues: {},

            jurusan: null,

            editById: '',

            editByName: '',

            editByJurusan: '',

            editByNim: '',

            editByEmail: '',

            editByTahunMasuk: '',

            editBySemester: '',

            deleteById: '',

            metaDataFile: '',

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

            actionCol: {

                label: 'Actions',

                props: {

                    align: 'center',

                },

                buttons: [{
                    props: {
                        type: 'primary',
                        icon: 'el-icon-setting'
                    },
                    handler: row => {
                        this.$refs.modal.open()
                        this.editBySemester = row.semester
                        this.editByName = row.nama
                        this.editByJurusan = row.jurusan
                        this.editByNim = row.nim
                        this.editById = row.id_mahasiswa
                        this.uasStatus = row.status_uas
                        this.utsStatus = row.status_uts
                        this.krsStatus = row.status_krs
                        this.khsStatus = row.status_khs
                        this.id_mhs = row.id_mahasiswa
                        this.editByKelas = row.kelas
                        // this.getStatus(row)

                    },
                    label: 'Setting'
                }, {

                    handler: row => {

                        this.deleteById = row.user_id

                        this.$refs.modalDelete.open()

                    },

                    label: 'delete'

                }]

            }
        }
    },
    methods: {
        addFixedToast() {
            this.fixedToasts++
        },
        getStatus(row) {

            this.$store.dispatch('admin_mahasiswa/uasSet', row.status_uas)
            this.$store.dispatch('admin_mahasiswa/utsSet', row.status_uts)
            this.$store.dispatch('admin_mahasiswa/krsSet', row.status_krs)
            this.$store.commit('admin_mahasiswa/setId', row.id_mahasiswa)
        },
        handleClick(command) {

            if (command == 'import')

            {
                this.$refs.modalImport.open()
                this.$formulate.reset('import')

            } else

            {

                this.$refs.modalAdd.open()
                this.$formulate.reset('buat')
            }

        },

        handleCloseAll(command) {

            this.$store.dispatch('admin_mahasiswa/closeAll', command).then(() => {
                this.$store.dispatch('admin_mahasiswa/actGetData', command).then(() => {
                    this.$refs.success.open()
                })
            })
            this.$store.dispatch('components/setLoad')

        },

        imports() {

            this.$refs.modalImport.open()

        },

        edit() {

            const data = {

                semester: this.editBySemester,

                kelas: this.editByKelas,

                id_mahasiswa: this.editById

            }

            this.$refs.modal.close()

            this.$store.dispatch('admin_mahasiswa/actEdit', data).then(() => {

                this.$refs.success.open()

            })

            this.$store.dispatch('components/setLoad')

        },

        del() {
            this.$store.dispatch('components/setLoad')

            this.$store.dispatch('admin_mahasiswa/dels', this.deleteById)

                .then(() => this.$refs.success.open())

                .catch(() => {

                    this.$refs.gagal.open()

                })

            this.$refs.modalDelete.close()

        },

        buat() {

            this.$store.dispatch('admin_mahasiswa/actAdd', {
                    ...this.formValues,
                    jurusan: this.jurusan,
                    kelas: this.kelas,
                    jenis_kelamin: this.jenis_kelamin
                })

                .then(() => {

                    this.$refs.success.open()

                })

            this.$store.dispatch('components/setLoad')

            this.$refs.modalAdd.close()

            const errors = {

                fieldErrors: {
                    username: 'Sorry, no such username exists!'
                },

                formErrors: ['Incorrect login, please try again.']

            }

            this.$formulate.handle(errors, 'buat')

            this.$formulate.reset('buat')

        },

        upload() {

            this.$refs.modalImport.close()

            this.$store.dispatch('components/setLoad')

            var submit = (mhs) => {

                this.$store.dispatch('admin_mahasiswa/actImport', mhs)

                    .then(() => {

                        this.$refs.success.open()

                    })

            }

            var reader = new FileReader();

            reader.onload = function (e) {

                const resData = []

                const userData = []

                var data = e.target.result;

                data = new Uint8Array(data);

                var wb = XLSX.read(data, {
                    type: 'array'
                });

                wb.SheetNames.forEach(function (sheetName) {

                    var XL_row_object = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);

                    XL_row_object.map(val => resData.push({
                        nama: val.nama,
                        email: val.email,
                        nim: val.nim
                    }))

                    XL_row_object.map(val => {

                        if (val.jenis_kelamin == 'L') {
                            userData.push({
                                nim: val.nim,
                                nama: val.nama.toUpperCase(),
                                foto: 'https://apisiakad.hilmimubarok.com/assets/img/profile/avatar_male.png',
                                kelas: val.kelas,
                                email: val.email,
                                tahun_masuk: val.tahun_masuk,
                                jurusan: val.prodi,
                                semester: val.semester,
                                jenis_kelamin: val.jenis_kelamin,
                                status_khs: 'tutup',
                                status_krs: 'tutup',
                                status_uas: 'tutup',
                                status_uts: 'tutup',
                            })

                        } else {
                            userData.push({
                                nim: val.nim,
                                nama: val.nama.toUpperCase(),
                                foto: 'https://apisiakad.hilmimubarok.com/assets/img/profile/avatar_female.png',
                                kelas: val.kelas,
                                email: val.email,
                                tahun_masuk: val.tahun_masuk,
                                jurusan: val.prodi,
                                semester: val.semester,
                                jenis_kelamin: val.jenis_kelamin,
                                status_khs: 'tutup',
                                status_krs: 'tutup',
                                status_uas: 'tutup',
                                status_uts: 'tutup',
                            })
                        }

                    })

                })

                axios.post('/admin/users/import', userData)

                    .then((res) => {

                        const mhs = res.data.user_id.map((val, i) => {

                            return {

                                user_id: val.user_id,

                                nim: userData[i]['nim'],

                                nama: userData[i]['nama'],

                                foto: userData[i]['foto'],

                                email: userData[i]['email'],
                                kelas: userData[i]['kelas'],
                                temp_kelas: userData[i]['kelas'],
                                tahun_masuk: userData[i]['tahun_masuk'],
                                jurusan: userData[i]['jurusan'],
                                jenis_kelamin: userData[i]['jenis_kelamin'],
                                semester: userData[i]['semester'],
                                temp_semester: userData[i]['semester'],
                                status_khs: userData[i]['status_khs'],
                                status_krs: userData[i]['status_krs'],
                                status_uts: userData[i]['status_uts'],
                                status_uas: userData[i]['status_uas'],

                            }

                        })

                        axios.post('/admin/mahasiswa/import', mhs)

                            .then(result => {
                                console.log(mhs)
                                submit(result.data.data)
                            })

                            .catch(err => err)

                    })

                    .catch(err => err)

            };

            reader.readAsArrayBuffer(this.dataSiswa);
        },

        previewFiles(oEvent) {
            var oFile = oEvent.target.files[0];
            this.dataSiswa = oFile
            var reader = new FileReader();

            reader.onload = function (e) {

                var data = e.target.result;
                data = new Uint8Array(data);
                var wb = XLSX.read(data, {
                    type: 'array'
                });
                const workSheet = wb.Sheets[wb.SheetNames[0]]
            };

            reader.readAsArrayBuffer(oFile);
        },
        testpdf() {
            axioss.get('http://localhost:8080', {
                    responseType: 'blob'
                })
                .then(res => {

                    console.log(res)
                    downloadFile(res.data, 'filename.pdf');
                })
                .catch(err => err)
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

label {
    text-align: left;
    margin: 0
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

    .spinner-border {
        color: #92c5ff;
        height: 80px;
        width: 80px;
        z-index: 99;
    }

}
</style>
