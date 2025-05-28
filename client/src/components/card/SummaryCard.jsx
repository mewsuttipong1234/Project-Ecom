const SummaryCard = () => {
  return (
    <div className="mx-auto">
        <div className="flex flex-warp gap-4 p-4">
            {/*Left*/}
            <div className="w-2/4">
            <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-5">
                <h1 className="font-bold text-lg">
                    ที่อยู่ในการจัดส่ง
                </h1>

                    <textarea className="w-full px-2 rounded-md"/>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">Save Address</button>
            </div>
            </div>



            {/*Right*/}
            <div className="w-2/4">
           <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-5">
               <h1 className="font-bold text-lg" >
                คำสั่งซื้อ
              </h1>

                {/* item list */}

                <div>
                    <div className="flex justify-between items-end">
                        <div>
                            <p>
                                Title:Asus 
                            </p>
                            <p>
                                จำยนวน : 1 x 20000
                            </p>
                        </div>

                        <div>
                            <p className="text-red-500 font-bold">
                                20,000
                            </p>
                        </div>
                    </div>
                </div>
  <hr />
                <div>
                    <div className="flex justify-between">
                        <p>
                            ค่าจัดส่ง :
                        </p>
                        <p>
                            0.00
                        </p>
                    </div>
                       <div className="flex justify-between">
                        <p>
                            ค่าส่วนลด :
                        </p>
                        <p>
                            0.00
                        </p>
                    </div>
                </div>
  <hr />
                <div>
                  
                    <div className="flex justify-between">
                        <p className="font-bold">
                            ยอดรวมสุทธิ :
                        </p>
                        <p className="text-red-500 font-bold text-lg">
                            0.00
                        </p>
                    </div>
                </div>

           </div>
            </div>

        </div>
    </div>
  )
}
export default SummaryCard