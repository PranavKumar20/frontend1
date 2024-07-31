import { useRouter } from 'next/navigation';
import { LuBellDot } from "react-icons/lu";
import { LuBell } from "react-icons/lu";
import { GoSun } from "react-icons/go";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiHomeAlt2 } from "react-icons/bi";
import { RxClipboard } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { AiOutlineTeam } from "react-icons/ai";
import { TbDeviceAnalytics } from "react-icons/tb";

const SideBar = ({ userName, onCreateNew }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="w-1/6 h-screen bg-white p-4">
      <div className="flex items-center mb-6">
        <img src="https://res.cloudinary.com/dcjpwnsx2/image/upload/v1722319078/avatars/Avatar_g9dgac.png" alt="Avatar" className="rounded-full w-10 h-10 border border-black" />
        <span className="ml-4 text-lg font-semibold">{userName}</span>
      </div>
      <div><IconsBelow onLogout={handleLogout} /></div>
      <nav>
        <ul>
          <li className="mb-4"><a href="#" className="flex">
            <div className="pt-1 pr-1">
              <BiHomeAlt2 />
            </div>
            <div>Home</div></a>
          </li>
          <li className="mb-4"><a href="#" className="flex">
            <div className="pt-1 pr-1">
              <RxClipboard />
            </div>
            <div>Boards</div></a>
          </li>
          <li className="mb-4"><a href="#" className="flex">
            <div className="pt-1 pr-1">
              <CiSettings />
            </div>
            <div>Settings</div></a>
          </li>
          <li className="mb-4"><a href="#" className="flex">
            <div className="pt-1 pr-1">
              <AiOutlineTeam />
            </div>
            <div>Teams</div></a>
          </li>
          <li className="mb-4"><a href="#" className="flex">
            <div className="pt-1 pr-1">
              <TbDeviceAnalytics />
            </div>
            <div>Analytics</div></a>
          </li>
        </ul>
      </nav>
      <button
        className="w-full bg-purple-500 text-white py-2 px-4 rounded mt-6 flex justify-between"
        onClick={onCreateNew} // Call the passed function on click
      >
        Create new task
        <div className="pt-1">
          <AiFillPlusCircle />
        </div>
      </button>
    </div>
  );
};

export default SideBar;

const IconsBelow = ({ onLogout }) => {
  return (
    <div className="flex flex-row justify-between ">
      <div className="flex flex-row" >
        <div className="pr-2 py-1"><LuBellDot /></div>
        <div className="pr-2 py-1"><GoSun /></div>
        <div className="pr-2 py-1"><MdOutlineKeyboardDoubleArrowRight /></div>
      </div>
      <div className="bg-gray-100 px-2 py-1 rounded-md cursor-pointer" onClick={onLogout}>Logout</div>
    </div>
  );
}
