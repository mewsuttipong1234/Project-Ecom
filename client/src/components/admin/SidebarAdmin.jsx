import { NavLink } from "react-router-dom"
import { LayoutDashboard } from 'lucide-react';
import { SquareChartGantt } from 'lucide-react';
import { ChartBarStacked } from 'lucide-react';
import { PackageSearch } from 'lucide-react';
import { LogOut } from 'lucide-react';



const SidebarAdmin = () => {
  return (
    <div className="bg-gray-600 w-64 text-gray-100 flex flex-col h-screen">
        <div className="h-24 bg-gray-700 flex items-center justify-center font-bold text-2xl">
            Admin Panel
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
            <NavLink to={'/admin'}
            end
            className={({isActive})=>
            isActive
            ?'bg-gray-500 rounded-md text-white px-4 py-2 flex items-center'
            :'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
            }>
            <LayoutDashboard className="mr-2" />
                DashBoard
            </NavLink>


            <NavLink to={'manage'}
            className={({isActive})=>
            isActive
            ?'bg-gray-500 rounded-md text-white px-4 py-2 flex items-center'
            :'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
            }>
            <SquareChartGantt  className="mr-2" />
                Manage
            </NavLink>


            <NavLink to={'category'}
            className={({isActive})=>
            isActive
            ?'bg-gray-500 rounded-md text-white px-4 py-2 flex items-center'
            :'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
            }>
            <ChartBarStacked  className="mr-2" />
                Category
            </NavLink>


            <NavLink to={'product'}
            className={({isActive})=>
            isActive
            ?'bg-gray-500 rounded-md text-white px-4 py-2 flex items-center'
            :'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
            }>
            <PackageSearch  className="mr-2" />
                Product
            </NavLink>
     
        </nav>

        <div>
        <NavLink to={'logout'}
            className={({isActive})=>
            isActive
            ?'bg-gray-500 rounded-md text-white px-4 py-2 flex items-center'
            :'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
            }>
            <LogOut   className="mr-2" />
                Logout
            </NavLink>
        </div>
    </div>
  )
}
export default SidebarAdmin