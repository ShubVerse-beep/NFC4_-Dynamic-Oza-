"use client"

import { useState } from "react"
import { FileText, Link, Type, Upload, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AnalysisResult {
  credibilityScore: number
  verdict: "authentic" | "suspicious" | "fake"
  confidence: number
  textAnalysis: {
    emotionalLanguage: number
    sourceCitations: number
    factualAccuracy: number
    biasDetection: number
  }
  sources: Array<{
    name: string
    reputation: number
    url: string
    relevance: number
  }>
  explanation: string
}

export default function FakeNewsPage() {
  const [activeTab, setActiveTab] = useState("text")
  const [textContent, setTextContent] = useState("")
  const [urlContent, setUrlContent] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  const analyzeContent = async () => {
    setIsAnalyzing(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const mockResult: AnalysisResult = {
      credibilityScore: 68,
      verdict: "suspicious",
      confidence: 82,
      textAnalysis: {
        emotionalLanguage: 75,
        sourceCitations: 45,
        factualAccuracy: 60,
        biasDetection: 70,
      },
      sources: [
        { name: "Reuters", reputation: 95, url: "reuters.com", relevance: 78 },
        { name: "Associated Press", reputation: 92, url: "ap.org", relevance: 65 },
        { name: "Unknown Blog", reputation: 25, url: "fakeblog.com", relevance: 45 },
      ],
      explanation:
        "The text shows concerning patterns including high emotional language usage and limited credible source citations. While some facts check out, the overall presentation suggests potential bias or misinformation.",
    }

    setAnalysisResult(mockResult)
    setIsAnalyzing(false)
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "authentic":
        return "text-green-600"
      case "suspicious":
        return "text-yellow-600"
      case "fake":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "authentic":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "suspicious":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "fake":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Fake News Detection</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced NLP analysis to detect misinformation, bias, and fake news in textual content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Text Analysis
                </CardTitle>
                <CardDescription>Input text content or article URL for fake news detection</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text" className="flex items-center">
                      <Type className="h-4 w-4 mr-1" />
                      Direct Text
                    </TabsTrigger>
                    <TabsTrigger value="url" className="flex items-center">
                      <Link className="h-4 w-4 mr-1" />
                      Article URL
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="text" className="space-y-4">
                    <Textarea
                      placeholder="Paste the news article or text content you want to analyze for authenticity and bias..."
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      className="min-h-[300px]"
                    />
                  </TabsContent>

                  <TabsContent value="url" className="space-y-4">
                    <Input
                      placeholder="Enter the URL of the news article to analyze..."
                      value={urlContent}
                      onChange={(e) => setUrlContent(e.target.value)}
                    />
                    <div className="text-sm text-gray-600">
                      <p>Supported sources: News websites, blogs, social media posts, and online articles</p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end mt-6">
                  <Button onClick={analyzeContent} disabled={isAnalyzing} className="bg-blue-600 hover:bg-blue-700">
                    {isAnalyzing ? "Analyzing Text..." : "Analyze for Fake News"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detection Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm">Emotional language detection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm">Source credibility analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm">Fact-checking database lookup</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm">Bias and sentiment analysis</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Analysis Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Articles analyzed today</span>
                    <span className="font-semibold">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fake news detected</span>
                    <span className="font-semibold text-red-600">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Accuracy rate</span>
                    <span className="font-semibold text-green-600">96.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="mt-8 space-y-6">
            {/* Overall Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {getVerdictIcon(analysisResult.verdict)}
                  <span className="ml-2">Analysis Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      <span className={getVerdictColor(analysisResult.verdict)}>
                        {analysisResult.credibilityScore}%
                      </span>
                    </div>
                    <p className="text-gray-600">Credibility Score</p>
                    <Progress value={analysisResult.credibilityScore} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2 capitalize">
                      <span className={getVerdictColor(analysisResult.verdict)}>{analysisResult.verdict}</span>
                    </div>
                    <p className="text-gray-600">Verdict</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">{analysisResult.confidence}%</div>
                    <p className="text-gray-600">Confidence</p>
                    <Progress value={analysisResult.confidence} className="mt-2" />
                  </div>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{analysisResult.explanation}</AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Text Analysis Breakdown</CardTitle>
                  <CardDescription>Detailed linguistic and content analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(analysisResult.textAnalysis).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        <Badge variant={value > 70 ? "destructive" : value > 40 ? "secondary" : "default"}>
                          {value}%
                        </Badge>
                      </div>
                      <Progress value={value} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Source Analysis</CardTitle>
                  <CardDescription>Credibility of referenced sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResult.sources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{source.name}</p>
                          <p className="text-sm text-gray-600">{source.url}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              source.reputation > 80 ? "default" : source.reputation > 50 ? "secondary" : "destructive"
                            }
                          >
                            {source.reputation}%
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{source.relevance}% relevant</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
