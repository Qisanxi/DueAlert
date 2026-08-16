import { useState, useRef } from 'react'
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Sparkles, Brain, MessageSquare, Calendar } from 'lucide-react'
import { useUploadCSV } from '../hooks/useStudents'

export default function CSVUpload() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const inputRef = useRef(null)
  const upload = useUploadCSV()

  const handleFileChange = (e) => {
    const f = e.target.files[0]
    if (f && f.name.endsWith('.csv')) {
      setFile(f)
      setResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return
    const res = await upload.mutateAsync(file)
    setResult(res)
    setFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="relative">
      {upload.isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xl">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-scan" />
              <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-purple-500 border-l-indigo-500 animate-scan" style={{ animationDirection: 'reverse', animationDuration: '3s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-8 h-8 text-indigo-400" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Scanning with AI</h3>
            <p className="text-slate-300 text-lg animate-dots">Analyzing student data</p>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Calculating risk scores</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Generating messages</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Predicting payment dates</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Bulk Upload Students</h3>
            <p className="text-sm text-slate-500">Upload a CSV file to analyze all students with AI</p>
          </div>
        </div>

        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-primary-500 hover:bg-primary-50/30 transition-all duration-300 group cursor-pointer">
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
            id="csv-upload"
          />
          <label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-slate-100 group-hover:bg-primary-100 rounded-2xl flex items-center justify-center transition-colors">
              <Upload className="w-6 h-6 text-slate-400 group-hover:text-primary-600 transition-colors" />
            </div>
            <div>
              <span className="text-sm font-medium text-slate-700">
                {file ? file.name : 'Click to upload CSV file'}
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Drag & drop or click to browse
              </p>
            </div>
          </label>
        </div>

        {file && (
          <button
            onClick={handleUpload}
            disabled={upload.isPending}
            className="btn-primary w-full mt-5 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {upload.isPending ? 'Processing with AI...' : 'Upload & Analyze with AI'}
          </button>
        )}

        {result?.success && (
          <div className="mt-5 p-4 bg-success-50 border border-success-200 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-success-800">
                Successfully processed {result.count} students with AI analysis!
              </p>
              <p className="text-xs text-success-600 mt-0.5">
                Risk scores calculated • Messages generated • Payment dates predicted
              </p>
            </div>
          </div>
        )}

        {upload.isError && (
          <div className="mt-5 p-4 bg-danger-50 border border-danger-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-danger-600 flex-shrink-0" />
            <span className="text-sm text-danger-700">{upload.error.message}</span>
          </div>
        )}

        <div className="mt-5 p-4 bg-slate-50 rounded-xl">
          <p className="text-xs font-medium text-slate-600 mb-2">Required CSV columns:</p>
          <code className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
            name, phone, parent_name, course, monthly_fee, due_amount, due_date, notes
          </code>
        </div>
      </div>
    </div>
  )
}