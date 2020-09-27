<template>
<div>
    <CDropdown inNav class="c-header-nav-items" placement="bottom-end" add-menu-classes="pt-0">
        <template #toggler>
            <CHeaderNavLink>
                <div class="c-avatar">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="c-avatar-img " />
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
