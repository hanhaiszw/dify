import type { FC } from 'react'
import React from 'react'
import { useNodes } from 'reactflow'
import { useTranslation } from 'react-i18next'
import NodeVariableItem from '../variable-assigner/components/node-variable-item'
import { type ListFilterNodeType } from './types'
import { isENV, isSystemVar } from '@/app/components/workflow/nodes/_base/components/variable/utils'
import { BlockEnum, type Node, type NodeProps } from '@/app/components/workflow/types'

const i18nPrefix = 'workflow.nodes.assigner'

const NodeComponent: FC<NodeProps<ListFilterNodeType>> = ({
  data,
}) => {
  const { t } = useTranslation()

  const nodes: Node[] = useNodes()
  const { variable } = data

  if (!variable || variable.length === 0)
    return null

  const isSystem = isSystemVar(variable)
  const isEnv = isENV(variable)
  const node = isSystem ? nodes.find(node => node.data.type === BlockEnum.Start) : nodes.find(node => node.id === variable[0])
  const varName = isSystem ? `sys.${variable[variable.length - 1]}` : variable.slice(1).join('.')
  return (
    <div className='relative px-3'>
      <div className='mb-1 system-2xs-medium-uppercase text-text-tertiary'>{t(`${i18nPrefix}.assignedVariable`)}</div>
      <NodeVariableItem
        node={node as Node}
        isEnv={isEnv}
        varName={varName}
        className='bg-workflow-block-parma-bg'
      />
    </div>
  )
}

export default React.memo(NodeComponent)