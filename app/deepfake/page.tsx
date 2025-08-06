"use client"

import { useState } from "react"
import { Video, ImageIcon, Upload, AlertTriangle, CheckCircle, XCircle, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DeepfakeResult {
  authenticity: number
  verdict: "authentic" | "suspicious" | "deepfake"
  confidence: number
  analysis: {
    facialConsistency: number
    audioVisualSync: number
    compressionArtifacts: number
    metadataIntegrity: number
  }
  technicalFindings: string[]
  explanation: string
}

export default function DeepfakePage() {
  const [activeTab, setActiveTab] = useState("video")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<DeepfakeResult | null>(null)

  const analyzeContent = async () => {
    setIsAnalyzing(true)
    await new Promise((resolve) => setTimeout(resolve, 4000))

    const mockResult: DeepfakeResult = {
      authenticity: 45,
      verdict: "deepfake",
      confidence: 89,
      analysis: {
        facialConsistency: 35,
        audioVisualSync: 28,
        compressionArtifacts: 65,
        metadataIntegrity: 52,
      },
      technicalFindings: [
        "Inconsistent facial lighting patterns detected",
        "Audio-visual synchronization anomalies found",
        "Unusual compression artifacts in facial regions",
        "Metadata timestamps show signs of manipulation",
        "Facial landmark tracking irregularities",
      ],
      explanation:
        "Multiple indicators suggest this content has been synthetically generated or heavily manipulated. The facial consistency analysis shows significant anomalies, and audio-visual synchronization patterns are inconsistent with authentic recordings.",
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
      case "deepfake":
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
      case "deepfake":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Video className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Video className="h-12 w-12 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Deepfake Detection</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced CNN-powered analysis to detect synthetic and manipulated visual content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Visual Content Analysis
                </CardTitle>
                <CardDescription>Upload videos or images for deepfake detection</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="video" className="flex items-center">
                      <Video className="h-4 w-4 mr-1" />
                      Video
                    </TabsTrigger>
                    <TabsTrigger value="image" className="flex items-center">
                      <ImageIcon className="h-4 w-4 mr-1" />
                      Image
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="video" className="space-y-4">
                    <div className="border-2 border-dashed border-purple-300 rounded-lg p-12 text-center">
                      <Video className="h-16 w-16 mx-auto text-purple-400 mb-4" />
                      <p className="text-gray-600 mb-4">Drop your video file here or click to browse</p>
                      <p className="text-sm text-gray-500 mb-4">Supported formats: MP4, AVI, MOV, WebM (Max: 100MB)</p>
                      <Button
                        variant="outline"
                        className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
                      >
                        Choose Video File
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="image" className="space-y-4">
                    <div className="border-2 border-dashed border-purple-300 rounded-lg p-12 text-center">
                      <ImageIcon className="h-16 w-16 mx-auto text-purple-400 mb-4" />
                      <p className="text-gray-600 mb-4">Drop your image file here or click to browse</p>
                      <p className="text-sm text-gray-500 mb-4">Supported formats: JPG, PNG, WebP (Max: 10MB)</p>
                      <Button
                        variant="outline"
                        className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
                      >
                        Choose Image File
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end mt-6">
                  <Button onClick={analyzeContent} disabled={isAnalyzing} className="bg-purple-600 hover:bg-purple-700">
                    {isAnalyzing ? "Analyzing Content..." : "Analyze for Deepfakes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detection Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-sm">Facial landmark analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-sm">Audio-visual synchronization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-sm">Compression artifact detection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-sm">Metadata verification</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detection Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Videos analyzed today</span>
                    <span className="font-semibold">1,456</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Deepfakes detected</span>
                    <span className="font-semibold text-red-600">89</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Accuracy rate</span>
                    <span className="font-semibold text-green-600">91.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Camera className="h-4 w-4 mr-2" />
                  Live Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Enable real-time deepfake detection for video calls and live streams
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Start Live Detection
                </Button>
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
                  <span className="ml-2">Deepfake Analysis Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      <span className={getVerdictColor(analysisResult.verdict)}>{analysisResult.authenticity}%</span>
                    </div>
                    <p className="text-gray-600">Authenticity Score</p>
                    <Progress value={analysisResult.authenticity} className="mt-2" />
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

            {/* Technical Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of detection methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(analysisResult.analysis).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        <Badge variant={value < 50 ? "destructive" : value < 70 ? "secondary" : "default"}>
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
                  <CardTitle>Technical Findings</CardTitle>
                  <CardDescription>Specific anomalies and artifacts detected</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.technicalFindings.map((finding, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{finding}</span>
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
