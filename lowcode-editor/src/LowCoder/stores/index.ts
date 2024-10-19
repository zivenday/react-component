import { CSSProperties } from 'react'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const defaultComponent: Component = { id: 1, name: 'Page', parentId: -1, props: {} }

const myMiddlewares = (f) => devtools(persist(f, { name: 'bearStore' }))

export type Component = {
  id: number
  name: string
  children?: Component[]
  parentId?: number
  props?: Record<string, any>
  styles?: CSSProperties
}

export type State = {
  isDragging: boolean
  components: Component[]
  selectedComponentId: number
  selectedComponent: Component
}

export type Actions = {
  addComponent: (component: Component, parentId: number) => void
  delComponent: (component: Component) => void
  updateCompnent: (component: Component, targetId?: number) => void
  updateComponentProps: (id: number, props: Record<string, any>, replace?: boolean) => void
  updateComponentStyles: (id: number, styles: CSSProperties, replace?: boolean) => void
  setSelectedComponentId: (id: number) => void
  setIsDragging: (isDragging: boolean) => void
  moveComponent: (id: number, newParentId: number) => void
}

export const useComponentsStore = create<State & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        isDragging: false,
        components: [defaultComponent],
        selectedComponentId: 1,
        selectedComponent: defaultComponent,
        setIsDragging: (isDragging: boolean) => set(() => ({ isDragging })),
        addComponent: (component, parantId) =>
          set((state) => {
            let _components = get().components
            if (parantId === -1) {
              _components = [..._components, component]
            } else {
              const parentComponent = getComponentById(parantId, _components)
              if (parentComponent) {
                component.parentId = parantId
                if (parentComponent.children) {
                  parentComponent.children.push(component)
                } else {
                  parentComponent.children = [component]
                }
              }
            }
            console.log('components', _components)
            return { components: [..._components] }
          }),
        delComponent: (component) =>
          set((state) => {
            let _components = get().components
            // console.log('component+++', component)
            let parantId = component?.parentId
            if (!parantId) return { components: _components }
            if (component.id === 1) return { components: _components }
            if (!parantId) {
              const _component = getComponentById(component.id, _components)
              parantId = _component?.parentId
            }

            const parentComponent = getComponentById(parantId!, _components)
            if (parentComponent && parentComponent.children) {
              parentComponent.children = parentComponent.children.filter((c) => c.id !== component.id)
            } else {
              return { components: _components }
            }
            return { components: [..._components] }
          }),

        updateCompnent: (component, targetId) =>
          set((state) => {
            let _components = get().components
            let parantId = component.parentId
            if (component.id === 1) return { components: _components }
            if (targetId && targetId !== 1) {
              const targetComponent = getComponentById(targetId, _components)
              parantId = targetComponent?.parentId
            }
            if (!parantId) {
              const _component = getComponentById(component.id, _components)
              parantId = _component?.parentId
            }
            const parentComponent = getComponentById(parantId!, _components)
            if (parentComponent && parentComponent.children) {
              const targetIndex = parentComponent.children.findIndex((c) => c.id === component.id)
              if (targetIndex > -1) {
                component.parentId = parentComponent.id
                parentComponent.children[targetIndex] = component
              }
            } else {
              return { components: _components }
            }
            return { components: [..._components] }
          }),
        updateComponentProps: (id, props, replace) =>
          set((state) => {
            const _components = get().components
            const component = getComponentById(id, _components)
            if (component) {
              const originalProps = component.props || {}
              component.props = replace ? props : { ...originalProps, ...props }
            }
            return { components: [..._components] }
          }),
        updateComponentStyles: (id, styles, replace) =>
          set((state) => {
            const _components = get().components
            const component = getComponentById(id, _components)
            if (component) {
              const originalStyles = component.styles || {}
              component.styles = replace ? styles : { ...originalStyles, ...styles }
            }
            return { components: [..._components] }
          }),
        setSelectedComponentId: (id) =>
          set(() => {
            const component = getComponentById(id, get().components)
            return { selectedComponentId: id, selectedComponent: component }
          }),
        moveComponent: (id: number, newParentId: number) =>
          set(() => {
            const _components = get().components
            const _component = getComponentById(id, _components)
            // console.log('_component', _component)
            if (!_component) return { components: [..._components] }
            if (_component.parentId === newParentId) return { components: [..._components] }
            const oldParentComponent = getComponentById(_component.parentId!, _components)
            const newParentComponent = getComponentById(newParentId, _components)
            if (oldParentComponent && newParentComponent) {
              oldParentComponent.children = oldParentComponent.children ?? []
              newParentComponent.children = newParentComponent.children ?? []
              oldParentComponent.children = oldParentComponent.children?.filter((c) => c.id !== id)
              _component.parentId = newParentId
              newParentComponent.children?.push(_component)
            }
            return { components: [..._components] }
          }),
      }),
      { name: 'bearStore' }
    )
  )
)

export const getComponentById = (id: string | number, components: Component[]): Component | undefined => {
  for (let component of components) {
    // console.log('ParentComponent', component.id, component.id === +id)
    if (component.id === +id) return component
    const childComp = getComponentById(id, component.children || [])
    if (childComp) return childComp
  }
  return undefined
}
