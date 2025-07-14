import React from 'react'

const Category = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Men', 'Women', 'Electronics', 'Accessories'].map((category, index) => (
            <div
              key={index}
              className="bg-white border shadow-sm rounded-md p-6 text-center hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-700">{category}</h3>
            </div>
          ))}
        </div>
      </section>
  )
}

export default Category