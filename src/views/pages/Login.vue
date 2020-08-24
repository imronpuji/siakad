<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <FormulateForm @submit="submit" v-model="data">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CRow>
                    <CCol sm="12">
                        <FormulateInput type="text" name='username' validation="required"/>
                    </CCol>
                  </CRow>
                  <CRow class="mt-4">
                    <CCol sm="12">
                        <FormulateInput type="password" name='password' validation="required"/>
                    </CCol>
                  </CRow>
                  <CRow class="mt-4">
                    <CCol col="6" class="text-left">
                      <CButton type="submit" color="primary" class="px-4 w-100">Login</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0">Forgot password?</CButton>
                      <CButton color="link" class="d-lg-none">Register now!</CButton>
                    </CCol>
                  </CRow>
                </FormulateForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Reading_book_re_kqpk.svg" alt="">
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
      <div class="overlay" v-if="load">
          <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>

          <div>
            Loading..
          </div>
          
      </div>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Login',
  
  data(){
    return {
      data : {},
      load : false
    }
  },
  methods:{
    submit(){
      this.load = true
      setTimeout(() => {
        this.load = false
        localStorage.setItem('role','admin')
        this.$router.push('/')
      }, 2000);
      
    }
  }
}
</script>

<style lang="scss">
 
    .formulate-input-error {
      color : red;
      font-size: 12px;
      position: relative;
      list-style-type: none;
    }
    .formulate-input-errors { 
      display : flex;
      margin : 8px;
      padding : 0
    }
    input {
      border : none;
      border-radius: 6px;
      background: rgb(236, 236, 236);
      width: 100%;
      padding : 8px;
      color : rgb(114, 114, 114)
    }
    .overlay {
      background: rgba(255, 255, 255, 0.582);
      position : absolute;
      height : 100%;
      top : 0;
      width : 100%;
      left : 0;
      display : flex;
      justify-content: center;
      align-items: center;
    }
    .spinner-border {
      color : #9c9c9c;
      height: 80px;
      width: 80px;
      z-index: 99;
    }
  
</style>