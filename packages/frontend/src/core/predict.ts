export type Variable = [
  question: string,
  positive: string,
  negative: string,
  weight: number,
  additivePositive: number,
  additiveNegative: number
]

export const variables: Variable[] = [
  ['BMI', '≥25', '<25', 0.738, 2, 1],
  ['高血压', '是', '否', 0.786, 2, 1],
  ['肿瘤分期', 'III', 'I或II', 0.625, 2, 1],
  ['乳房手术类型', '全乳切除', '肿物切除', 0.311, 2, 1],
  ['腋窝手术类型', 'ALND', 'SLNB', 1.117, 3, 1],
  ['淋巴结清扫数量', '≥10', '<10', 0.365, 2, 1],
  ['新辅助化疗', '是', '否', 0.793, 2, 1],
  ['放疗', '是', '否', 0.687, 2, 1],
  ['术后并发症', '是', '否', 0.715, 2, 1]
]

export const intercept = -1.2715

export type Answer = number[]
export type Result = [number, number]

export function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x))
}

// eslint-disable-next-line require-await
export async function predict(data: Answer): Promise<Result> {
  const [sum, score] = data
    .map((x, i) => ((v) => (x ? [v[3], v[4]] : [0, v[5]]))(variables[i]))
    .reduce(([a, b], [c, d]) => [a + c, b + d], [0, 0])
  return [sigmoid(sum + intercept), score]
}

export interface IResultClass {
  label: string
  suggestion: string
  icon: string
  color: string
  cond: (r: Result) => boolean
}

const resultClasses: IResultClass[] = [
  {
    label: '低危',
    suggestion: '推荐继续保持',
    icon: 'mdi-check-circle',
    color: 'positive',
    cond: (r) => r[1] < 14.5
  },
  {
    label: '高危',
    suggestion: '推荐立即治疗',
    icon: 'mdi-alert-circle',
    color: 'negative',
    cond: (r) => r[1] >= 14.5
  }
]

export function getResultClass(r: Result): IResultClass {
  const one = resultClasses.find((c) => c.cond(r))
  if (!one) throw new Error('Bad result!')
  return one
}

export function prettierProb(prob: number) {
  return (prob * 100).toFixed(2) + '%'
}
