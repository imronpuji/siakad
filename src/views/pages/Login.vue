<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">

              <CCardBody>
                <FormulateForm @submit="submit" >
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CRow>
                    <CCol sm="12">
                        <FormulateInput v-model="username" type="text" name='username' validation="required"/>
                    </CCol>
                  </CRow>
                  <CRow class="mt-4">
                    <CCol sm="12">
                        <FormulateInput v-model="password" type="password" name='password' validation="required"/>
                    </CCol>
                  </CRow>
                  <CRow class="mt-4">
                    <CCol col="6" class="text-left">
                      <button v-if="isClicked" disabled class="btn btn-primary  w-100" type="button">
                        <span  class="d-flex align-items-center justify-content-around">
                          <span class="spinner-border spinner-border-sm spinner-login" role="status" aria-hidden="true"></span>
                        {{'loading...'}}
                        </span>
                      </button>
                      <button v-else  class="btn btn-primary  w-100" type="submit">
                        <span>
                          Login
                        </span>
                      </button>
                    </CCol>
                  </CRow>
                </FormulateForm>
              </CCardBody>
            </CCard>

            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper>
              <CCardBody>
                <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Reading_book_re_kqpk.svg" alt="">
              </CCardBody>
            </CCard>
          </CCardGroup>
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

  data(){

    return {
      isClicked : false,

      username : '',

      password : '',

      load : false

    }

  },
   
   methods:{
     
     submit(){
       
      this.isClicked = true
      
      this.load = true

      let data = {
        
          username : this.username,
        
          password : this.password
        
        }

      
      axios.post('/auth/login', qs.stringify(data))

      .then((res) => {
        
        this.load = false
        if(res.data.status == 201){
          return false
        } else {
          const token = res.data.token
          
          localStorage.setItem('token', token)

          this.$store.dispatch('auth/setToken', token)
          console.log(token)
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
           
         
        }
      })

      .catch(err => {
        
        this.load = false
        
        console.log(err)
      
      })
    
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
    
    img {
      width: 20VW;
    }
    .spinner-login {
      width : 15px !important;
      color : white !important;
      height : 15px !important
    }
  
</style>