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
              autofocus
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
              <q-btn label="Acessar painel" type="submit" color="primary" />
              <q-btn
                label="Esqueci minha senha"
                flat
                @click="openModal('validate')"
              />
            </q-card-actions>
          </q-form>
        </div>
      </div>
    </q-card>
    <ValidarUsuarioModal
      @validate="validate"
      :data="showModal.validate"
      @closeModal="closeModal"
    />
  </div>
</template>
<script>
import autenticacaoApi from "../../api/autenticacao/autenticacao";
import helpers from "../../helpers/session";
import ShowToastMixin from "../../mixins/notify";
import ValidarUsuarioModal from "./components/ValidarUsuarioModal.vue";
export default {
  name: "Login",
  components: {
    ValidarUsuarioModal,
  },
  data() {
    return {
      login: {
        user: "",
        password: "",
      },
      showModal: {
        validate: false,
      },
    };
  },
  mixins: [ShowToastMixin],
  methods: {
    async loginAccount() {
      await autenticacaoApi
        .get("usuarios", this.login.user.trim(), this.login.password.trim())
        .then(async (result) => {
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
              var today = new Date();
              today.setHours(today.getHours() + 4);
              helpers.setCurrentUser({
                nome: user.nome,
                usuario: user.usuario,
                expires_on: new Date(today).getTime(),
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
    openModal(modal) {
      this.showModal[modal] = true;
    },
    closeModal(modal) {
      this.showModal[modal] = false;
    },
    async validate({ user, email }) {
      await autenticacaoApi
        .validate(user, email)
        .then((result) => {
          const { email, nome } = result.data[0];
          if (result.success) {
            autenticacaoApi
              .sendEmail(email, nome)
              .then((result) => {
                ShowToastMixin.showToast(result.message, "positive");
                this.closeModal("validate");
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
