<template>
  <div>
      <b-table striped hover :items="item" >
        <template v-slot:cell(actions)="row">
          <b-button size="sm" @click="del(row.item, row.index, $event.target)" class="mr-1">
            delete
          </b-button>
           <b-button size="sm" @click="edit(row.item, row.index, $event.target)" class="mr-1">
            edit
          </b-button>
          <sweet-modal ref="modal">
            <b-button @click="agree(row.item, 'delete')">agree</b-button>
          </sweet-modal>
               <sweet-modal ref="modalEdit">
                <form>
                  <CCol sm="12">
                      <CInput
                        :placeholder="username"
                        ref="username"
                      />
                    </CCol>
                    <CCol sm="12">
                      <CInput
                        :placeholder="password"
                        ref="password"
                      />
                    </CCol>
                  <b-button @click="agree(row.item, 'change')">test</b-button>
                </form>
          </sweet-modal>
        </template>
      </b-table>
 
  </div>
</template>
<script>

export default {
  props : ['item', 'fields', 'forms'],
  data(){
    return {
      newForms : this.forms,
 
  }
   
  },
  methods : {
    test(){
      console.log(this.forms)
    },
    del() {
      this.$refs.modal.open()
      },
      agree(item, val){
        if(val == 'delete'){
          this.$emit('deleteRow', item)
        } else {
     
          this.$emit("editRow", item)
        }
      },
    edit(item){
      this.username = item.id
      this.password  = item.title
      this.$refs.modalEdit.open()
    }
  },

}
</script>