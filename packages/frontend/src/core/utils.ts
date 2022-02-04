import { useQuasar } from 'quasar'

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const useConfirm = () => {
  const $q = useQuasar()
  return (title: string, message: string) =>
    new Promise<void>((resolve, reject) =>
      $q
        .dialog({
          title,
          message,
          cancel: true,
          persistent: true
        })
        .onOk(resolve)
        .onCancel(reject)
    )
}
