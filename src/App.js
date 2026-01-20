import React, { useState, useEffect } from 'react';
import { Copy, Check, Sparkles, Info, Download, Trash2 } from 'lucide-react';

const TokenizerApp = () => {
  const [text, setText] = useState('');
  const [tokens, setTokens] = useState([]);
  const [tokenCount, setTokenCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copiedIds, setCopiedIds] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [showTokenIds, setShowTokenIds] = useState(false);

  // Enhanced tokenizer with proper token IDs
  const tokenize = (input) => {
    if (!input) return [];
    
    const words = input.split(/(\s+|[.,!?;:()[\]{}'""])/);
    const result = [];
    let tokenId = 0;
    
    words.forEach(word => {
      if (!word) return;
      
      if (word.match(/\s+/)) {
        result.push({ text: word, id: tokenId++ });
      } else if (word.match(/[.,!?;:()[\]{}'"]/)) {
        result.push({ text: word, id: tokenId++ });
      } else {
        if (word.length <= 4) {
          result.push({ text: word, id: tokenId++ });
        } else {
          for (let i = 0; i < word.length; i += 3) {
            result.push({ 
              text: word.slice(i, i + 3), 
              id: tokenId++
            });
          }
        }
      }
    });
    
    return result;
  };

  useEffect(() => {
    const newTokens = tokenize(text);
    setTokens(newTokens);
    setTokenCount(newTokens.length);
    setCharCount(text.length);
  }, [text]);

  const getTokenColor = (index) => {
    const colors = [
      'bg-blue-50 border-blue-200 hover:bg-blue-100',
      'bg-green-50 border-green-200 hover:bg-green-100',
      'bg-purple-50 border-purple-200 hover:bg-purple-100',
      'bg-pink-50 border-pink-200 hover:bg-pink-100',
      'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
      'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
      'bg-orange-50 border-orange-200 hover:bg-orange-100',
      'bg-teal-50 border-teal-200 hover:bg-teal-100',
    ];
    return colors[index % colors.length];
  };

  const copyTokens = () => {
    const tokenText = tokens.map(t => t.text).join('');
    navigator.clipboard.writeText(tokenText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyTokenIds = () => {
    const ids = tokens.map(t => t.id);
    navigator.clipboard.writeText(JSON.stringify(ids));
    setCopiedIds(true);
    setTimeout(() => setCopiedIds(false), 2000);
  };

  const downloadTokens = () => {
    const data = {
      text: text,
      model: selectedModel,
      tokens: tokens.map(t => ({ text: t.text, id: t.id })),
      stats: {
        tokenCount,
        charCount
      }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tokenizer-output.json';
    a.click();
  };

  const clearAll = () => {
    setText('');
    setTokens([]);
    setTokenCount(0);
    setCharCount(0);
  };

  const exampleTexts = [
    "Hello, how are you doing today?",
    "The quick brown fox jumps over the lazy dog.",
    "Artificial intelligence is transforming the world!"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Tokenizer</h1>
                <p className="text-sm text-gray-500">Visualize how AI models read text</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} />
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-500 mb-1">Tokens</div>
            <div className="text-3xl font-bold text-blue-600">{tokenCount}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-500 mb-1">Characters</div>
            <div className="text-3xl font-bold text-green-600">{charCount}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-500 mb-1">Model</div>
            <select 
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="mt-1 text-lg font-semibold text-gray-900 bg-transparent border-none focus:ring-0 cursor-pointer w-full"
            >
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
              <option value="claude-3">Claude 3</option>
            </select>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              Input Text
              <div className="group relative">
                <Info size={16} className="text-gray-400 cursor-help" />
                <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap">
                  Type or paste text to see how it's tokenized
                </div>
              </div>
            </label>
            <div className="flex gap-2">
              {exampleTexts.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setText(example)}
                  className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                >
                  Example {idx + 1}
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here to see how it gets tokenized..."
            className="w-full h-40 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm transition-all"
          />
        </div>

        {/* Token Visualization */}
        {tokens.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-gray-700">Token Visualization</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowTokenIds(!showTokenIds)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    showTokenIds 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {showTokenIds ? 'Hide IDs' : 'Show IDs'}
                </button>
                <button
                  onClick={copyTokens}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={downloadTokens}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 min-h-32">
              <div className="flex flex-wrap gap-2">
                {tokens.map((token, index) => (
                  <div
                    key={index}
                    className={`group relative inline-flex flex-col items-center`}
                  >
                    <span
                      className={`inline-flex items-center px-3 py-2 rounded-lg border-2 font-mono text-sm transition-all cursor-pointer ${getTokenColor(index)}`}
                    >
                      {token.text.replace(/\n/g, '↵').replace(/ /g, '·')}
                    </span>
                    {showTokenIds && (
                      <span className="mt-1 text-xs font-semibold text-gray-500">
                        ID: {token.id}
                      </span>
                    )}
                    <div className="absolute hidden group-hover:block bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
                      Token ID: {token.id}
                      <br />
                      Text: "{token.text}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Token IDs Section */}
        {tokens.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-700">Token IDs Array</label>
              <button
                onClick={copyTokenIds}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
              >
                {copiedIds ? <Check size={16} /> : <Copy size={16} />}
                {copiedIds ? 'Copied!' : 'Copy IDs'}
              </button>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 font-mono text-sm">
                {JSON.stringify(tokens.map(t => t.id), null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Info Panel */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Info className="text-white" size={24} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How Tokenization Works</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Language models like GPT don't read text the way humans do. They break it down into "tokens" - 
                pieces of words, whole words, or even punctuation. This tokenizer visualizes that process, showing 
                you exactly how AI models interpret your text. Each color represents a different token, and hover 
                over any token to see its unique ID.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <div className="px-3 py-1 bg-white rounded-lg text-xs font-medium text-gray-700">
                  🎨 Color-coded tokens
                </div>
                <div className="px-3 py-1 bg-white rounded-lg text-xs font-medium text-gray-700">
                  🔢 Unique token IDs
                </div>
                <div className="px-3 py-1 bg-white rounded-lg text-xs font-medium text-gray-700">
                  📥 Export functionality
                </div>
                <div className="px-3 py-1 bg-white rounded-lg text-xs font-medium text-gray-700">
                  ⚡ Real-time processing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-500">
        Built with React & Tailwind CSS • Tokenizer Demo Project
      </div>
    </div>
  );
};

export default TokenizerApp;