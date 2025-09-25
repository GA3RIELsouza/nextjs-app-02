"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4444'];

interface ExpensesChartProps {
    expenseData: { name: string; value: number }[];
}

export default function ExpensesChart({ expenseData }: ExpensesChartProps) {
  if (!expenseData || expenseData.length === 0) {
    return <p className="text-center text-gray-500 py-10">Sem dados de despesas para exibir.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={expenseData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
        >
          {expenseData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) =>
            value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          }
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}