<template>
<div style="background: #5C9DFF" class="c-app flex-row align-items-center">
    <CContainer>

        <CRow class="justify-content-center">
            <CCol md="4">
                <h1 style="width:100%; text-align:center; color:white;font-size:28px; margin:80px 0">{{message}}</h1>

                <CCard class="p-4" style="background:#306AFF; border:none; border-radius:12px">

                    <CCardBody>
                        <FormulateForm @submit="submit" class="login">
                            <div style="margin-bottom:67px">

                                <span style="font-size:14px" class="text-white">
                                    <b-icon class="mr-2" icon="back" aria-hidden="true"></b-icon>Siakad Filkom
                                </span>
                            </div>

                            <CRow>
                                <CCol sm="12">
                                    <FormulateInput label="New Password" v-model="password" type="text" name='password' validation="required" />
                                </CCol>
                            </CRow>
                            <CRow class="mt-2">
                                <CCol col="12" class="text-left">
                                    <button v-if="load" disabled class="btn btn-warning  w-100" type="button">
                                        <span class="d-flex align-items-center justify-content-around">
                                            <span class="spinner-border spinner-border-sm spinner-login" role="status" aria-hidden="true"></span>
                                            {{'loading...'}}
                                        </span>
                                    </button>
                                    <button v-else class="btn btn-warning  w-100" type="submit">
                                        <span>
                                            Perbarui Password
                                        </span>
                                    </button>
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

        <!-- <div class="overlay" v-if="load">
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>

        <div>
          Loading..
        </div>  
      </div> -->

    </CContainer>
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

            password: '',
            token: '',
            message: '',
            load: false

        }

    },

    methods: {

        submit() {

            this.isClicked = true

            this.load = true

            const form = new FormData()
            form.append('password', this.password)

            axios.post(`/resetpassword?token=${this.token}`, form)

                .then((res) => {

                    this.message = res.data.message
                    this.load = false
                    setTimeout(() => {
                        this.$router.push('/pages/login')
                    }, 2000)
                })

                .catch(err => {

                    this.load = false
                    this.$swal('gagal')
                    console.log(err)

                })

        }

    },
    mounted() {
        const token = this.$route.query.token
        this.token = token
    }
}
</script>

<style lang="scss">
.formulate-input-error {
    color: red;
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

img {
    width: 20VW;
}

.spinner-login {
    width: 15px !important;
    color: white !important;
    height: 15px !important
}
</style>
