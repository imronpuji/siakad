<template>
<div class="test">

    <el-row style="margin-bottom: 10px">

    

        <el-col :span="4">
 
                <el-dropdown @command="handleClick">
                    <el-button type="primary">Cetak KRS<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="A">Kelas A</el-dropdown-item>
                        <el-dropdown-item command="B">Kelas B</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            <!-- <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="$store.state.auth.profile[0].semester">SMT {{$store.state.auth.profile[0].semester}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown> -->
        </el-col>
            <el-col :span="4">
            <el-select placeholder="Pilih Semester" v-model="filters[0].value" multiple="multiple">
                <el-option label="SMT 1" value="1"></el-option>
                <el-option label="SMT 2" value="2"></el-option>
                <el-option label="SMT 3" value="3"></el-option>
                <el-option label="SMT 4" value="4"></el-option>
                <el-option label="SMT 5" value="5"></el-option>
                <el-option label="SMT 6" value="6"></el-option>
                <el-option label="SMT 7" value="7"></el-option>
                <el-option label="SMT 8" value="8"></el-option>
            </el-select>
        </el-col>
    </el-row>

    <data-tables :data="data" :table-props="tableProps" :pagination-props="{ pageSizes: [6, 10, 15] }" :filters="filters">
        <el-table-column v-for="title in titles" sortable="custom" :prop="title.prop" :label="title.label" :key="title.label">
        </el-table-column>
    </data-tables>

    <sweet-modal icon="success" ref="success">
        success!
    </sweet-modal>

    <div class="overlay" v-if="$store.state.components.loading">
        <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <div style="height:0px; visibility:hidden" id="TableKrs">
        <div class="containerss" style="visibility: hidden;width:100%; display:flex;flex-direction:row-reverse">

            <div class="boxKrs" style="width:50%; position:relative;  display:flex; flex-direction:column; justify-content:flex-end">
                <p class="lembar">Lembar 1 : BAAK</p>

                <table class="blueTable">
                    <thead>
                        <tr>
                            <th class="number">NO</th>
                            <th class="kode">Kode MK</th>
                            <th class="makul">Mata Kuliah</th>
                            <th class="jadwal">Jadwal</th>
                            <th class="number">SKS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dataKrs, index) in $store.state.mhs_kurikulum.dataKrs" :key="index">
                            <td>{{index + 1}}</td>
                            <td>{{dataKrs.makul_id}}</td>
                            <td class="MK">{{dataKrs.nama_makul}}</td>
                            <td>{{dataKrs.hari + ', ' + '' + dataKrs.mulai + '-' + dataKrs.selesai + ',' + ' ' + `(${dataKrs.kelas})`}}</td>
                            <td>{{dataKrs.sks}}</td>
                        </tr>
                       

                    </tbody>
                    <thead>

                        <th class="rest" style="text-align:center" colspan="4">Total SKS</th>
                        <th class="rest" style="text-align:center">{{$store.state.mhs_kurikulum.allSks}}</th>

                    </thead>

                </table>
                <div class="signatureKrs" style="width:100%; display:flex; justify-content:flex-end">
                    <div class="signature" style="width:70%; text-align:center">
                        <p class="ketua" style="margin-bottom:70px; margin-top:40px">Ketua Program Studi</p>
                        <p class="namaDosen">Yusuf Wahyu Setiya Putra, S.Kom. M.Kom.</p>
                    </div>

                </div>
            </div>

            <div class="titleHeader" style="width:50%; margin-right:30px; display:flex; flex-direction:column">
                <img class="img" style="width:100px; margin-bottom:20px; margin-left:auto; margin-right:auto" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOMAAADeCAMAAAD4tEcNAAABFFBMVEX///8AAAAfGhccFxQ8ODYjHhsdFhO2trWin6ALAACSkpLq6uoHAAD//v/7+/vPz8/y8vIODg5+fn5HR0cXEQ3i4OFUVFTU1NTs7Oz29vb/AAAPBQDa2tpbWFbLy8vf399pZmatq6spJSIaGhp4eHiKiYgwLCrCwcF7e3s/Pz+1tbVwbm1MSUdYVlWIhoSop6Y0NDQqKipsaWlbAADIBQWKBQZJAAByAABRAAAuJiUVDAErKCMaDw4WFhYiIiIIEhDi4en1/PCytKsaIRUAFgA7PzqUAQCuBAcyAAAAFhnsAwXOBQarBgWTBgRCSlFoAACkn6zgBQh/BAQ+AAAZAAA0PUImIjJVXF/VzteGkYtrY2kmAACwrjwmAAAfoklEQVR4nN1dCZviRpJVSCB00EJFiUMjAYIGBIijunx2u9ye2aPba8+M117vzh7//39sRKYEAnQkoOrD7/PnolWUyMh8GRH5MlJI0geGue596I/80FjBExgfuxHPiwhkWYau+7Hb8XzozJuyrMiyp7c+dlOeCytwcBBrOJTqH5WvEShonCY1mKnrPyBfR8RTz+lJPcmkofRg+LGbVDXGbPAGltSGgSQtcEiVPxpfH9kk1KR+DQAcXwo5X+2P3a7qMJroSE6FTIOB2wZurCw7fxy+xjx9gRRF6yRmKZGW+Dr72I2rBglP0dWovvQCr+ArdD5/HL5ynqJxDTZ6Mf5QfOU8DV5IU87TBH8gvgaMpzvJfCCepoGD+Cbh6/Iz5uuojjzV5dExTxMwvtpLxtfwYzSvCuyQichTiXi6y/g98nVjSdvPmK9WwEYIeTqHup/5lv4SvM+Zrz7jaZ3xNDjjaYItYEb3ufK1jKcJiK+uNGN83X6gtlWDI56OCt+Kg4gr5s+Pr77iCfA0Aefr/efFVw1UHJRHWhUX8jQB8nWd8LX97K2rAtaAxf2x1HlNPH0h8Cc4iM2WNORSSP/ZW3gzfAd52px0pBXAo4iBDDPiq7v+PPia5un4gr8bfjZ8ZTx1iKffwaTYn57CXkNziKa++cT52mM8nXdwtUFDeSE+C75ynka0Kr6Ipwk4Xw3G10XlrasCLufpClfFl/I0AfIVV8ytJvOvZsXtqwAxT03iaXT1XQzAFUjM10aFrasExFOFjAsAh1IoKmZi2IR7G02lu02rbODNcDcJT+uALuemW3G+6t4nxtdWwtPdLTxNwPm6+bT4yj3hlPG0ika19E+Nr2437nHiaTXkwltihGx5mA80Hz4Bvra8A0+r63Tk6zbpvVVld726MbTer46nCZCvSzu+++1T/BbseerLVfE0dWvka4/xteJbXwTm4WnGVMrTBIyv1ubj8jXxpy8G1fI0Qc+BZR+zi4/H133G5avwTM4PgyTxNVnNfHAMmx5f6WnwjIsEvHk7WZV+cL7yCM0+/1mTEeQr60f1g/PVJp4+IY+u5al4zs756j8RX19/QL7uFbRn5WmCNF+vWXpfhURZslgXC8EOx0bE96baABtbshZao9Up1ZcZ/BRfL5dQroGdKC58quQioWODumEEcjdienII4VAfSCbMAcCXpiIjQ5Oe5gWp71dKDBeB85TFrTKR0CJnZANgR7j7Xf8djKTeWOqBLUl9SzraQM8HnxQfiK8zVvS2FeIpc4QtmAf02hiOmZmuA693NJzj1siS+ontdrf4br5CK+bdB+Drfuel90RDWYB1G80gNziWe9CSJGSmHteOjddo/A48Wk8PIb7LGgL6kV8oyIOUL8e7ms+G/Q4aSyXzwNq5fSOtA3rRHkjBXJK6SXBbaBRcJQOvmSZykF81INrgj17RHiRPipNdv2fCNt4JtbpFPNXYhGlBgzj1Ququp3O8Ml3Hv27DcLSuSdGA/Svil1sQajWJhFkF/VPenZGvDwlfg2pMOsF+R7vn5fLURS8z81gHgL4EMgAepuMIaOg4qIN0X1rCm/XjTpozt+XiO7UJ+Scc+xHVCGTDYovU0bPxVYinZIm2NsiRTGHoQ82yaTLasOsd/KdLHTQajo2pJmH8WE6ljQPwWsY/n7cNqV6H/LB54KtaPV+TChM3l6eWZuAYjNDJSAugag0bp5c3rheneqPQCDSMk8MAuwdWtTDa1ChXaLWz9819JhrtePWWWAohiP4yrmwjySyHpybxCDu3AUN0gR16KfWGIs14QbRbAf6lBVsIwWRbHzmZvsVEalaFp8vZJTFXYV+hyKTPLKweLEntQge9aIgxwV+COb1sLeTPrUkb+6n1OKAPXODYWtnRnou4STVlRUgq97iEnQkTBlI0M2AMSNAOOR/r8g2BodmArYsTeAXaCKnegmXmQoOLnPvq7Qqwr8Dk0m4OeqCFT9JAAb8D1zPINqRtHQdKRmvpn/Mc2jC+dpLq5psRJicV8njqcyc+hh12fQ0MW8vs2t6qcTSRG4bGfNfpYDdCA4wA6t/RraEN9cxWjavk66KUp+sJ/9kmh+uus0/g4CSFIzdSYxcyAyFm7NJoTjnCfClZObFyNIHvOpXwdX8Sg7Z47ewJ5ibL5G7+OmQEqj5vqrCnugHOIABHp9ebWUa/1NqUMRXFebZZzaucnRuO4jVSPM08jOHrUQenIg+Y1vp0oDtGbLXRxICwhcMgrx1gs8qnBEFH4oUn2fjawDVJMjeGmXTkRQfRbXydxidN8nnqqjoMRhpku6IpNGN6bnXd6KWTga7jDPzR2BhRYJQ9Hc3cnNwa+yF+aeYoKrQpfxtfOU/1VszTE8S09WExgLW3Pv01w9TDLmKOJgQZragbe7I3AF31hlkdPHnbBf42SN2WYEVxPmXVa63THojfy/jamV/L1z1PZzk8dZnT1sAdRafvcLdL+rHV557DXiEtPQcpdegLAzy0km4BCuWnvS1ZtMrKbtbI835OEDnwVbmcrwlPeWlQFubwSOOwxoVg3ziaTQZyNGQ/a/uAEy5qaBUcvMsIHb+zpqxNdtrJJ6jHSsYL3pI1RnwvZz+FFzvxU4ebi47imeyQW8zTnL+M5kvAxNk99aa7JigOW5qgp5EmyfkNl7ibrBVqXp2sU9DxtD3ZawLOavpTUCenH6Nhd1GYyZVWWdEab3DuoiwDnKddK5enhB70G3X89dBJT/eVigRwAtYirQkvfIwarmSytWS4L00KPAqNzCJH0dsk0eGMt9DoszVNgA2AHc8fsk1YsbkcXXZ0dMp0KSMuEc7NOudbW76H4xi2AtXR5XhWYfI8akxUD/2Fp8J0950CsW8d4ycYGD9m2FMqkn2kkRRiNJ1a1geZ3PJwniPJ8WJnzlexo85s2N94VP+c9xfmbGfRaON8t086fg73Bih6bIkMoOIs1Cgj1DEO7rt5A/TPiYV2eQnXbXx75tQPqR/RwiD32BIrBt43vBTx9LV4CXQmeuCwiHgiAto1dJNDXFHVHO7jVhQgFGQFLZnX9XmUamK4HQwM7Ki5I+vKlv2irTvd1O0Ob+4AWbhw2/PcVjcYXxMCliBJG5CnuT1CPd/STGn2lL46BL2evFKBCICDF7ToltPcvrUiHM8nnVJdE4cxtYZYpEQjK4II/VvRBlmH8bUhwFczOTTMjyRkwyVljYR88yi/sZuKHguMa6e5ZTYyP+oWpyA9g7ucyPMOm2+UgDiwz4wsHwfTYXlPkOc72SEL8wFKjubvedou8KeM/Tj714MTxbcFibPp4as+EyzE4rKJLsdHo7pJ+3E8dPkkjvh0M/shX/VcxXyVi44673lay5f/GEKSMbhEzMFznhmaxrt+4FDMHo0vSCKHMoVVFiZpQQea1zxuqIHpUKtwtxP9KztnmX80vzM58HSQy+i41cYuSkVlDKOMlUsndv4deCpcF2Vi/AYDD03MGs5nH1OJ4ztM2xSMKGvK39RhfO3nHs1PHW4vYFgHlhp9NC7UDyO9gabHPrwPtN1DATWaX3M6VQOYk6dSJrYkOw/84p4L/QiMHk6SboGYwg8h5hzNT3jaZ0eFc9GCtQL140UtpqfGNM5Kka1svlz5EAdr22jjYCr6bD+X/X2OaykhDcXrbPUgBj/0nHXUecSWJ0ovPkJbgK2Dbz5OH590NDAc6DI2atpUchaTgsAwAVHT0Zvx1B6CczRsIdRK7r/YH3U+4uuep4tiT0hBW4lC6I3SkQqeHrQ5EowdzJg7t5ZfNLCFS13mi7KQse5glRHfvYgnmUedUw9hUAuVPOqA3lk3ILuaqqJDk2L4qJoTfgO+/YadP6nrh05rsKu+ti7c3yW+Hh/N3z+EIfPQ8BHIfWOOd0IWa0lrH2OkNcnbV1Nx9aRSgNXAmbf1tProu6uoCZOgZEPn5Gj+im3nDaTTw+2ZkGmQ5PvTyyGXSqEpsLQZPQjsEZhAa7EZeA8tEiitbT3u/BcAdZyo80HJDfhR54SvM4yKPAkqUZztx60WkSNo7S3pd+OgjT23M6deocfjQLKIlPRYmzF2ur605hgCGm/gzTJe4pmuBcaU0uFiwvD4EL7BxeyA8i7MSWzQy3a6tPVyXtfTY+0ixeNlPmUBnsBhsAhe9QJ4EDhPZQ2guUY7u9iRVGO13P9myHYH+1ASn9pN7HINnQTyRldIcpgLunwDHvavN54Ojurwtut6+fl3JAvNeE2odKkNAfkNjCW1qaqmlKA+I8JAL4vBTfQeS0cmwxYeLU2NsrKXRA4Y7ZtHwrK55ktJyTdmpclbmMz44Z2IKLFDdikyMgcz0HReV5PZvcoSqRYE2B2yQ95jCLK+xXQiQ8FMYQWTwWw8NA+EbmEfk57habOxUK3eFu6S+ep2C7bADlh7KmxsDCBOevLt6C7l82KGiyBSIpgHBllRMLYX83sG0YLtwyTvskFVX/ek16rcxCVueam1e3+0dsUJXCpKvFiDE5ISOzntj/A12xIqdDu0Tu86cbr0iGTtYS8Xl6FOMWCB1jowZAeKCkunCdB0lNJVxvB0RRoKhCrLoNRMr1HfpKQzew6D1jBsjIt6iYhpg/w0jz9N1g1G3/wP69NSY3qkbUi+7NHZamtobEpr2GbnOyb2vYiIFpB33X9i/HOacL6A7+RgGiDHIdsFmfQ/gPw/GJPnXp9WO9OTDpS6gG7rrg+VEsNon6IscjYgU7BViMP9aByc0LtvFKXGc+Rd8LSXiAb4coRkzHfoPUa0mryPayv+aoeTspxyrbtDWMFlLuyTlEY5X/s00fuNqYLxV1FS6oePJs/yJyQudCULBy9JBFc4pCSBFviNBlHN0pOBtJOHG1CNHnTz/45gpMJhn/mKPR8wYHbL9JDhDH2d52F2p8qHG7VhXpgTakzUlfWkc3Fq0koGmrl/YSEtMT7sh3GrIwdYwODlMgXAMLE8dLfGbEx1yhTuilNIC12aKiubsR04Bzr04j7OdXX32N5pehNp7ZCO9pjnzW3WMNgMDxfeBPi/DfsErXC9ODyuPBuwO92lcrmw7HkXeAdVwWRq0Exp1kMWw4abvPnVB/IwiuLtr+xYqGzkLf1CY9UyrXC5T/dmNIw4ln2pV7KI0OCOtcIahVpw/+oOYrxdBrNGj7lVc1myqRZaIXjTqHm0kwtbcyfDspHD9DFtNmEmfkj/TdI2yb8WNzihnAsODSNmRzguTlG+YrKo6Gvd2LL72Mjlq/jnbGjRqrusvC/wPM+ZpO2h9cs0n+UDNghyephrSFaX/UIEs6YyGeMw2hhoneIUsI+DREvoh2g8HLls3xeY1OuavXB7T7wNBDJ09Bix4tEK4glltgrKuFyqgyX1JfUegy1BxoLbdxNwlKZHLmvglES4Hhp4N23snQ6f2nub3NbsAUqcFmHqKRBvzQvJRTTtfKRqetOJhPiAT1QRhLgAlRXVwLS8MG6MkKPBcX4TnuW2fhvg++KR7Ow3X3ElUrZuJJD7pHE7Sk/rGHsokxE97IMOCMcS5MLEGhvfPovSvnZmjzu+g25hfm3sZ2wkcvbBojD4nSofd8eMzU9NZA9mzD9uiIsCVrSQh/4DbES7zJ2VTMp4EvUWspK913wESmdGQCpHGqR4RMiJMznqHIPE1be6uaWeEpWPXVQMjfle2ay0tTnlc3L5TsqUjZd8OuJc8XiAUqUF141e0ue9/OyvX2R/5n0fio0MA8oFmjBR9FIFN6VypCGoeNCHKTjvH8uyzPuLHzlqvyzqYPJyb+DJMPus4qUQaZUjDUoK2qWKB8cMHP2peBXfuOIBjq2isECB9ZF1W5eOThRiG6scZ86FJ4V1Ec8sddCrFmv+S6H7nCAo0AbdV7v4jsNSgshplSONSEjxSNBwFJjnd6d91bmvRrnEI4JY5VAfzn7TKFc8CEF9OYjaxk5T5Kf89Na/6tnj/uV7z1mIVQ79vAkWVzx0KKzmt0B1HM/Tm7osF+xumNDtXboN6Y6M27YuEzCVw5Gzku+BU6Z4SDzd3yOfqxZbZWyM8VDkKWp2b6VFlLeWOUwhUJCnActi2bhc8WCwXNe2+33TLCJWAG3earh71W0b43Dom3aqUMdybXPUClfaNli+5OuurvF9JTYmKkeWT0wUj0o+KATDlazOcDftLtNDD9+/fPny+7v0lVfdRyP0bYodlZxRX5+qHEe/ZO42V/G4CIys9+1d2EGPb3d6w5VmLKJg0O2u7++73UEQTLfaKmyN+hZV94TaI416FU8qT1SO7KHaNQsVDwZYt3dDka3iBUwjvti/exi0tXHYIrLuf225fbM3bOyMRfchlgSmcFd61yFtyrWXgzC/4vRc5UgjUTyczN8y2OB41KBahPQqbg1sTVrs73DCHZEV7o6YCi/vo9nY71tWo3Sbxl3DAJvQxDbkp7aJypHDiRpLY4sUjxY2quk5iuo1cw4J7XHHptpsNey4OGidVjjWjO0iiqLHx8doupgZSNUe+SHbD8ft+++hfJNnoD/RgVjZiTc9s+CCKkkKWw1nwmAVxIWKh+U3jIifIyrRHKZI1ngE7x66kbFbheGw5fsjhO+zLRmtHdzH4tVdt5yqL0CdNKS5Ci0rv7w8S+VIYySseJjoMEtWKENaPqJnXc2izfKYnmmmLgdTI2yZNFPKqGqTU8LIhwun/DHPVDnSmKh0g3thxaMQsEz9w+2PaOxWu/EU7se78Soc9vxR/2hDslQUJK1gCGq9P1Fz30yhb87MyAFXPHa5iofVG3VM0+zbdkndLWGR3VV+zt1fvS2949rxIkfxFjbo2VR7wVKYzpnKkQZXPMyjEUjDTdOsrEU9MsZv9dJoUQkqTvdR+nKr15L45RIM0asrKiacsM5LEZnK0TxTOdJw4hqPfnb8wQ7Udc9TZJnl7yV4+SBJp/MvZMb0Ty+3RKiKDqUOUA9Te0tnaGLzl09nKkcaB8Uj+6jjbLZtt7dzql4qV8e22OzdzEhjZvMB04zTy29flZuI6Bfn+InKUSAXshqPMsVjFDiqUKF4Nv0uuXoxaIm/S2o58gAKhdcCLbpDp0/BECoUv3tFosddCkhKssZ9lb5KR322IlQ1Qa/X1rhEnxm77NhAKscmS+VII3pTqHj0p+DJ3kywFJ4aPni4T+Ghx23sLu+Xy+TictmR3p4LE+fo4AjES/Rst0gEdGFfpZ2D4hoPkyrXnMGsvd3OhMiaIc5lslKMqj1yT7qMM8VxMht4XMuRB6rxmHARNgMj+oZKmTpSh6JpneDlS3Qv0/YBU5OZYxmLw7VFm4owxZQcXJ9rUBs21s3MTJIk8MDLVDnSKFQ8/JS7F7HRQN6/zYgd9nHk6LAwI4ZwTsfwBpmJX4caReU0JfcorvGwSOjom2YHE2uBBvmYINuUGJkJYlraZhpxaYzA/bZNcBSZZOCsPzit5cgDlV/VMMXPr/G4BC9f0ZNyWgfEeY6futSjXFWIqjvwFKfuqOh4MmNXocpx9MYKFQ8kqy8drTkaGXnOSJSqGjhQ7yx1VVWyphxXOdT48GURSmo83N5qtvHgtViEHFGltKEdEOc549QlDTMPsaNnMwhCekobZG/7FascaRTWeAR18t4OhinBbfVXZyOUESbagou5VpyFutkhPqOWIw9Fise9ozo6I1hJvpSAPOt9ipdD7lfT/DUtEPaqRWDDgh5JRDvlq+hsxaMN3ma28l06gFd2/IBhhE6+fd9NcD/i8THYX+mu3bCaXDVROUTqPopqPMx92q84YmR9ebr0PefqopqtHKZy6AUqRxpvFZIK1lD0nUY+UH22AIzTAh42jrPpHq51l7ckP0GJl6NwNz+t5chDmeLRCY2gQPk6hn+akZzmOaaoV5XayqKRv6AoVznSSGo8srp3NyU9senIenl1BMer74/7P85z+hxI/qh4JXTAnPTr+jTHTgGVI42CGo8N5lJMKo9Ev7pIO1GsT+ejJVIvQyAxyVMV/HB5ujrnLWTXcuShoMbDANqZ2Ak9Go+jcyI2n9oYivb8C6mzmjpUcq3q5/Ehr5YjDwWKh9+42Ac+HJP11MZIlPQcZmMqx88TOkKicgg/RAfXJ6pojUcpTsh6YqMrStUUzPF5KqPm1XLkgdd4zKp5uHrneJ12oiE3Ln28cXY8S2o5BAs3JaFTLRdg+QOR9S/2n3srzMUjWGrabtX6c/8v9Ethr1qM/FqOPFhI1tdckK0A/wTaarH+51PdGP7lXyMtBLF4VoaCWo48CNV4CMENDb5D98VX7969e//+S8L793999+5v3/xI1/9tu7q9YuX0xIoIBE61iMAN6fEl+i9f/fXLn/6UgZ//yg39u3bjFwWKqhxpVFLj0SMDf/lbtnl7/PTzu29wuXZ/k39b4gqUO8oLUIHi8e/Iz3e/pkz56rdvfvni22+//vrbL7745rev3n358/6X73+DshNNRTg/sSKCEsVDBAa8jy348m/ffNuMHc0PhMTr/Mc3X72Pe+HLK+LkHuIqRxqJ4iG2gMrEDqj5P3/1y+9kWnerNXpm37YIrm364c4ImPb67W+sL37/+/UftSmu5chDeY1HGWbw669ffYtG3BvhwaUwG/f/sntagO/48bcvf/r9P6/+tkFWy+HklR3l47JTLecYDQC+poeOxpHB9lfGdHD/8PIO7r5/tdxEMy0+wO0OZ//F3vtwbaSiKdUTXtGm2sgUD1v0VMsJ+uhScQb+Y0UZr4WDFe8IoHXdTRctjSfkxhiyLvjvKYaY3+H+umfFBmW1HHngNR7rq7QWXIF98es3LIOwVxRB4O1iF47Ssd4yh+MZyw66GmVz/R++/ukrXFBcsQywKMRNRFWONMoUjwL04Ud0I+8wvWpNab1pnD4k99A8X6MTkWtc8z58iw7q22u+4Cn7xIoIymo8CtCHb9BRfgH/g+PUHZdlalb4vwB3xtv/+5UiyBU2JidWrvhTjzmq2mVLWAYbfvvT+68ZRQUXFYzP+FdX2diEF3EYuBjip1pOYcOPv8APb982vv+H4F+MATn7Cr7+4gobW/BIKseTyIboKS451XIM2pYK+i7eQTR30UiQtAy45jvPtunnclwKXEQKn2o5ggkvMc/1u+KnykZIa/TC5vqKluaeWBHB1YoHPaDZximW8xUcmdih/+3hyF88M3xcZbtI1ev2ha5WPGxo0/MlL+tYYup2dfl8FKvlyP1UXuOhF3z1SzZI6n91ecpiP4LA0eRTXKFypMGf47G4WPGwC59sWoDw8u+rj0+slNZy5OFaxaP/9trNNrd76Theo3KkQYpHrapTLc+EdaxyXC1YVFrj8Szo0z47KMr1pTYVKB7PjOtUjjQETrV8ZJScWBHB7YrH84LVchScWBEB1RDcong8N2KV480t3wiZKB7fVdaqahFcUsuRh0lc4/ERvmRaBEktx01fjHSD4vEBcL3KkcYNiocg+h3zePFmdzqi65ULaznycDjVUoquWq/HM2Pg1Os6fTLU63KTL0Ae8RqpfC5eq8ervdWaiRzeNJkLIX+oFzwKpfSUgV1Qy5GHtrjisab+4PnmgMQgZqOqKHGtReCpCvu6PbrGbKRnVsqygv95cd8EVGbMLwi48ltUjjRETrXEWNNzpJNxlDmDWJE9n80BXWM20iWyMWLPZG6SofyCwb7PoEmnD0Qy0JtUjjT4czxEnrCUayMz7dzGPpnYtaQ+/iF/kjh9xciDLbmBhyMZlH7gxbUceUgUj/JFT76N7NFFZzYiRXiRwghnpDygtSC+lcK5S8c4SnchxE6siEBc8ci3UabZdWZjj72IDvVvNLByczAuKrhM4TaVIw2r8FRLGgU2khRxPh+BDhl6AGryHV41mplULhaJSA/0mOrAEXj0Uzl4jYeA4pFnYx3/4UwybGRPu6ezlB5MmIcZxRfQrXqNssGkEyu3qBxpCCseOTYqNVyGIqOmZzZKvTl4KreKd6F5D3pyoSy1ulXlSENY8cizccI4qM+VMxvpa5BlYIOXbAL7szm/IJelHfRVexfXchS0nSkeZevQLhkW5wDHNppkliJn2ChRhR+bhofb9xtrXZbLMrRE5bisliMPSLWmiOKBnUou+AXOI5m+Z4F9azmzkW6xD5R7G9vTYF1nYbfGGWDghQnzIDR3S/zl7SpHGiY74Fte40GGKE0K9xokXIttZDw+tREzOYdzO3rDxjGiC8wyXBOWjSPVcvBEsxIIKh4svCkQtOmLv2X+0NLExj6oZzayPoGGZa3YC4s8CH0HhSsN6eh6cfri0vNCrqjlyIMmWONhxEdAuQ8ZpW2kvPJsPjqUkbNDP3FOu3xDrxBkYvGjLa6t5ciDcI1HFMc3iuw8nO5txKXImY0daCr87Q63yFb5cNOFoPijEpXj9srMGHVRxSNcx0UpUUw09g/2ij8jYpS8YLeytw5/+yCeVZYx4RfWJQqNBbpE31VQTTk44YInl0qm3+pdsBCw8e1HXeeOer1Oad4YwqIClSONolMt5biyQqwQicpxRYlEHnT12hqPZ0JFKkcaFygeHwSkcpgXnFgRQaJ43FBHWymEnstxKa6u8XgeVKZypCGueHwI5D999BbwhVpVp1puxeUnVkRAisd3pU8u/VBIajkqOeN7gLDi8QHAVQ61EpUjjYpOtVSCKlWONPhzPD6NGg92YuVNRSpHGlzxiD6BGo/kxMpT+VsvxKdT41GtypEGVzwsqIeNjwtcv/lS+7ZajjwkisfHh1epypEGP9XS0j4+wkpVjjS44vFpoFKVI43JbbU+VeLsO1aqwkyXFbn+ScCpUuVIg/YLFfVTgCJXqnKk4aA3+1RQpcqRhjGvfTIILmj3/wNMW6lP+auw2wAAAABJRU5ErkJggg==" alt="">
                <p class="titles" style="margin:0;width:100%; text-align:center; font-weight:bold; ">KARTU RENCANA STUDI (KRS)</p>
                <p class="titles" style="margin:0;width:100%; text-align:center; font-weight:bold;">UNIVERSITAS SRI SELAMET (UNISS)</p>

                <table class="bodyTable">
                    <tbody>
                        <tr>
                            <td class="prop">Semester</td>
                            <td>:</td>
                            <td class="prop">{{parseInt($store.state.auth.profile[0].semester) + 1}}</td>
                        </tr>
                        <tr>
                            <td class="prop">Tahun Akademik</td>
                            <td>:</td>
                            <td class="prop">{{new Date().getFullYear() + '/' + dataProfile.afterAkademik.getFullYear()}}</td>
                        </tr>
                       

                    </tbody>
                </table>

                <table class="bodyTables">
                    <tbody>
                        <tr>
                            <td class="prop">Nama Lengkap</td>
                            <td>:</td>
                            <td class="prop">{{$store.state.auth.profile[0].nama}}</td>
                        </tr>
                        <tr>
                            <td class="prop">NIM</td>
                            <td>:</td>
                            <td class="prop"    >{{$store.state.auth.profile[0].nim}}</td>
                        </tr>
                        <tr>
                            <td class="prop">Prodi</td>
                            <td>:</td>
                            <td class="prop">S1 - {{ $store.state.auth.profile[0].jurusan}}</td>
                        </tr>
                        <tr>
                            <td class="prop">Fakultas</td>
                            <td>:</td>
                            <td class="prop">Ilmu Komputer</td>
                        </tr>
                        <tr>
                            <td class="prop">Dosen Wali</td>
                            <td>:</td>
                            <td class="prop">Rozikin S.Kom., M.Kom</td>
                        </tr>

                    </tbody>
                </table>

                <!-- <div class="biograph" style="padding-left:5px;width:100%;border:2px solid; margin-top:20px">
                    <div class="inBios" style="margin-top:8px; display:flex; flex-direction:row">
                        <p class="inbioP" style="margin:0;position:relative; width:50%">Nama Lengkap <span class="titlesBodySpan" style="position:absolute; right:0">:</span></p>
                        <p class="tittlesBodyP" style="padding-left:20px;">Muhamad Imron</p>
                    </div>

                    <div class="inBio" style="margin-top:0px; display:flex; flex-direction:row">
                        <p class="inbioP" style="position:relative; width:50%">NIM <span class="titlesBodySpan" style="position:absolute; right:0">:</span></p>
                        <p class="tittlesBodyP" style="padding-left:20px">20117035</p>
                    </div>

                    <div class="inBio" style="margin-top:8px; display:flex; flex-direction:row">
                        <p class="inbioP" style="position:relative; width:50%">Kelas <span class="titlesBodySpan" style="position:absolute; right:0">:</span></p>
                        <p class="tittlesBodyP" style="padding-left:20px">A</p>
                    </div>

                    <div class="inBio" style="margin-top:8px; display:flex; flex-direction:row">
                        <p class="inbioP" style="position:relative; width:50%">Fakultas <span class="titlesBodySpan" style="position:absolute; right:0">:</span></p>
                        <p class="tittlesBodyP" style="padding-left:20px">Informatika</p>
                    </div>

                    <div class="inBio" style="margin-top:8px; display:flex; flex-direction:row">
                        <p class="inbioP" style="position:relative; width:50%">Dosen Wali <span class="titlesBodySpan" style="position:absolute; right:0">:</span></p>
                        <p class="tittlesBodyP" style="padding-left:20px">Hilmi sh,</p>
                    </div>

                </div> -->
                <div class="signatureMhs" style="margin-top:20px;display:flex; width:100%; justify-content:space-between;">
                    <div class="boxMhs" style="width:40%;height:100px; border:2px solid; margin-right:10px; padding-top:6px">
                        <p class="mhsP" style="text-align:center">Mahasiswa</p>
                    </div>

                    <div class="signatureDosen" style="width:50%;height:100px; border:2px solid; position:relative; left:8px; padding-top:6px">
                        <p class="mhsP" style="text-align:center">Dosen Wali</p>
                        <p class="dosenP" style="text-align:center;position:absolute; bottom:0; left:0; right:0">Rozikin, S.Kom., M.Kom.</p>
                    </div>

                </div>
            </div>

        </div>
        
           <div class="containerss" style="visibility: hidden;width:100%; display:flex;flex-direction:row-reverse">

            <div class="boxKrs" style="width:50%; position:relative;  display:flex; flex-direction:column; justify-content:flex-end">
                <p class="lembar">Lembar 1 : Prodi</p>

                <table class="blueTable">
                    <thead>
                        <tr>
                            <th class="number">NO</th>
                            <th class="kode">Kode MK</th>
                            <th class="makul">Mata Kuliah</th>
                            <th class="jadwal">Jadwal</th>
                            <th class="number">SKS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dataKrs, index) in $store.state.mhs_kurikulum.dataKrs" :key="index">
                            <td>{{index + 1}}</td>
                            <td>{{dataKrs.makul_id}}</td>
                            <td class="MK">{{dataKrs.nama_makul}}</td>
                            <td>{{dataKrs.hari + ', ' + '' + dataKrs.mulai + '-' + dataKrs.selesai + ',' + ' ' + `(${dataKrs.kelas})`}}</td>
                            <td>{{dataKrs.sks}}</td>
                        </tr>
                       

                    </tbody>
                    <thead>

                        <th class="rest" style="text-align:center" colspan="4">Total SKS</th>
                        <th class="rest" style="text-align:center">{{$store.state.mhs_kurikulum.allSks}}</th>

                    </thead>

                </table>
                <div class="signatureKrs" style="width:100%; display:flex; justify-content:flex-end">
                    <div class="signature" style="width:70%; text-align:center">
                        <p class="ketua" style="margin-bottom:70px; margin-top:40px">Ketua Program Studi</p>
                        <p class="namaDosen">Yusuf Wahyu Setiya Putra, S.Kom. M.Kom.</p>
                    </div>

                </div>
            </div>

            <div class="titleHeader" style="width:50%; margin-right:30px; display:flex; flex-direction:column">
                <img class="img" style="width:100px; margin-bottom:20px; margin-left:auto; margin-right:auto" src="data:image/png;base64,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" alt="">
                <p class="titles" style="margin:0;width:100%; text-align:center; font-weight:bold; ">KARTU RENCANA STUDI (KRS)</p>
                <p class="titles" style="margin:0;width:100%; text-align:center; font-weight:bold;">UNIVERSITAS SRI SELAMET (UNISS)</p>

                <table class="bodyTable">
                    <tbody>
                        <tr>
                            <td class="prop">Semester</td>
                            <td>:</td>
                            <td class="prop">{{parseInt($store.state.auth.profile[0].semester) + 1}}</td>
                        </tr>
                        <tr>
                            <td class="prop">Tahun Akademik</td>
                            <td>:</td>
                            <td class="prop">{{new Date().getFullYear() + '/' + dataProfile.afterAkademik.getFullYear()}}</td>
                        </tr>
                       

                    </tbody>
                </table>

                <table class="bodyTables">
                    <tbody>
                        <tr>
                            <td class="prop">Nama Lengkap</td>
                            <td>:</td>
                            <td class="prop">{{$store.state.auth.profile[0].nama}}</td>
                        </tr>
                        <tr>
                            <td class="prop">NIM</td>
                            <td>:</td>
                            <td class="prop"    >{{$store.state.auth.profile[0].nim}}</td>
                        </tr>
                        <tr>
                            <td class="prop">Prodi</td>
                            <td>:</td>
                            <td class="prop">S1 - {{ $store.state.auth.profile[0].jurusan}}</td>
                        </tr>
                        <tr>
                            <td class="prop">Fakultas</td>
                            <td>:</td>
                            <td class="prop">Ilmu Komputer</td>
                        </tr>
                        <tr>
                            <td class="prop">Dosen Wali</td>
                            <td>:</td>
                            <td class="prop">Rozikin S.Kom., M.Kom</td>
                        </tr>

                    </tbody>
                </table>

                <!-- <div class="biograph" style="padding-left:5px;width:100%;border:2px solid; margin-top:20px">
                    <div class="inBios" style="margin-top:8px; display:flex; flex-direction:row">
                        <p class="inbioP" style="margin:0;position:relative; width:50%">Nama Lengkap <span class="titlesBodySpan" style="position:absolute; right:0">:</span></p>
                        <p class="tittlesBodyP" style="padding-left:20px;">Muhamad Imron</p>
                    </div>

                    <div class="inBio" style="margin-top:0px; display:flex; flex-direction:row">
                        <p class="inbioP" style="position:relative; width:50%">NIM <span class="titlesBodySpan" style="position:absolute; right:0">:</span></p>
                        <p class="tittlesBodyP" style="padding-left:20px">20117035</p>
                    </div>

                    <div class="inBio" style="margin-top:8px; display:flex; flex-direction:row">
                        <p class="inbioP" style="position:relative; width:50%">Kelas <span class="titlesBodySpan" style="position:absolute; right:0">:</span></p>
                        <p class="tittlesBodyP" style="padding-left:20px">A</p>
                    </div>

                    <div class="inBio" style="margin-top:8px; display:flex; flex-direction:row">
                        <p class="inbioP" style="position:relative; width:50%">Fakultas <span class="titlesBodySpan" style="position:absolute; right:0">:</span></p>
                        <p class="tittlesBodyP" style="padding-left:20px">Informatika</p>
                    </div>

                    <div class="inBio" style="margin-top:8px; display:flex; flex-direction:row">
                        <p class="inbioP" style="position:relative; width:50%">Dosen Wali <span class="titlesBodySpan" style="position:absolute; right:0">:</span></p>
                        <p class="tittlesBodyP" style="padding-left:20px">Hilmi sh,</p>
                    </div>

                </div> -->
                <div class="signatureMhs" style="margin-top:20px;display:flex; width:100%; justify-content:space-between;">
                    <div class="boxMhs" style="width:40%;height:100px; border:2px solid; margin-right:10px; padding-top:6px">
                        <p class="mhsP" style="text-align:center">Mahasiswa</p>
                    </div>

                    <div class="signatureDosen" style="width:50%;height:100px; border:2px solid; position:relative; left:8px; padding-top:6px">
                        <p class="mhsP" style="text-align:center">Dosen Wali</p>
                        <p class="dosenP" style="text-align:center;position:absolute; bottom:0; left:0; right:0">Rozikin, S.Kom., M.Kom.</p>
                    </div>

                </div>
            </div>

        </div>
        
        
           <div class="containerss" style="visibility: hidden;width:100%; display:flex;flex-direction:row-reverse">

            <div class="boxKrs" style="width:50%; position:relative;  display:flex; flex-direction:column; justify-content:flex-end">
                <p class="lembar">Lembar 3 : Mahasiswa</p>

                <table class="blueTable">
                    <thead>
                        <tr>
                            <th class="number">NO</th>
                            <th class="kode">Kode MK</th>
                            <th class="makul">Mata Kuliah</th>
                            <th class="jadwal">Jadwal</th>
                            <th class="number">SKS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dataKrs, index) in $store.state.mhs_kurikulum.dataKrs" :key="index">
                            <td>{{index + 1}}</td>
                            <td>{{dataKrs.makul_id}}</td>
                            <td class="MK">{{dataKrs.nama_makul}}</td>
                            <td>{{dataKrs.hari + ', ' + '' + dataKrs.mulai + '-' + dataKrs.selesai + ',' + ' ' + `(${dataKrs.kelas})`}}</td>
                            <td>{{dataKrs.sks}}</td>
                        </tr>
                       

                    </tbody>
                    <thead>

                        <th class="rest" style="text-align:center" colspan="4">Total SKS</th>
                        <th class="rest" style="text-align:center">{{$store.state.mhs_kurikulum.allSks}}</th>

                    </thead>

                </table>
                <div class="signatureKrs" style="width:100%; display:flex; justify-content:flex-end">
                    <div class="signature" style="width:70%; text-align:center">
                        <p class="ketua" style="margin-bottom:70px; margin-top:40px">Ketua Program Studi</p>
                        <p class="namaDosen">Yusuf Wahyu Setiya Putra, S.Kom. M.Kom.</p>
                    </div>

                </div>
            </div>

            <div class="titleHeader" style="width:50%; margin-right:30px; display:flex; flex-direction:column">
                <img class="img" style="width:100px; margin-bottom:20px; margin-left:auto; margin-right:auto" src="data:image/png;base64,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" alt="">
                <p class="titles" style="margin:0;width:100%; text-align:center; font-weight:bold; ">KARTU RENCANA STUDI (KRS)</p>
                <p class="titles" style="margin:0;width:100%; text-align:center; font-weight:bold;">UNIVERSITAS SRI SELAMET (UNISS)</p>

                <table class="bodyTable">
                    <tbody>
                        <tr>
                            <td class="prop">Semester</td>
                            <td>:</td>
                            <td class="prop">{{parseInt($store.state.auth.profile[0].semester) + 1}}</td>
                        </tr>
                        <tr>
                            <td class="prop">Tahun Akademik</td>
                            <td>:</td>
                            <td class="prop">{{new Date().getFullYear() + '/' + dataProfile.afterAkademik.getFullYear()}}</td>
                        </tr>
                       

                    </tbody>
                </table>

                <table class="bodyTables">
                    <tbody>
                        <tr>
                            <td class="prop">Nama Lengkap</td>
                            <td>:</td>
                            <td class="prop">{{$store.state.auth.profile[0].nama}}</td>
                        </tr>
                        <tr>
                            <td class="prop">NIM</td>
                            <td>:</td>
                            <td class="prop"    >{{$store.state.auth.profile[0].nim}}</td>
                        </tr>
                        <tr>
                            <td class="prop">Prodi</td>
                            <td>:</td>
                            <td class="prop">S1 - {{ $store.state.auth.profile[0].jurusan}}</td>
                        </tr>
                        <tr>
                            <td class="prop">Fakultas</td>
                            <td>:</td>
                            <td class="prop">Ilmu Komputer</td>
                        </tr>
                        <tr>
                            <td class="prop">Dosen Wali</td>
                            <td>:</td>
                            <td class="prop">Rozikin S.Kom., M.Kom</td>
                        </tr>

                    </tbody>
                </table>

                <!-- <div class="biograph" style="padding-left:5px;width:100%;border:2px solid; margin-top:20px">
                    <div class="inBios" style="margin-top:8px; display:flex; flex-direction:row">
                        <p class="inbioP" style="margin:0;position:relative; width:50%">Nama Lengkap <span class="titlesBodySpan" style="position:absolute; right:0">:</span></p>
                        <p class="tittlesBodyP" style="padding-left:20px;">Muhamad Imron</p>
                    </div>

                    <div class="inBio" style="margin-top:0px; display:flex; flex-direction:row">
                        <p class="inbioP" style="position:relative; width:50%">NIM <span class="titlesBodySpan" style="position:absolute; right:0">:</span></p>
                        <p class="tittlesBodyP" style="padding-left:20px">20117035</p>
                    </div>

                    <div class="inBio" style="margin-top:8px; display:flex; flex-direction:row">
                        <p class="inbioP" style="position:relative; width:50%">Kelas <span class="titlesBodySpan" style="position:absolute; right:0">:</span></p>
                        <p class="tittlesBodyP" style="padding-left:20px">A</p>
                    </div>

                    <div class="inBio" style="margin-top:8px; display:flex; flex-direction:row">
                        <p class="inbioP" style="position:relative; width:50%">Fakultas <span class="titlesBodySpan" style="position:absolute; right:0">:</span></p>
                        <p class="tittlesBodyP" style="padding-left:20px">Informatika</p>
                    </div>

                    <div class="inBio" style="margin-top:8px; display:flex; flex-direction:row">
                        <p class="inbioP" style="position:relative; width:50%">Dosen Wali <span class="titlesBodySpan" style="position:absolute; right:0">:</span></p>
                        <p class="tittlesBodyP" style="padding-left:20px">Hilmi sh,</p>
                    </div>

                </div> -->
                <div class="signatureMhs" style="margin-top:20px;display:flex; width:100%; justify-content:space-between;">
                    <div class="boxMhs" style="width:40%;height:100px; border:2px solid; margin-right:10px; padding-top:6px">
                        <p class="mhsP" style="text-align:center">Mahasiswa</p>
                    </div>

                    <div class="signatureDosen" style="width:50%;height:100px; border:2px solid; position:relative; left:8px; padding-top:6px">
                        <p class="mhsP" style="text-align:center">Dosen Wali</p>
                        <p class="dosenP" style="text-align:center;position:absolute; bottom:0; left:0; right:0">Rozikin, S.Kom., M.Kom.</p>
                    </div>

                </div>
            </div>

        </div>
        

        
 

    </div>
