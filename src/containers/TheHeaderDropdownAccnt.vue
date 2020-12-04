<template>
<div>
    <CDropdown inNav class="c-header-nav-items" placement="bottom-end" add-menu-classes="pt-0">
        <template #toggler>
            <CHeaderNavLink>
                <div class="c-avatar">
                    <img v-if="$store.state.auth.profile[0] != undefined " style="height:34px; width:34px" :src="$store.state.auth.profile[0].foto || $store.state.auth.profile[0].foto_dosen" class="c-avatar-img " />
                    <img style="height:34px; width:34px" v-else src="https://avatar.oxro.io/avatar.svg?name=Eddie&background=ff6b6b&caps=3&bold=true" class="c-avatar-img "/>
                </div>
            </CHeaderNavLink>
        </template>

        <CDropdownDivider />

        <CDropdownItem @click="del">
            <CIcon name="cil-lock-locked" /> Logout
        </CDropdownItem>
    </CDropdown>

    
  
</div>
</template>

<script>
import axios from '../api/axios/axios'
import qs from 'query-string'

export default {
    name: 'TheHeaderDropdownAccnt',
    data() {
        return {
            itemsCount: 42,
            load: false,
        }
    },
    methods: {
       
        del() {
            localStorage.removeItem('token')
            localStorage.removeItem('profile')
            this.$router.push('/pages')
            this.$store.dispatch('auth/deleteToken')
            window.location.reload()
        }
    }
}
</script>

<style lang="scss">
.c-icon {
    margin-right: 0.3rem;
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
    color: #9c9c9c;
    height: 80px;
    width: 80px;
    z-index: 99;
}
</style>
