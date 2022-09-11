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
    new (createPrescription(
      '观察变化',
      '请您自行观察患肢，确定是否有肿胀、沉重、疼痛、麻木、发红发热等现象，如有，请完成我们的淋巴水肿症状预警测试，获得建议。'
    ))(),
    new (createPrescription(
      '运动患肢',
      '请您根据我们的“乳腺癌术后患肢功能康复操”或“上肢淋巴水肿康复锻炼”视频进行运动。'
    ))(),
    new (createPrescription('保持清洁', '请保持患侧手臂清洁，滋润。'))(),
    new (createPrescription(
      '保护患肢',
      '您应该在日常生活中避免以下行为：\n避免用患侧手臂进行剧烈、重复的运动\n避免患侧受热或被用力按摩，如避免洗澡、洗碗时避免过冷或过热\n避免穿过紧的衣服、首饰\n避免任何类型的创伤，如避免患侧手臂接种疫苗、注射、抽血、输液、测血压、推拿、拔罐等。'
    ))(),
    new (createPrescription(
      '合理膳食',
      '您应该合理饮食，保持体重。做到膳食均衡，低盐、低脂，多食用高蛋白、高纤维食物，每餐七八分饱。'
    ))(),
    new (createPrescription(
      '放松训练',
      '您可以尝试做深呼吸、渐进性肌肉放松训练、冥想等。'
    ))(),
    new (createPrescription(
      '倾诉感受',
      '您可以向家人或朋友倾诉自己的心理感受。'
    ))()
  ])
)
