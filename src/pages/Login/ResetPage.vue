<template>
  <div class="flex flex-center">
    <q-card class="my-card" style="width: 600px">
      <div class="row">
        <div class="col q-ma-sm">
          <h6>Primeiro acesso do usuário</h6>
          <q-form @submit="loginAccount">
            <q-input
              filled
              type="text"
              v-model="login.user"
              label="Digite seu usuário"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
            />
            <q-input
              filled
              v-model="login.password"
              label="Digite sua senha atual"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
              type="password"
            />
            <q-input
              filled
              v-model="login.new_password"
              label="Digite sua nova senha "
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
              type="password"
            />
            <q-input
              filled
              v-model="login.new_password2"
              label="Confirme sua senha"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
              type="password"
            />
            <q-card-actions class="justify-between">
              <!-- <q-btn
                label="Criar uma conta"
                color="secondary"
                flat
                to="signup"
              /> -->
              <q-btn
                label="Alterar senha"
                type="submit"
                color="primary"
                v-if="showButtonSave"
              />
            </q-card-actions>
          </q-form>
        </div>
      </div>
    </q-card>
  </div>
</template>
<script>
import autenticacaoApi from "../../api/autenticacao/autenticacao";
import helpers from "../../helpers/session";
import ShowToastMixin from "../../mixins/notify";
export default {
  name: "ResetPage",
  data() {
    return {
      login: {
        user: "",
        password: "",
        new_password: "",
        new_password2: null,
      },
    };
  },
  mixins: [ShowToastMixin],
  computed: {
    showButtonSave() {
      return this.login.new_password === this.login.new_password2;
    },
  },
  methods: {
    async loginAccount() {
      this.login.senha = this.login.password;
      this.login.new_senha = this.login.new_password;
      this.login.usuario = this.login.user;

      delete this.login.new_password;
      delete this.login.password;
      delete this.login.new_password2;
      delete this.login.user;

      await autenticacaoApi
        .reset("usuarios", this.login)
        .then((result) => {
          if (result.success) {
            ShowToastMixin.showToast(
              "Usuário alterado com sucesso",
              "positive"
            );

            this.$router.push({ name: "login" });
          }
        })
        .catch((error) => {
          console.log(error);
          ShowToastMixin.showToast(error.message, "warning");
        });
    },
  },
};
</script>
