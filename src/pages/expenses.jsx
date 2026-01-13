import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card"; 
import Icon from "../components/Elements/Icon"; 
import CircularProgress from '@mui/material/CircularProgress';

const ExpensesPage = () => {
  // Pastikan inisialisasi state adalah array kosong []
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      // Pastikan key di localStorage sesuai (biasanya "token")
      const token = localStorage.getItem("token"); 
      try {
        const response = await axios.get("https://jwt-auth-eight-neon.vercel.app/expenses", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Tambahkan validasi agar jika data kosong, tetap di-set sebagai array
        setExpenses(response.data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setExpenses([]); // Set array kosong jika error agar tidak crash
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  return (
    <MainLayout type="expenses">
      <Card
        title="Expenses Comparison"
        desc={
          loading ? (
            <div className="flex flex-col justify-center items-center h-full text-primary">
				<CircularProgress color="inherit" size={50} enableTrackSlot />
				Loading Data
			</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Gunakan Optional Chaining (?.) untuk keamanan tambahan */}
              {expenses?.map((item) => (
                <div key={item.id} className="border border-gray-05 p-5 rounded-xl flex flex-col justify-between h-full shadow-sm">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-05 p-3 rounded-lg flex items-center justify-center">
                          {item.category === "Housing" ? <Icon.Housing /> : 
                           item.category === "Food" ? <Icon.Food /> : 
                           item.category === "Transportation" ? <Icon.Transportation /> : 
                           item.category === "Entertainment" ? <Icon.Entertainment /> : 
                           item.category === "Shopping" ? <Icon.Shopping /> : <Icon.Others />}
                        </div>
                        <div>
                          <span className="text-gray-02 block text-xs font-semibold uppercase">{item.category}</span>
                          <span className="font-bold text-2xl text-slate-900">
                            ${item.amount?.toLocaleString() || "0"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-full">
                        <span className="text-xs font-bold text-gray-01">{item.percentage}%</span>
                        {item.status === "up" ? (
                          <Icon.ArrowUpUp color="#EB5757" size={14} />
                        ) : (
                          <Icon.ArrowDownDown color="#27AE60" size={14} />
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-dashed border-gray-05 flex justify-between items-center">
                      <p className="text-[10px] text-gray-03 font-medium">Compare to the last month</p>
                      <Icon.ArrowRight size={18} className="text-gray-02" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      />
    </MainLayout>
  );
};

export default ExpensesPage;