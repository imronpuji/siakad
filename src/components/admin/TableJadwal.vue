<template>
<div class="test">
    <el-row style="margin-bottom: 10px">
        <el-col :span="5">
            <el-col :span="5">
                <el-dropdown @command="handleClick">
                    <el-button type="primary">Actions<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="pagi">pagi</el-dropdown-item>
                        <el-dropdown-item command="malam">malam</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        
         <el-col :span="5" :offset="13">
            <FormulateInput placeholder="Pencarian" v-model="filters[0].value" />
        </el-col>

    </el-row>

    <data-tables :data="data" :table-props="tableProps" :pagination-props="{ pageSizes: [8, 10, 15] }" :action-col="actionCol" :filters="filters">
        <el-table-column v-for="title in titles" sortable="costum" :prop="title.prop" :label="title.label" :key="title.label">
        </el-table-column>
    </data-tables>

    <sweet-modal ref="modal">
        <div>
            <FormulateForm @submit="edit">
                <CRow>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput label="Mata Kuliah" disabled v-model="editByName" placeholder="Nama" type="text" name="nama" validation="required" />
                    </CCol>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput label="Waktu Mulai" v-model="editByMulai" placeholder="Waktu Mulai" type="time" name="mulai" validation="required" />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput label="Waktu Selesai" v-model="editBySelesai" placeholder="Waktu Selesai" type="time" name="selesai" validation="required" />
                    </CCol>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput label="Hari" v-model="editByHari" placeholder="Hari" type="select" name="hari" validation="required" :options="{senin : 'senin',selasa:'selasa', rabu : 'rabu', kamis : 'kamis', jumat : 'jumat', sabtu : 'sabtu'}" />
                    </CCol>
                </CRow>
                <CRow class="mt-4">
                    <CCol sm="12">
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

    <sweet-modal ref="modalAddPagi">
        <div>
            <FormulateForm v-model="formValues" @submit="buat" name="buat">
                <CRow>
                    <CCol sm="6" class="mt-3">
                        <label class="m-0; w-100" style="text-align:left; margin:0; font-size:14px; font-weight:500" for="">Mata Kuliah</label>
                        <select class="select-css" required v-model="selectedMakul">

                            <option v-for="data_makul in $store.state.admin_jadwal.makulPagi" :key="data_makul.id_makul" :value="{id_makul:data_makul.id_makul, nama_makul:data_makul.nama_makul}">
                                <h1>{{data_makul.nama_makul}}</h1>
                            </option>
                        </select>
                    </CCol>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput label="Hari" placeholder="Hari" type="select" name="hari" validation="required" :options="{senin : 'senin',selasa:'selasa', rabu : 'rabu', kamis : 'kamis', jumat : 'jumat', sabtu : 'sabtu'}" />

                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput label="Waktu Selesai" placeholder="Waktu Selesai" type="time" name="selesai" validation="required" />
                    </CCol>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput label="Waktu Mulai" type="time" name="mulai" placeholder="Waktu Mulai" validation="required" />
                    </CCol>

                </CRow>
                
               
                <CRow class="mt-3">
 
                    <CCol sm="12">
                        <b-button type="submit" class="w-100">Buat</b-button>
                    </CCol>
                </CRow>
            </FormulateForm>
        </div>
    </sweet-modal>
    
    
    <sweet-modal ref="modalAddMalam">
        <div>
            <FormulateForm v-model="formValues" @submit="buat" name="buat">
                <CRow>
                    <CCol sm="6" class="mt-3">
                        <label class="m-0; w-100" style="text-align:left; margin:0; font-size:14px; font-weight:500" for="">Mata Kuliah</label>
                        <select class="select-css" required v-model="selectedMakul">

                            <option v-for="data_makul in $store.state.admin_jadwal.makulMalam" :key="data_makul.id_makul" :value="{id_makul:data_makul.id_makul, nama_makul:data_makul.nama_makul}">
                                <h1>{{data_makul.nama_makul}}</h1>
                            </option>
                        </select>
                    </CCol>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput label="Hari" placeholder="Hari" type="select" name="hari" validation="required" :options="{senin : 'senin',selasa:'selasa', rabu : 'rabu', kamis : 'kamis', jumat : 'jumat', sabtu : 'sabtu'}" />

                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput label="Waktu Selesai" placeholder="Waktu Selesai" type="time" name="selesai" validation="required" />
                    </CCol>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput label="Waktu Mulai" type="time" name="mulai" placeholder="Waktu Mulai" validation="required" />
                    </CCol>

                </CRow>
                
               
                <CRow class="mt-3">
 
                    <CCol sm="12">
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
import {
    mapState
} from 'vuex'
// import _ from 'loda'
var titles = [{
        prop: "nama_makul",
        label: "Nama"
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
    }
]

