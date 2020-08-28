<template>
    <div class="text">
        <div class="img">
            <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Reading_book_re_kqpk.svg" alt="">
        </div>
          <div class="form">
         <CRow>
           
      <CCol sm="12">
        <CInput
          class="cg-col"
          label="Name"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
          label="Kontak"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="4">
        <CSelect
          label="Month"
          :options="[1,2,3,4,5,6,7,8,9,10,11,12]"
        />
      </CCol>
      <CCol sm="4">
        <CSelect
          label="Year"
          :options="[2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025]"
        />
      </CCol>
      <CCol sm="4">
        <CInput
          label="CVV/CVC"
        />
      </CCol>
      <CCol sm="4">
        <b-button class="danger">submit</b-button>
      </CCol>

    </CRow>
          </div>

    </div>
</template>
<style lang="scss">
    .text {
        display: flex;
        border-radius: 8px;
        overflow : hidden;
        box-shadow: 0px 10px 20px rgba(194, 194, 194, 0.4);
        height: 73vh;
    }
    .img {
        width: 50%;
        background:rgb(127, 140, 255);
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
}
    .form {
        padding : 50px;
        width: 50%;
    }
    .form-control {
        background: rgb(243, 243, 243) !important;
        border:none !important;
    }
    img {
        width: 260px;
    }
</style>