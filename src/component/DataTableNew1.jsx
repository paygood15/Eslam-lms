import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

const tasks = [
  { id: 1, task: 'Operating System', deadline: '02/15/2024', type: 'SETUP', complete: true, tasks: 0 },
  { id: 2, task: 'VSCode', deadline: '02/17/2024', type: 'SETUP', complete: true, tasks: 0 },
  { id: 3, task: 'JavaScript', deadline: '03/28/2024', type: 'LEARN', complete: true, tasks: 3 },
  { id: 4, task: 'React', deadline: '04/08/2024', type: 'LEARN', complete: false, tasks: 5 },
];

const TaskTable = () => {
  const [hideComplete, setHideComplete] = useState(false);

  const filteredTasks = hideComplete ? tasks.filter(task => !task.complete) : tasks;

  return (
    <div className="p-4 rtl">
      <div className="flex items-center mb-4">
        <button className="bg-teal-500 text-white px-4 py-2 rounded mr-4">Features?</button>
        <input 
          type="text" 
          placeholder="Search Task" 
          className="border rounded px-4 py-2"
        />
        <label className="ml-4 flex items-center">
          <input 
            type="checkbox" 
            className="mr-2" 
            checked={hideComplete} 
            onChange={() => setHideComplete(!hideComplete)}
          />
          Hide Complete
        </label>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left">TASK</th>
            <th className="border p-2 text-left">DEADLINE</th>
            <th className="border p-2 text-left">TYPE</th>
            <th className="border p-2 text-left">COMPLETE</th>
            <th className="border p-2 text-left">TASKS</th>
            <th className="border p-2 text-left">EDIT</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task.id} className="bg-teal-50">
              <td className="border p-2">{task.task}</td>
              <td className="border p-2">{task.deadline}</td>
              <td className="border p-2">{task.type}</td>
              <td className="border p-2">{task.complete.toString()}</td>
              <td className="border p-2">{task.tasks}</td>
              <td className="border p-2">
                <FaEdit className="text-teal-500 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button className="text-teal-500">&lt;</button>
        <div>1</div>
        <button className="text-teal-500">&gt;</button>
      </div>
    </div>
  );
}

export default TaskTable;
