import { useState } from 'react';
// import { useState, useEffect } from 'react';
import { Calculator, Receipt, Trophy, AlertCircle } from 'lucide-react'; //圖標
// import axios from 'axios';

//發票對獎期間的數據結構
interface PeriodData {
  year: string;
  period: string;
  specialPrize: string;
  grandPrize: string;
  firstPrize: string[];
}

function App() {
  const [receipt, setReceipt] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodData>({
    year: '113',
    period: '01-02月',
    specialPrize: '21981893',
    grandPrize: '58612146',
    firstPrize: ['73879556', '22315462', '91903003'],
  });

  // 獲取最新發票資料
  // useEffect(() => {
  //   const fetchPeriodData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/api/prize-numbers");
  //       const data = response.data;

  //       setSelectedPeriod({
  //         year: data.year, //年
  //         period: data.month, //月
  //         specialPrize: data.prizes[0], //特別獎
  //         grandPrize: data.prizes[1], //特獎
  //         firstPrize: data.prizes.slice(2, 5), //頭獎
  //       });
  //     } catch (error) {
  //       console.error("無法獲取數據:", error);
  //     }
  //   };

  //   fetchPeriodData();
  // }, []);

  const checkPrize = () => {
    if (receipt.length !== 8) {
      setResult('請輸入8位數發票號碼');
      return;
    }

    // Special Prize (10 million)
    if (receipt === selectedPeriod.specialPrize) {
      setResult('恭喜中特別獎 1,000萬元！');
      return;
    }

    // Grand Prize (2 million)
    if (receipt === selectedPeriod.grandPrize) {
      setResult('恭喜中特獎 200萬元！');
      return;
    }

    // First Prize (200,000)
    for (const number of selectedPeriod.firstPrize) {
      if (receipt === number) {
        setResult('恭喜中頭獎 20萬元！');
        return;
      }
      
      // Additional Prizes
      const matchLength = receipt.split('').reverse()
        .findIndex((digit, index) => digit !== number.split('').reverse()[index]);
      
      if (matchLength !== -1) {
        const prizes = {
          7: '4萬元',
          6: '1萬元',
          5: '4千元',
          4: '1千元',
          3: '2百元',
        };
        
        const prize = prizes[matchLength as keyof typeof prizes];
        if (prize) {
          setResult(`恭喜中獎 ${prize}！`);
          return;
        }
      }
    }

    setResult('很可惜，沒有中獎');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Receipt className="h-16 w-16 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">統一發票對獎系統</h1>
            <p className="text-gray-600">快速方便檢查您的發票是否中獎</p>
          </div>

          {/* Period Selection */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              {selectedPeriod.year}年 {selectedPeriod.period}
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium text-gray-700">特別獎</span>
                <span className="font-mono text-lg text-yellow-800">{selectedPeriod.specialPrize}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                <span className="font-medium text-gray-700">特獎</span>
                <span className="font-mono text-lg text-indigo-800">{selectedPeriod.grandPrize}</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-gray-700 mb-2">頭獎</div>
                <div className="space-y-2">
                  {selectedPeriod.firstPrize.map((number, index) => (
                    <div key={index} className="font-mono text-lg text-blue-800 text-center">
                      {number}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="mb-6">
              <label htmlFor="receipt" className="block text-sm font-medium text-gray-700 mb-2">
                請輸入發票號碼（末8碼）
              </label>
              <input
                type="text"
                id="receipt"
                maxLength={8}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center text-2xl font-mono"
                value={receipt}
                onChange={(e) => setReceipt(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="00000000"
              />
            </div>
            
            <button
              onClick={checkPrize}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <Trophy className="h-5 w-5 mr-2" />
              開始對獎
            </button>
          </div>

          {/* Result Section */}
          {result && (
            <div className={`bg-white rounded-lg shadow-lg p-6 text-center ${
              result.includes('恭喜') ? 'bg-green-50' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-center mb-3">
                {result.includes('恭喜') ? (
                  <Trophy className="h-8 w-8 text-green-600" />
                ) : (
                  <AlertCircle className="h-8 w-8 text-gray-600" />
                )}
              </div>
              <p className={`text-xl font-medium ${
                result.includes('恭喜') ? 'text-green-800' : 'text-gray-800'
              }`}>
                {result}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;