import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import "./index.css";




  const App = () => {
    const [store, setStore] = useState([
    ]);
    const [data, setData] =  useState([""]);
    const getResult = async () => {
      try{
        const response  =  await fetch("https://dummyjson.com/products?limit=50");
        const data = await response.json();
        setStore(data.products);
      }catch(error){
        console.log("Failed to fetch data", error);
      }
    }
useEffect(()=>{
  getResult();
})
  const getData=(e)=>{
  console.log(e.target.value);
  setData(e.target.value.toLowerCase()); 
  
  }

  const filter = store.filter((val)=>{
    return val.title.toLowerCase().includes(data) || val.category.toLowerCase().includes(data)
  })

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#4A90E2", marginBottom: "20px" }}>
        📱 Product Store
      </h1>
      <input
        type="text"
        placeholder="Search here..."
        onChange={getData}
        style={{
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          padding: "10px",
          width: "80%",
          margin: "0 auto 20px",
          display: "block",
          borderRadius: "8px",
          border: "1px solid #ddd",
          color: "#555",
        }}
      />

      <table
        style={{
          width: "80%",
          margin: "0 auto",
          borderCollapse: "collapse",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ background: "#4A90E2", color: "#fff" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Product Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Brand</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {
            filter.length > 0 ? (
              filter.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    background: index % 2 === 0 ? "#f9f9f9" : "#fff",
                    transition: "background 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#e3f2fd")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = index % 2 === 0 ? "#f9f9f9" : "#fff")
                  }
                >
                  <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                    {item.title}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                    {item.category}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                    ${item.price}
                  </td>
                </tr>
              ))
            ):(
              <tr>
                <td colSpan="3" style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>No data found</td>
              </tr>
            )
          }
          
          
        </tbody>
      </table>
    </>
  );
};

export default App;
