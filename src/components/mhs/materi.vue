<template>
<div class="test">

    <el-row style="margin-bottom: 10px">

        <el-col :span="5">
            <!-- <select class="select-css" required v-model="selectedMakul">
                <option v-for="data in $store.state.mhs_materi.dataMakul" :key="data.id_makul" :value="{id_makul:data.id_makul, nama_makul : data.nama_makul}">
                    <h1>{{data.nama_makul}}</h1>
                </option>
            </select> -->
            <el-dropdown @command="selectedMakul">
                <el-button type="primary">Pilih Makul<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="data in $store.state.mhs_materi.dataMakul" :key="data.id_makul" :command="data.id_makul">{{data.nama_makul}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>

        <el-col :span="5" :offset="13">
            <FormulateInput placeholder="Pencarian" v-model="filters[0].value" />
        </el-col>

    </el-row>

    <data-tables :data="data"  :table-props="tableProps" :pagination-props="{ pageSizes: [6, 10, 15] }" :action-col="actionCol" :filters="filters">
        <el-table-column v-for="title in titles" :prop="title.prop" sortable="custom" :label="title.label" :key="title.label">
        </el-table-column>
    </data-tables>

    <sweet-modal ref="modal">

        <div>

            <FormulateForm @submit="edit">

                <CRow>
                    <CCol sm="12">
                        <FormulateInput v-model="editByName" placeholder="Nama" type="text" name="nama" validation="required" />
                    </CCol>
                </CRow>

                <CRow class="mt-3">
                    <CCol sm="6">
                        <FormulateInput v-model="editByNim" placeholder="NIM" type="text" name="nim" validation="required" />
                    </CCol>
                    <CCol sm="6">
                        <FormulateInput v-model="editByEmail" placeholder="Email" type="text" name="email" validation="required|email" />
                    </CCol>
                </CRow>

                <CRow class="mt-4">
                    <CCol sm="6" class="mt-3">
                        <FormulateInput v-model="editByJurusan" placeholder="Jurusan" type="text" name="jurusan" validation="required" />
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
import qs from 'querystring'

var titles = [

    {

        prop: "judul",

        label: "Judul"
    },

    {

        prop: "nama_makul",

        label: "Mata Kuliah"

    },
    {

        prop: "tanggal",

        label: "Tanggal"

    },
    {

        prop: "file",

        label: "File"

    },

]

export default {

    computed: {
        data() {
            return this.$store.state.mhs_materi.data
        },
       
    },

    created() {

        if (this.data.length < 1) {
            const token = this.$store.state.auth.token
            this.$store.dispatch('mhs_materi/actGetData', token)

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
          prop: 'nama',
          order: 'descending'
        }},

            formValues: {},

            editById: '',

            editByName: '',

            editByJurusan: '',

            editByNim: '',

            editByEmail: '',

            editByTahunMasuk: '',

            deleteById: '',

            metaDataFile: '',

            titles,

            filters: [{

                    value: '',

                    prop: 'judul',

                },

                {

                    value: []

                }
            ],

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

                        icon: 'el-icon-download'

                    },

                    handler: row => {

                        this.$store.dispatch('components/setLoad')

                        const data = {
                            file: row.file,
                            id_materi: row.id_materi
                        }

                        this.$store.dispatch('mhs_materi/actGetDataFile', data)

                            .then(() => {
                                this.$refs.success.open()
                                this.$store.dispatch('components/setLoadFalse')

                            })

                            .catch(() => {

                                this.$refs.gagal.open()

                            })

                    },

                    label: 'download'

                }]

            }
        }
    },
    methods: {
    
        selectedMakul(value){
            this.$store.dispatch('mhs_materi/actGetDataMateri', value)
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

        imports() {

            this.$refs.modalImport.open()

        },

        edit() {

            const data = {

                nama: this.editByName,

                email: this.editByEmail,

                nim: this.editByNim,

                id_mahasiswa: this.editById

            }

            this.$refs.modal.close()

            this.$store.dispatch('admin_mahasiswa/actEdit', data).then(() => {

                this.$refs.success.open()

            })

            this.$store.dispatch('admin_mahasiswa/setLoad')

        },

        del() {
            this.$store.dispatch('components/setLoad')

            this.$refs.modalDelete.close()

        },

        buat() {

            this.$store.dispatch('admin_mahasiswa/actAdd', this.formValues)

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

                        userData.push({
                            nim: val.nim,
                            nama: val.nama,
                            foto: 'index.jpg',
                            email: val.email,
                            tahun_masuk: val.tahun_masuk,
                            jurusan: val.jurusan
                        })

                    })

                })

                axios.post('/admin/users/import', userData)

                    .then((res) => {

                        const mhs = res.data.user_id.map((val, i) => {

                            return {

                                user_id: val.user_id,

                                nim: userData[i]['nim'],

                                nama: userData[i]['nama'],

                                foto: 'index.jpg',

                                email: userData[i]['email'],

                                tahun_masuk: userData[i]['tahun_masuk'],
                                jurusan: userData[i]['jurusan'],

                            }

                        })

                        axios.post('/admin/mahasiswa/import', mhs)

                            .then(result => {

                                submit(mhs)
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
