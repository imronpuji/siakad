<template>
<div class="c-app flex-row h-100" style="background-color:white">

    <CRow class="justify-content-between d-flex  w-100 m-0  h-100">
        <CCol md="6 p-5" v-if="windowHeight > '768'" style="overflow:hidden; background: rgb(62, 148, 235)">
            <div class="overlay" v-if="overlays">
                <div class="spinner-grow text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>

            <h1 style="font-size:24px; color:#045498">
                <b-icon class="mr-2" icon="back" aria-hidden="true"></b-icon>Siakad Filkom
            </h1>
            <h1 style="font-weight:bold; margin-top:40px; color:#045498">Discover information you want to check now</h1>
            <img style="position:absolute; bottom:-260px; width:60vw; left:-55px; " src="../../assets/bg-login.svg" alt="">
            <!-- <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper>
              <CCardBody>
                <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Reading_book_re_kqpk.svg" alt="">
              </CCardBody>
            </CCard> -->
        </CCol>
        
        <CCol md="6" class="h-100 m-0 p-5">
            <div class="overlay" v-if="overlays">
                <div class="spinner-grow text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>

            <CCard class="h-100 w-100" style=" border:none;">

                <CCardBody>
                    <FormulateForm @submit="submit" class="login">
                        <!-- <div style="">

                                <span style="font-size:14px" class="">
                                    <b-icon class="mr-2" icon="back" aria-hidden="true"></b-icon>Siakad Filkom
                                </span>
                            </div> -->
                        <h1 style="font-size:28px; font-weight:bold" class="">Selamat datang di SIAKAD Filkom</h1>
                        <p style="margin-bottom:60px; font-size:16px; " class="">Silahkan login untuk melanjutkan</p>

                        <CRow>
                            <CCol sm="12">
                                <FormulateInput label="email" v-model="email" type="text" name='email' validation="required" />
                            </CCol>
                        </CRow>
                        <CRow class="mt-4">
                            <CCol col="12" class="text-left">
                                <button style="height:56px; background: rgb(62, 148, 235)" v-if="load" disabled class="btn w-100" type="button">
                                    <span class="d-flex align-items-center justify-content-around">
                                        <span class="spinner-border spinner-border-sm spinner-login" role="status" aria-hidden="true"></span>
                                        {{'loading...'}}
                                    </span>
                                </button>
                                <button style="height:56px; background: rgb(62, 148, 235)" v-else class="btn w-100" type="submit">
                                    <span style="font-weight:bold; height:56px; color:#045498">
                                        Reset Password
                                    </span>
                                </button>
                                <a style="font-size:14px; color:black;margin-top:20px;display:block" href="#/pages/login">Back</a>
                                <h4 class="mt-3" v-if="message.length > 0">Check email, {{message}}</h4>
                            </CCol>
                        </CRow>
                    </FormulateForm>
                </CCardBody>
            </CCard>

            <!-- <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper>
              <CCardBody>
                <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Reading_book_re_kqpk.svg" alt="">
              </CCardBody>
            </CCard> -->
        </CCol>

    </CRow>

    <!-- 

        <div>
          Loading..
        </div>  
 -->

</div>
</template>

<script>
import axios from '../../api/axios/axios'
import qs from 'querystring'

export default {

    name: 'Login',

    data() {

        return {
            isClicked: false,

            email: '',

            message: '',
            load: false,
            windowHeight: window.innerWidth,

        }

    },

    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onResize() {
            this.windowHeight = window.innerWidth
        },

        submit() {

            this.isClicked = true

            this.load = true

            const form = new FormData()
            form.append('email', this.email)

            axios.post(`/forgotpassword`, form)

                .then((res) => {

                    this.message = res.data.message
                    this.load = false
                })

                .catch(err => {

                    this.load = false
                    this.$swal('email tidak terdaftar')
                    console.log(err)

                })

        }

    }

}
</script>

<style lang="scss">
.formulate-input-error {
    color: black !important;
    font-size: 12px;
    position: relative;
    list-style-type: none;
}

.formulate-input-errors {
    display: flex;
    margin: 8px;
    padding: 0
}

.login label {
    color: black !important;
    height: 30px;
    font-size: 14px;
    font-weight: 200;
}

.login input {
    border: none !important;
    border-radius: 6px;
    height: 56px !important;
    background: rgb(236, 236, 236) !important;
    width: 100%;
    padding: 8px;
    color: rgb(114, 114, 114)
}

.overlay {
    position: absolute;
    height: 100%;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 999;
    background-color: rgb(61, 159, 250);
    display: flex;
    opacity: 0.4;
    justify-content: center;
    align-items: center;
}

img {
    width: 20VW;
}

.spinner-login {
    width: 15px !important;
    color: white !important;
    height: 15px !important
}
</style>
