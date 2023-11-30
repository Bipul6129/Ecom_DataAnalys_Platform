import { Bar } from "react-chartjs-2";
import BarGraph from "../../components/Graphs/BarGraph";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const PopularProducts=()=>{

    let {authTokens,serverUrl} = useContext(AuthContext)
    let [chartLabel,setChartLabel]=useState([])
    let [chartData,setChartData]=useState([])
    let [selectedDate,setSelectedDate]=useState('')
    let [monthData,setmonthData]=useState('')

    const config = {
        headers: {
          'Authorization': 'JWT '+authTokens.access,
          'Content-Type': 'application/json',
        },
    };

    let checkMonth=(monthNumber)=>{
        switch (monthNumber) {
            case 1:
                setmonthData('January');
                break;
            case 2:
                setmonthData('February');
                break;
            case 3:
                setmonthData('March');
                break;
            case 4:
                setmonthData('April');
                break;
            case 5:
                setmonthData('May');
                break;
            case 6:
                setmonthData('June');
                break;
            case 7:
                setmonthData('July');
                break;
            case 8:
                setmonthData('August');
                break;
            case 9:
                setmonthData('September');
                break;
            case 10:
                setmonthData('October');
                break;
            case 11:
                setmonthData('November');
                break;
            case 12:
                setmonthData('December');
                break;
            default:
                console.log('Invalid month');
        }
    }

    let fetchPopular = async()=>{
        let thisMonth = new Date().getMonth()+1
        checkMonth(thisMonth)
        try{
            let response = await axios.get(serverUrl+"/products/popularProduct/",config)
            console.log(response.data)
            let productData = response.data.popular_products
   
            productData.forEach(element => {
                console.log(`Product Name: ${element.product__product_name}, Quantity: ${element.total_quantity}`);
 
            });
            
            console.log(monthData)
            
            return response.data.popular_products
            
        }catch(error){
            console.log(error.response.data)

        }

    }

    const handleDateChange=(e)=>{
        setSelectedDate(e.target.value)
    }

    const handleSubmit = () => {
        const selectedMonth = new Date(selectedDate).getMonth() + 1;
        const selectedYear = new Date(selectedDate).getFullYear();
    

        axios.get(serverUrl+'/products/popularProduct/', {
          params: {
            providedMonth: selectedMonth,
            providedYear: selectedYear
          },
          headers:{
            'Authorization': 'JWT '+authTokens.access,
          }
        },)
          .then(response => {
            console.log(response.data);
            let labelCollec=[]
            let chartDataCollec=[]
            response.data.popular_products.forEach(element=>{
                console.log(element.product__product_name)
                labelCollec.push(element.product__product_name)
                chartDataCollec.push(element.total_quantity)
            })
            setChartLabel(labelCollec)
            setChartData(chartDataCollec)
            console.log(labelCollec.length)
            checkMonth(selectedMonth)
            if(labelCollec.length==0){
                Swal.fire("Not Found ","No Items were found<br>this month","info")
            }

          })
          .catch(error => {
            console.error(error);
          });
      };

   

    useEffect(()=>{
        fetchPopular().then((response)=>{
            console.log(response)
            let labelCollec=[]
            let chartDataCollec=[]
            response.forEach(element=>{
                console.log(element.product__product_name)
                labelCollec.push(element.product__product_name)
                chartDataCollec.push(element.total_quantity)
            })
            setChartLabel(labelCollec)
            setChartData(chartDataCollec)
            

        }).catch((error)=>{
            console.log(error)
        })
        
    },[])

    const data={
        labels:chartLabel,
        datasets:[
            {
                label:'Popular Products',
                data:chartData,
                backgroundColor:'aqua',
                borderWidth:1,
                borderColor:'black',
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
                    text:'Product Name',
                    font:{
                        size:16
                    }
                },
                ticks: {
                    color: 'black', // Change the label color
                    font: {
                      size: 26, // Set the label font size
                    },
                  },
            },
            y:{
                display:true,
                title:{
                    display:true,
                    text:'Number of times appeared',
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
                <div style={{width:"80%",height:"450px",marginBottom:"60px"}}>
                    <BarGraph data={data} options={options} />
                </div>
                <h2>Popular Items of a {monthData}</h2>
                <div>
                <input style={{width:"180px",margin:"24px"}} name="selectedDate" type="month" value={selectedDate} onChange={handleDateChange}/>
                <button type="button" onClick={handleSubmit}>Get results</button>
                </div>
                

            </div>
            

            
        </>
    )
}

export default PopularProducts;