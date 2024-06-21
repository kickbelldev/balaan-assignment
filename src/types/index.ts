export interface RegisterData {
  [key: string]: {
    value?: string
    valueList?: string[]
    error?: string
    validate: () => string | undefined
  }
}
