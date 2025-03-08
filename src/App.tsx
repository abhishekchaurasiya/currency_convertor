import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { InputBox } from "./components";
import { useState } from "react";


const App = () => {
  const [amount, setAmount] = useState<number>(0);
  const [from, setFrom] = useState<string>("usd");
  const [to, setTo] = useState<string>("inr");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = currencyInfo ? Object.keys(currencyInfo) : [];

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (currencyInfo) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-gradient-to-b from-gray-900 to-gray-600">
      <div className="w-full flex flex-row justify-center items-center px-2 gap-x-2">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30 shadow-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisabled
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg cursor-pointer"
            >
              Convert{" "}
              <span className="text-orange-500 font-bold">
                {from.toUpperCase()}
              </span>{" "}
              to{" "}
              <span className="text-orange-500 font-bold">
                {to.toUpperCase()}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
