"use client"

import { Shield, Users, Zap, Globe, Award, Target, Eye, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief AI Officer",
    image: "/placeholder.svg?height=200&width=200",
    bio: "PhD in Machine Learning from MIT. 10+ years in AI research and deepfake detection.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Lead Engineer",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Former Google engineer specializing in computer vision and neural networks.",
  },
  {
    name: "Dr. Aisha Patel",
    role: "NLP Research Director",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Expert in natural language processing and misinformation detection algorithms.",
  },
  {
    name: "James Thompson",
    role: "Product Manager",
    image: "/placeholder.svg?height=200&width=200",
    bio: "15 years in tech product management, focused on AI ethics and user experience.",
  },
]

const achievements = [
  { metric: "99.2%", label: "Detection Accuracy", icon: Target },
  { metric: "50M+", label: "Content Analyzed", icon: Globe },
  { metric: "500K+", label: "Users Protected", icon: Users },
  { metric: "24/7", label: "Real-time Monitoring", icon: Eye },
]

const technologies = [
  { name: "Convolutional Neural Networks", progress: 95 },
  { name: "Natural Language Processing", progress: 92 },
  { name: "Computer Vision", progress: 88 },
  { name: "Deep Learning", progress: 94 },
  { name: "Blockchain Verification", progress: 78 },
  { name: "Real-time Processing", progress: 85 },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
              🛡️ Protecting Digital Truth Since 2023
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About
              <span className="text-blue-600 block">TruthGuard AI</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're on a mission to combat misinformation and protect digital truth through cutting-edge artificial
              intelligence technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                In an era where misinformation spreads faster than truth, we believe everyone deserves access to
                reliable, AI-powered tools that can distinguish between authentic and manipulated content.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                TruthGuard AI combines advanced machine learning, computer vision, and natural language processing to
                create the most comprehensive misinformation detection platform available.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-700">Protect democratic processes from misinformation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Eye className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-700">Empower users with transparent AI explanations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-700">Build trust in digital media consumption</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="AI Technology Visualization"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-blue-600">94.2%</div>
                <div className="text-sm text-gray-600">Average Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">Making a difference in the fight against misinformation</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.metric}</div>
                    <div className="text-gray-600">{achievement.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">World-class experts in AI, machine learning, and cybersecurity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Technology</h2>
            <p className="text-lg text-gray-600">Cutting-edge AI technologies powering our detection systems</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Core Technologies</h3>
              <div className="space-y-6">
                {technologies.map((tech, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{tech.name}</span>
                      <span className="text-sm font-bold text-blue-600">{tech.progress}%</span>
                    </div>
                    <Progress value={tech.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                    Multi-Agent Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our system employs specialized AI agents that work together to analyze different aspects of content,
                    from linguistic patterns to visual artifacts.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-green-500" />
                    Global Database Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Connected to major fact-checking organizations worldwide, providing real-time verification against
                    trusted sources and databases.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-purple-500" />
                    Continuous Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our models continuously improve through user feedback and new data, staying ahead of evolving
                    misinformation techniques.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <div className="p-4 bg-blue-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Shield className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparency</h3>
                <p className="text-gray-600">
                  We believe in explainable AI. Every decision our system makes comes with clear reasoning and evidence.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Accessibility</h3>
                <p className="text-gray-600">
                  Advanced AI technology should be accessible to everyone, regardless of technical expertise.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <div className="p-4 bg-purple-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Heart className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Responsibility</h3>
                <p className="text-gray-600">
                  We're committed to ethical AI development and protecting user privacy while fighting misinformation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
