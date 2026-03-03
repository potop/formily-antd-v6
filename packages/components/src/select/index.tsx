import { LoadingOutlined } from '@ant-design/icons'
import { connect, mapProps, mapReadPretty, ReactFC } from '@formily/react'
import { Select as AntdSelect } from 'antd'
import type { SelectProps } from 'antd/es/select'
import React from 'react'
import { PreviewText } from '../preview-text'

export const Select: ReactFC<SelectProps<any, any>> = connect(
  AntdSelect,
  mapProps(
    {
      dataSource: 'options',
      loading: true,
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
  mapReadPretty(PreviewText.Select)
)

export default Select
