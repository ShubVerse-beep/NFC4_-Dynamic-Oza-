"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FileText, Video, ArrowRight, Shield, Zap, Users, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const [animationStage, setAnimationStage] = useState(0)

  useEffect(() => {
    // Start with a longer initial delay
    const initialDelay = setTimeout(() => {
      setAnimationStage(1) // Start first card animation
    }, 1200)

    // Second card animation with significant delay
    const secondDelay = setTimeout(() => {
      setAnimationStage(2) // Start second card animation
    }, 2400)

    // Progress bars animation with even more delay
    const progressDelay = setTimeout(() => {
      setAnimationStage(3) // Start progress bars animation
    }, 3600)

    return () => {
      clearTimeout(initialDelay)
      clearTimeout(secondDelay)
      clearTimeout(progressDelay)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
              🚀 Advanced AI Detection Technology
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Protect Truth with
              <span className="text-blue-600 block">AI-Powered Detection</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Combat misinformation with our cutting-edge AI system that detects fake news and deepfakes across text,
              images, and videos with unprecedented accuracy.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">94.2%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">1M+</div>
              <div className="text-sm text-gray-600">Content Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-sm text-gray-600">Users Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Real-time Detection</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Detection Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Detection Method</h2>
            <p className="text-lg text-gray-600">
              Our specialized AI agents provide comprehensive analysis for different content types
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fake News Detection Card */}
            <Card
              className={`relative overflow-hidden transition-all duration-2000 ease-in-out hover:shadow-2xl hover:scale-[1.02] ${
                animationStage >= 1 ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-bl-full opacity-10" />
              <CardHeader className="relative">
                <div
                  className={`flex items-center space-x-3 mb-4 transition-all duration-1500 ease-in-out ${
                    animationStage >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-gray-900">Fake News Detection</CardTitle>
                    <CardDescription className="text-gray-600">
                      Advanced NLP analysis for textual content
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div
                    className={`flex items-start space-x-3 transition-all duration-1500 delay-300 ease-in-out ${
                      animationStage >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Style & Content Analysis</h4>
                      <p className="text-sm text-gray-600">
                        Detects emotional manipulation and biased language patterns
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-start space-x-3 transition-all duration-1500 delay-500 ease-in-out ${
                      animationStage >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Source Verification</h4>
                      <p className="text-sm text-gray-600">Cross-references with trusted fact-checking databases</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-start space-x-3 transition-all duration-1500 delay-700 ease-in-out ${
                      animationStage >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Real-time Analysis</h4>
                      <p className="text-sm text-gray-600">Instant credibility scoring with detailed explanations</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`bg-blue-50 p-4 rounded-lg transition-all duration-1500 delay-900 ease-in-out ${
                    animationStage >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Detection Accuracy</span>
                    <span className="text-sm font-bold text-blue-600">96.8%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-3000 ease-out"
                      style={{ width: animationStage >= 3 ? "96.8%" : "0%" }}
                    />
                  </div>
                </div>

                <div
                  className={`transition-all duration-1500 delay-1100 ease-in-out ${
                    animationStage >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <Link href="/fake-news">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 group transition-all duration-500">
                      Start Fake News Detection
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-500" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Deepfake Detection Card */}
            <Card
              className={`relative overflow-hidden transition-all duration-2000 ease-in-out hover:shadow-2xl hover:scale-[1.02] ${
                animationStage >= 2 ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-600 rounded-bl-full opacity-10" />
              <CardHeader className="relative">
                <div
                  className={`flex items-center space-x-3 mb-4 transition-all duration-1500 ease-in-out ${
                    animationStage >= 2 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Video className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-gray-900">Deepfake Detection</CardTitle>
                    <CardDescription className="text-gray-600">CNN-powered analysis for visual content</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div
                    className={`flex items-start space-x-3 transition-all duration-1500 delay-300 ease-in-out ${
                      animationStage >= 2 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Facial Manipulation Detection</h4>
                      <p className="text-sm text-gray-600">Advanced CNN models detect synthetic facial features</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-start space-x-3 transition-all duration-1500 delay-500 ease-in-out ${
                      animationStage >= 2 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Audio-Visual Sync Analysis</h4>
                      <p className="text-sm text-gray-600">Identifies inconsistencies in lip-sync and audio patterns</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-start space-x-3 transition-all duration-1500 delay-700 ease-in-out ${
                      animationStage >= 2 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Metadata Verification</h4>
                      <p className="text-sm text-gray-600">Examines technical artifacts and compression patterns</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`bg-purple-50 p-4 rounded-lg transition-all duration-1500 delay-900 ease-in-out ${
                    animationStage >= 2 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-900">Detection Accuracy</span>
                    <span className="text-sm font-bold text-purple-600">91.5%</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-3000 ease-out"
                      style={{ width: animationStage >= 3 ? "91.5%" : "0%" }}
                    />
                  </div>
                </div>

                <div
                  className={`transition-all duration-1500 delay-1100 ease-in-out ${
                    animationStage >= 2 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <Link href="/deepfake">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 group transition-all duration-500">
                      Start Deepfake Detection
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-500" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TruthGuard AI?</h2>
            <p className="text-lg text-gray-600">Cutting-edge technology meets user-friendly design</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Agent AI</h3>
              <p className="text-gray-600 text-sm">Specialized AI agents work together for comprehensive analysis</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Results</h3>
              <p className="text-gray-600 text-sm">Get instant analysis with detailed explanations and evidence</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Driven</h3>
              <p className="text-gray-600 text-sm">Continuous improvement through user feedback and reporting</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Database</h3>
              <p className="text-gray-600 text-sm">Access to worldwide fact-checking and verification sources</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
