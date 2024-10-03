import React from 'react'
import TodoItems from './TodoItems'

const InCompletedItem = ({items=[],setItems}) => {
    return(
        <div>
                {
              items.filter((item)=> !item.isCompleted).map((item)=>(
                <TodoItems key={item._id} item={item} setItems={setItems} />

              ))
            }
        </div>
    )
}

export default InCompletedItem