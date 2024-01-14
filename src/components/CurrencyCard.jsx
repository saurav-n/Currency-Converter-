export default function CurrencyCard({
    label,
    isAmountInputDisabled,
    sourceAmount=0,
    destinationAmount=0,
    onAmountChange=()=>{},
    sourceOptions=[],
    destinationOptions=[],
    onSourceOptionsChange=null,
    onDestinationOptionsChange=null,
    sourceOptionValue='',
    destinationOptionValue=''
}){
    const amount=sourceAmount!==0?sourceAmount:destinationAmount
    const options=sourceOptions.length!==0?sourceOptions:destinationOptions
    const onOptionsChange=onSourceOptionsChange?onSourceOptionsChange:onDestinationOptionsChange
    const optionValue=sourceOptionValue!==''?sourceOptionValue:destinationOptionValue
    return(
        <div className="w-full p-2 rounded-md flex flex-col gap-y-3 bg-white">
            <div className="w-full flex justify-between text-gray-500">
                <p>{label}</p>
                <p>Currency Type</p>
            </div>
            <div className="w-full flex justify-between">
                {/* <input type="number" name="" id="" className="outline-none w-[10%] bg-transparent" value={0} disabled={false}/>
                
                <input type="text" name="" id=""  className="outline-none w-[10%] bg-gray-200 rounded-md px-1"
                    value={name==='From'?'usd':'npr'} readOnly
                /> */}
                <input type="number" name="" id="" className="outline-none w-[50%] bg-transparent" value={amount} 
                disabled={isAmountInputDisabled} onChange={onAmountChange}/>
                <select name="" id="" className="outline-none w-[20%] bg-gray-200 rounded-md px-1" 
                 value={optionValue} onChange={onOptionsChange}>
                    {options.map((currencyType)=>{
                       return <option key={currencyType} value={currencyType}>{currencyType}</option>
                    })}
                </select>
            </div>
        </div>
    )
}