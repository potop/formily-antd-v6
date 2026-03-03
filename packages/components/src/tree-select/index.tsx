import { LoadingOutlined } from '@ant-design/icons'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { TreeSelect as AntdTreeSelect } from 'antd'
import React from 'react'
import { PreviewText } from '../preview-text'

export const TreeSelect = connect(
  AntdTreeSelect,
  mapProps(
    {
      dataSource: 'treeData',
    },
    (props, field) => {
      return {
        ...props,
        suffix:
          field?.['loading'] || field?.['validating'] ? (
            <LoadingOutlined />
          ) : (
            props.suffix
          ),
      }
    }
  ),
  mapReadPretty(PreviewText.TreeSelect)
)

export default TreeSelect