</div>
</template>

<script>
import {
    mapState
} from 'vuex'
import XLSX from 'xlsx'
import axios from '../../api/axios/axios'
import qs from 'querystring'
import print from 'print-js'

var titles = [

    {

        prop: "semester",

        label: "Semester"
    },

    {

        prop: "nama_makul",

        label: "Mata Kuliah"

    },
    {

        prop: "sks",

        label: "SKS"

    },
    {

        prop: "nama",

        label: "Dosen"

    },

]

export default {

    computed: {
        data() {
            return this.$store.state.mhs_kurikulum.data
        },
    },

    created() {
          const beforeAkademik = new Date()
            beforeAkademik.setFullYear(beforeAkademik.getFullYear() - 1)
            
            const afterAkademik = new Date()
            afterAkademik.setFullYear(afterAkademik.getFullYear() + 1)
            
            this.dataProfile = {
                afterAkademik,
                beforeAkademik,
                
            }
        if (this.data.length < 1) {
            const token = this.$store.state.auth.token
            this.$store.dispatch('mhs_kurikulum/actGetData', token)

            this.$store.dispatch('components/setLoad')

        } else {
            this.$store.dispatch('components/setLoadFalse')
        }

    },

    data() {

        return {
                tableProps: {
        border: true,
        stripe: true,
        defaultSort: {
          prop: 'flow_no',
          order: 'descending'
        }},

            titles,
            
            dataProfile : [],

            filters: [{

                    value: '',

                    prop: 'semester',

                },

                {

                    value: []

                }
            ],

        }
    },
    methods: {
        handleClick(val) {
      
            this.$store.dispatch('mhs_kurikulum/getKrs', val)
            

        }

    }
}
</script>

