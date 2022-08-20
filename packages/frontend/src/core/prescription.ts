export abstract class Prescription {
  abstract readonly name: string
  abstract readonly description: string
}

function createPrescription(name: string, description: string) {
  return class extends Prescription {
    readonly name = name
    readonly description = description
  }
}

export const prescriptions: Record<string, Prescription> = Object.fromEntries(
  Object.entries([
    new (createPrescription('观察变化', '观察手臂变化'))(),
    new (createPrescription('运动患肢', '患肢运动'))(),
    new (createPrescription('保持清洁', '保持手臂清洁、滋润'))(),
    new (createPrescription('保护患肢', '避免损伤患侧手臂'))(),
    new (createPrescription('合理膳食', '合理膳食，保持体重'))(),
    new (createPrescription('放松训练', '做深呼吸、放松训练、冥想等'))(),
    new (createPrescription('倾诉感受', '向家人朋友倾诉自己的心理感受'))()
  ])
)
