<template>
  <div class="flex flex-center">
    <q-card class="my-card" style="width: 600px">
      <div class="text-center q-ma-md">
        <q-img :src="logo" height="120px" width="120px" /> <br />
        <br />
        <span class="text-h4">Login do Morador</span>
      </div>
      <div class="row">
        <div class="col q-ma-sm text-center">
          <q-form @submit="loginAccount">
            <q-input
              filled
              type="text"
              v-model="login.cpf"
              label="Digite seu CPF"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
              autofocus
              mask="###.###.###-##"
              placeholder="Ex: 123.456.789-00"
            >
              <template v-slot:append>
                <q-icon name="assignment_ind" />
              </template>
            </q-input>
            <q-input
              filled
              v-model="login.nascimento"
              label="Digite sua data de Nascimento"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
              mask="##/##/####"
            >
            </q-input>
            <q-card-actions>
              <q-btn
                label="Acessar Aplicativo"
                type="submit"
                color="primary"
                class="full-width"
                :loading="loading"
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
import dateFormater from "../../helpers/formaters";
export default {
  name: "LoginPage",
  components: {
    ValidarUsuarioModal,
  },
  data() {
    return {
      login: {
        cpf: "",
        nascimento: "",
      },
      showModal: {
        validate: false,
      },
      loading: false,
      isPwd: true,
    };
  },
  mixins: [ShowToastMixin],
  computed: {
    logo() {
      return require("../../../logo-condominio.png");
    },
  },
  methods: {
    async loginAccount() {
      this.loading = true;
      const date = dateFormater.textTodate(this.login.nascimento);
      console.log(date);

      await autenticacaoApi
        .get("condominos", this.login.cpf.trim(), date)
        .then(async (result) => {
          const user = result.data[0];

          if (!user) {
            ShowToastMixin.showToast(
              "Usuário não encontrado. Verifique e tente novamente",
              "warning"
            );
            this.loading = false;
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
                expires_on: new Date(today).getTime(),
                tenant: user.id_condominio,
                id: user.id,
              });

              this.$router.push({ name: "home" });
            }
          } else {
            ShowToastMixin.showToast(
              "Usuário inativo. Verifique com o administrador do sistema.",
              "warning"
            );

            this.loading = false;
          }
        })
        .catch((error) => {
          ShowToastMixin.showToast(
            "Houve um erro ao conectar ao servidor. Tente novamente",
            "negative"
          );

          this.loading = false;
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
              .sendEmail(
                email,
                nome,
                "resetSenha",
                "Condomínio Morada do Sol - Alteração de senha"
              )
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
