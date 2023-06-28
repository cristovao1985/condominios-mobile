<template>
  <div class="flex flex-center">
    <q-card class="my-card" style="width: 600px">
      <div class="row">
        <div class="col q-ma-sm">
          <h6>Login do usuário</h6>
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
              label="Digite sua senha"
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
              <q-btn label="Acessar painel" type="submit" color="primary" />
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
  name: "SignUp",
  data() {
    return {
      login: {
        user: "",
        password: "",
      },
    };
  },
  mixins: [ShowToastMixin],
  methods: {
    async loginAccount() {
      await autenticacaoApi
        .get("usuarios", this.login.user.trim(), this.login.password.trim())
        .then((result) => {
          const user = result.data[0];

          if (!user) {
            ShowToastMixin.showToast(
              "Usuário não encontrado. Verifique e tente novamente",
              "warning"
            );
            return;
          }

          if (user.ativo) {
            if (user.reset) {
              // enviar usuário para reset de senha
              this.$router.push({ name: "reset" });
            } else {
              helpers.setCurrentUser({
                nome: user.nome,
                usuario: user.usuario,
              });
              this.$router.push({ name: "home" });
            }
          } else {
            ShowToastMixin.showToast(
              "Usuário inativo. Verifique com o administrador do sistema.",
              "warning"
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
