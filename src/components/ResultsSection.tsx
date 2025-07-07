import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

interface ResultsSectionProps {
  assessmentData: {
    name: string;
    email: string;
    experience: string;
    background: string;
    goal: string;
    challenge: string;
    timeline: string;
  } | null;
  onBookCall: () => void;
}

const getPersonalizedPlan = (data: any) => {
  if (!data) return null;

  const baseRecommendations = [
    "Complete PM Fundamentals Bootcamp",
    "Build 2-3 Portfolio Projects",
    "Practice Case Study Interviews",
    "Optimize LinkedIn & Resume",
    "Network with Industry Professionals"
  ];

  const experienceBonus = {
    "complete-beginner": ["PM 101: Core Concepts Workshop"],
    "some-exposure": ["Transition Strategy Session"],
    "junior-role": ["Internal Mobility Playbook"],
    "some-pm-tasks": ["Role Formalization Guide"]
  };

  const backgroundBonus = {
    "engineering": ["Technical PM Specialization"],
    "design": ["Design-to-PM Transition Guide"],
    "business": ["Strategic PM Focus Track"],
    "marketing": ["Growth PM Specialization"],
    "consulting": ["Consulting-to-PM Playbook"],
    "other": ["Custom Career Mapping"]
  };

  return [
    ...baseRecommendations,
    ...(experienceBonus[data.experience as keyof typeof experienceBonus] || []),
    ...(backgroundBonus[data.background as keyof typeof backgroundBonus] || [])
  ];
};

const getTimelineMessage = (timeline: string) => {
  const messages = {
    "asap": "With your urgent timeline, we recommend our intensive 6-week accelerated program.",
    "3-months": "Perfect! Our standard 12-week program aligns perfectly with your 3-month timeline.",
    "6-months": "Great timeline! You'll have time for our comprehensive program plus additional specialization.",
    "1-year": "Excellent! Your timeline allows for our full program plus advanced certifications."
  };
  return messages[timeline as keyof typeof messages] || "We'll create a custom timeline that works for you.";
};

export function ResultsSection({ assessmentData, onBookCall }: ResultsSectionProps) {
  if (!assessmentData) return null;

  const personalizedPlan = getPersonalizedPlan(assessmentData);
  const timelineMessage = getTimelineMessage(assessmentData.timeline);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              🎉 Assessment Complete
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Your Personalized <span className="gradient-text">PM Roadmap</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Based on your responses, here's your custom path to becoming a Product Manager
            </p>
          </motion.div>

          {/* Personal Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Hi {assessmentData.name}! 👋</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-semibold mb-2">Your Background</h4>
                    <p className="text-muted-foreground capitalize">
                      {assessmentData.background.replace("-", " ")} • {assessmentData.experience.replace("-", " ")}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-500/5 rounded-lg">
                    <h4 className="font-semibold mb-2">Your Goal</h4>
                    <p className="text-muted-foreground capitalize">
                      {assessmentData.goal.replace("-", " ")} • {assessmentData.timeline.replace("-", " ")}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-green-500/5 rounded-lg">
                  <h4 className="font-semibold mb-2">Timeline Insight</h4>
                  <p className="text-muted-foreground">{timelineMessage}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Personalized Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Your Custom PM Development Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {personalizedPlan?.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Challenge Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Addressing Your Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <h4 className="font-semibold mb-2">You mentioned:</h4>
                  <p className="text-muted-foreground italic mb-4">"{assessmentData.challenge}"</p>
                  <p className="text-muted-foreground">
                    This is actually one of the most common challenges we see, and we have specific
                    strategies to help you overcome it. In your strategy call, we'll dive deep into
                    this and create a personalized action plan.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 to-blue-500/5">
              <CardContent className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Book a free strategy call to discuss your personalized plan and see if
                  The Natural PM is the right fit for your goals.
                </p>
                <Button
                  size="lg"
                  onClick={onBookCall}
                  className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Book Your Free Strategy Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  No obligation • 30-minute call • Completely free
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}