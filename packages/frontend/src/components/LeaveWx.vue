<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">在浏览器中打开</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        我们检测到您正在使用微信打开本程序。由于微信的限制，建议您在浏览器中打开本程序。
        <br />
        第一步：点击右上角的
        <q-icon name="mdi-dots-horizontal" size="lg" />
        按钮；
        <br />
        第二步：在弹出的菜单中选择“在浏览器打开”即可！
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="好" @click="onOKClick" />
        <q-btn color="secondary" label="取消" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'

const props = defineProps({})

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()

function onOKClick() {
  onDialogOK()
}
</script>
