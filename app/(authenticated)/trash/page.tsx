import DocumentsGrid from '@/components/dashboard/document-grid'
import React from 'react'

function Trash() {
  return (
    <div>
        <div className="mt-5">
                <h1 className='text-xl font-bold'>
                    Deleted Documents
                </h1>
            </div>
        <DocumentsGrid />
    </div>
  )
}

export default Trash
