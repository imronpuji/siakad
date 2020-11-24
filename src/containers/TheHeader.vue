<template>
<CHeader fixed with-subheader light>

    <CHeaderBrand class="mx-auto d-lg-none" to="/">

    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
        <CHeaderNavItem class="px-3">
            <CHeaderNavLink to="/dashboard">
                Dashboard
            </CHeaderNavLink>
        </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
        <TheHeaderDropdownAccnt />
    </CHeaderNav>
    <CSubheader class="px-3">
        <CToggler in-header class="ml-3 d-lg-none" @click="$store.dispatch('components/setMobile')" />
        <CToggler in-header class="ml-3 d-md-down-none" @click="$store.dispatch('components/setDesktop')" />
        <CBreadcrumbRouter class="border-0 mb-0" />
    </CSubheader>
</CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'

export default {
    name: 'TheHeader',
    components: {
        TheHeaderDropdownAccnt
    },
    computed: {
        profile() {
            return this.$store.state.auth.profile[0].nama
        }
    }
}
</script>
