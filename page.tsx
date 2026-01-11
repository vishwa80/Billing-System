'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Customer {
  _id: string;
  name?: string;
  mobile?: string;
  totalCredit?: number;
  totalPaid?: number;
  updatedAt?: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch(`/api/customers`);
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(c => 
    (c.name || '').toLowerCase().includes(search.toLowerCase()) || 
    (c.mobile || '').includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customers & Credit Ledger</h1>
            <p className="text-sm text-gray-500">Track all customer payments and credits</p>
          </div>
          <Link 
            href="/"
            className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22B21F]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 font-semibold">Name</th>
                <th className="px-6 py-3 font-semibold">Mobile</th>
                <th className="px-6 py-3 font-semibold text-right">Total Paid</th>
                <th className="px-6 py-3 font-semibold text-right">Current Debt</th>
                <th className="px-6 py-3 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCustomers.map((customer) => (
                <tr key={customer._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{customer.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-500 font-mono">{customer.mobile || '-'}</td>
                  <td className="px-6 py-4 text-right text-gray-600">₹{(customer.totalPaid || 0).toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">₹{(customer.totalCredit || 0).toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    {(customer.totalCredit || 0) <= 0 ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Clear</span>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Owing</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                 <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No customers found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
