import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [stuffs, setStuffs] = useState([]);
  const [users, setUsers] = useState([]);
  const [inbounds, setInbounds] = useState([]);
  const [lendings, setLendings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDataStuff();
    getDataUser();
    getDataInbound();
    getDataLending();
  }, []);

  function getDataStuff() {
    axios
      .get("http://localhost:8000/stuff", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setStuffs(res.data.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login?message=" + encodeURIComponent("Anda belum login"));
        }
      });
  }

  function getDataUser() {
    axios
      .get("http://localhost:8000/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login?message=" + encodeURIComponent("Anda belum login"));
        }
      });
  }

  function getDataInbound() {
    axios
      .get("http://localhost:8000/inbound", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setInbounds(res.data.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login?message=" + encodeURIComponent("Anda belum login"));
        }
      });
  }

  function getDataLending() {
    axios
      .get("http://localhost:8000/lending", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setLendings(res.data.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login?message=" + encodeURIComponent("Anda belum login"));
        }
      });
  }

  const data = {
    labels: ["Total Stuff", "Total User", "Total Inbound", "Total Lending"],
    datasets: [
      {
        label: "Jumlah",
        data: [stuffs.length, users.length, inbounds.length, lendings.length],
        backgroundColor: [
          "rgba(85,26,139, 0.2)",
          "rgba(30,144,255, 0.2)",
          "rgba(50,205,50, 0.2)",
          "rgba(255,165,0, 0.2)",
        ],
        borderColor: [
          "rgba(85,26,139, 1)",
          "rgba(30,144,255, 1)",
          "rgba(50,205,50, 1)",
          "rgba(255,165,0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Case>
      <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center py-12">
        <div className="container mx-auto p-4">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="p-4 w-full md:w-1/2 lg:w-1/3">
              <div className="flex rounded-lg h-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 dark:bg-gray-800 p-8 flex-col shadow-lg transition-transform transform hover:scale-105">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 className="text-white dark:text-white text-lg font-medium">
                    Data Stuff
                  </h2>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <h1 className="text-white dark:text-white text-4xl font-bold">
                    {stuffs.length}
                  </h1>
                </div>
              </div>
            </div>

            <div className="p-4 w-full md:w-1/2 lg:w-1/3">
              <div className="flex rounded-lg h-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-200 dark:bg-gray-800 p-8 flex-col shadow-lg transition-transform transform hover:scale-105">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 className="text-white dark:text-white text-lg font-medium">
                    Data User
                  </h2>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <h1 className="text-white dark:text-white text-4xl font-bold">
                    {users.length}
                  </h1>
                </div>
              </div>
            </div>

            <div className="p-4 w-full md:w-1/2 lg:w-1/3">
              <div className="flex rounded-lg h-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 dark:bg-gray-800 p-8 flex-col shadow-lg transition-transform transform hover:scale-105">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 className="text-white dark:text-white text-lg font-medium">
                    Data Inbound
                  </h2>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <h1 className="text-white dark:text-white text-4xl font-bold">
                    {inbounds.length}
                  </h1>
                </div>
              </div>
            </div>

            <div className="p-4 w-full md:w-1/2 lg:w-1/3">
              <div className="flex rounded-lg h-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-200 dark:bg-gray-800 p-8 flex-col shadow-lg transition-transform transform hover:scale-105">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 className="text-white dark:text-white text-lg font-medium">
                    Data Lending
                  </h2>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <h1 className="text-white dark:text-white text-4xl font-bold">
                    {lendings.length}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 w-full md:w-2/3 lg:w-1/2 mx-auto">
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </Case>
  );
}
