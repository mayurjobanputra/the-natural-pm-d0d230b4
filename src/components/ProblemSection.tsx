import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Clock, Users, BookOpen } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "No Clear Path Forward",
    description: "You want to become a PM but don't know where to start or what skills you actually need."
  },
  {
    icon: Clock,
    title: "Wasting Time on Wrong Things",
    description: "Spending months learning irrelevant skills while missing the fundamentals that actually matter."
  },
  {
    icon: Users,
    title: "Lack of PM Experience",
    description: "Every PM job requires experience, but how do you get experience without a PM job?"
  },
  {
    icon: BookOpen,
    title: "Information Overload",
    description: "Drowning in blog posts, courses, and advice that contradicts each other and leads nowhere."
  }
];

export function ProblemSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            The PM Career <span className="text-red-600">Trap</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Most aspiring PMs get stuck in an endless cycle of learning without landing.
            Sound familiar?
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {problem.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto border-l-4 border-red-500">
            <h3 className="text-2xl font-bold mb-4 text-red-600">
              The Result? Years of Frustration
            </h3>
            <p className="text-lg text-muted-foreground">
              While you're stuck in learning loops, others are getting hired into PM roles
              with the right system. Don't let another year pass by.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}