<template>
<div class="test">
    <el-row style="margin-bottom: 10px">
        <el-col :span="5">
            <el-button @click="handleClick('new')" type="primary">Tambah Dosen</el-button>
        </el-col>
        <el-col :span="5" :offset="13">
            <FormulateInput placeholder="Pencarian" type="search" v-model="filters[0].value" />
        </el-col>
    </el-row>

    <data-tables :data="data" :table-prop="tableProps" :pagination-props="{ pageSizes: [8, 10, 15] }" :action-col="actionCol" :filters="filters">
        <el-table-column v-for="title in titles" sortable="custom" :prop="title.prop" :label="title.label" :key="title.label">
        </el-table-column>
        <el-table-column label="Foto" min-width="100px">
            <template slot-scope="scope">
                <img style="width:100px; height:100px" :src="scope.row.foto_dosen" />
            </template>
        </el-table-column>
    </data-tables>

    <sweet-modal ref="modal">
        <div>
            <FormulateForm @submit="edit">
                <CRow>
                    <CCol sm="12">
                        <FormulateInput label="Nama" v-model="editByName" placeholder="Nama" type="text" name="nama" validation="required" />
                    </CCol>
                </CRow>
                <CRow class="mt-3">
                    <CCol sm="6">
                        <FormulateInput label="NIDN" v-model="editByNik" placeholder="NIDN" type="text" name="niy" validation="required" />
                    </CCol>
                    <CCol sm="6">
                        <FormulateInput label="Alamat" v-model="editByAlamat" placeholder="Alamat" type="text" name="alamat" validation="required" />
                    </CCol>
                </CRow>
                <CRow class="mt-3">
                    <CCol sm="6">
                        <FormulateInput label="Email" v-model="editByEmail" placeholder="email" type="email" name="email" validation="required" />
                    </CCol>
                    <CCol sm="6">
                        <FormulateInput label="Nomor HP" v-model="editByKontak" placeholder="Nomor HP" type="number" name="nomor" validation="required|number" />
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

    <sweet-modal ref="modalAdd">
        <div>
            <FormulateForm v-model="formValues" @submit="buat" name="buat">
                <CRow>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput label="Nama" placeholder="Nama" type="text" name="nama" validation="required" />
                    </CCol>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput v-model="prodi_dosen" :options="{informatika: 'Teknik Informatika', DKV: 'Desain Komunikasi Visual'}" type="select" placeholder="Prodi" label="Prodi" />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput class="mhs_email" label="Email" placeholder="Email" type="email" name="email" validation="required|email" />
                    </CCol>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput label="NIDN" placeholder="NIDN" type="number" name="niy" validation="required" />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput v-model="jenis_kelamin" :options="{P: 'Perempuan', L: 'Laki-Laki'}" type="select" placeholder="Jenis Kelamin" label="Jenis Kelamin" />
                    </CCol>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput v-model="status_dosen" :options="{Tetap: 'Tetap', Tidak_Tetap: 'Tidak Tetap'}" label="Status" placeholder="Status" type="select" validation="required" />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput label="Alamat" placeholder="Alamat" type="text" name="alamat" validation="required" />
                    </CCol>
                    <CCol sm="6" class="mt-3">
                        <FormulateInput label="Nomor HP" placeholder="Nomor HP" type="text" name="no_hp" validation="required" />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="12" class="mt-4">
                        <b-button type="submit" class="w-100 mt-3">Buat</b-button>
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

var titles = [{
        prop: "niy",
        label: "NIY"
    },
    {
        prop: "nama_dosen",
        label: "Nama"
    },
    {
        prop: "email_dosen",
        label: "Email"
    },
    {
        prop: 'alamat_dosen',
        label: 'Alamat'
    },
    {
        prop: 'status_dosen',
        label: 'Status'
    },
    {
        prop: 'no_hp_dosen',
        label: 'Nomor HP'
    },
    {
        prop: 'jenis_kelamin_dosen',
        label: 'Jenis Kelamin'
    },
    {
        prop: "prodi_dosen",
        label: "Prodi"
    }
]

export default {
    computed: mapState({
        data: state => state.admin_dosen.data
    }),
    created() {
        if (this.data.length < 1) {
            this.$store.dispatch('admin_dosen/actGetData')
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
            filters: [{

                    value: '',

                    prop: 'nama',

                },

                {

                    value: []

                }
            ],
            formValues: {},
            jenis_kelamin: '',
            editById: '',
            editByName: '',
            editByNik: '',
            editByKontak: '',
            editByAlamat: '',
            editByEmail: '',
            deleteById: '',
            deleteByDosen: '',
            status_dosen: '',
            prodi_dosen: '',
            titles,
            actionCol: {
                label: 'Actions',
                props: {
                    align: 'center',
                },
                buttons: [{
                    props: {
                        type: 'primary',
                        icon: 'el-icon-delete'
                    },
                    handler: row => {
                        this.deleteById = row.user_id
                        this.deleteByDosen = row.id_dosen
                        this.$refs.modalDelete.open()
                    },
                    label: 'delete'
                }, {
                    props: {

                        icon: 'el-icon-edit'
                    },
                    handler: row => {
                        this.editById = row.id_dosen
                        this.editByName = row.nama_dosen
                        this.editByNik = row.niy
                        this.editByKontak = row.no_hp_dosen
                        this.editByAlamat = row.alamat_dosen
                        this.editByEmail = row.email_dosen
                        this.$refs.modal.open()
                    },
                    label: 'Edit'
                }]
            }

        }
    },
    methods: {
        handleClick(command) {
            if (command == 'new') {
                this.$refs.modalAdd.open()
                const errors = {
                    fieldErrors: {
                        username: 'Sorry, no such username exists!'
                    },
                    formErrors: ['Incorrect login, please try again.']
                }
                this.$formulate.handle(errors, 'buat')
                this.$formulate.reset('buat')
            }

        },
        edit() {
            const data = {
                nama_dosen: this.editByName,
                no_hp_dosen: this.editByKontak,
                niy: this.editByNik,
                id_dosen: this.editById,
                email_dosen: this.editByEmail,
                alamat_dosen: this.editByAlamat
            }
            this.$refs.modal.close()
            this.$store.dispatch('admin_dosen/actEdit', data).then(() => {
                this.$refs.success.open()
            })
            this.$store.dispatch('admin_dosen/setLoad')
        },
        del() {
            const data = {
                id_dosen: this.deleteByDosen,
                user_id: this.deleteById
            }

            this.$store.dispatch('admin_dosen/dels', data)
                .then(() => this.$refs.success.open())
                .catch(() => this.$refs.gagal.open())

            this.$store.dispatch('components/setLoad')
            this.$refs.modalDelete.close()
        },
        buat() {
            const data = {
                ...this.formValues,
                jenis_kelamin_dosen: this.jenis_kelamin,
                status_dosen: this.status_dosen,
                prodi_dosen: this.prodi_dosen
            }
            this.$store.dispatch('admin_dosen/actAdd', data).then(() => {
                this.$refs.success.open()
            })
            this.$store.dispatch('components/setLoad')
            this.$refs.modalAdd.close()

        }
    }
}
</script>
