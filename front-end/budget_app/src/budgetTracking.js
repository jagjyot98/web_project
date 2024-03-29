
import CanvasJSReact from './canvasjs.react';
import React,{useState,useEffect} from 'react';
import PersonalFinance from './local-json/personal_finance.json';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function BudgetTracking(){

    var totalIncomeAmount = 2000; //Fetch default value (i.e. 20% of total income)
    
    var totalExpenseAmount = 1000; //Fetch default value for expenses

    var remainingAmount = totalIncomeAmount - totalExpenseAmount;

    const [totalExpense, setTotalExpense] = useState(totalExpenseAmount);

    const [totalIncome, setTotalIncome] = useState(totalIncomeAmount);


    var fixedIncomeSecurityInitialValue = remainingAmount * 0.70;
    var cashAndEquivalentsInitialValue = remainingAmount * 0.15;
    var equitiesInitialValue = remainingAmount * 0.15;

    const [fixedIncomeSecurityValue, setfixedIncomeSecurityValue] = useState(fixedIncomeSecurityInitialValue);
    const [cashAndEquivalentsValue, setcashAndEquivalentsInitialValue] = useState(cashAndEquivalentsInitialValue);
    const [equitiesValue, setEquitiesValue] = useState(equitiesInitialValue);

    
    const budgeting = {
        theme: "dark2",
        animationEnabled: true,
        exportFileName: "Investment ideas",
        exportEnabled: true,
        
        legend:{
            cursor: "pointer",
            itemclick: explodePie
        },
        title:{
            text: "What is the 50/30/20 rule?",
        },
        subtitles: [{
            text: "The 50/30/20 rule is a budgeting technique that divides your take-home income into three categories by percentages. It's a simple way to track your spending. Here’s the breakdown:",
            fontSize: 16
        }],
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>${y}</strong>",
            indexLabel: "{y}%",
            indexLabelPlacement: "inside",
            dataPoints: [
                { y: 50, label: "Needs",  },
                { y: 30, label: "Wants" },
                { y: 20, label: "Savings or Debt" },
            ]
        }]
    }
    function explodePie (e) {
        if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
        } else {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
        }
        e.chart.render();
    
    }
    const options = {
        theme: "dark2",
        animationEnabled: true,
        exportFileName: "Investment ideas",
        exportEnabled: true,
        title:{
            text: "Ideal Investment ideas"
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>${y}</strong>",
            indexLabel: "${y}",
            indexLabelPlacement: "inside",
            dataPoints: [
                { y: fixedIncomeSecurityValue, label: "Fixed Income Securities" },
                { y: cashAndEquivalentsValue, label: "Cash and Equivalents" },
                { y: equitiesValue, label: "Equities" },
            ]
        }]
    }
    
  
    const [portfolioType, setPortfolioType] = useState("Conservative Portfolio");

    const handleChange = (event) => {
        if(event.target.value == "cp"){
            setfixedIncomeSecurityValue(remainingAmount * 0.70)
            setcashAndEquivalentsInitialValue(remainingAmount * 0.15)
            setEquitiesValue(remainingAmount * 0.15)
        }else if(event.target.value == "mcp"){
            setfixedIncomeSecurityValue(remainingAmount * 0.60)
            setcashAndEquivalentsInitialValue(remainingAmount * 0.05)
            setEquitiesValue(remainingAmount * 0.35)
        }else if(event.target.value == "ap"){
            setfixedIncomeSecurityValue(remainingAmount * 0.30)
            setcashAndEquivalentsInitialValue(remainingAmount * 0.10)
            setEquitiesValue(remainingAmount * 0.60)
        }else if(event.target.value == "map"){
            setfixedIncomeSecurityValue(remainingAmount * 0.40)
            setcashAndEquivalentsInitialValue(remainingAmount * 0.10)
            setEquitiesValue(remainingAmount * 0.5)
        }else if(event.target.value == "vap"){
            setfixedIncomeSecurityValue(remainingAmount * 0.10)
            setcashAndEquivalentsInitialValue(remainingAmount * 0.10)
            setEquitiesValue(remainingAmount * 0.80)
        }
        setPortfolioType(event.target.value)
    }
    return (
        <div>
            <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand m-2" href="#">Budget App</a>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <a className="nav-link" href="./Dashboard">Dashboard</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link active' href="">Budget Tracking</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href="incomesNexpenses">Add income/expense</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href="./splitwise">Splitwise</a>
            </li>
            {/* <li className='nav-item'>
              <span className="nav-link">Welcome &lt;Username&gt;</span>
            </li> */}
          </ul>
        </nav>
      </header>
            <div>
            <h1>Investment, Budget Tracking & Personal Finance</h1>
             
            <div class="container">
            
            <div class="row">
                <div class="col-sm">
                <h3>Total Income - <input type="text" class="form-control" value={totalIncome} onChange={(e) => setTotalIncome(e.target.value)}/></h3>
             </div>
                <div class="col-sm">
                <h3>Total Expense - <input type="text" class="form-control" value={totalExpense} onChange={(e) => setTotalExpense(e.target.value)}/></h3>
             </div>
            </div>
            
            </div>
            <div class="card p-2">
                <h3>Budget Tracking</h3>
                    
                    
                    <div class="container">
                       
                        <div class="card-header">
                            <div class="card-body">
                            <CanvasJSChart options = {budgeting}/>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div class="container">
                        <a href="https://www.regions.com/insights/calculatorlibrary?Segment=personal">Click here for Personal Calculator</a>
                    </div> 
            </div><br></br>
             
             
                 <div class="card p-2">
                    <h3>Investment</h3>
                    <div class="container">
  <div class="row">
    <div class="col-sm">
    <h5>Savings Amount - <input type="text" class="form-control" value={remainingAmount} disabled onChange={(e) => setTotalExpense(e.target.value)}/></h5>  
                 { <h5>Select Investment Ideology - </h5> }
                 <select value={portfolioType} onChange={handleChange} class="form-select form-select-lg mb-3">
                     <option value="cp">Conservative Portfolio</option>
                     <option value="mcp">Moderately Conservative Portfolio</option>
                     <option value="ap">Aggressive Portfolio</option>
                     <option value="map">Moderately Aggressive Portfolio</option>
                     <option value="vap">Very Aggressive Portfolio</option>
                 </select>
    </div>
    <div class="col-sm">
             
    <div class="card-body">
  <CanvasJSChart options = {options}/>
  </div>
    </div>
    </div>
</div>
                 
       
</div>
               
            </div>
            <div class="container-fluid">
            
            <h1>Personal Finance</h1>
            {PersonalFinance.PersonalFinance.map((item, i) => (
            <td key={i}>
            <div class="container">
                
                <div class="card bg-light mb-3">
                <div class="card-header"><b>{item.header}</b></div>
                <div class="card-body">
                    <p class="card-text">{item.Content}</p>
                </div>
                </div>
                </div>
            </td>
            ))}
            </div>
            
          </div>
        );
  }
  
  
  export default BudgetTracking;