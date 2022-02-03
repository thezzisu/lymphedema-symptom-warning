export const variables = {
  shoulder_limited: {
    text: '肩部有无活动受限',
    w: 0.202
  },
  arm_limited: {
    text: '手臂有无活动受限',
    w: 1.937
  },
  arm_swelling: {
    text: '上肢肿胀',
    w: 1.55
  },
  chest_wall_swelling: {
    text: '胸部（胸壁）肿胀',
    w: 0.388
  },
  arm_tightness: {
    text: '患肢紧绷',
    w: 1.191
  },
  arm_heaviness: {
    text: '患肢沉重',
    w: 1.099
  },
  skin_toughness_or_thickness: {
    text: '患肢皮肤变硬、粗糙或增厚',
    w: 17.811
  },
  arm_firmness: {
    text: '患肢不灵活',
    w: 0.685
  },
  tenderness: {
    text: '患肢触痛或压痛',
    w: -2.04
  },
  limb_hotness: {
    text: '患肢皮肤温度升高，发热或发烫',
    w: 1.218
  },
  blistering: {
    text: '患肢皮肤起水泡',
    w: 1.241
  },
  limb_pain: {
    text: '患肢疼痛/隐痛/酸痛',
    w: 0.444
  },
  numbness: {
    text: '患肢麻木',
    w: 0.773
  },
  stabbing: {
    text: '患肢刺痛',
    w: 1.121
  },
  tingling: {
    text: '患肢有针扎样感觉',
    w: 2.459
  },
  limb_fatigue: {
    text: '患肢疲乏',
    w: 0.012
  },
  limb_weakness: {
    text: '患肢无力',
    w: 0.6
  }
}

export const intercept = -3.435

export type Answer = Record<keyof typeof variables, number>

export function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x))
}

// eslint-disable-next-line require-await
export async function predict(data: Answer): Promise<number> {
  let sum = 0
  for (const [key, value] of Object.entries(data)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sum += variables[key].w * value
  }
  return sigmoid(sum + intercept)
}
