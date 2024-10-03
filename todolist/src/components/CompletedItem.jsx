import React from 'react'
import TodoItems from './TodoItems'

const CompletedItem = ({items = [],setItems}) => {
  return (
    <>
      {items
              .filter((item) => item.isCompleted)
              .map((item) => (
                <TodoItems key={item._id} item={item} setItems={setItems} />
              ))
            }
        
    </>
  )
}
export default CompletedItem