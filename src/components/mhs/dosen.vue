<template>
<div class="test">
<el-row style="margin-bottom: 10px">
        <el-col :span="5">
            <FormulateInput placeholder="Pencarian" type="search" v-model="filters[0].value" />
        </el-col>
    </el-row>
    <data-tables :data="data" :pagination-props="{ pageSizes: [8, 10, 15] }" :table-props="tableProps" :action-col="actionCol" :filters="filters">
        <el-table-column v-for="title in titles" sortable="costum" :prop="title.prop" :label="title.label" :key="title.label">
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
import {
    mapState
} from 'vuex'
// import _ from 'loda'
var titles = [{
        prop: "nama",
        label: "Nama"
    },
    {
        prop: "email",
        label: "Email"
    },
    {
        prop: 'alamat',
        label: 'Alamat'
    },

    {
        prop: 'no_hp',
        label: 'Nomor HP'
    },

    {
        prop: "prodi",
        label: "Prodi"
    }

]

export default {
    computed: mapState({
        data: state => state.mhs_dosen.data,
    }),
    created() {

        this.$store.dispatch('mhs_dosen/actGetData')
        this.$store.dispatch('components/setLoad')

    },

    data() {
        return {
        filters: [{

                    value: '',

                    prop: 'nama',

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
                    },
                    handler: row => {
                    const number_wa = row.no_hp.substring(1);
                         window.open( 
              `https://wa.me/62${number_wa}`, "_blank")
                    },
                    label: 'hubungi'
                }]
            },
            tableProps: {
                border: true,
                stripe: true,
                defaultSort: {
                    prop: 'flow_no',
                    order: 'descending'
                }
            },
            titles,

        }
    },

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

}
</style>
