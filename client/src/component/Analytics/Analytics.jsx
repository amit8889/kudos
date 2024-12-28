import { useEffect ,useCallback,useState} from "react";
 import useApiCall from "../../networks/api.js";
import Loading from "../Loading/Loading"
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
const Analytics = ({ userData }) => {
   const { loading,error, data,makeApiCall } = useApiCall();
   //chart 
   const[chatData,setChartData] = useState({
    labels: [],
    datasets: [
        {
          label: "Kudo given",
          data: [],
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          borderWidth: 1,
        },
      ]
    })
   const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  const getAnalysis = useCallback(async () => {
    // eslint-disable-next-line react/prop-types
  const customHeaders = { 'userid': userData._id };
  const URL = "/api/users/getDashBoardDetails";
  await makeApiCall(URL, 'GET', null, customHeaders);
// eslint-disable-next-line react/prop-types
},[userData?._id,makeApiCall])

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (!userData?._id) return; // Return early if userData or _id is not presen
    getAnalysis();
    // eslint-disable-next-line react/prop-types, react-hooks/exhaustive-deps
  }, [userData?._id]); // Added makeApiCall as a dependency for the useEffect
 useEffect(()=>{
    
     console.log(data)
    if(data?.kudosAllocationCount && Array.isArray(data?.kudosAllocationCount) && data.kudosAllocationCount.length>0){
        console.log(data)
        const lables = [];
        const dataSets = [];
        for(let value of data.kudosAllocationCount){
            lables.push(value.label);
            dataSets.push(value.totalKudosCount);
        }
        const chartData = {
            labels: lables,
            datasets: [
                {
                  label: "Kudo given",
                  data: dataSets,
                  backgroundColor: "rgba(59, 130, 246, 0.8)",
                  borderWidth: .4,
                },
              ]
            }
        //set chart data
        setChartData(chartData);
    }

 },[data])

  return (
    <>{loading?<Loading/>:
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <Bar data={chatData} options={options} />
        </div>

        {/* Leaderboard */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Kudo Leaderboard</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Number of Kudos received</th>
              </tr>
            </thead>
            <tbody>
              {data?.kudosLeaderboard && Array.isArray(data.kudosLeaderboard)&& data.kudosLeaderboard.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{row.userName}</td>
                  <td className="py-2 px-4">{row.kudosCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Most Liked Post */}
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        {data?.mostLikedKudos &&
        <p className="text-center">
          <strong>Most liked post:</strong> {`${data.mostLikedKudos?.sender?.name ?? "N/A"} gave ${data.mostLikedKudos?.label ?? "N/A"} Badge to
          ${data.mostLikedKudos?.receiver?.name ?? "N/A"} — “${data.mostLikedKudos?.reason ?? "N/A"}”`}
        </p>
        }
      </div>
      {error && <span>{error}</span>}
    </div>}
    </>
  );
};

export default Analytics;