export default {
    computed: mapState({
        data: state => state.admin_jadwal.data,
    }),
    created() {

        this.$store.dispatch('admin_jadwal/actGetData')
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
        }},
        kelas : '',
            selectedMakul: null,
            id_dosen: '',
            formValues: {},
            editById: '',
            editByName: '',
            editedDosenNama: '',
            editedDosenId: '',
            editedDosen: '',
            editByMulai: '',
            editBySelesai: '',
            editByHari: '',
            deleteById: '',
            titles,
            filters: [{

                    value: '',

                    prop: 'nama_makul',

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
                    props: {
                        type: 'primary',
                        icon: 'el-icon-edit'
                    },
                    handler: row => {
                        this.$refs.modal.open()
                        this.editByName = row.nama_makul
                        this.editByMulai = row.mulai
                        this.editBySelesai = row.selesai
                        this.editByHari = row.hari
                        this.editById = row.id_jadwal

                    },
                    label: 'Edit'
                }, {
                    handler: row => {
                        this.deleteById = row.id_jadwal
                        this.selectedMakul = {
                            id_makul: row.id_makul,
                            nama_makul: row.nama_makul,
                            kelas : row.kelas
                        }
                        this.$refs.modalDelete.open()
                    },
                    label: 'delete'
                }]
            },
        }
    },
    methods: {

        handleClick(command) {
           
            if(command == 'pagi'){
                            this.$refs.modalAddPagi.open()
                            this.kelas = 'A'
            } else {
            this.kelas = 'B'
                            this.$refs.modalAddMalam.open()

            }
             const errors = {
                fieldErrors: {
                    username: 'Sorry, no such username exists!'
                },
                formErrors: ['Incorrect login, please try again.']
            }
            this.$formulate.handle(errors, 'buat')
            this.$formulate.reset('buat')
        },

        edit() {

            const data = {
                id_jadwal: this.editById,
                mulai: this.editByMulai,
                selesai: this.editBySelesai,
                hari: this.editByHari,
            }
            console.log(data)
            this.$refs.modal.close()
            this.$store.dispatch('admin_jadwal/actEdit', data).then(() => {
                this.$refs.success.open()
            })
            this.$store.dispatch('components/setLoad')
            this.selectedDosen = ''

        },
        del() {
            const data = {
                ...this.selectedMakul,
                id_jadwal: this.deleteById
            }
            console.log(data)
            this.$store.dispatch('admin_jadwal/dels', data)
                .then(() => this.$refs.success.open())
                .catch(() => this.$refs.gagal.open())

            this.$store.dispatch('components/setLoad')
            this.$refs.modalDelete.close()
            this.selectedMakul = ''
        },
        buat() {
            const data = {
                ...this.formValues,
                kelas : this.kelas,
                nama_makul: this.selectedMakul.nama_makul,
                id_makul: this.selectedMakul.id_makul
            }
            console.log(data)
            this.$store.dispatch('admin_jadwal/actAdd', data).then(() => {
                this.$refs.success.open()
            })
            this.$store.dispatch('components/setLoad')
            this.$refs.modalAddPagi.close()
            this.$refs.modalAddMalam.close()

        }
    }
}
</script>

<style lang="scss">
.dosen-btn:hover {
    cursor: ns-resize !important;
    border: 0px solid
}

#addMhs {
    background: rgb(63, 178, 255) !important;
    border: none;
    color: white;
    border-radius: 4px;
    height: 40px;
    width: 80px;
}

select {
    border: none;
    border-radius: 6px;
    background: rgb(172, 72, 72);
    width: 100%;
    padding: 8px;
    color: rgb(114, 114, 114)
}

optgroup,
option {
    border: 100px solid !important
}

.test {
    box-shadow: 0px 1px 4px rgb(214, 214, 214);
    padding: 30px;
    position: relative;

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

    select {
        border: none;
        border-radius: 6px;
        background: rgb(236, 236, 236);
        width: 100%;
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

    .select-css {
        display: block;
        font-size: 16px;
        font-family: sans-serif;
        font-weight: 700;
        color: #444;
        line-height: 1.3;
        padding: .6em 1.4em .5em .8em;
        width: 100%;
        max-width: 100%;
        /* useful when width is set to anything other than 100% */
        box-sizing: border-box;
        margin: 0;
        border: 1px solid rgb(199, 199, 199) !important;
        box-shadow: none !important;
        border-radius: .3em !important;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-color: rgb(238, 238, 238);
        /* note: bg image below uses 2 urls. The first is an svg data uri for the arrow icon, and the second is the gradient. 
        for the icon, if you want to change the color, be sure to use `%23` instead of `#`, since it's a url. You can also swap in a different svg icon or an external image reference

    */
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
            linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
        background-repeat: no-repeat, repeat;
        /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
        background-position: right .7em top 50%, 0 0;
        /* icon size, then gradient */
        background-size: .65em auto, 100%;
    }

    /* Hide arrow icon in IE browsers */
    .select-css::-ms-expand {
        display: none;
    }

    /* Hover style */
    .select-css:hover {
        border-color: #888;
    }

    /* Focus style */
    .select-css:focus {
        border-color: #aaa;
        /* It'd be nice to use -webkit-focus-ring-color here but it doesn't work on box-shadow */
        box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
        box-shadow: 0 0 0 3px -moz-mac-focusring;
        color: #222;
        outline: none;
    }

    /* Set options to normal weight */
    .select-css option {
        font-weight: normal;
    }

    /* Support for rtl text, explicit support for Arabic and Hebrew */
    *[dir="rtl"] .select-css,
    :root:lang(ar) .select-css,
    :root:lang(iw) .select-css {
        background-position: left .7em top 50%, 0 0;
        padding: .6em .8em .5em 1.4em;
    }

    /* Disabled styles */
    .select-css:disabled,
    .select-css[aria-disabled=true] {
        color: graytext;
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
            linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
    }

    .select-css:disabled:hover,
    .select-css[aria-disabled=true] {
        border-color: #aaa;
    }

}
</style>
