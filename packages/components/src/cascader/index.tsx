import { LoadingOutlined } from '@ant-design/icons'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Cascader as AntdCascader } from 'antd'
import React from 'react'
import { PreviewText } from '../preview-text'

export const Cascader = connect(
  AntdCascader,
  mapProps(
    {
      dataSource: 'options',
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
  mapReadPretty(PreviewText.Cascader)
)

export default Cascader
