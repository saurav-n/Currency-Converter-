import { useState,useEffect} from "react"
import CurrencyCard from "./components/CurrencyCard"
import useCurrencyInfo from "./hooks/UseCurrencyInfo"

function App() {

  const [sourceAmount,setSourceAmount]=useState(0)
  const [destinationAmount,setDestinationAmount]=useState(0)
  const [sourceCurrencyType,setSourceCurrencyType]=useState('usd')
  const [destinationCurrencyType,setDestinationCurrencyType]=useState('npr')
  let destinationOptions=[]
  let destinationCurrencyInfo={}
  const [swapped,setSwapped]=useState(false)

  const onSourceAmountChange=(e)=>{
    setSourceAmount(e.target.value)
    console.log(sourceAmount)
  }

  const onSourceOptionChange=(e)=>{
    setSourceCurrencyType(e.target.value)
  }

  const onDestinationOptionChange=(e)=>{
    setDestinationCurrencyType(e.target.value)
  }

  const Convert=()=>{
    setDestinationAmount(
      sourceAmount*(destinationCurrencyInfo[destinationCurrencyType]?destinationCurrencyInfo[destinationCurrencyType]:0)
    )
  }

  const swap=()=>{
    setSwapped(true)
    setSourceAmount(destinationAmount)
    setDestinationAmount(sourceAmount)
    setSourceCurrencyType(destinationCurrencyType)
    setDestinationCurrencyType(sourceCurrencyType)
  }

  destinationCurrencyInfo=useCurrencyInfo(sourceCurrencyType)
  destinationOptions=Object.keys(destinationCurrencyInfo)

  useEffect(()=>{
    if(swapped) {
      setSwapped(false)
    }
    else {
      setDestinationAmount(0)
    }
  },[sourceCurrencyType,destinationCurrencyType])

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center" style={{backgroundImage:'url(./src/image/bg.jpg)'}}>
        <div className="w-[25%] p-4 border-[1px] border-white bg-[rgba(255,255,255,0.5)] rounded-md flex flex-col gap-y-8 relative
        items-center">
          <div className="w-full flex flex-col gap-y-3">
            <CurrencyCard
              label={'From'}
              isAmountInputDisabled={false}
              sourceAmount={sourceAmount}
              onAmountChange={onSourceAmountChange}
              sourceOptions={Object.keys(destinationCurrencyInfo)}
              onSourceOptionsChange={onSourceOptionChange}
              sourceOptionValue={sourceCurrencyType}
            />
            <CurrencyCard
              label={'To'}
              isAmountInputDisabled={true}
              destinationAmount={destinationAmount}
              destinationOptions={destinationOptions}
              onDestinationOptionsChange={onDestinationOptionChange}
              destinationOptionValue={destinationCurrencyType}
            />
          </div>
          <button className="w-full bg-blue-500 rounded-md text-white py-2" onClick={Convert}>
            {`Convert ${sourceCurrencyType.toUpperCase()} to ${destinationCurrencyType.toUpperCase()}`}
          </button>
          <button className="absolute w-[10%] bg-blue-500 rounded-md top-[32%] text-white" onClick={swap}>Swap</button>
        </div>
      </div>
    </>
  )
}

export default App
