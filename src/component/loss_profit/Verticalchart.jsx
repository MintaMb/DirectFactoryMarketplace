import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Vertical Bar Chart",
    // },
  },
};

const Verticalchart = () => {
  const {
    formState: { errors },
  } = useForm({ mode: "all" });
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState({
    labels: ["Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Net Profit",
        data: [],
        borderColor: "rgb(20 81 80)",
        backgroundColor: "rgb(20 81 80)",
      },
      {
        label: "Revenue",
        data: [],
        borderColor: "rgb(26 188 156)",
        backgroundColor: "rgb(26 188 156)",
      },
      {
        label: "Free Cash Flow",
        data: [],
        borderColor: "rgb(206 212 220)",
        backgroundColor: "rgb(206 212 220)",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async (data) => {
      let userData = JSON.parse(localStorage.getItem("userData"));
      const url = `${process.env.REACT_APP_BASE_URL}/api/client_loss_profit_graph_data`;
      try {
        console.log("data:", data);
        // const { currentMonth } = data;
        const formattedData = {
          factory_id: userData?.factory_id,
          client_id: userData?.company_id,
          month: currentMonth.toString(),
        };
        console.log("formattedData:", formattedData);
        const token = localStorage.getItem("Token");
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: JSON.stringify(formattedData),
        });
        if (response?.status === 200) {
          const responseData = await response.json();

          const weeks = responseData.data.map((item) =>
            item.week ? item.week : [100]
          );
          const totalSales = responseData.data.map((item) => item.total_sales);
          const totalExpenses = responseData.data.map(
            (item) => item.total_expenses
          );
          const freeCashFlow = responseData.data.map(
            (item) => item.free_cash_flow
          ); // Adjust the property name

          setData({
            labels: weeks,
            datasets: [
              {
                label: "Total Sales",
                data: totalSales,
                borderColor: "rgb(20 81 80)",
                backgroundColor: "rgb(20 81 80)",
              },
              {
                label: "Total Expenses",
                data: totalExpenses,
                borderColor: "rgb(26 188 156)",
                backgroundColor: "rgb(26 188 156)",
              },
              {
                label: "Free Cash Flow", // Add the label for Free Cash Flow
                data: freeCashFlow, // Use the extracted freeCashFlow array
                borderColor: "rgb(206 212 220)",
                backgroundColor: "rgb(206 212 220)",
              },
            ],
          });
        } else {
          const responseData = await response.json();
          toast.error(responseData?.message || "An error occurred", {
            autoClose: 5000,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentMonth]);

  return (
    <>
      <div className='bar-header mb-4 d-flex justify-content-between'>
        <h4 className='page-title'>Weeekly Sales Report</h4>
        <select
          className='form-select w-auto'
          value={currentMonth}
          onChange={(e) => setCurrentMonth(e.target.value)}>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>
      <div style={{ width: "100%", height: "50%" }}>
        <Bar data={data} options={options} />
      </div>
    </>
  );
};
export default Verticalchart;
