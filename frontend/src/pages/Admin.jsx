import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/images/bg.jpg";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const data2 = [
  { name: "Users", value: 800 },
  { name: "Hotels", value: 300 },
  { name: "Vehicles", value: 300 },
  { name: "Tours", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};



const Admin = () => {
  const { user } = useContext(AuthContext);
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuthenticated");
    if (isAuth === "true") {
      setAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = () => {
    const correctPassword = "tehreem123"; 
    if (passwordInput === correctPassword) {
      localStorage.setItem("adminAuthenticated", "true");
      setAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    setAuthenticated(false);
    setPasswordInput("");
  };

  if (!authenticated) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-2xl mb-4 font-semibold">Enter Admin Password</h2>
        <input
          type="password"
          className="p-2 border rounded w-64 mb-2"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button
          onClick={handlePasswordSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="md:px-20 md:pt-20 md:pb-48 p-5 pb-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[#41A4FF] text-3xl font-bold">Tripify Admin</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <h1 className="text-[#41A4FF] text-3xl font-bold">Tehreem</h1>

        {/* Links Section */}
        <div className="flex flex-row col-span-3 lg:px-32 px-8 pt-8 justify-between items-stretch gap-10">
          <Link
            to="/users"
            className="p-10 flex-1 hover:bg-[#41A4FF] hover:text-2xl transition duration-300 ease-in-out hover:text-white rounded-lg font-bold shadow"
          >
            User Management
          </Link>
          <Link
            to="/tours"
            className="p-10 flex-1 hover:bg-[#41A4FF] hover:text-2xl transition duration-300 ease-in-out hover:text-white rounded-lg font-bold shadow"
          >
            Tour Packages
          </Link>
        </div>

        <div className="flex flex-row col-span-3 lg:px-32 px-8 pt-8 justify-between items-stretch gap-10">
          <Link
            to="/vehicle"
            className="p-10 flex-1 hover:bg-[#41A4FF] hover:text-2xl transition duration-300 ease-in-out hover:text-white rounded-lg font-bold shadow"
          >
            Vehicle Management
          </Link>
          <Link
            to="/train"
            className="p-10 flex-1 hover:bg-[#41A4FF] hover:text-2xl transition duration-300 ease-in-out hover:text-white rounded-lg font-bold shadow"
          >
            Train Management
          </Link>
        </div>

        <div className="flex flex-row col-span-3 lg:px-32 px-8 pt-8 justify-between items-stretch gap-10">
          <Link
            to=""
            className="p-10 flex-1 hover:bg-[#41A4FF] hover:text-2xl transition duration-300 ease-in-out hover:text-white rounded-lg font-bold shadow"
          >
            Other
          </Link>
        </div>

        {/* Charts Section */}
        <div className="flex flex-row col-span-2 lg:px-32 px-8 pt-8 justify-between items-stretch gap-10">
          <div className="p-10 flex-1 rounded-lg font-bold shadow bg-white">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="p-10 flex-1 rounded-lg font-bold shadow bg-white">
            <PieChart width={400} height={400}>
              <Pie
                data={data2}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data2.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <div className="grid grid-cols-4">
              {data2.map((item, index) => (
                <p key={index} className="cursor-pointer font-bold">
                  {item.name}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-4">
              {COLORS.map((item, index) => (
                <div
                  key={index}
                  className="h-[30px] w-[30px]"
                  style={{ backgroundColor: item }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
