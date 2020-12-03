<template>
<div style="" class="c-app flex-row align-items-center">

        <CRow class="justify-content-between d-flex  w-100 m-0">

            <CCol md="4">
                <div class="overlay" v-if="overlays">
                    <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <h1 style="width:100%; text-align:center; color:white;font-size:28px; margin:80px 0"></h1>

                <CCard class="p-4" style="background:#306AFF; border:none; border-radius:12px">

                    <CCardBody>
                        <FormulateForm @submit="submit" class="login">
                            <div style="margin-bottom:67px">

                                <span style="font-size:14px" class="text-white">
                                    <b-icon class="mr-2" icon="back" aria-hidden="true"></b-icon>Siakad Filkom
                                </span>
                            </div>
                            <h1 style="font-size:48px;" class="text-white">Login</h1>
                            <p style="margin-bottom:60px; font-size:14px" class="text-white">Silahkan login untuk melanjutkan</p>

                            <CRow>
                                <CCol sm="12">
                                    <FormulateInput label="username" v-model="username" type="text" name='username' validation="required" />
                                </CCol>
                            </CRow>
                            <CRow class="mt-4">
                                <CCol sm="12" align="right">
                                    <FormulateInput label="password" v-model="password" type="password" name='password' validation="required" />
                                </CCol>
                            </CRow>
                            <CRow class="mt-5">
                                <CCol col="12" class="text-left">
                                    <button v-if="load" disabled class="btn btn-warning  w-100" type="button">
                                        <span class="d-flex align-items-center justify-content-around">
                                            <span class="spinner-border spinner-border-sm spinner-login" role="status" aria-hidden="true"></span>
                                            {{'loading...'}}
                                        </span>
                                    </button>
                                    <button v-else class="btn btn-warning  w-100" type="submit">
                                        <span style="font-weight:bold">
                                            Login
                                        </span>
                                    </button>
                                    <a style="font-size:14px; color:yellow;margin-top:20px;display:block" href="#/pages/forgetpassword">forgot password ?</a>

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
            <CCol md="4 bg-dark">
                <div class="overlay" v-if="overlays">
                    <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <h1 style="width:100%; text-align:center; color:white;font-size:28px; margin:80px 0"></h1>

           

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

            username: '',

            overlays: false,

            password: '',

            load: false

        }

    },

    methods: {

        submit() {

            this.isClicked = true

            this.load = true

            let data = {

                username: this.username,

                password: this.password

            }

            axios.post('/auth/login', qs.stringify(data))

                .then((res) => {

                    if (res.data.status == 201) {
                        return false
                    } else {
                        const token = res.data.token

                        localStorage.setItem('token', token)

                        this.$store.dispatch('auth/setToken', token);

                        if (res.data.profile != undefined) {
                            this.$store.dispatch('auth/setProfile', res.data.profile)
                            localStorage.setItem('profile', JSON.stringify(res.data.profile))

                            // if (res.data.profile[0].id_dosen !== undefined) {
                            //     setTimeout(() => {
                            //         this.$store.dispatch('dosen_nilai/actGetDataMakul')

                            //     }, 10000)

                            // }
                        }
                        this.overlays = false

                        console.log(token)

                        this.load = false
                        window.location.reload()

                    }
                })

                .catch(err => {

                    this.load = false
                    this.$swal('Login failed')
                    console.log(err)

                })

        }

    }

}
</script>

<style lang="scss">
.formulate-input-error {
    color: yellow !important;
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
    color: white;
    height: 30px;
    font-size: 14px;
    font-weight: 200;
}

.login input {
    border: none !important;
    border-radius: 6px;
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