<style lang="scss">
#addMhs {
    background: rgb(63, 178, 255) !important;
    border: none;
    color: white;
    border-radius: 4px;
    height: 40px;
    width: 80px;
}

#Table {
    width: 100%;
    height: 0px;
    visibility: hidden;

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid black;
        padding: 10px
    }

    .jumlah {
        border: none;
        padding-right: 100px
    }
}

#TableTranskip {
    width: 100%;
    height: 0px;
    visibility: hidden;

    table {
        width: 100%;
    }

    table,
    th,
    td {
        border: 1px solid black;
        border-collapse: collapse;
    }
}

.dekan {
    width: 50%;

    .hr {
        margin-bottom: 20px
    }
}

.test {
    box-shadow: 0px 1px 4px rgb(214, 214, 214);
    padding: 30px;
    position: relative;
    overflow: hidden;

    .error {
        color: red;
        font-size: 12px;
        position: relative;
    }

    .formulate-input-error {
        color: red;
        font-size: 10px;
        position: relative;
        list-style-type: none;
    }

    .formulate-input-errors {
        display: flex;
        margin: 8px;
        padding: 0
    }

    input {
        border: none;
        border-radius: 6px;
        background: rgb(236, 236, 236);
        width: 100% !important;
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

    .tab1 {
        margin: 50px !important
    }

    .tab2 {
        margin: 49px !important
    }

    .tab3 {
        margin: 103px !important
    }

    .spinner-border {
        color: #92c5ff;
        height: 80px;
        width: 80px;
        z-index: 99;
    }

}

table.blueTable {
    visibility: hidden;
    font-family: Arial, Helvetica, sans-serif;
    border: 2px solid #000000;
    background-color: white;
    width: 100%;
    text-align: center;
    border-collapse: collapse;
}

</style>
