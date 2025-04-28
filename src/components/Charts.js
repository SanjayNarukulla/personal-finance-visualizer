import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA336A",
  "#FF66CC",
  "#66FF66",
];

function Charts({ transactions }) {
  const { categoryData, dateData } = useMemo(() => {
    const categoryMap = {};
    const dateMap = {};

    transactions.forEach(({ category, amount, date }) => {
      if (category !== "Income") {
        categoryMap[category] = (categoryMap[category] || 0) + amount;

        const month = date.slice(0, 7); 
        dateMap[month] = (dateMap[month] || 0) + amount;
      }
    });

    const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));

    const dateData = Object.entries(dateMap)
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => a.month.localeCompare(b.month));

    return { categoryData, dateData };
  }, [transactions]);

  return (
    <div className="charts">
      <div className="chart-container">
        <h3>Expenses by Category</h3>
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No expense data available.</p>
        )}
      </div>

      <div className="chart-container">
        <h3>Monthly Spending Trend</h3>
        {dateData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dateData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>No monthly spending data available.</p>
        )}
      </div>
    </div>
  );
}

export default Charts;
