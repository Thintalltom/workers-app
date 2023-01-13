import React, {useEffect} from 'react'
const Workersdashboard = ({getWorkers, workers}) => {
    useEffect(() => {
    getWorkers()
    }, [])
    
  return (
      <div className='bg-slate-200 p-3'>
    <div className='container mx-auto h-100 w-100 p-4'>
        <div className='flex gap-5 container mx-auto p-4'>
        {workers.map((worker) => (
            <div key={worker.id} className='bg-slate-100 shadow-md p-4 flex justify-around gap-5'>
                <img src={worker.avatar} className='w-40' />
                <div>
                <h2 className='text-lg'> Workers Name: {worker.name}</h2>
                <h6> Workers Age: {worker.age}</h6>
                <button className='bg-red-600 p-3 rounded hover:bg-indigo-300'>Delete</button>
                </div>
            </div>
        ))}
        </div>
    </div>

      </div>
 
  )
}

export default Workersdashboard