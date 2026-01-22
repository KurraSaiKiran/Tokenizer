# AI Tokenizer

A full-stack web application that visualizes how AI models process and tokenize text, transforming words and sentences into interpretable patterns for machine understanding.

## 🌐 Live Demo

- **Frontend**: [https://tokenizer-nine-puce.vercel.app/](https://tokenizer-nine-puce.vercel.app/)
- **Backend API**: [https://ai-tokenizer-hge5.onrender.com/](https://ai-tokenizer-hge5.onrender.com/)
- **API Documentation**: [https://ai-tokenizer-hge5.onrender.com/api/docs](https://ai-tokenizer-hge5.onrender.com/api/docs)

## 🚀 Features

### Frontend Features
- **Interactive Text Input**: Real-time tokenization as you type
- **Multiple AI Models**: Support for GPT-4, GPT-3.5-Turbo, GPT-4-Turbo, and Claude-3
- **Visual Token Display**: Color-coded tokens with hover effects
- **Token Statistics**: Real-time counts for tokens, characters, and vocabulary
- **Token Breakdown**: Detailed view of each token with IDs and text
- **Vocabulary Analysis**: Unique token visualization
- **Example Templates**: Pre-built text examples for quick testing
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Visual feedback during API calls

### Backend Features
- **Advanced Tokenization**: Multiple tokenization strategies (default, word-level, character-level)
- **RESTful API**: Clean API endpoints with proper HTTP methods
- **CORS Support**: Cross-origin requests enabled for frontend integration
- **Swagger Documentation**: Interactive API documentation
- **Error Handling**: Comprehensive error responses
- **Health Monitoring**: Health check endpoint for monitoring
- **Batch Processing**: Support for tokenizing multiple texts
- **Vocabulary Management**: Dynamic vocabulary tracking and reset

## 🏗️ Architecture

```
AI Tokenizer/
├── Frontend (React.js)
│   ├── Deployed on Vercel
│   ├── Modern UI with CSS animations
│   └── Real-time API integration
│
└── Backend (Flask Python)
    ├── Deployed on Render
    ├── RESTful API with Swagger docs
    └── Advanced tokenization algorithms
```

## 🛠️ Technology Stack

### Frontend
- **React.js 19.2.3** - Modern JavaScript framework
- **CSS3** - Custom styling with animations and gradients
- **Fetch API** - HTTP client for backend communication
- **Vercel** - Deployment platform

### Backend
- **Python 3.x** - Programming language
- **Flask 3.0.0** - Web framework
- **Flask-CORS 4.0.0** - Cross-origin resource sharing
- **Flask-Swagger-UI 4.11.1** - API documentation
- **Gunicorn 21.2.0** - WSGI HTTP server
- **Render** - Deployment platform

## 📁 Project Structure

```
TokenizerProject/
├── Tokenizer/
│   ├── Backend/
│   │   ├── static/
│   │   │   └── swagger.json          # API documentation
│   │   ├── app.py                    # Main Flask application
│   │   ├── requirements.txt          # Python dependencies
│   │   └── Render                    # Render deployment config
│   │
│   ├── Frontend/
│   │   ├── public/                   # Static assets
│   │   ├── App.js                    # Main React component
│   │   ├── App.css                   # Styling
│   │   └── index.js                  # React entry point
│   │
│   ├── package.json                  # Node.js dependencies
│   └── README.md                     # This file
│
└── test-connection.html              # API connection test
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **pip** (Python package manager)

### Local Development

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd TokenizerProject/Tokenizer
```

#### 2. Backend Setup
```bash
# Navigate to backend directory
cd Backend

# Install Python dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```
Backend will be available at `http://localhost:5000`

#### 3. Frontend Setup
```bash
# Navigate to project root
cd ..

# Install Node.js dependencies
npm install

# Start the React development server
npm start
```
Frontend will be available at `http://localhost:3000`

## 📡 API Endpoints

### Base URL
- **Local**: `http://localhost:5000`
- **Production**: `https://ai-tokenizer-hge5.onrender.com`

### Endpoints

#### `GET /`
Home endpoint with API information

#### `POST /api/tokenize`
Tokenize input text
```json
{
  "text": "Hello world",
  "model": "gpt-4",
  "strategy": "default"
}
```

#### `POST /api/count`
Count tokens without full tokenization
```json
{
  "text": "Hello world",
  "strategy": "default"
}
```

#### `GET /api/vocab`
Get current vocabulary statistics

#### `POST /api/vocab/reset`
Reset the tokenizer vocabulary

#### `GET /health`
Health check endpoint

#### `POST /api/batch`
Batch tokenize multiple texts
```json
{
  "texts": ["Hello", "World"],
  "strategy": "default"
}
```

## 🎨 UI Components

### Main Interface
- **Header**: Branding and description
- **Examples**: Quick-start text samples
- **Text Input**: Large textarea with clear button
- **Statistics**: Token, character, and vocabulary counts
- **Controls**: Model selection and display options
- **Token Visualization**: Interactive token display
- **Token Breakdown**: Detailed token analysis
- **Vocabulary**: Unique token collection

### Styling Features
- **Dark Theme**: Modern dark background with light text
- **Gradient Effects**: Colorful gradients and animations
- **Responsive Design**: Mobile-friendly layout
- **Interactive Elements**: Hover effects and transitions
- **Loading States**: Visual feedback during processing

## 🔧 Configuration

### Environment Variables

#### Frontend
```javascript
const API_BASE_URL = "https://ai-tokenizer-hge5.onrender.com";
```

#### Backend
```python
PORT = int(os.environ.get('PORT', 5000))
DEBUG = os.environ.get('DEBUG', 'True') == 'True'
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
3. Deploy automatically on push

### Backend (Render)
1. Connect GitHub repository to Render
2. Configure service:
   - Environment: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
3. Deploy automatically on push

## 🧪 Testing

### API Connection Test
Open `test-connection.html` in your browser to verify frontend-backend connectivity.

### Manual Testing
1. Enter text in the input field
2. Select different AI models
3. Observe real-time tokenization
4. Test example buttons
5. Verify token breakdown and vocabulary

## 🔍 Tokenization Strategies

### Default Strategy
- BPE-like tokenization
- Handles punctuation separately
- Splits long words into subwords

### Word Strategy
- Simple word-based splitting
- Preserves whole words

### Character Strategy
- Character-level tokenization
- Each character becomes a token

## 🎯 Use Cases

- **Educational**: Learn how AI models process text
- **Development**: Test tokenization for AI applications
- **Research**: Analyze text patterns and vocabulary
- **Debugging**: Understand model input processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👥 Credits

**Powered by Alumnx** - AI Tokenizer visualization tool

## 🐛 Known Issues

- First API call may be slow (30-45 seconds) due to Render free tier cold start
- Large texts may take longer to process

## 📞 Support

For issues and questions:
1. Check the API documentation at `/api/docs`
2. Test connection using `test-connection.html`
3. Verify both frontend and backend are deployed and accessible

## 🔮 Future Enhancements

- [ ] Support for more AI models
- [ ] File upload for batch processing
- [ ] Export functionality for results
- [ ] Advanced tokenization algorithms
- [ ] User authentication and saved sessions
- [ ] Performance optimizations
- [ ] Real-time collaboration features
