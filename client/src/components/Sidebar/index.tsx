import { Calendar } from 'phosphor-react';
import { Link } from 'react-router-dom';
export const Sidebar = () => {
  const menus = [{ title: 'Horários', icon: <Calendar size={25} /> }];
  return (
    <div className="w-72 duration-300 p-5 pt-8 text-textColor h-screen bg-secondary relative">
      <ul className="pt-6">
        {menus.map((menu, index) => (
          <Link
            key={index}
            to={'/schedules-register'}
            className="text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-secondaryHover rounded-md mt-2"
          >
            {menu.icon}
            <span className={`${!open && 'hidden'} origin-left duration-200`}>
              {menu.title}
            </span>
          </Link>
        ))}
      </ul>
    </div>
  );
};
