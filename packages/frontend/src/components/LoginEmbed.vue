<template>
  <q-card>
    <q-card-section>
      <div class="column items-center">
        <div>
          <q-icon size="xl" name="mdi-account-circle" />
        </div>
        <div class="row q-gutter-md">
          <q-btn unelevated color="primary" label="注册" to="/register" />
          <q-separator vertical />
          <q-btn outline color="primary" label="登录" to="/login" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
