import { Line } from "react-chartjs-2";
import LineGraph from "../../components/Graphs/LineGraph";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const UserAnalysis=()=>{
    let {authTokens,serverUrl} = useContext(AuthContext)
    let [chartLabel,setChartLabel]=useState([])
    let [chartData,setChartData]=useState([])
    
    
    

    const today = new Date()
    const currentDate = today.toISOString().slice(0,7)
    let [selectedDate,setSelectedDate]=useState(currentDate)
    let [selectedYear,setSelectedYear]=useState(currentDate)
    const dateString = (today.getMonth()+1)+"/"+today.getFullYear()
    let [showDate,setShowDate]=useState(dateString)

    const handleDateChange=(e)=>{
        setSelectedDate(e.target.value)
    }

    const handleYearChange=(e)=>{
        setSelectedYear(e.target.value)
    }


    const handleMonthSubmit=async()=>{
        const selectedMonth = new Date(selectedDate).getMonth() + 1;
        const selectedYear = new Date(selectedDate).getFullYear();
        setShowDate(selectedMonth+"/"+selectedYear)
        axios.get(serverUrl+'/products/uniqueUsersDay/', {
          params: {
            requestedMonth: selectedMonth,
            requestedYear: selectedYear
          },
          headers:{
            'Authorization': 'JWT '+authTokens.access,
          }
        },).then((response)=>{
            console.log(response)
            let chartLabelCollec=[]
            let chartDataCollec=[]
            response.data.unique_users_per_day.forEach(element=>{
                console.log(element.day,'+',element.unique_users)
                chartLabelCollec.push(element.day)
                chartDataCollec.push(element.unique_users)
            })
            setChartLabel(chartLabelCollec)
            setChartData(chartDataCollec)
        }).catch(error=>{
            console.log(error)
        })

    }

    const handleYearSubmit=async()=>{
        
        const sendYear = new Date(selectedYear).getFullYear();
        setShowDate(sendYear)
        axios.get(serverUrl+"/products/uniqueUsersMonth/",{
            params:{
                requestedYear:sendYear
            },
            headers:{
                'Authorization': 'JWT '+authTokens.access,
            }
        }).then((response)=>{
            console.log(response)
            let chartLabelCollec=[]
            let chartDataCollec=[]
            response.data.unique_users.forEach(element=>{
                console.log(element.month+','+element.unique_users)
                chartDataCollec.push(element.unique_users)
                if (element.month) {
                    switch (element.month) {
                        case 1:
                            chartLabelCollec.push('January');
                            break;
                        case 2:
                            chartLabelCollec.push('February');
                            break;
                        case 3:
                            chartLabelCollec.push('March');
                            break;
                        case 4:
                            chartLabelCollec.push('April');
                            break;
                        case 5:
                            chartLabelCollec.push('May');
                            break;
                        case 6:
                            chartLabelCollec.push('June');
                            break;
                        case 7:
                            chartLabelCollec.push('July');
                            break;
                        case 8:
                            chartLabelCollec.push('August');
                            break;
                        case 9:
                            chartLabelCollec.push('September');
                            break;
                        case 10:
                            chartLabelCollec.push('October');
                            break;
                        case 11:
                            chartLabelCollec.push('November');
                            break;
                        case 12:
                            chartLabelCollec.push('December');
                            break;
                        default:
                            console.log('Invalid month');
                    }
                }
            })
            setChartLabel(chartLabelCollec)
            setChartData(chartDataCollec)
        }).catch(error=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        handleMonthSubmit()
    },[])

    const data={
        labels:chartLabel,
        datasets:[
            {
                label:'369',
                data:chartData,
                backgroundColor:'aqua',
                borderWidth:1,
                borderColor:'black'
            }
        ]
    }
    const options ={
        maintainAspectRatio: false, // Set to false to allow manual control over the aspect ratio
        aspectRatio: 1,
        scales:{
            x:{
                display:true,
                title:{
                    display:true,
                    text:'Months/Days',
                    font:{
                        size:16
                    }
                },
                ticks: {
                    color: 'black', // Change the label color
                    font: {
                      size: 14, // Set the label font size
                    },
                  },
            },
            y:{
                display:true,
                title:{
                    display:true,
                    text:'Number of unique',
                    font:{
                        size:16
                    }
                },
            }
        }

    }

    return(
        <>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-evenly"}}>
            <div style={{width:"80%",height:"450px"}}>
                <LineGraph data={data} options={options}/>
            </div>
            <h2>Unique User Visit Based on {showDate}</h2>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
                <div style={{margin:"18px"}}>
                    <center>
                    <input type="month" value={selectedDate} onChange={handleDateChange}/>
                    <button onClick={handleMonthSubmit}>Get Month Data</button>
                    </center>
                </div>
                
                <div style={{margin:"18px"}}>
                    <center>
                    <input type="month" value={selectedYear} onChange={handleYearChange}/>
                    <button onClick={handleYearSubmit}>Get Year Data</button>
                    </center>
                </div>
            </div>
        </div>
        </>
    )
}

export default UserAnalysis;