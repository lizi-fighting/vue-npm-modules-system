import user from './user'
import dept from './dept'

const components: { [propsName: string]: any } = {
  user,
  dept
}

const install = (Vue: any) => {
  if ((install as any).installed) return
  (install as any).installed = true
  components.map((component: any) => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue)
}
// export default { ...components }
export const User = user
export const Dept = dept
