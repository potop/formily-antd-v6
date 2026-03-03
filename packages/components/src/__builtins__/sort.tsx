import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { ReactFC } from '@formily/reactive-react'
import React, { createContext, useContext, useMemo } from 'react'

export interface ISortableContainerProps {
  list: any[]
  start?: number
  accessibility?: {
    container?: Element
  }
  onSortStart?: (event: DragStartEvent) => void
  onSortEnd?: (event: { oldIndex: number; newIndex: number }) => void
}

export function SortableContainer<T extends React.HTMLAttributes<HTMLElement>>(
  Component: ReactFC<T>
): ReactFC<ISortableContainerProps & T> {
  function SortableContainerInner({
    list,
    start = 0,
    accessibility,
    onSortStart,
    onSortEnd,
    ...props
  }: ISortableContainerProps & T) {
    const _onSortEnd = (event: DragEndEvent) => {
      const { active, over } = event
      if (!over) return
      const oldIndex = +active.id - 1
      const newIndex = +over.id - 1
      onSortEnd?.({
        oldIndex,
        newIndex,
      })
    }

    const SortableCtx = SortableContext as any
    return (
      <DndContext
        accessibility={accessibility}
        onDragStart={onSortStart}
        onDragEnd={_onSortEnd}
      >
        <SortableCtx
          items={list.map((_, index) => index + start + 1)}
          strategy={verticalListSortingStrategy}
        >
          <Component {...(props as unknown as T)}>{props.children}</Component>
        </SortableCtx>
      </DndContext>
    )
  }
  SortableContainerInner.displayName = 'SortableContainer'
  return SortableContainerInner
}

export const useSortableItem = () => {
  return useContext(SortableItemContext)
}

export const SortableItemContext = createContext<
  Partial<ReturnType<typeof useSortable>>
>({})

export interface ISortableElementProps {
  index?: number
  lockAxis?: 'x' | 'y'
}

export function SortableElement<T extends React.HTMLAttributes<HTMLElement>>(
  Component: ReactFC<T>
): ReactFC<T & ISortableElementProps> {
  function SortableElementInner({
    index = 0,
    lockAxis,
    ...props
  }: T & ISortableElementProps) {
    const sortable = useSortable({
      id: index + 1,
    })
    const { setNodeRef, transform, transition, isDragging } = sortable
    if (transform) {
      switch (lockAxis) {
        case 'x':
          transform.y = 0
          break
        case 'y':
          transform.x = 0
          break

        default:
          break
      }
    }

    const style = useMemo(() => {
      const zIndex = transform ? 1 : 'none'
      const position = transform ? 'relative' : 'unset'
      const itemStyle: React.CSSProperties = {
        position,
        touchAction: 'none',
        zIndex,
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : 'none',
        transition: `${transform ? 'all 200ms ease' : ''}`,
      }
      const dragStyle = {
        transition,
        opacity: '0.8',
        transform: `translate3d(${transform?.x || 0}px, ${
          transform?.y || 0
        }px, 0)`,
      }

      const computedStyle = isDragging
        ? {
            ...itemStyle,
            ...dragStyle,
            ...props.style,
          }
        : {
            ...itemStyle,
            ...props.style,
          }

      return computedStyle
    }, [isDragging, transform, transition, props.style])

    return (
      <SortableItemContext.Provider value={sortable}>
        {React.createElement(
          Component as any,
          {
            ...props,
            style,
            ref: setNodeRef,
          } as unknown as T
        )}
      </SortableItemContext.Provider>
    )
  }
  SortableElementInner.displayName = 'SortableElement'
  return SortableElementInner
}

export function SortableHandle<T extends React.HTMLAttributes<HTMLElement>>(
  Component: ReactFC<T>
): ReactFC<T> {
  function SortableHandleInner(props: T) {
    const { attributes, listeners } = useSortableItem()
    return <Component {...props} {...attributes} {...listeners} />
  }
  SortableHandleInner.displayName = 'SortableHandle'
  return SortableHandleInner
}
