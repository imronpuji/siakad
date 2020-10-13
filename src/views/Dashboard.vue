<template>
<div>
    <div class="container">
        <div class="main-body">
            <div class=" col-md-12 alert alert-success  d-flex justify-content-between align-items-center bg-primary" style=" height:240px" role="alert">
                <div class="text-greeting" style="position:relative; top:-30px; left:30px">
                    <h4 v-if="$store.state.auth.user[0].data.role == 'admin'" class="alert-heading text-white mb-3">Selamat Datang admin</h4>
                    <h4 v-else class="alert-heading text-white mb-3">Selamat Datang {{$store.state.auth.profile[0].nama.toLowerCase()}}</h4>
                    <p class="text-white m-0">Selamat Berselancar di Sistem Informasi</p>
                    <p class="text-white">Akademis UNISS</p>

                </div>
                <div class="img-greeting">
                    <img style="height:200px" src="./greeting.svg" alt="">
                </div>

            </div>
            <div v-if="$store.state.auth.user[0].data.role == 'mahasiswa'" class="row gutters-sm">
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex flex-column align-items-center text-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
                                <div class="mt-3">
                                    <h4>{{this.$store.state.auth.profile[0].nama}}</h4>
                                    <p class="text-secondary mb-1">{{this.$store.state.auth.user[0].data.role == 'admin' ? 'admin' : this.$store.state.auth.user[0].data.role }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mt-3 p-2">
                        <FormulateForm v-model="formValues" @submit="buat" name="buat">

                            <CRow>
                                <CCol sm="12" class="mt-3">
                                    <FormulateInput label="username" placeholder="Username" type="text" name="username" validation="required" />
                                </CCol>
                                <CCol sm="12" class="mt-3">
                                    <FormulateInput label="password" placeholder="Password" type="password" name="password" validation="required" />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm="12" class="mt-3">
                                    <b-button type="submit" class="w-100">Perbarui</b-button>
                                </CCol>
                            </CRow>

                        </FormulateForm>
                        <div class="overlay" v-if="load">
                            <div class="spinner-grow text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>

                            <div>
                                Loading..
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Nama Lengkap</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {{this.$store.state.auth.profile[0].nama}}
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Email</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {{this.$store.state.auth.profile[0].email}}
                                </div>
                            </div>
                            <hr>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Jurusan</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {{this.$store.state.auth.profile[0].jurusan}}
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">NIM</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {{this.$store.state.auth.profile[0].nim}}
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Tahun Masuk</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {{this.$store.state.auth.profile[0].tahun_masuk}}
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Semester</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {{this.$store.state.auth.profile[0].semester}}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div v-if="$store.state.auth.user[0].data.role == 'dosen'" class="row gutters-sm">
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <!-- <div v-for="data in this.$store.state.auth.profile[1]['makul']" :key="data.dosen_id">
                                <h2>{{data.nama_makul}}</h2>
                            </div> -->
                            <div class="d-flex flex-column align-items-center text-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
                                <div class="mt-3">
                                    <h4>{{this.$store.state.auth.profile[0].nama}}</h4>
                                    <p class="text-secondary mb-1">{{this.$store.state.auth.user[0].data.role == 'admin' ? 'admin' : this.$store.state.auth.user[0].data.role }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mt-3 p-2">
                        <FormulateForm v-model="formValues" @submit="buat" name="buat">

                            <CRow>
                                <CCol sm="12" class="mt-3">
                                    <FormulateInput label="username" placeholder="Username" type="text" name="username" validation="required" />
                                </CCol>
                                <CCol sm="12" class="mt-3">
                                    <FormulateInput label="password" placeholder="Password" type="password" name="password" validation="required" />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm="12" class="mt-3">
                                    <b-button type="submit" class="w-100">Perbarui</b-button>
                                </CCol>
                            </CRow>

                        </FormulateForm>
                        <div class="overlay" v-if="load">
                            <div class="spinner-grow text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>

                            <div>
                                Loading..
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Full Name</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {{this.$store.state.auth.profile[0].nama}}
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Email</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {{this.$store.state.auth.profile[0].email}}
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">NIDN</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {{this.$store.state.auth.profile[0].niy}}
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row">
                               <h4>Mata Kuliah</h4>
                            </div>
                            <hr>
                            <div v-if="this.$store.state.auth.profile[1]['makul'].length > 0">
                            <div v-for="data in this.$store.state.auth.profile[1]['makul']" :key="data.dosen_id">
                                <p>{{data.nama_makul}}</p>
                                <p>{{data.jurusan}}</p>
                                <hr>
                            </div>
                            </div>
                            <p v-else>Mata Kuliah Masih Kosong</p>
                            
                        </div>
                    </div>

                </div>
                

            </div>

            <div v-if="$store.state.auth.user[0].data.role == 'admin'" class="row gutters-sm">
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex flex-column align-items-center text-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
                                <div class="mt-3">
                                    <h4>Admin</h4>
                                    <p class="text-secondary mb-1">{{this.$store.state.auth.user[0].data.role == 'admin' ? 'admin' : this.$store.state.auth.user[0].data.role }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mt-3 p-2">
                        <FormulateForm v-model="formValues" @submit="buat" name="buat">

                            <CRow>
                                <CCol sm="12" class="mt-3">
                                    <FormulateInput label="username" placeholder="Username" type="text" name="username" validation="required" />
                                </CCol>
                                <CCol sm="12" class="mt-3">
                                    <FormulateInput label="password" placeholder="Password" type="password" name="password" validation="required" />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm="12" class="mt-3">
                                    <b-button type="submit" class="w-100">Perbarui</b-button>
                                </CCol>
                            </CRow>

                        </FormulateForm>
                        <div class="overlay" v-if="load">
                            <div class="spinner-grow text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>

                            <div>
                                Loading..
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Full Name</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    Admin Admin
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Email</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    admin@gmail.com
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">NIY</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    123Admin
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
    <!-- <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" class="card-title mb-0">Traffic</h4>
              <div class="small text-muted">November 2017</div>
            </CCol>
            <CCol sm="7" class="d-none d-md-block">
              <CButton color="primary" class="float-right">
                <CIcon name="cil-cloud-download"/>
              </CButton>
              <CButtonGroup class="float-right mr-3">
                <CButton
                  color="outline-secondary"
                  v-for="(value, key) in ['Day', 'Month', 'Year']"
                  :key="key"
                  class="mx-0"
                  :pressed="value === selected ? true : false"
                  @click="selected = value"
                >
                  {{value}}
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample style="height:300px;margin-top:40px;"/>
        </CCardBody>
        <CCardFooter>
          <CRow class="text-center">
            <CCol md sm="12" class="mb-sm-2 mb-0">
              <div class="text-muted">Visits</div>
              <strong>29.703 Users (40%)</strong>
              <CProgress
                class="progress-xs mt-2"
                :precision="1"
                color="success"
                :value="40"
              />
            </CCol>
            <CCol md sm="12" class="mb-sm-2 mb-0 d-md-down-none">
              <div class="text-muted">Unique</div>
              <strong>24.093 Users (20%)</strong>
              <CProgress
                class="progress-xs mt-2"
                :precision="1"
                color="info"
                :value="20"
              />
            </CCol>
            <CCol md sm="12" class="mb-sm-2 mb-0">
              <div class="text-muted">Pageviews</div>
              <strong>78.706 Views (60%)</strong>
              <CProgress
                class="progress-xs mt-2"
                :precision="1"
                color="warning"
                :value="60"
              />
            </CCol>
            <CCol md sm="12" class="mb-sm-2 mb-0">
              <div class="text-muted">New Users</div>
              <strong>22.123 Users (80%)</strong>
              <CProgress
                class="progress-xs mt-2"
                :precision="1"
                color="danger"
                :value="80"
              />
            </CCol>
            <CCol md sm="12" class="mb-sm-2 mb-0 d-md-down-none">
              <div class="text-muted">Bounce Rate</div>
              <strong>Average Rate (40.15%)</strong>
              <CProgress
                class="progress-xs mt-2"
                :precision="1"
                :value="40"
              />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard> -->
    <!-- <WidgetsBrand/> -->
    <!-- <CRow>
        <CCol md="12">
          <CCard>
            <CCardHeader>
              Traffic &amp; Sales
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm="12" lg="6">
                  <CRow>
                    <CCol sm="6">
                      <CCallout color="info">
                        <small class="text-muted">New Clients</small><br>
                        <strong class="h4">9,123</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="danger">
                        <small class="text-muted">Recurring Clients</small><br>
                        <strong class="h4">22,643</strong>
                      </CCallout>
                    </CCol>
                  </CRow>
                  <hr class="mt-0">
                  <div class="progress-group mb-4">
                    <div class="progress-group-prepend">
                      <span class="progress-group-text">
                        Monday
                      </span>
                    </div>
                    <div class="progress-group-bars">
                      <CProgress
                        class="progress-xs"
                        color="info"
                        :value="34"
                      />
                      <CProgress
                        class="progress-xs"
                        color="danger"
                        :value="78"
                      />
                    </div>
                  </div>
                  <div class="progress-group mb-4">
                    <div class="progress-group-prepend">
                      <span class="progress-group-text">
                        Tuesday
                      </span>
                    </div>
                    <div class="progress-group-bars">
                      <CProgress
                        class="progress-xs"
                        :value="56"
                        color="info"
                      />
                      <CProgress
                        class="progress-xs"
                        :value="94"
                        color="danger"
                      />
                    </div>
                  </div>
                  <div class="progress-group mb-4">
                    <div class="progress-group-prepend">
                      <span class="progress-group-text">
                        Wednesday
                      </span>
                    </div>
                    <div class="progress-group-bars">
                      <CProgress
                        class="progress-xs"
                        :value="12"
                        color="info"
                      />
                      <CProgress
                        class="progress-xs"
                        :value="67"
                        color="danger"
                      />
                    </div>
                  </div>
                  <div class="progress-group mb-4">
                    <div class="progress-group-prepend">
                      <span class="progress-group-text">
                        Thursday
                      </span>
                    </div>
                    <div class="progress-group-bars">
                      <CProgress
                        class="progress-xs"
                        :value="43"
                        color="info"
                      />
                      <CProgress
                        class="progress-xs"
                        :value="91"
                        color="danger"
                      />
                    </div>
                  </div>
                  <div class="progress-group mb-4">
                    <div class="progress-group-prepend">
                      <span class="progress-group-text">
                        Friday
                      </span>
                    </div>
                    <div class="progress-group-bars">
                      <CProgress
                        class="progress-xs"
                        :value="22"
                        color="info"
                      />
                      <CProgress
                        class="progress-xs"
                        :value="73"
                        color="danger"
                      />
                    </div>
                  </div>
                  <div class="progress-group mb-4">
                    <div class="progress-group-prepend">
                      <span class="progress-group-text">
                        Saturday
                      </span>
                    </div>
                    <div class="progress-group-bars">
                      <CProgress
                        class="progress-xs"
                        :value="53"
                        color="info"
                      />
                      <CProgress
                        class="progress-xs"
                        :value="82"
                        color="danger"
                      />
                    </div>
                  </div>
                  <div class="progress-group mb-4">
                    <div class="progress-group-prepend">
                      <span class="progress-group-text">
                        Sunday
                      </span>
                    </div>
                    <div class="progress-group-bars">
                      <CProgress
                        class="progress-xs"
                        :value="9"
                        color="info"
                      />
                      <CProgress
                        class="progress-xs"
                        :value="69"
                        color="danger"
                      />
                    </div>
                  </div>
                  <div class="legend text-center">
                    <small>
                      <sup><CBadge shape="pill" color="info">&nbsp;</CBadge></sup>
                      New clients
                      &nbsp;&nbsp;
                      <sup><CBadge shape="pill" color="danger">&nbsp;</CBadge></sup>
                      Recurring clients
                    </small>
                  </div>
                </CCol>
                <CCol sm="12" lg="6">
                  <CRow>
                    <CCol sm="6">
                      <CCallout color="warning">
                        <small class="text-muted">Pageviews</small><br>
                        <strong class="h4">78,623</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="success">
                        <small class="text-muted">Organic</small><br>
                        <strong class="h4">49,123</strong>
                      </CCallout>
                    </CCol>
                  </CRow>
                  <hr class="mt-0">
                  <ul class="horizontal-bars type-2">
                    <div class="progress-group">
                      <div class="progress-group-header">
                        <CIcon name="cil-user" class="progress-group-icon"/>
                        <span class="title">Male</span>
                        <span class="ml-auto font-weight-bold">43%</span>
                      </div>
                      <div class="progress-group-bars">
                        <CProgress
                          class="progress-xs"
                          :value="43"
                          color="warning"
                        />
                      </div>
                    </div>
                    <div class="progress-group mb-5">
                      <div class="progress-group-header">
                        <CIcon name="cil-user-female" class="progress-group-icon"/>
                        <span class="title">Female</span>
                        <span class="ml-auto font-weight-bold">37%</span>
                      </div>
                      <div class="progress-group-bars">
                        <CProgress
                          class="progress-xs"
                          :value="37"
                          color="warning"
                        />
                      </div>
                    </div>
                    <div class="progress-group">
                      <div class="progress-group-header">
                        <CIcon name="cil-globe-alt" class="progress-group-icon"/>
                        <span class="title">Organic Search</span>
                        <span class="ml-auto font-weight-bold">
                          191,235 <span class="text-muted small">(56%)</span>
                        </span>
                      </div>
                      <div class="progress-group-bars">
                        <CProgress
                          class="progress-xs"
                          :value="56"
                          color="success"
                        />
                      </div>
                    </div>
                    <div class="progress-group">
                      <div class="progress-group-header">
                        <CIcon
                          name="cib-facebook"
                          height="17"
                          class="progress-group-icon"
                        />
                        <span class="title">Facebook</span>
                        <span class="ml-auto font-weight-bold">
                          51,223 <span class="text-muted small">(15%)</span>
                        </span>
                      </div>
                      <div class="progress-group-bars">
                        <CProgress
                          class="progress-xs"
                          :value="15"
                          color="success"
                        />
                      </div>
                    </div>
                    <div class="progress-group">
                      <div class="progress-group-header">
                        <CIcon
                          name="cib-twitter"
                          height="17"
                          class="progress-group-icon"
                        />
                        <span class="title">Twitter</span>
                        <span class="ml-auto font-weight-bold">
                          37,564 <span class="text-muted small">(11%)</span>
                        </span>
                      </div>
                      <div class="progress-group-bars">
                        <CProgress
                          class="progress-xs"
                          :value="11"
                          color="success"
                        />
                      </div>
                    </div>
                    <div class="progress-group">
                      <div class="progress-group-header">
                        <CIcon
                          name="cib-linkedin"
                          height="17"
                          class="progress-group-icon"
                        />
                        <span class="title">LinkedIn</span>
                        <span class="ml-auto font-weight-bold">
                          27,319 <span class="text-muted small">&nbsp;(8%)</span>
                        </span>
                      </div>
                      <div class="progress-group-bars">
                        <CProgress
                          class="progress-xs"
                          :value="8"
                          color="success"
                        />
                      </div>
                    </div>
                    <div class="divider text-center">
                      <CButton color="link" size="sm" class="text-muted">
                        <CIcon name="cil-options"/>
                      </CButton>
                    </div>
                  </ul>
                </CCol>
              </CRow>
              <br/>
              <CDataTable
                class="mb-0 table-outline"
                hover
                :items="tableItems"
                :fields="tableFields"
                head-color="light"
                no-sorting
              >
                <td slot="avatar" class="text-center" slot-scope="{item}">
                  <div class="c-avatar">
                    <img :src="item.avatar.url" class="c-avatar-img" alt="">
                    <span
                      class="c-avatar-status"
                      :class="`bg-${item.avatar.status || 'secondary'}`"
                    ></span>
                  </div>
                </td>
                <td slot="user" slot-scope="{item}">
                  <div>{{item.user.name}}</div>
                  <div class="small text-muted">
                    <span>
                      <template v-if="item.user.new">New</template>
                      <template v-else>Recurring</template>
                    </span> | Registered: {{item.user.registered}}
                  </div>
                </td>
                <td
                  slot="country"
                  slot-scope="{item}"
                  class="text-center"
                >
                  <CIcon
                    :name="item.country.flag"
                    height="25"
                  />
                </td>
                <td slot="usage" slot-scope="{item}">
                  <div class="clearfix">
                    <div class="float-left">
                      <strong>{{item.usage.value}}%</strong>
                    </div>
                    <div class="float-right">
                      <small class="text-muted">{{item.usage.period}}</small>
                    </div>
                  </div>
                  <CProgress
                    class="progress-xs"
                    v-model="item.usage.value"
                    :color="color(item.usage.value)"
                  />
                </td>
                <td
                  slot="payment"
                  slot-scope="{item}"
                  class="text-center"
                >
                  <CIcon
                    :name="item.payment.icon"
                    height="25"
                  />
                </td>
                <td slot="activity" slot-scope="{item}">
                  <div class="small text-muted">Last login</div>
                  <strong>{{item.activity}}</strong>
                </td>
              </CDataTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> -->
</div>
</template>

<script>
import axios from '../api/axios/axios'
import qs from 'query-string'

export default {
    name: 'TheHeaderDropdownAccnt',
    data() {
        return {
            formValues: {},
            itemsCount: 42,
            load: false,
        }
    },
    methods: {

        buat() {
            this.load = true
            const id = this.$store.state.auth.user[0].data.id
            const role = this.$store.state.auth.user[0].data.role

            const username = this.formValues.username
            const password = this.formValues.password
            axios.put(`/auth/changepassword/${id}`, qs.stringify({
                    username,
                    password
                }))
                .then(res => {
                    this.load = false
                })
                .catch(err => this.load = false)
        },

    }
}
</script>

<style lang="scss">

</style>
