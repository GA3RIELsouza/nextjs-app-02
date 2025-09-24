"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dados de exemplo. No futuro, isso viria do seu banco de dados.
const expenseData = [
  { name: 'Moradia', value: 1200 },
  { name: 'Alimentação', value: 850 },
  { name: 'Transporte', value: 450 },
  { name: 'Lazer', value: 300 },
  { name: 'Saúde', value: 500 },
  { name: 'Outros', value: 250 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4444'];

export default function ExpensesChart() {
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