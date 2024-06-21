import { ref, h, Fragment, defineComponent } from 'vue'

export const useFunnel = <T extends string>(initialStep: T) => {
  const step = ref(initialStep)

  const setStep = (newStep: T) => {
    step.value = newStep
  }

  const Step = defineComponent({
    name: 'Step',
    props: {
      name: {
        type: String,
        required: true,
      },
    },
    setup(props, { slots }) {
      return () => (slots.default ? slots.default() : null)
    },
  })

  const Funnel = defineComponent({
    name: 'Funnel',
    setup(_, { slots }) {
      return () => {
        const currentStep = slots
          .default()
          .find(
            (vnode) =>
              vnode.type.name === 'Step' && vnode.props.name === step.value
          )
        return currentStep ? currentStep : h(Fragment)
      }
    },
  })

  return { Funnel, Step, setStep }
}
