import React from 'react'
import { useDispatch } from 'react-redux'
import { sorting } from '../../RTK/slices/tasksSlice';
import { sortingOptionsArr } from '../../utilis/sorting';
 

function SortInput() {
  const dispatch = useDispatch();

  return (
      <select name="sortParent" id="sortParent" className='b-0' onChange={(e)=>dispatch(sorting(e.target.value))}>
      <option value="head" disabled>Sort List</option>
      {sortingOptionsArr.map(ele => (<option key={ ele.id} value={ele.value}>{ele.text }</option>))}
    </select>
  )
}

export default SortInput
