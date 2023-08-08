<template>
  <div class="flex flex-center">
    <q-card class="my-card" style="width: 600px">
      <div class="row">
        <div class="col q-ma-sm">
          <h6>Alterar senha do usuário</h6>

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
            v-model="login.email"
            label="Digite seu email atual"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
            type="email"
          />
          <q-input
            filled
            v-model="login.password"
            label="Digite sua nova senha "
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
            type="password"
          />
          <q-input
            filled
            v-model="login.password2"
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
              @click="changePassword"
            />
          </q-card-actions>
        </div>
      </div>
    </q-card>
  </div>
</template>
<script>
import autenticacaoApi from "../../api/autenticacao/autenticacao";
import ShowToastMixin from "../../mixins/notify";
export default {
  name: "Index",
  data() {
    return {
      login: {
        user: "",
        password: "",
        password2: null,
        email: "",
      },
      expires: this.$route.query.expires,
    };
  },
  mixins: [ShowToastMixin],
  created() {
    if (parseInt(this.$route.query.expires) < parseInt(Date.now())) {
      ShowToastMixin.showToast("Troca de senha expirada", "warning");
      // voltar para a rota login
    }
  },
  computed: {
    showButtonSave() {
      return this.login.password === this.login.password2;
    },
  },
  methods: {
    async changePassword() {
      this.login.senha = this.login.password;
      this.login.new_senha = this.login.password;
      this.login.usuario = this.login.user;

      delete this.login.password;
      delete this.login.password2;
      delete this.login.user;

      await autenticacaoApi
        .validate(this.login.user, this.login.email)
        .then(async (result) => {
          if (result.success) {
            await autenticacaoApi
              .update("usuarios", this.login)
              .then((result) => {
                if (result.success) {
                  ShowToastMixin.showToast(
                    "Senha alterada com sucesso",
                    "positive"
                  );
                  this.login = {};
                  autenticacaoApi.sendEmail(
                    this.login.email,
                    "",
                    "senhaAlterada",
                    "Condomínio Morada do Sol - Senha alterada"
                  );
                  this.$router.push({ name: "login" });
                }
              })
              .catch((error) => {
                console.log(error);
                ShowToastMixin.showToast(error.message, "warning");
              });
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
