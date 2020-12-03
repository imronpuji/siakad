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
                                <!-- <img style="width:20px; margin-right:8px" src="data:image/png;base64,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" alt=""> -->

                                <span style="font-size:14px" class="text-white">
                                    <b-icon class="mr-2" icon="back" aria-hidden="true"></b-icon>Siakad Filkom
                                </span>
                            </div>

                            <CRow>
                                <CCol sm="12">
                                    <FormulateInput label="email" v-model="email" type="text" name='email' validation="required" />
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
                                            Reset Password
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

            email: '',

            message : '',
            load: false

        }

    },

    methods: {

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
