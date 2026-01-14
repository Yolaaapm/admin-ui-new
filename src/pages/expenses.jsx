import React, { useEffect, useState } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import Icon from "../components/Elements/Icon";
import { getExpenses } from "../services/authService";
import CircularProgress from '@mui/material/CircularProgress';

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]); 
  const [loading, setLoading] = useState(true);

  const mockExpenses = [
    {
      id: 1,
      category: "Housing",
      amount: "250",
      percentage: "15",
      arrowType: "up",
      iconType: "House", 
      details: [
        { name: "House Rent", date: "17 May 2023", amount: "230" },
        { name: "Parking", date: "17 May 2023", amount: "20" }
      ]
    },
    {
      id: 2,
      category: "Food",
      amount: "350",
      percentage: "8",
      arrowType: "down",
      iconType: "Food", 
      details: [
        { name: "Grocery", date: "17 May 2023", amount: "230" },
        { name: "Restaurant Bill", date: "17 May 2023", amount: "120" }
      ]
    },
    {
      id: 3,
      category: "Transportation",
      amount: "50",
      percentage: "12",
      arrowType: "down",
      iconType: "Transport", 
      details: [
        { name: "Taxi Fare", date: "17 May 2023", amount: "30" },
        { name: "Metro Card Bill", date: "17 May 2023", amount: "20" }
      ]
    },
    {
      id: 4,
      category: "Entertainment",
      amount: "80",
      percentage: "15",
      arrowType: "down",
      iconType: "Movie", 
      details: [
        { name: "Movie Ticket", date: "17 May 2023", amount: "30" },
        { name: "iTunes", date: "17 May 2023", amount: "50" }
      ]
    },
    {
      id: 5,
      category: "Shopping",
      amount: "420",
      percentage: "25",
      arrowType: "up",
      iconType: "Shopping", 
      details: [
        { name: "Shirt", date: "17 May 2023", amount: "230" },
        { name: "Jeans", date: "17 May 2023", amount: "190" }
      ]
    },
    {
      id: 6,
      category: "Others",
      amount: "50",
      percentage: "23",
      arrowType: "up",
      iconType: "Other", 
      details: [
        { name: "Donation", date: "17 May 2023", amount: "30" },
        { name: "Gift", date: "17 May 2023", amount: "20" }
      ]
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getExpenses();
        setExpenses(response && response.data?.length > 0 ? response.data : mockExpenses); 
      } catch (error) {
        setExpenses(mockExpenses); 
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); 

  const renderIcon = (type) => {
    const IconComponent = Icon[type] || Icon.Others; 
    return <IconComponent color="#666666" size={18} />;
  };

  return (
    <MainLayout type="expenses">
      <div className="p-6 ">
        <h1 className="text-[22px] text-gray-02 mb-8 tracking-tight">
          Expenses Comparison
        </h1>
        
        {loading ? (
          <div className="flex flex-col justify-center items-center h-[60vh] text-primary">
            <CircularProgress color="inherit" size={50} enableTrackSlot />
            Loading Data
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expenses.map((item) => (
              <Card
                key={item.id}
                title={item.category}
                desc={
                  <div className="h-full flex flex-col">
                    <div className="bg-[#F4F4F4] -mx-6 -mt-5 p-5 flex justify-between items-start mb-6 border-b border-gray-200">
                      <div className="flex items-center">
                        {/* Kembalikan warna ke abu-abu terang (bg-gray-100) sesuai gambar awal */}
                        <div className="bg-gray-200 px-3 py-3 rounded-lg flex items-center justify-center">
                          {renderIcon(item.iconType)}
                        </div>
                        <div className="ms-4">
                          <span className="text-gray-02 text-[11px] font-medium">{item.category}</span>
                          <br />
                          {/* Nominal menggunakan hitam pekat agar lebih jelas */}
                          <span className="font-bold text-lg leading-tight text-black">${item.amount}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end font-bold text-sm text-gray-02">
                          {item.percentage}% 
                          <span className="ms-1">
                            {item.arrowType === "up" ? 
                              (Icon.ArrowUpUp ? <Icon.ArrowUpUp color="#EB5757" size={14} /> : <span style={{color:"#EB5757"}}>↑</span>) : 
                              (Icon.ArrowDownDown ? <Icon.ArrowDownDown color="#27AE60" size={14} /> : <span style={{color:"#27AE60"}}>↓</span>)
                            }
                          </span>
                        </div>
                        <p className="text-gray-03 text-[10px]">Compare to the last month</p>
                      </div>
                    </div>

                    <div className="space-y-4 px-1">
                      {item.details?.map((detail, index) => (
                        <div key={index} className="flex flex-col">
                          <div className="flex justify-between items-center">
                            {/* Nama Transaksi: Font Abu-abu Tua */}
                            <p className="font-semibold text-[13px] text-[#666666]">
                              {detail.name}
                            </p>
                            {/* Nominal Detail: Font Abu-abu Tua */}
                            <p className="font-bold text-[13px] text-[#666666]">
                              ${detail.amount}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            {/* Tanggal di bawah garis sebelah kanan */}
                            <p className="text-gray-02 text-[11px]">{detail.date}</p>
                          </div>

                          {/* LOGIKA: Hanya tampilkan garis jika ini BUKAN item terakhir */}
                          {index !== item.details.length - 1 && (
                            <div className="border-b-3 border-gray-100 my-2"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                }
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default ExpensesPage;