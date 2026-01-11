import Header from '@/components/Header';
import BillingTable from '@/components/BillingTable';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your billing and customer credits</p>
          </div>
          
          <div className="flex gap-3">
             <Link 
              href="/customers" 
              className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              Manage Customers
            </Link>
            <Link 
              href="/bills/create" 
              className="px-4 py-2 bg-[#22B21F] text-white rounded-lg text-sm font-medium hover:bg-[#1B5E20] transition-colors shadow-sm flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Create New Bill
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-6 rounded-xl shadow-lg text-white">
            <p className="text-white/80 text-sm font-medium mb-1">Today's Sales</p>
            <h3 className="text-3xl font-bold">₹12,450</h3>
            <div className="mt-4 text-xs bg-white/20 inline-block px-2 py-1 rounded">+12% from yesterday</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm font-medium mb-1">Pending Credits</p>
            <h3 className="text-3xl font-bold text-amber-600">₹45,200</h3>
            <p className="text-xs text-gray-400 mt-2">Across 12 customers</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm font-medium mb-1">Total Customers</p>
            <h3 className="text-3xl font-bold text-gray-900">148</h3>
            <p className="text-xs text-gray-400 mt-2">Active in last 30 days</p>
          </div>
        </div>

        <BillingTable />
      </div>
    </main>
  );
}
