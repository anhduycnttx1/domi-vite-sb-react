import { UniqueIdentifier } from '@dnd-kit/core'
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable'
import { Container } from '@mantine/core'
import { ContainerProps } from '../../types'

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true })
type DroppableContainerProps = ContainerProps & {
  disabled?: boolean
  id: UniqueIdentifier
  items: UniqueIdentifier[]
  style?: React.CSSProperties
}
export default function DroppableContainer({
  children,
  columns = 1,
  disabled,
  id,
  items,
  style,
  ...props
}: DroppableContainerProps) {
  const { active, attributes, isDragging, listeners, over, setNodeRef, transition, transform } =
    useSortable({
      id,
      data: {
        type: 'container',
        children: items,
      },
      animateLayoutChanges,
    })
  const isOverContainer = over
    ? (id === over.id && active?.data.current?.type !== 'container') || items.includes(over.id)
    : false

  return (
    <></>
    // <Component
    //   {...props}
    //   ref={ref}
    //   style={
    //     {
    //       ...style,
    //       '--columns': columns,
    //     } as React.CSSProperties
    //   }
    //   className={classNames(
    //     styles.Container,
    //     unstyled && styles.unstyled,
    //     horizontal && styles.horizontal,
    //     hover && styles.hover,
    //     placeholder && styles.placeholder,
    //     scrollable && styles.scrollable,
    //     shadow && styles.shadow
    //   )}
    //   onClick={onClick}
    //   tabIndex={onClick ? 0 : undefined}
    // >
    //   {label ? (
    //     <div className={styles.Header}>
    //       {label}
    //       <div className={styles.Actions}>
    //         {onRemove ? <Remove onClick={onRemove} /> : undefined}
    //         <Handle {...handleProps} />
    //       </div>
    //     </div>
    //   ) : null}
    //   {placeholder ? children : <ul>{children}</ul>}
    // </Component>
  )
}

{
  /* <Container
ref={disabled ? undefined : setNodeRef}
style={{
  ...style,
  transition,
  transform: CSS.Translate.toString(transform),
  opacity: isDragging ? 0.5 : undefined
}}
hover={isOverContainer}
handleProps={{
  ...attributes,
  ...listeners
}}
columns={columns}
{...props}
>
{children}
</Container> */
}
