import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at Spotify",
    previousRole: "Software Engineer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&q=80",
    content: "The Natural PM completely transformed my career. I went from a confused engineer to landing a PM role at Spotify in just 8 weeks. The mentorship and real projects made all the difference.",
    outcome: "Landed PM role in 8 weeks"
  },
  {
    name: "Marcus Rodriguez",
    role: "Senior Product Manager at Airbnb",
    previousRole: "Business Analyst",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
    content: "I tried everything - bootcamps, online courses, books. Nothing worked until I found The Natural PM. The system is incredible and the support is unmatched. Now I'm at my dream company.",
    outcome: "$40k salary increase"
  },
  {
    name: "Emily Johnson",
    role: "Product Manager at Slack",
    previousRole: "Marketing Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80",
    content: "The portfolio projects and interview prep were game-changers. I felt confident in every interview and had multiple offers to choose from. Best investment I've ever made in my career.",
    outcome: "Multiple job offers"
  },
  {
    name: "David Kim",
    role: "Product Manager at Notion",
    previousRole: "UX Designer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80",
    content: "What I loved most was how practical everything was. No theory - just real PM work that I could immediately apply. The mentors helped me avoid all the common mistakes.",
    outcome: "First PM role at Series A startup"
  },
  {
    name: "Lisa Thompson",
    role: "Product Manager at Figma",
    previousRole: "Project Manager",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80",
    content: "The Natural PM gave me the confidence and skills I needed to make the transition. The community support was incredible - I still stay in touch with my cohort members.",
    outcome: "Transitioned from PM to Product"
  },
  {
    name: "Alex Patel",
    role: "Product Manager at Stripe",
    previousRole: "Data Analyst",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80",
    content: "I was stuck in analysis paralysis for months. The Natural PM gave me a clear path forward and the accountability I needed. Now I'm building products used by millions.",
    outcome: "Joined top fintech company"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Success Stories From Our <span className="gradient-text">Alumni</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Real people, real results. See how The Natural PM has transformed careers
            across different backgrounds and industries.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 w-6 h-6 text-primary/20" />
                    <p className="text-muted-foreground leading-relaxed pl-4">
                      "{testimonial.content}"
                    </p>
                  </div>

                  {/* Outcome Badge */}
                  <Badge variant="secondary" className="mb-4">
                    {testimonial.outcome}
                  </Badge>

                  {/* Profile */}
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground">
                        Previously: {testimonial.previousRole}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">94%</h3>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">$65k</h3>
              <p className="text-muted-foreground">Avg Starting Salary</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">6 weeks</h3>
              <p className="text-muted-foreground">Average Time to Hire</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">2,500+</h3>
              <p className="text-muted-foreground">Alumni Network</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}