import Link from "next/link"
import { Shield, Facebook, Twitter, Linkedin, Github, Mail } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Fake News", href: "/fake-news" },
  { name: "Deepfake", href: "/deepfake" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "GitHub", href: "#", icon: Github },
  { name: "Email", href: "#", icon: Mail },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-purple-400" />
              <div>
                <h3 className="text-xl font-bold">TruthGuard AI</h3>
                <p className="text-sm text-gray-400">AI Detection System</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm max-w-md">
              Advanced AI-powered system for detecting fake news, deepfakes, and misinformation across multiple content
              types.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-300 hover:text-purple-400 transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                )
              })}
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">Stay updated with the latest in AI detection technology</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 TruthGuard AI. All rights reserved. | Built with advanced AI technology for a safer digital world.
          </p>
        </div>
      </div>
    </footer>
  )
}
