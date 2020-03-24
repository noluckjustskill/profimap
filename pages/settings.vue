<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      top
      right
      :color="snackbarColor"
      :timeout="3000"
    >
      {{ snackbarText }}
    </v-snackbar>
    <h2 class="display-1 font-weight-medium page-title">
      Настройки профиля
    </h2>
    <v-form class="mt-8 block" @submit.prevent="update">
      <v-layout
        row
        wrap
        justify-space-between 
        align-center 
      >
        <v-flex sm4 xs12 class="text-center pr-8">
          <v-avatar
            :size="avatarSize"
            :color="avatarColor"
            class="avatar"
            @click="onAvatarClick"
          >
            <v-img
              v-if="preview || picture"
              :src="preview || picture"
              :width="avatarSize"
              :height="avatarSize"
              alt="avatar"
            />
            <span v-else class="display-1 font-weight-light white--text ma-0">{{ userInitials }}</span>
            <div class="overlay">
              <v-icon
                class="icon"
                :size="avatarSize * 0.4"
                color="white"
                dark
              >
                mdi-upload
              </v-icon>
            </div>
          </v-avatar>
          <input
            ref="fileInput"
            :multiple="false"
            type="file"
            @change="onFileChange"
          >
        </v-flex>
        <v-flex sm8 xs12>
          <v-text-field
            v-model="name"
            label="Ваше имя"
            required
            @change="nameInput"
          />
          <v-select
            v-model="gender"
            :items="genderList"
            label="Пол"
            item-text="name"
            item-value="key"
          />
          <v-menu
            ref="menu"
            v-model="pickDoB"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateOfBirth"
                label="Дата рождения"
                readonly
                v-on="on"
              />
            </template>
            <v-date-picker
              ref="picker"
              v-model="dateOfBirth"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              locale="ru-RU"
              @change="saveDoB"
            />
          </v-menu>
          <v-text-field
            v-if="!isExternalUser"
            v-model="currentPassword"
            type="password"
            label="Ваш текущий пароль"
          />
          <v-text-field
            v-if="!isExternalUser"
            v-model="password"
            :rules="passwordRules"
            type="password"
            label="Ваш пароль"
            @change="passwordInput"
          />
          <v-text-field
            v-if="!isExternalUser"
            v-model="passwordConfirm"
            :disabled="!password"
            type="password"
            label="Подтвердите пароль"
            @change="passwordInput"
          />
          <v-btn
            class="white--text mt-2"
            block
            large
            color="accent" 
            type="submit"
          >
            Сохранить
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
  import { initials } from '../utils/userUtils';

  export default {
    data: () => ({
      name: null,
      gender: null,
      dateOfBirth: null,
      preview: null,
      picture: null,
      currentPassword: null,
      password: null,
      passwordConfirm: null,
      passwordRules: [
        v => (v || '').length >= 6 || 'Пароль должен содеражать не менее 6 символов',
        v => /(?=.*[a-z])/.test(v) || 'Пароль должен иметь хотябы одну прописную букву',
        v => /(?=.*[A-Z])/.test(v) || 'Пароль должен иметь хотябы одну заглавную букву',
      ],
      genderList: [{
        key: 'M',
        name: 'Мужской',
      }, {
        key: 'F',
        name: 'Женский',
      }],
      pickDoB: false,
      snackbarColor: 'accent',
      snackbar: false,
      snackbarText: '',
    }),
    computed: {
      userInitials() {
        return initials(this.name);
      },
      avatarColor() {
        return this.$dynamicColor(this.name);
      },
      avatarSize() {
        return this.$vuetify.breakpoint.mdAndDown ? 180: 230;
      },
      isExternalUser() {
        return Boolean(this.$store.state.auth.user.externalId);
      }
    },
    watch: {
      pickDoB(val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
      },
    },
    created() {
      const { name, gender, picture, dateOfBirth } = this.$store.state.auth.user;
      this.name = name;
      this.gender = gender || null;
      this.picture = picture || null;
      this.dateOfBirth = dateOfBirth ? dateOfBirth.slice(0, 10) : null;
    },
    methods: {
      nameInput(val) {
        if (String(val).length > 64) {
          this.name = this.name.slice(0, 64);
        }
      },
      passwordInput(val) {
        if (String(val).length > 64) {
          this.password = this.password.slice(0, 64);
          this.passwordConfirm = this.passwordConfirm.slice(0, 64);
        } else if (!val) {
          this.password = null;
          this.passwordConfirm = null;
        }
      },
      saveDoB(date) {
        this.$refs.menu.save(date);
      },
      onAvatarClick() {
        this.$refs.fileInput.click();
      },
      onFileChange($event) {
        const files = $event.target.files || $event.dataTransfer.files;
        if (files && files.length) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.preview = e.target.result;
          };
          reader.readAsDataURL(files[0]);

          const formData = new FormData();
          formData.append('avatar', files[0]);

          this.$axios.post(
            'avatarUpload',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          ).then(({ data }) => {
            if (!data || !data.avatarUrl) {
              throw Error('Bad response');
            }
            this.picture = data.avatarUrl;
          }).catch(e => {
            console.log(e);
            this.preview = null;

            this.snackbarColor = 'red';
            this.snackbar = true;
            this.snackbarText = 'Не удалось загрузить аватар';
          });
        } else {
          const url = $event.target.value.split('\\').pop();

          this.preview = url;
        }
      },
      update() {
        if (!this.name) {
          this.showError('Имя не может быть пустым');
          return;
        }

        const validation = this.password && this.passwordRules.find(rule => typeof rule(this.password) === 'string');
        if (validation) {
          this.showError(validation(this.password));
          return;
        }
        if (this.password && this.password !== this.passwordConfirm) {
          this.showError('Пароли не совпадают');
          return;
        }
        if (this.password && !this.currentPassword) {
          this.showError('Введите текущий пароль');
          return;
        }

        this.$axios.$post('updateUser', {
          name: this.name || undefined,
          gender: this.gender || undefined,
          picture: this.picture || undefined,
          dateOfBirth: this.dateOfBirth || undefined,
          currentPassword: this.currentPassword || undefined,
          password: this.password || undefined,
        }).then(() => {
          this.snackbarText = 'Пользователь обновлён';
          this.snackbarColor = 'accent';
          this.snackbar = true;

          this.$auth.fetchUser();
        }).catch(err => {
          console.log(err);
          
          this.showError('Не удалось обновить пользователя');
        });
      },
      showError(msg) {
        this.snackbarText = msg || 'Ошибка';
        this.snackbarColor = 'red';
        this.snackbar = true;
      }
    },
  };
</script>

<style scoped lang="scss">
  .row {
    max-width: 100%;
    margin: 0 auto;
  }
  .page-title {
    margin-top: 35px;
    margin-bottom: 15px;
  }
  .page-title.second-title {
    margin-top: 50px;
  }
  .block {
    font-size: 18px;
    font-weight: 500;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    padding: 45px 8%;
    box-sizing: border-box;
    background: white;
  }
  .block.second-block {
    padding: 50px;

    @media (max-width: 599px) {
      padding: 10%;
    }
  }
  .avatar {
    justify-content: center;
    position: relative;
    overflow: hidden;
    &:hover {
      .overlay {
        opacity: 1;
      }
    }
  }
  .overlay {
    cursor: pointer;
    transition: all 0.2s linear;
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    @media (max-width: 600px) {
      display: none;
    }
  }
  input[type=file] {
    position: absolute;
    left: -99999px;
  }
</style>
