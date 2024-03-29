export type Parameter = {
  label: string
  options: Array<readonly [string, number]>
}
export type Answer = number[]
export type Result = number[]
export type Category = {
  label: string
  suggestion: string
  icon: string
  color: string
}

export abstract class Model {
  abstract readonly name: string
  abstract getParameters(): Parameter[]
  abstract predict(answer: Answer): Result
  abstract getCategory(result: Result): Category
}

export function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x))
}

export interface ContitionalCategory extends Category {
  cond: (r: Result) => boolean
}

export class BCRLModel extends Model {
  readonly name = '淋巴水肿风险预测'

  private readonly variables = [
    ['BMI', '≥25', '<25', 0.575, 2, 1],
    ['高血压', '是', '否', 0, 2, 1],
    ['肿瘤分期', 'III', 'I或II', 0, 2, 1],
    ['乳房手术类型', '全乳切除', '肿物切除', 0.278, 2, 1],
    ['腋窝手术类型', '腋窝淋巴结清扫', '前哨淋巴结活检', 1.118, 3, 1],
    ['淋巴结清扫数量', '≥10', '<10', 0, 2, 1],
    ['新辅助化疗', '是', '否', 0, 2, 1],
    ['放疗', '是', '否', 0.482, 2, 1],
    ['术后并发症', '是', '否', 0.864, 2, 1]
  ] as const

  private readonly categories: readonly ContitionalCategory[] = [
    {
      label: '低危',
      suggestion:
        '请您做好淋巴水肿基础预防管理，每月按时进行淋巴水肿症状预警评估',
      icon: 'mdi-check-circle',
      color: 'positive',
      cond: (r) => r[1] < 14.5
    },
    {
      label: '高危',
      suggestion:
        '请您做好淋巴水肿基础预防管理和高危预防管理，立即进行淋巴水肿症状预警评估，并坚持每周评估一次',
      icon: 'mdi-alert-circle',
      color: 'negative',
      cond: (r) => r[1] >= 14.5
    }
  ]

  getParameters() {
    return this.variables.map(([label, positive, negative]) => ({
      label,
      options: [[positive, 1] as const, [negative, 0] as const]
    }))
  }

  predict(answer: Answer) {
    const [sum, score] = answer
      .map((x, i) => ((v) => (x ? [v[3], v[4]] : [0, v[5]]))(this.variables[i]))
      .reduce(([a, b], [c, d]) => [a + c, b + d])
    return [sigmoid(sum + -1.349), score]
  }

  getCategory(result: Result) {
    return this.categories.find((c) => c.cond(result)) ?? this.categories[0]
  }
}

export class SymptomModel extends Model {
  readonly name = '淋巴水肿症状预警'

  private readonly variables = [
    ['肩部有无活动受限', 0.202],
    ['手臂有无活动受限', 1.937],
    ['上肢肿胀', 1.55],
    ['胸部（胸壁）肿胀', 0.388],
    ['患肢紧绷', 1.191],
    ['患肢沉重', 1.099],
    ['患肢皮肤变硬、粗糙或增厚', 17.811],
    ['患肢不灵活', 0.685],
    ['患肢触痛或压痛', -2.04],
    ['患肢皮肤温度升高，发热或发烫', 1.218],
    ['患肢皮肤起水泡', 1.241],
    ['患肢疼痛/隐痛/酸痛', 0.444],
    ['患肢麻木', 0.773],
    ['患肢刺痛', 1.121],
    ['患肢有针扎样感觉', 2.459],
    ['患肢疲乏', 0.012],
    ['患肢无力', 0.6]
  ] as const

  private readonly intercept = -3.435

  private readonly categories: readonly ContitionalCategory[] = [
    {
      label: '低风险',
      suggestion:
        '请您继续保持，做好淋巴水肿预防管理，按时进行淋巴水肿症状预警评估',
      icon: 'mdi-check-circle',
      color: 'positive',
      cond: (r) => r[0] <= 0.15
    },
    {
      label: '中风险',
      suggestion: '请您立即就医，做好淋巴水肿基础预防管理和高危预防管理',
      icon: 'mdi-information',
      color: 'warning',
      cond: (r) => r[0] <= 0.5
    },
    {
      label: '高风险',
      suggestion: '请您立即就医，做好淋巴水肿基础预防管理和高危预防管理',
      icon: 'mdi-alert-circle',
      color: 'negative',
      cond: (r) => r[0] > 0.5
    }
  ]

  getParameters() {
    return this.variables.map(([label]) => ({
      label,
      options: [['是', 1] as const, ['否', 0] as const]
    }))
  }

  predict(answer: Answer): Result {
    const sum = answer
      .map((x, i) => this.variables[i][1] * x)
      .reduce((a, b) => a + b)
    return [sigmoid(sum + this.intercept)]
  }

  getCategory(result: Result) {
    return this.categories.find((c) => c.cond(result)) ?? this.categories[0]
  }
}

export const models: Record<string, Model> = {
  bcrl: new BCRLModel(),
  symptom: new SymptomModel()
}
