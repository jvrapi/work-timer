import { Calendar } from 'phosphor-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  const menus = [
    {title: 'Horários', icon: <Calendar size={25} />}
  ]
  return (
   <div className={`${open ? 'w-72' : 'w-20'} duration-300 p-5 pt-8 text-textColor h-screen bg-secondary relative`}>
    {/* <button
      onClick={() => setOpen(!open)} 
      className={`${!open && 'rotate-180'} absolute -right-3 top-9 w-7 h-7 border-2 border-gray-800 rounded-full flex items-center justify-center`}>
      <CaretLeft />
    </button> */}
    <ul className='pt-6'>
      {menus.map((menu, index) => (
        <li 
          key={index}
          onClick={() => navigate('/schedules-register')} 
          className='text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-secondaryHover rounded-md mt-2'
        >
          {menu.icon}
          <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
        </li>
      ))}
    </ul>
   </div>
  )
}

