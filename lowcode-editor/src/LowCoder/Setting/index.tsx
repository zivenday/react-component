import { FunctionComponent, useMemo, useState } from 'react'
import { useComponentsStore, getComponentById, Component } from '../stores'
import { Segmented } from 'antd'
import configs from './configs'
import Attributes from './Attributes'
import Events from './Events'
import Styles from './Styles'
import { ComponentTypes, SetterKeys, SetterNames, SetterKeysType } from './types'

interface SettingProps {}
const getSetters = (componentName: ComponentTypes) => {
  const setter = configs?.[componentName]
  return setter
}

const getSetterMap = () => {
  return Object.keys(SetterKeys).map((key) => {
    const _key = key as SetterKeysType
    return {
      label: SetterNames[_key],
      value: SetterKeys[_key],
    }
  })
}

const setterMap = getSetterMap()

const Setting: FunctionComponent<SettingProps> = (props) => {
  const [activeTab, setActiveTab] = useState<SetterKeys>(SetterKeys.Attributes)
  const { components, selectedComponentId, selectedComponent, updateComponentProps, updateComponentStyles } =
    useComponentsStore()

  // console.log('--', selectedComponentId, JSON.stringify(selectedComponent))
  const curComponent = useMemo(
    () => getComponentById(selectedComponentId, components) as Component,
    [selectedComponentId, components]
  )
  const componentName = curComponent?.name as ComponentTypes
  const setters = getSetters(componentName)

  const activeSetters = setters?.[activeTab]?.setter || []
  // console.log('++', setters, activeTab, activeSetters)
  const handleAttributesChange = (changedFields: any, allFields: any, replace?: boolean) => {
    updateComponentProps(curComponent?.id, changedFields, replace!)
  }
  // const handleEventsChange = (changedFields: any, allFields: any) => {
  //   updateComponentProps(curComponent?.id, changedFields)
  // }
  const handleStylesChange = (changedFields: any, allFields: any, replace?: boolean) => {
    updateComponentStyles(curComponent?.id, changedFields, replace!)
  }

  return (
    <>
      <Segmented<string>
        block
        value={activeTab}
        options={setterMap}
        style={{ width: '100%' }}
        onChange={(value) => {
          setActiveTab(value as SetterKeys)
        }}
      />
      <div className="p-4">
        {activeTab == SetterKeys.Attributes && (
          <Attributes
            curComponentId={curComponent?.id}
            configs={activeSetters}
            defaultValues={curComponent?.props}
            onValuesChange={handleAttributesChange}
          />
        )}
        {activeTab == SetterKeys.Event && <Events configs={activeSetters} />}
        {activeTab == SetterKeys.Style && (
          <Styles
            curComponentId={curComponent?.id}
            configs={activeSetters}
            defaultValues={curComponent?.styles}
            onValuesChange={handleStylesChange}
          />
        )}
      </div>
    </>
  )
}

export default Setting
